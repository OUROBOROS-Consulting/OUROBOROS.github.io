# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

**Setup (first time only):**

```bash
# Install Node.js dependencies (includes design system package)
npm install

# Install Ruby/Jekyll dependencies
bundle install
```

**Development:**

```bash
npm run dev
# Runs: bundle exec jekyll serve --livereload
# Serves at http://localhost:4000
```

**Production build:**

```bash
npm run build
# Runs: bundle exec jekyll build
# Outputs to _site/
```

Deployed automatically via GitHub Actions (`.github/workflows/jekyll-gh-pages.yml`) on push to `main`. GitHub Actions will run `npm install` before build.

## Architecture Overview

Jekyll static site for OUROBOROS Consulting (Apostolos Stamenos). Dark, editorial aesthetic pulled from `@ouroboros-consulting/ouroboros-design` npm package.

### Layout Hierarchy

```
default.html         ← HTML shell: fonts, nav, footer, main.js
  ├── home.html      ← Single-page landing (hero, stats, values, services, work, testimonials)
  ├── foundation.html ← All multi-section pages — dual-mode (see below)
  ├── essays.html    ← Essay reading layout
  ├── psa.html       ← PDF embed layout with iframe
  ├── blog.html      ← LinkedIn-style post layout
  └── linkedin.html  ← LinkedIn post format
```

### foundation.html Dual Mode (Critical)

`foundation.html` renders in two completely different modes based on front matter:

| Mode | Triggered by | Renders |
|------|-------------|---------|
| **Mission mode** | `hero:` key present in front matter | Structured hero → `about:` blurb → `pull_quote:` → `sections:` loop |
| **Service/Prose mode** | No `hero:` or `sections:` key | Markdown `content` block + `.who` + CTA section |

**Mission mode sections** support rich data: `data_source:` (pulls from `_data/*.yml`), `bibtex_src:`, `playlist_carousel:`, `html:`, `body_paragraphs:`, or plain `body:`.

The `headshot:` + `headshot_alt:` front matter renders a `.hex-portrait` image in service/prose mode only (in the hero alongside the text column).

### Collections (`_config.yml`)

| Collection | Permalink | Layout |
|------------|-----------|--------|
| `_services/` | `/services/:slug/` | `foundation` |
| `_essays/` | `/essays/:slug/` | `essays` |
| `_projects/` | `/projects/:slug/` | varies |
| `_case_studies/` | `/work/:slug/` | `foundation` |
| `_psas/` | `/work/psas/:slug/` | `psa` |
| `_resources/` | `/resources/:slug/` | varies |
| `_notes/` | `/notes/:slug/` | varies |
| `_linkedin/` | `/posts/:year/:slug/` | `linkedin` |

PSAs use a `section:` front matter field (e.g. `Technology`, `Psychopathology`) for category grouping in `psas.html` — separate from the `category:` eyebrow label.

### SCSS Architecture

Design system imported from npm package `@ouroboros-consulting/ouroboros-design`.

Entry point: `assets/css/main.scss` — single import of design package:

```scss
@import "@ouroboros-consulting/ouroboros-design/scss/index";
```

The package contains all SCSS partials:

| Partial | Responsibility |
|---------|----------------|
| `_base.scss` | CSS custom properties, reset, scallop/elevation mixins, body texture, 404 styles |
| `_typography.scss` | Prose typographic scale |
| `_buttons.scss` | `.btn` (gold outlined), `.btn--ghost` |
| `_nav.scss` | Top navigation |
| `_footer.scss` | Site footer |
| `_cards.scss` | `.card--formula`, `.related-grid`, `.bib-card`, stat cards |
| `_home.scss` | Hero, stats, values, testimonials (home page only) |
| `_service.scss` | `.svc-hero`, `.svc-body`, `.svc-section`, `.psa-*` styles |
| `_essay.scss` | Essay reading layout (note: sets `.post-body { max-width: 680px }`) |
| `_cv.scss` | CV/resume layout |
| `_linkedin.scss` | LinkedIn post layout styles |
| `_timeline.scss` | Timeline component styles |
| `_floorplan.scss` | Floorplan/grid layout styles |

