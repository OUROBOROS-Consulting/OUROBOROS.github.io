#!/usr/bin/env python3
"""Build _data/news.yml from the feeds listed in _data/news_sources.yml.

Runs in CI (.github/workflows/news.yml) and locally:

    python3 scripts/fetch_news.py

Standard library only, on purpose. This has no requirements.txt to keep
current and no supply chain beyond CPython.

The point of the whole arrangement: headlines are fetched at build time and
committed as data, so the published page is static HTML with plain outbound
links. A visitor's browser requests nothing from any of these outlets, which
is what keeps /privacy/ honest.
"""

from __future__ import annotations

import html
import json
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / "_data" / "news_sources.yml"
OUTPUT = ROOT / "_data" / "news.yml"

TIMEOUT = 20            # seconds per feed; a slow outlet must not hang the job
MAX_BYTES = 8 * 1024 * 1024   # see fetch(): bounds a hostile or broken response
MAX_AGE_DAYS = 60       # default window; a source may widen it, see harvest()
PER_SOURCE = 6          # so one prolific feed cannot flood a section
PER_CATEGORY = 12       # page length ceiling
SUMMARY_CHARS = 220

# Several of these feeds 403 a bare urllib User-Agent.
UA = ("Mozilla/5.0 (compatible; OUROBOROS-news/1.0; "
      "+https://ouroborosconsulting.org/news/)")

ATOM = "{http://www.w3.org/2005/Atom}"


# ── Minimal YAML reader ───────────────────────────────────────────────────────
# Only enough to read news_sources.yml, which is a hand-maintained file in a
# known shape. Using PyYAML would mean a pip install in CI for one file.

def read_sources(path: Path) -> tuple[list[dict], list[dict]]:
    """Parse the two top-level lists out of news_sources.yml."""
    categories: list[dict] = []
    sources: list[dict] = []
    bucket: list[dict] | None = None
    entry: dict | None = None
    key: str | None = None          # set while reading a `match:` list

    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.split(" #")[0].rstrip() if " #" in raw else raw.rstrip()
        if not line.strip() or line.lstrip().startswith("#"):
            continue

        if line == "categories:":
            bucket, entry, key = categories, None, None
            continue
        if line == "sources:":
            bucket, entry, key = sources, None, None
            continue
        if not line.startswith(" "):
            # Any other top-level key closes the current list. Without this the
            # reject lists at the bottom of the file were read as `sources`
            # entries, because they are `- ` items at the same indent.
            bucket, entry, key = None, None, None
            continue
        if bucket is None:
            continue

        indent = len(line) - len(line.lstrip())
        text = line.strip()

        if indent == 2 and text.startswith("- "):
            entry = {}
            bucket.append(entry)
            text, key = text[2:], None
        elif indent >= 6 and text.startswith("- ") and key:
            entry[key].append(text[2:].strip().strip("'\""))
            continue

        if entry is None:
            continue

        if ":" not in text:
            # Continuation line of a folded `>-` block.
            if key and isinstance(entry.get(key), str):
                entry[key] = (entry[key] + " " + text).strip()
            continue

        key, _, value = text.partition(":")
        key, value = key.strip(), value.strip()
        if value in ("", ">-", "|", ">"):
            entry[key] = [] if value == "" else ""
        else:
            entry[key] = value.strip("'\"")

    return categories, sources


def read_reject(path: Path) -> list[str]:
    """Collect the top-level reject lists into one lowercase substring list.

    Deliberately a separate scan rather than another branch inside
    read_sources(): that parser tracks nested dict entries and this is two flat
    lists of scalars. Keeping them apart means a malformed reject list cannot
    corrupt the source list.
    """
    terms: list[str] = []
    inside = False
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.split(" #")[0].rstrip() if " #" in raw else raw.rstrip()
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if line in ("reject_individual:", "reject_offtopic:", "reject_named:"):
            inside = True
            continue
        if not line.startswith(" "):        # any other top-level key ends the run
            inside = False
            continue
        if inside and line.lstrip().startswith("- "):
            terms.append(line.lstrip()[2:].strip().strip("'\"").lower())
    return terms

# ── Feed parsing ──────────────────────────────────────────────────────────────

