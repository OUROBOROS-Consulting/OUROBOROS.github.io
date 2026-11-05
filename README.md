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
└── psa.html            PDF embed via iframe
```

`article` vs `sections` is the only non-obvious choice. **`article` renders the Markdown body; `sections` ignores the body and renders the `sections:` list from front matter.** One continuous document is an `article`. Discrete blocks, often fed from `_data/`, are `sections`. Both were renamed on 2026-07-26 from `foundation` and `mission`, which named the first page that used them rather than the structure.

### Page → layout, complete

43 HTML pages build. Sorted by layout, then URL. `docs/` is in `exclude:` and never builds.

Standalone pages live in two folders, not at the repo root: `pages/` for hub and index
pages, `legal/` for legal, contact and utility pages. The root contains `index.md` and
the company page, `about.md`. The folder names never appear in a URL: standalone pages
use explicit permalinks, while the homepage and the CRT demo keep their generated paths.

<details>
<summary><strong>default</strong> — 15 pages</summary>

| URL | Source |
|---|---|
| `/404.html` | `legal/404.md` |
| `/about/` | `about.md` |
| `/case-studies/` | `pages/case-studies.md` |
| `/design-portfolio/` | `pages/design-portfolio.html` |
| `/design-system/` | `pages/design-system.html` |
| `/intake/` | `pages/intake.html` |
| `/material/` | `pages/material.html` |
| `/projects/` | `pages/projects.md` |
| `/resources/` | `pages/resources.md` |
| `/resources/psas/` | `pages/psas.md` |
| `/resources/tutorials/` | `pages/tutorials.md` |
| `/resume/` | `pages/resume.html` |
| `/search/` | `legal/search.html` |
| `/services/` | `pages/services.md` |
| `/team/` | `pages/team.md` |

</details>

<details>
<summary><strong>article</strong> — 19 pages</summary>

| URL | Source |
|---|---|
| `/accessibility/` | `legal/accessibility.md` |
| `/consulting-faq/` | `pages/consulting-faq.md` |
| `/disclaimer/` | `legal/disclaimer.md` |
| `/faq/` | `legal/faq.md` |
| `/llm-disclosure/` | `legal/llm-disclosure.md` |
| `/news/` | `pages/news.md` |
| `/privacy/` | `legal/privacy.md` |
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
| `/services/design/` | `pages/design-services.md` |

</details>

<details>
<summary><strong>sections</strong> — 7 pages</summary>

| URL | Source |
|---|---|
| `/resources/scholarly/` | `pages/scholarly.md` |
| `/resources/survival/` | `pages/survival.md` |
| `/services/identity/` | `_services/identity.md` |
| `/services/technology/` | `_services/technology.md` |
| `/work/cassandra/` | `_case_studies/cassandra.md` |
| `/work/claudius/` | `_case_studies/claudius.md` |
| `/work/problematic-by-design/` | `_case_studies/problematic-by-design.md` |

</details>

<details>
<summary><strong>home</strong> — 1 page &nbsp;·&nbsp; <strong>standalone demo</strong> — 1 page</summary>

| URL | Source | Layout |
|---|---|---|
| `/` | `index.md` | home |
| `/pages/crt-test.html` | `pages/crt-test.html` | standalone HTML |

</details>

### Collections

Declared in `_config.yml`. A collection sets the **URL**, never the layout. The
three active collections are services, case studies, and resources.

| Collection | Source dir | Permalink | Items | Layouts used |
|---|---|---|---|---|
| `services` | `_services/` | `/services/:slug/` | 2 | sections |
| `case_studies` | `_case_studies/` | `/work/:slug/` | 3 | sections |
| `resources` | `_resources/` | `/resources/:slug/` | 11 | article |

Layout is chosen by **content shape**, not by collection: `default` for hub/listing pages, `article` for linear prose, and `sections` for block-assembled pages.

**Hub pages belong in `pages/`, not inside a collection.** The resources and services hubs live there. The PSA hub reads its three PDF records from `_data/psas.yml`; those PDFs are not a Jekyll collection.

Authored content pages use Markdown (`.md`), including pages that combine prose with Liquid and raw HTML. Keep `.html` for reusable Jekyll layouts/includes and standalone interface or demo pages that are authored as complete HTML documents.

---

## Design System

The design system is maintained in `_sass/design/`. Its single token entry point is
`_sass/design/_tokens.scss` (import it as `design/tokens`); it forwards the active
Material palette, typography, shape, and motion modules, site semantic tokens,
identity, and themes. Do not redeclare tokens elsewhere.

Jekyll resolves imports through `_sass`. `assets/css/main.scss` uses
`_sass/index.scss`, which composes the tokens with reusable styles from
`_sass/components/`. Smaller page-specific stylesheets can import `design/tokens`
directly. Keep page-specific geometry and image-backed styling in `assets/css/`.

`assets/css/` owns site-specific page geometry and styling for image assets stored
in `assets/images/`. Keep reusable design-system rules in `_sass/design/` and avoid
duplicating them in page stylesheets.

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
- **PSA categories**: Front matter `section:` field (Technology, Psychopathology, etc.) groups PSAs in `pages/psas.md`

</details>

---
