# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm install       # resolves file:../ouroboros-design dep
npm run dev       # jekyll serve --livereload → http://localhost:4000
npm run build     # jekyll build → _site/
```

**After any SCSS edit in `ouroboros-design/`:**
```bash
cd ../ouroboros-design && npm run build
cd ../OUROBOROS-Consulting.github.io && npm install && npm run dev
```

**Ruby:** rbenv with Ruby 3.3.x. Homebrew Ruby 4.x breaks Bundler/Jekyll — don't use it.

## Layout Hierarchy

```
default.html      ← HTML shell: fonts, nav, footer, main.js, nav-shell
  ├── home.html   ← Single-page landing
  ├── foundation.html ← Prose pages: progress bar → hero → content → who → CTA
  ├── mission.html    ← Sections pages: hero → about → sections loop → links
  ├── essays.html
  ├── psa.html    ← PDF embed via iframe
  └── linkedin.html
```

`foundation.html` — `back_url` defaults to `/services/`. `headshot:` + `headshot_alt:` renders `.hex-portrait` in hero.

`mission.html` — `back_url` defaults to `/`. Social `links:` front matter keys: `github`, `linkedin`, `orcid`, `tutor`, `contact`. `contact` opens same tab; all others new tab.

**`_about/` is a mixed collection** — each file sets its own `layout:` (foundation, mission, or default). Permalink is `/:slug`. Don't assume a single layout.

**`_announcements/` is not registered in `_config.yml`** — posts exist but won't build until added to the `collections:` block.

## mission.html Section Keys

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

## Gotchas

**Narrow text:** `_essay.scss` sets `.post-body { max-width: 680px }` globally. Foundation pages needing full-width prose require:
```scss
.svc-body .post-body { max-width: none; }
```

**PSAs:** `section:` front matter (e.g. `Technology`) drives category grouping in `psas.html`. Separate from the `category:` eyebrow label. PDFs live at `assets/files/PSA/<Category>/filename.pdf`.

**Custom agent:** `.github/agents/gothic-designer.agent.md` — invoke for visual/design tasks to get on-brand token values and geometry.