def fetch(url: str) -> bytes | None:
    if not url.startswith("https://"):
        # No plaintext and no file:// or ftp:// smuggled in through the data
        # file. Every source is a public site that serves TLS.
        print("  skipped: source URL is not https", file=sys.stderr)
        return None

    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
    })
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            # Bounded read. A feed that streams forever, or one that has been
            # replaced by something enormous, stops at the cap instead of
            # exhausting the runner.
            body = resp.read(MAX_BYTES + 1)
        if len(body) > MAX_BYTES:
            print(f"  skipped: response exceeds {MAX_BYTES} bytes", file=sys.stderr)
            return None
        return body
    except (urllib.error.URLError, urllib.error.HTTPError, OSError) as err:
        # One dead feed must never fail the run. It just goes quiet.
        print(f"  skipped: {err}", file=sys.stderr)
        return None


def text_of(node, *names: str) -> str:
    for name in names:
        found = node.find(name)
        if found is not None and (found.text or "").strip():
            return found.text.strip()
    return ""


def link_of(node) -> str:
    direct = text_of(node, "link", f"{ATOM}link")
    if direct:
        return direct
    for tag in ("link", f"{ATOM}link"):
        for el in node.findall(tag):
            rel = el.get("rel", "alternate")
            if el.get("href") and rel == "alternate":
                return el.get("href")
    return ""


def clean(raw: str, limit: int | None = None) -> str:
    """Strip tags and entities out of a feed's title or description."""
    txt = re.sub(r"<[^>]+>", " ", raw)
    txt = html.unescape(txt)
    txt = re.sub(r"\s+", " ", txt).strip()
    if limit and len(txt) > limit:
        cut = txt[:limit].rsplit(" ", 1)[0]
        txt = cut.rstrip(".,;:") + "..."
    return txt


def parse_date(raw: str) -> datetime | None:
    raw = raw.strip()
    if not raw:
        return None
    try:
        return parsedate_to_datetime(raw)            # RFC 822, most RSS
    except (TypeError, ValueError, IndexError):
        pass
    try:
        return datetime.fromisoformat(raw.replace("Z", "+00:00"))   # ISO, Atom
    except ValueError:
        return None


def entries(xml: bytes):
    # These are third-party documents. CPython's ElementTree has refused
    # external entities since 3.7.1, which closes XXE, but internal entity
    # definitions can still be nested into a billion-laughs expansion. No
    # legitimate feed carries a DOCTYPE, so refusing one costs nothing and
    # avoids adding defusedxml as a dependency for a single call site.
    head = xml.lstrip()[:2048].lower()
    if b"<!doctype" in head or b"<!entity" in head:
        print("  skipped: feed declares a DOCTYPE", file=sys.stderr)
        return []
    try:
        root = ElementTree.fromstring(xml)
    except ElementTree.ParseError as err:
        print(f"  skipped: malformed XML ({err})", file=sys.stderr)
        return []
    items = root.iter("item")
    found = list(items) or list(root.iter(f"{ATOM}entry"))
    return found


