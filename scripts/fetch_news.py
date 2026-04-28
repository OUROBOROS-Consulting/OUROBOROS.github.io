#!/usr/bin/env python3
"""Fetch RSS/Atom feeds and write _data/news.yml for Jekyll."""

import html
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

try:
    import yaml
except ImportError:
    print("pyyaml required: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

FEEDS = [
    # AI
    {"url": "https://www.anthropic.com/rss.xml",                                                               "source": "Anthropic",       "category": "AI"},
    {"url": "https://arxiv.org/rss/cs.AI",                                                                     "source": "arXiv",           "category": "AI"},
    # Technology
    {"url": "https://www.technologyreview.com/feed/",                                                          "source": "MIT Tech Review", "category": "Technology"},
    # Accountability
    {"url": "https://www.eff.org/rss/updates.xml",                                                             "source": "EFF",             "category": "Accountability"},
    {"url": "https://themarkup.org/feeds/rss.xml",                                                             "source": "The Markup",      "category": "Accountability"},
    {"url": "https://www.propublica.org/feeds/propublica/main",                                                "source": "ProPublica",      "category": "Accountability"},
    # Institutional Betrayal
    {"url": "https://pubmed.ncbi.nlm.nih.gov/rss/search/?term=coercive+control&format=rss&count=8",            "source": "PubMed",          "category": "Institutional Betrayal"},
    {"url": "https://pubmed.ncbi.nlm.nih.gov/rss/search/?term=institutional+betrayal&format=rss&count=8",      "source": "PubMed",          "category": "Institutional Betrayal"},
    {"url": "https://pubmed.ncbi.nlm.nih.gov/rss/search/?term=intimate+partner+violence&format=rss&count=8",   "source": "PubMed",          "category": "Institutional Betrayal"},
    {"url": "https://pubmed.ncbi.nlm.nih.gov/rss/search/?term=whistleblower+retaliation&format=rss&count=5",   "source": "PubMed",          "category": "Institutional Betrayal"},
    # Psychopathology
    {"url": "https://pubmed.ncbi.nlm.nih.gov/rss/search/?term=trauma+informed+care&format=rss&count=8",        "source": "PubMed",          "category": "Psychopathology"},
    {"url": "https://pubmed.ncbi.nlm.nih.gov/rss/search/?term=bayesian+neuroimaging&format=rss&count=5",       "source": "PubMed",          "category": "Psychopathology"},
    {"url": "https://pubmed.ncbi.nlm.nih.gov/rss/search/?term=forensic+psychiatry&format=rss&count=5",         "source": "PubMed",          "category": "Psychopathology"},
    {"url": "https://www.statnews.com/feed/",                                                                  "source": "STAT News",       "category": "Psychopathology"},
]

ITEMS_PER_FEED = 8
TOTAL_CAP      = 100
OUTPUT_PATH    = "_data/news.yml"
ATOM_NS        = "http://www.w3.org/2005/Atom"


def clean(text: str, max_len: int = 220) -> str:
    text = html.unescape(text or "")
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:max_len].rstrip()


def parse_date(raw: str) -> str:
    fmts = [
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S %Z",
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%dT%H:%M:%S.%f%z",
    ]
    for fmt in fmts:
        try:
            return datetime.strptime(raw.strip(), fmt).strftime("%Y-%m-%d")
        except ValueError:
            pass
    # ISO fromisoformat fallback
    try:
        return datetime.fromisoformat(raw.strip().replace("Z", "+00:00")).strftime("%Y-%m-%d")
    except Exception:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def fetch_rss(feed_meta: dict) -> list[dict]:
    items = []
    try:
        req = urllib.request.Request(
            feed_meta["url"],
            headers={"User-Agent": "OUROBOROSConsulting-NewsBot/1.0"},
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            root = ET.fromstring(resp.read())
    except Exception as exc:
        print(f"  skip {feed_meta['url']}: {exc}", file=sys.stderr)
        return items

    # ── RSS 2.0 ──────────────────────────────────────────────────────────────
    channel = root.find("channel")
    if channel is not None:
        for el in list(channel.findall("item"))[:ITEMS_PER_FEED]:
            title = clean(el.findtext("title", ""))
            url   = (el.findtext("link") or el.findtext("{http://rdf.w3.org/1999/02/22-rdf-syntax-ns#}about") or "").strip()
            date  = parse_date(el.findtext("pubDate") or el.findtext("{http://purl.org/dc/elements/1.1/}date") or "")
            desc  = clean(el.findtext("description") or el.findtext("{http://purl.org/dc/elements/1.1/}description") or "")
            if title and url:
                items.append({"title": title, "url": url, "date": date,
                               "source": feed_meta["source"], "category": feed_meta["category"],
                               "description": desc})
        return items

    # ── Atom 1.0 ─────────────────────────────────────────────────────────────
    ns = ATOM_NS
    for el in list(root.findall(f"{{{ns}}}entry"))[:ITEMS_PER_FEED]:
        t = el.find(f"{{{ns}}}title")
        l = el.find(f"{{{ns}}}link")
        p = el.find(f"{{{ns}}}published") or el.find(f"{{{ns}}}updated")
        s = el.find(f"{{{ns}}}summary") or el.find(f"{{{ns}}}content")
        title = clean(t.text if t is not None else "")
        url   = (l.get("href", "") if l is not None else "").strip()
        date  = parse_date(p.text if p is not None else "")
        desc  = clean(s.text if s is not None else "")
        if title and url:
            items.append({"title": title, "url": url, "date": date,
                           "source": feed_meta["source"], "category": feed_meta["category"],
                           "description": desc})
    return items


def main():
    all_items: list[dict] = []
    seen_urls: set[str]   = set()

    for feed in FEEDS:
        print(f"Fetching {feed['source']} …", file=sys.stderr)
        for item in fetch_rss(feed):
            if item["url"] not in seen_urls:
                seen_urls.add(item["url"])
                all_items.append(item)

    all_items.sort(key=lambda x: x["date"], reverse=True)
    all_items = all_items[:TOTAL_CAP]

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        yaml.dump(all_items, f, allow_unicode=True, default_flow_style=False,
                  sort_keys=False, width=120)

    print(f"Wrote {len(all_items)} items to {OUTPUT_PATH}", file=sys.stderr)


if __name__ == "__main__":
    main()
