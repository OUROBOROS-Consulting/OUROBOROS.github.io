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

## Gotchas

**Narrow text:** `.post-body` has `max-width: 680px` globally. Article pages needing full-width prose require:
```scss
.page-body .post-body { max-width: none; }
```

**PSAs:** `section:` front matter (e.g. `Technology`) drives category grouping in `psas.html`. Separate from the `category:` eyebrow label. PDFs live at `assets/files/PSA/<Category>/filename.pdf`.

**Custom agent:** `.github/agents/gothic-designer.agent.md` — invoke for visual/design tasks to get on-brand token values and geometry.
