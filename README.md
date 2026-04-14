# OUROBOROS Consulting

**Dark editorial website. Jekyll. Static.**

[→ View Design System](https://astamenos.github.io/design-system)

---

## Architecture

<details>
<summary>Show all</summary>

**Entry**: `default.html` — fonts, nav, footer, main.js orchestration.

**Layouts** (`_layouts/`):

- `home.html` — landing (hero, stats, values, services, work, testimonials)
- `foundation.html` — dual-mode multi-section pages
  - **Mission mode**: hero → about → pull_quote → rich sections (bibtex, playlists, data)
  - **Service/prose mode**: markdown content + hex-portrait headshot + CTA
- `essays.html`, `psa.html`, `blog.html`, `linkedin.html` — specialized reading layouts

**Collections** (`_config.yml`):

- `_services/` → `/services/:slug/`
- `_essays/` → `/essays/:slug/`
- `_projects/`, `_case_studies/` → `/projects/:slug/`, `/work/:slug/`
- `_psas/` → `/work/psas/:slug/` (grouped by `section:` front matter)
- `_resources/`, `_notes/`, `_linkedin/` → `/resources/:slug/`, `/notes/:slug/`, `/posts/:year/:slug/`

</details>

---

## Design System

### Colors

<details>
<summary>CSS custom properties in `_base.scss`</summary>

- `--bg1: #141414` — page background
- `--bg2: #1E1E1E` — card/surface
- `--bg3: #252525` — elevated surface
- `--gold: #C9A84C` — primary accent
- `--text: #E8E4DC` — body text
- `--subdued: #B0AAA0`, `--muted: #999999` — hierarchy
- `--steel: #7B8FA1`, `--amethyst: #967ABB`, `--sage: #6A8E7F`, `--teal: #4a6b5f` — semantic colors

</details>

### Texture & Elevation

<details>
<summary>Scallop patterns & elevation mixins in `_base.scss`</summary>

- `@include scallop-*` (recessed/standard/elevated) — scallop SVG pattern + opacity tier
- `@include elevation-*` — background + scallop
- `body::before` — fixed scallop-recessed background
- `body::after` — cursor spotlight (teal radial gradient, `--cx/--cy` tracked by `main.js`)

</details>

### Typography

Lora (serif), Inter (sans), JetBrains Mono (monospace) via Google Fonts + Font Awesome 6.5.

### SCSS

<details>
<summary>Partials imported by `assets/css/main.scss`</summary>

- `_base.scss` — reset, tokens, texture, 404
- `_typography.scss` — prose scale
- `_buttons.scss`, `_nav.scss`, `_footer.scss` — components
- `_cards.scss`, `_home.scss`, `_service.scss`, `_essay.scss`, `_linkedin.scss`, `_cv.scss`, `_timeline.scss` — layouts

</details>

---

## Data Files

<details>
<summary>Show all data files</summary>

- `_data/nav.yml` — navigation structure
- `_data/values.yml`, `testimonials.yml` — home carousels
- `_data/timeline.yml`, `projects.yml` — structured project data
- `_data/tutorials.yml`, `reading.yml`, `listening.yml`, `playlists.yml` — personal pages
- `_data/survival*.yml` — survival guide resources (crisis, legal, mental health, whistleblower)

</details>

---

## Includes

<details>
<summary>Show all includes & dynamic scripts</summary>

- `nav.html` — hamburger + active link logic
- `footer.html` — site footer
- `timeline.html` — timeline component
- `framed.html` — generic framed block
- `campaign.html` — CTA section
- `linkedinbadge.html` — LinkedIn embed

**Dynamic scripts** (lazy-loaded):

- `bibtex.js` — when `bibtex_src:` present
- `playlist-carousel.js` — when `playlist_carousel: true` (uses `data-src` → `src` swap)

</details>

---

## Build & Deploy

<details>
<summary>Show build commands & deployment info</summary>

```bash
# Local preview (Ruby + Bundler required)
bundle exec jekyll serve --livereload

# Production build
bundle exec jekyll build

# With drafts
bundle exec jekyll serve --drafts
```

**Deployment**: GitHub Actions (`.github/workflows/jekyll-gh-pages.yml`) auto-builds + publishes on push to `main`.

</details>

---

## Key Patterns

<details>
<summary>Show all patterns</summary>

- **Progress bar**: `#progress-bar` (gold) tracks scroll depth on all `foundation.html` pages
- **Social links**: `page.links:` front matter (github, linkedin, orcid, tutor, contact) → `.foundation-links` nav
- **Narrow text gotcha**: `_essay.scss` sets `.post-body { max-width: 680px }` — override with `.svc-body .post-body { max-width: none }` if needed
- **PSA categories**: Front matter `section:` field (Technology, Psychopathology, etc.) groups PSAs in `psas.html`

</details>

---

> This repo is used for prototyping. Not soliciting via GitHub.
