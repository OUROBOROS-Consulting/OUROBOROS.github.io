# OUROBOROS Consulting

[![Deploy Jekyll to GitHub Pages](https://github.com/OUROBOROS-Consulting/OUROBOROS.github.io/actions/workflows/jekyll-gh-pages.yml/badge.svg)](https://github.com/OUROBOROS-Consulting/OUROBOROS.github.io/actions/workflows/jekyll-gh-pages.yml)

**Dark editorial website. Jekyll. Static.**

[→ View Design System](https://astamenos.github.io/design-system)

---

## Architecture

Every layout descends from `default.html`. There is no `defaults:` block in `_config.yml`, so **each page declares its own `layout:` in front matter.** Nothing is inherited by directory.

```
default.html            HTML shell: fonts, nav-shell, left rail, footer, main.js
├── home.html           single-page landing
├── article.html        body-driven: progress bar → hero → {{ content }} → who → CTA
├── sections.html       front-matter-driven: hero → about → page.sections loop → links
├── service.html        service detail: hero → specializations → policies → included → pricing → CTA
├── announcement.html   single announcement
├── dashboard.html      auto-loads dashboard.css
└── psa.html            PDF embed via iframe
```

`article` vs `sections` is the only non-obvious choice. **`article` renders the Markdown body; `sections` ignores the body and renders the `sections:` list from front matter.** One continuous document is an `article`. Discrete blocks, often fed from `_data/`, are `sections`. Both were renamed on 2026-07-26 from `foundation` and `mission`, which named the first page that used them rather than the structure.

### Page → layout, complete

46 pages build. Sorted by layout, then URL. `archive/` and `docs/` are in `exclude:` and never build.

<details>
<summary><strong>default</strong> — 12 pages</summary>

| URL | Source |
|---|---|
| `/404.html` | `404.md` |
| `/about/` | `_about/about.html` |
| `/announcements/` | `announcements.html` |
| `/case-studies/` | `_about/case-studies.html` |
| `/intake.html` | `intake.html` |
| `/projects/` | `projects.html` |
| `/quiz/` | `quiz.html` |
| `/resources/` | `resources.html` |
| `/resources/psas/` | `psas.html` |
| `/resources/tutorials/` | `tutorials.html` |
| `/search/` | `search.html` |
| `/services/` | `services.html` |
| `/team/` | `_about/team.html` |

</details>

<details>
<summary><strong>article</strong> — 14 pages</summary>

| URL | Source |
|---|---|
| `/accessibility/` | `accessibility.md` |
| `/disclaimer/` | `disclaimer.md` |
| `/framework/` | `_about/framework.md` |
| `/privacy/` | `privacy.md` |
| `/resources/glossary/` | `_resources/glossary.md` |
| `/resources/tutorial-ai-algorithmic-decisions/` | `_resources/tutorials/tutorial-ai-algorithmic-decisions.md` |
| `/resources/tutorial-ai-deepfakes/` | `_resources/tutorials/tutorial-ai-deepfakes.md` |
| `/resources/tutorial-ai-surveillance/` | `_resources/tutorials/tutorial-ai-surveillance.md` |
| `/resources/tutorial-apple-security-audit/` | `_resources/tutorials/tutorial-apple-security-audit.md` |
| `/resources/tutorial-documenting-interactions/` | `_resources/tutorials/tutorial-documenting-interactions.md` |
| `/resources/tutorial-encrypted-communication/` | `_resources/tutorials/tutorial-encrypted-communication.md` |
| `/resources/tutorial-focus-modes/` | `_resources/tutorials/tutorial-focus-modes.md` |
| `/resources/tutorial-icloud-adp/` | `_resources/tutorials/tutorial-icloud-adp.md` |
| `/resources/tutorial-safety-plan/` | `_resources/tutorials/tutorial-safety-plan.md` |
| `/resources/tutorial-trauma-responses/` | `_resources/tutorials/tutorial-trauma-responses.md` |

</details>

<details>
<summary><strong>sections</strong> — 7 pages</summary>

| URL | Source |
|---|---|
| `/mission.html` | `_about/mission.md` |
| `/resources/scholarly/` | `_resources/scholarly.md` |
| `/resources/survival/` | `_resources/survival.md` |
| `/survival-guide.html` | `_about/survival.md` |
| `/work/cassandra/` | `_case_studies/cassandra.md` |
| `/work/claudius/` | `_case_studies/claudius.md` |
| `/work/sanctuary/` | `_case_studies/sanctuary.md` |

</details>

<details>
<summary><strong>service</strong> — 4 pages</summary>

| URL | Source |
|---|---|
| `/services/advocacy/` | `_services/advocacy.md` |
| `/services/design/` | `_services/design.md` |
| `/services/courses/` | `_services/courses.md` |
| `/services/technology/` | `_services/technology.md` |

</details>

<details>
<summary><strong>dashboard</strong> — 5 pages</summary>

| URL | Source |
|---|---|
| `/del-cmd-ctrl/` | `del-cmd-ctrl/index.html` |
| `/del-cmd-ctrl/advocate/` | `del-cmd-ctrl/advocate.html` |
| `/del-cmd-ctrl/institutional/` | `del-cmd-ctrl/institutional.html` |
| `/del-cmd-ctrl/policy/` | `del-cmd-ctrl/policy.html` |
| `/del-cmd-ctrl/survivor/` | `del-cmd-ctrl/survivor.html` |

</details>

<details>
<summary><strong>home</strong> — 1 page &nbsp;·&nbsp; <strong>announcement</strong> — 1 page &nbsp;·&nbsp; <strong>psa</strong> — 2 pages</summary>

| URL | Source | Layout |
|---|---|---|
| `/` | `index.md` | home |
| `/announcements/site-launch/` | `_announcements/site-launch.md` | announcement |
| `/resources/psas/ai-price/` | `_psas/ai-price.md` | psa |
| `/resources/psas/dark-data/` | `_psas/dark-data.md` | psa |
| — | `_psas/DSM.md` | psa ⚠ `published: false` |

</details>

### Collections

Declared in `_config.yml`. A collection sets the **URL**, never the layout.

| Collection | Source dir | Permalink | Items | Layouts used |
|---|---|---|---|---|
| `about` | `_about/` | `/:slug` | 5 | mixed: default, article, sections |
| `services` | `_services/` | `/services/:slug/` | 4 | service |
| `case_studies` | `_case_studies/` | `/work/:slug/` | 4 | sections |
| `resources` | `_resources/` | `/resources/:slug/` | 12 | article, sections |
| `announcements` | `_announcements/` | `/announcements/:slug/` | 1 | announcement |
| `psas` | `_psas/` | `/resources/psas/:slug/` | 3 (2 published) | psa |

Layout is chosen by **content shape**, not by collection: `default` for hub/listing pages, `article` for linear prose, `sections` for block-assembled pages. `_about/` mixes all three. Do not assume one layout per collection.

**Hub pages belong at repo root, not inside a collection.** `resources.html`, `psas.html`, and `services.html` all loop over or link into collections; they are not items in one. Keeping them out avoids permalink overrides that fight the collection pattern.

### Anomalies

**Extensionless URL forms.** `/intake.html`, `/mission.html`, and `/survival-guide.html` build as files, not directories, because their permalinks lack a trailing slash. Internal links use the extensionless form (`/intake` × 154, `/mission` × 48). GitHub Pages resolves these by appending `.html`, so they work, but they are inconsistent with the trailing-slash directories used everywhere else.

---

## Design System

### Colors

<details>
<summary>CSS custom properties in `_base.scss`</summary>

Defined in the design package, not here. `ouroboros-design/scss/_base.scss` is the single source of truth; this site must not redefine them.

- `--bg1: #0c101a` — page background
- `--bg-hero: #1e213e` — dark navy, homepage + service hero
- `--bg2: #1E1E1E` — card/surface
- `--bg3: #252525` — elevated surface
- `--gold: #C9A84C` — primary accent
- `--text: #E8E4DC` — body text
- `--subdued: #B0AAA0`, `--muted: #999999` — hierarchy
- `--steel: #7F94A6`, `--amethyst: #A284CA`, `--sage: #6DA187`, `--teal: #5DA19C` — semantic accents

Each accent also has `-dim` (alpha 0.35) and `-ghost` (alpha 0.12) variants. All four were raised on 2026-07-25 to clear WCAG 4.5:1; the prior values failed, `--teal` worst at 3.22:1. Keep at least 18° of hue separation between accents when adjusting, or teal and sage collapse into each other.

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
- `_cards.scss`, `_home.scss`, `_service.scss`, `_essay.scss`, `_cv.scss` — layouts

</details>

---

## Data Files

<details>
<summary>Show all data files</summary>

- `_data/nav.yml` — navigation structure
- `_data/values.yml`, `testimonials.yml` — home carousels
- `_data/tutorials.yml`, `reading.yml`, `listening.yml`, `playlists.yml` — personal pages
- `_data/survival*.yml` — survival guide resources (crisis, legal, mental health, whistleblower)

</details>

---

## Includes

<details>
<summary>Show all includes & dynamic scripts</summary>

- `nav.html` — hamburger + active link logic
- `footer.html` — site footer

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

- **Progress bar**: `#progress-bar` (gold) tracks scroll depth on all `article.html` pages
- **Social links**: `page.links:` front matter (github, linkedin, orcid, tutor, contact) → `.foundation-links` nav
- **Narrow text gotcha**: `_essay.scss` sets `.post-body { max-width: 680px }` — override with `.page-body .post-body { max-width: none }` if needed
- **PSA categories**: Front matter `section:` field (Technology, Psychopathology, etc.) groups PSAs in `psas.html`

</details>

---

> This repo is used for prototyping. Not soliciting via GitHub.