def harvest(source: dict, inherited: list[str], reject: list[str],
            now: datetime) -> list[dict]:
    print(f"- {source['name']}: {source['url']}", file=sys.stderr)
    xml = fetch(source["url"])
    if not xml:
        return []

    # A few sources publish a handful of times a year and are the most
    # on-topic feeds on the list. Sixty days would silence them entirely, so
    # they declare their own window in news_sources.yml.
    window = int(source.get("max_age_days") or MAX_AGE_DAYS)
    cutoff = now - timedelta(days=window)

    # A category may declare a `match:` that its sources inherit. An explicit
    # `match:` on the source wins outright rather than merging: merging would
    # only ever widen the filter, and the point of a narrower one is to win.
    keywords = [k.lower() for k in source.get("match") or inherited]
    out: list[dict] = []
    dropped: list[str] = []

    for node in entries(xml):
        title = clean(text_of(node, "title", f"{ATOM}title"))
        link = link_of(node)
        if not title or not link:
            continue

        summary = clean(text_of(
            node, "description", f"{ATOM}summary", f"{ATOM}content",
            "{http://purl.org/rss/1.0/modules/content/}encoded",
        ), SUMMARY_CHARS)

        hay = f"{title} {summary}".lower()

        if keywords:
            if not any(k in hay for k in keywords):
                continue

        # Issue #102, option 3: the feed carries institutional and policy
        # coverage, not individual-case reporting. Republishing an accusation
        # is a fresh publication by the republisher, and the non-endorsement
        # note above the list sits beside a headline rather than inside it, so
        # it does not change what the headline asserts. Matched against the
        # summary as well as the title because both are rendered.
        if any(k in hay for k in reject):
            dropped.append(title)
            continue

        published = parse_date(text_of(
            node, "pubDate", "{http://purl.org/dc/elements/1.1/}date",
            f"{ATOM}published", f"{ATOM}updated",
        ))
        if published is None:
            continue
        if published.tzinfo is None:
            published = published.replace(tzinfo=timezone.utc)
        if published < cutoff:
            continue

        out.append({
            "title": title,
            "url": link.strip(),
            "source": source["name"],
            "category": source["category"],
            "date": published.astimezone(timezone.utc).strftime("%Y-%m-%d"),
            "sort": published.astimezone(timezone.utc).isoformat(),
            "summary": summary,
        })

    out.sort(key=lambda i: (i["sort"], i["title"]), reverse=True)
    kept = out[:PER_SOURCE]
    print(f"  kept {len(kept)} of {len(out)}"
          + (f", rejected {len(dropped)}" if dropped else ""), file=sys.stderr)
    for title in dropped:
        print(f"    rejected: {title}", file=sys.stderr)
    return kept


# ── Output ────────────────────────────────────────────────────────────────────

def scalar(value: str) -> str:
    """YAML is a JSON superset, so a JSON string is always a valid scalar.

    Saves hand-rolling quote and colon escaping for headlines written by
    other people.
    """
    return json.dumps(value, ensure_ascii=False)


def render(categories: list[dict], items: list[dict], generated: datetime) -> str:
    lines = [
        "# Generated by scripts/fetch_news.py. Do not edit by hand:",
        "# the news workflow overwrites this file on every run.",
        "#",
        "# Edit _data/news_sources.yml to change what appears here.",
        f"generated: {generated.strftime('%Y-%m-%d')}",
        "sections:",
    ]

    for cat in categories:
        rows = [i for i in items if i["category"] == cat["id"]][:PER_CATEGORY]
        if not rows:
            continue
        lines += [
            f"  - id: {cat['id']}",
            f"    title: {scalar(cat['title'])}",
            f"    blurb: {scalar(cat.get('blurb', ''))}",
            "    items:",
        ]
        for row in rows:
            lines += [
                f"      - title: {scalar(row['title'])}",
                f"        url: {scalar(row['url'])}",
                f"        source: {scalar(row['source'])}",
                f"        date: {row['date']}",
                f"        summary: {scalar(row['summary'])}",
            ]

    return "\n".join(lines) + "\n"


def main() -> int:
    categories, sources = read_sources(SOURCES)
    reject = read_reject(SOURCES)
    valid = {c["id"] for c in categories}
    unknown = {s["category"] for s in sources} - valid
    if unknown:
        print(f"error: sources reference undeclared categories: "
              f"{', '.join(sorted(unknown))}", file=sys.stderr)
        return 1

    inherited = {c["id"]: [k.lower() for k in c.get("match") or []]
                 for c in categories}

    now = datetime.now(timezone.utc)

    collected: list[dict] = []
    seen: set[str] = set()
    for source in sources:
        for item in harvest(source, inherited.get(source["category"], []),
                            reject, now):
            # Two feeds can carry the same story. First one in wins.
            #
            # Keyed on the title as well as the URL: EPIC publishes some items
            # at two URLs, which put the same headline on the page twice.
            keys = (item["url"], item["title"].lower())
            if any(k in seen for k in keys):
                continue
            seen.update(keys)
            collected.append(item)

    if not collected:
        # Every feed failed at once: almost certainly the network, not the
        # sources. Leave the last good news.yml in place rather than
        # committing an empty page.
        print("error: no items collected, leaving existing news.yml alone",
              file=sys.stderr)
        return 1

    collected.sort(key=lambda i: (i["sort"], i["title"]), reverse=True)
    OUTPUT.write_text(render(categories, collected, now), encoding="utf-8")
    print(f"wrote {OUTPUT.relative_to(ROOT)} "
          f"({len(collected)} items from {len(sources)} feeds)", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