### Design Token System (`_base.scss`)

All colors are CSS custom properties on `:root`. Key tokens:

```scss
--bg1: #141414    // page background
--bg2: #1E1E1E    // card/surface background
--bg3: #252525    // elevated surface
--border: #333333
--calloutbg: #2A2A2A
--gold: #C9A84C   // primary accent
--gold-border: #B1935D  // opaque border variant
--text: #E8E4DC
--subdued: #B0AAA0
--muted: #999999
--steel: #324cde
--amethyst: #967ABB
--sage: #6A8E7F
--teal: #4a6b5f
```

Three elevation mixins in `_base.scss` apply scallop texture + background:
- `@include scallop-recessed` — subtle 12px tile, `stroke-opacity: 0.08`
- `@include scallop-standard` — 16px tile, `stroke-opacity: 0.18`
- `@include scallop-elevated` — 24px tile, `stroke-opacity: 0.28`

These correspond to `@include elevation-recessed/standard/elevated` which also set background color.

The body background texture is a fixed-position `body::before` using `scallop-recessed`. The `body::after` is a cursor spotlight (teal radial gradient following `--cx/--cy` CSS vars set by `main.js`).

### Data Files (`_data/`)

Site-wide data driving dynamic sections:

- `nav.yml` — navigation structure
- `values.yml`, `testimonials.yml` — home page carousels
- `timeline.yml`, `projects.yml` — structured project data
- `tutorials.yml` — tutorials page content
- `reading.yml`, `listening.yml`, `playlists.yml` — personal pages
- `survival.yml`, `survival_crisis.yml`, `survival_legal.yml`, `survival_mental.yml`, `survival_whistleblower.yml` — survival guide resources

### Includes (`_includes/`)

| Include | Purpose |
|---------|---------|
| `nav.html` | Top navigation (hamburger + active link logic) |
| `footer.html` | Site footer |
| `timeline.html` | Timeline component (used in projects/case studies) |
| `framed.html` | Generic framed/bordered content block |
| `campaign.html` | Campaign/CTA section include |
| `linkedinbadge.html` | LinkedIn badge embed |

### foundation.html Additional Patterns

- **Scroll progress bar**: `#progress-bar` renders on every `foundation.html` page — a gold line at top tracking scroll depth.
- **Social links block**: `page.links:` front matter (keys: `github`, `linkedin`, `orcid`, `tutor`, `contact`) renders a `.foundation-links` nav at the bottom of mission-mode pages.
- **Lazy script loading**: `bibtex.js` and `playlist-carousel.js` are injected conditionally — only when a section uses `bibtex_src:` or `playlist_carousel: true` respectively. Playlist iframes use `data-src` instead of `src` for lazy loading; `playlist-carousel.js` swaps `data-src → src` on slide activation.

### Typography

Loaded via Google Fonts in `default.html`: **Lora** (serif, body/headings), **Inter** (sans, UI/labels), **JetBrains Mono** (monospace, code). Font Awesome 6.5 CDN for icons.

### Custom Agent

`.github/agents/gothic-designer.agent.md` defines the **gothic-designer** Claude agent — a design persona embodying the site's modern-Gothic aesthetic. Invoke it for visual/design tasks to get on-brand suggestions using the exact token values and geometry principles of the design system.

### Narrow Text Gotcha

`_essay.scss` sets `.post-body { max-width: 680px }` globally. Any page using `foundation.html` in prose/service mode that needs full-width text requires an override in `_service.scss`:
```scss
.svc-body .post-body { max-width: none; }
```

### PDF Assets

PSA PDFs live at `assets/files/PSA/<Category>/filename.pdf`. Current categories: `TechLiteracy/`, `PsychLiteracy/`. PSA front matter must use `pdf:` to point to the correct path.

### Brand Reference

The canonical brand file is at `/Users/apostolos/Desktop/Claude/Projects/Content/ouroboros-v5-design-system.html` (HTML/CSS). The scallop/arch SVG texture in `_base.scss` is derived from the TikZ `ouropattern` in that file.
