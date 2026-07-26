# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm install       # resolves file:../ouroboros-design dep
npm run dev       # jekyll serve --livereload → http://localhost:4000
npm run build     # jekyll build → _site/
```

**`predev` auto-runs before `npm run dev`:** kills livereload port 35729, then rebuilds the design system. Manual rebuild is only needed when bypassing `npm run dev`.

**After any SCSS edit in `ouroboros-design/` outside of `npm run dev`:**
```bash
cd ../ouroboros-design && npm run build
cd ../OUROBOROS-Consulting.github.io && npm install && npm run dev
```

**Ruby:** rbenv with Ruby 3.3.x. Homebrew Ruby 4.x breaks Bundler/Jekyll — don't use it.

## Layout Hierarchy

```
default.html          ← HTML shell: fonts, nav, rail, footer, main.js
  ├── home.html         ← Single-page landing
  ├── article.html      ← BODY-driven: progress bar → hero → {{ content }} → who → CTA
  ├── sections.html     ← FRONT-MATTER-driven: hero → about → page.sections loop → links
  ├── service.html      ← Service detail: hero → specializations → policies → included → pricing → CTA
  ├── dashboard.html    ← Loads dashboard.css automatically
  ├── announcement.html ← Single announcement
  └── psa.html          ← PDF embed via iframe ⚠ zero pages, see README Anomalies
```

**Choosing between `article` and `sections`:** `article` renders the Markdown body. `sections` ignores the body and renders the `sections:` list from front matter. One continuous document → `article`. Discrete blocks, often fed from `_data/` → `sections`. Renamed from `foundation`/`mission` on 2026-07-26; those names described the first page that used them, not the structure.

`article.html` — `back_url` defaults to `/services/`. `headshot:` + `headshot_alt:` renders `.hex-portrait` in hero. `tags:` render as anchor `<a>` buttons (jump links).

`service.html` — Used by `_services/`. Tags render as plain `<span>` labels (not jump links). Front matter keys:
- `icon`: Font Awesome class (e.g. `fa-shield`)
- `specializations`: plain string list
- `policies`: list of `{item: "..."}`
- `included`: list of `{title: "...", description: "..."}`
- `pricing`: list of `{name: "...", rate: "...", notes: "..."}`

`sections.html` — `back_url` defaults to `/`. Social `links:` front matter keys: `github`, `linkedin`, `orcid`, `tutor`, `contact`. `contact` opens same tab; all others new tab.

**`_about/` is a mixed collection** — each file sets its own `layout:` (article, sections, or default). Permalink is `/:slug`. Don't assume a single layout.

## Page-Level Front Matter (default.html)

| Key | Effect |
|-----|--------|
| `noindex: true` | Adds `<meta name="robots" content="noindex,nofollow">` |
| `show_banner: true` | Renders `_includes/banner.html` and adds `body.has-banner`. Only `index.md` uses it |
| `extra_css: "name"` | Loads `assets/css/name.css` alongside main.css |

## sections.html Section Keys

Pick one per section:

| Key | Renders |
|-----|---------|
| `playlist_carousel: true` + `data_source:` | Swipeable iframe carousel |
| `data_source: "filename"` | Grid of bib-cards from `_data/filename.yml` |
| `bibtex_src: "path.bib"` | Client-side BibTeX rendering via `bibtex.js` |
| `html: "<raw>"` | Verbatim HTML injection |
| `body_paragraphs: [...]` | List of Markdown strings → `<p>` tags |
| `body: "text"` | Single plain-text paragraph |

`bibtex.js` and `playlist-carousel.js` inject only when a section uses them.

**Playlist lazy-load:** iframes use `data-src` not `src` — `playlist-carousel.js` swaps on slide activation. Never set `src` directly.

## Navigation

Secondary nav is data-driven from `_data/nav.yml`. Each entry supports `active_paths` — a list of additional URL prefixes that mark the item active beyond its own `url`. Use this when a section spans multiple URL roots.

## Styling lives in the other repo

`../ouroboros-design/` owns every token, mixin, and component style. **Read its `README.md` before writing CSS here** — tokens, accent semantics, elevation, class naming, and accessibility invariants are all documented there.

**Never redeclare a design token in this repo.** A `@media (prefers-color-scheme: light)` block used to re-pin nine tokens on nav and footer; the values silently went stale and nearly excluded those elements from a palette change. Removed 2026-07-26, with a comment at `assets/css/main.scss:48` explaining why. The design system has no light mode — tokens are defined once, unconditionally.

**What this repo legitimately owns:** raster-backed textures (the `Marble.png` / `Abstract.png` / `Pattern-hero.jpg` rules), because the image assets live in `assets/images/` here, not in the package.

**Push order:** design repo first, then this one. CI checks out the design repo's default branch with no `ref:`, and pushing the design repo does not trigger this site's workflow.

## Class Prefixes

| Prefix | Scope |
|---|---|
| `page-*` | Universal page chrome (hero, body, sections) — every layout |
| `post-*` | Prose reading chrome — article and announcement layouts |
| `svc-*` | Service-specific only: `svc-included`, `svc-item*`, `svc-pricing-*`, `svc-rate-principle` |
| `card-*` | Card internals — home and intake |

⚠ **`assets/js/toc.js` hardcodes `section.page-section[id]` and `.page-section-label p`.** It has broken silently on two separate renames. Grep it before touching any `page-section` class.

⚠ **After any layout rename, run `git ls-tree -r --name-only HEAD -- _layouts/`.** A passing local build proves nothing — untracked files on disk still resolve. A half-staged rename once left 22 pages on `main` with no layout at all.

## Gotchas

**Narrow text:** `.post-body` has `max-width: 680px` globally. Article pages needing full-width prose require:
```scss
.page-body .post-body { max-width: none; }
```

**Hero metadata:** `.page-hero-meta` renders a price on services and a date on PSAs. It was called `.svc-price` until 2026-07-26, which was wrong for the PSA case.

**PSAs:** `section:` front matter (e.g. `Technology`) drives category grouping in `psas.html`. Separate from the `category:` eyebrow label. PDFs live at `assets/files/PSA/<Category>/filename.pdf`.

**Custom agent:** `.github/agents/gothic-designer.agent.md` — invoke for visual/design tasks to get on-brand token values and geometry.
