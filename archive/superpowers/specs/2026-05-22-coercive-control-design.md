# Coercive Control Dashboard — Port Design Spec

**Date:** 2026-05-22
**Source:** `Cmd-Ctrl/coercive-control-dashboard/` (5 HTML files + `data.json`)
**Target:** `OUROBOROS-Consulting.github.io` Jekyll site
**Approach:** Approach B — `del-cmd-ctrl/` directory of Jekyll pages

---

## Scope

Port all 4 audience modules + gate page into the OUROBOROS Jekyll site as native pages. Full JS interactivity preserved. No changes to the `ouroboros-design` npm package.

**Modules:**
- Gate/landing (`index.html`) — role selector
- Personal Safety (`survivor.html`) — noindex + exit bar, DV safety-critical
- Advocate Reference (`advocate.html`)
- Policy & Research (`policy.html`)
- Workplace & Whistleblower (`institutional.html`)

---

## Architecture

### File Structure

```
del-cmd-ctrl/
  index.html           layout: dashboard, permalink: /del-cmd-ctrl/
  survivor.html        layout: dashboard, noindex: true, exit_bar: true, permalink: /del-cmd-ctrl/survivor/
  advocate.html        layout: dashboard, permalink: /del-cmd-ctrl/advocate/
  policy.html          layout: dashboard, permalink: /del-cmd-ctrl/policy/
  institutional.html   layout: dashboard, permalink: /del-cmd-ctrl/institutional/

_layouts/
  dashboard.html       layout: default — renders exit-bar + .dashboard-wrap

assets/
  css/
    dashboard.scss     dashboard-only styles; uses OUROBOROS tokens only
  js/
    dashboard/
      data.json        copied from Cmd-Ctrl (state law data, 1289 lines)
      dashboard.js     shared: JSON fetch, state dropdown, table render, filter/search
      survivor.js      exit-bar Escape handler, safety JS
      advocate.js      advocate-specific filtering, quick-reference lookup
      policy.js        citation display, statute comparison
      institutional.js sidebar scroll-spy, section accordion

_data/
  nav.yml              + CMD/CTRL top-level entry
```

### Layout Chain

```
page (layout: dashboard)
  └─ dashboard.html (layout: default)
       ├─ #exit-bar   position: fixed; top: 0   rendered if page.exit_bar == true
       └─ .dashboard-wrap   margin-top: exit-bar height when present
            └─ {{ content }}
  └─ default.html
       ├─ <meta noindex>        if page.noindex == true   [1 line added]
       ├─ dashboard.css link    if page.layout == 'dashboard'  [1 line added]
       ├─ {% include nav.html %}
       └─ {% include footer.html %}
```

`#exit-bar` is rendered before `.dashboard-wrap` so it sits at viewport top independent of page content. `.dashboard-wrap` adds top padding equal to exit-bar height (`48px`) when `page.exit_bar` is true.

**Two lines added to `default.html`. No other existing file changes except `nav.yml`.**

---

## Visual Design

### Aesthetic

OUROBOROS design system tokens as base. Stripped to McKinsey-clean: no scallop texture on interactive content areas, generous whitespace, type-led hierarchy. Fewer decorative elements than the rest of the site.

**Texture rule:** Scallop background renders on the page body (from `default.html`'s `body::before`) but all module content panels sit flat on `--bg2`. No elevation mixins inside `.dashboard-wrap` content areas.

### Token Mapping (Cmd-Ctrl → OUROBOROS)

| Cmd-Ctrl | OUROBOROS token | Usage |
|---|---|---|
| `--bg-void`, `--bg-base` | `var(--bg1)` | Page background |
| `--bg-surface` | `var(--bg2)` | Cards, panels |
| `--bg-raised` | `var(--bg3)` | Elevated surfaces |
| `--gold-mid` | `var(--gold)` | Accent, CTAs (same hex: `#c9a84c`) |
| `--text-1` | `var(--text)` | Body copy |
| `--text-2` | `var(--subdued)` | Secondary labels |
| `--text-3` | `var(--muted)` | Tertiary, captions |
| `--none-fg` (red) | `#c0392b` (dashboard-local) | Survivor danger status only |
| `--ok-fg`, `--warn-fg`, `--pend-fg` | dashboard-local status tokens | Law status indicators |

### Per-Module Accent

| Module | Accent token | Usage |
|---|---|---|
| Gate/index | `var(--gold)` | Section headers, hover states |
| Survivor | `#c0392b` | Danger status, active state |
| Advocate | `var(--sage)` | Section headers, active state |
| Policy | `var(--amethyst)` | Section headers, active state |
| Institutional | `var(--steel)` | Section headers, active state |

### Typography

- Headings: Lora (matches OUROBOROS body)
- UI labels, table headers, nav: Inter
- Law citations, statute references: JetBrains Mono
- No new font imports needed

---

## Gate Page Structure

```
.dashboard-gate
  .gate-header
    eyebrow:  "Legal Reference Dashboard"
    h1:       "Coercive Control"
    lede:     one-sentence description
  .gate-grid   (2×2 card grid)
    .gate-card [module accent border-left]  → /del-cmd-ctrl/survivor/
    .gate-card  → /del-cmd-ctrl/advocate/
    .gate-card  → /del-cmd-ctrl/policy/
    .gate-card  → /del-cmd-ctrl/institutional/
  .gate-footer
    "No tracking · No account · No cookies"
```

Survivor card: `#c0392b` left border to visually distinguish it as a safety tool. Other 3 cards are visually uniform. No icons — role title + one-sentence description only.

---

## JavaScript Architecture

### Script Loading Per Module

Each module page loads:
1. `/assets/js/dashboard/dashboard.js` — shared utilities
2. `/assets/js/dashboard/<module>.js` — module-specific logic

No cross-module script dependencies. Plain ES6, no build step. Loaded via `<script defer>` in `dashboard.html`.

### Shared (`dashboard.js`)

- `fetchData()` — fetches `/assets/js/dashboard/data.json`
- `populateStateDropdown(selectEl, data)` — fills state selector
- `renderTable(containerEl, rows, columns)` — generic table renderer
- `attachSearch(inputEl, tableEl)` — live filter
- `attachTabNav(navEl)` — tab switching logic

### Module Scripts

| Script | Responsibilities |
|---|---|
| `survivor.js` | `Escape` key → `window.location = 'https://weather.com'`; clears history via `window.location.replace`; initializes state lookup for recording laws |
| `advocate.js` | Advocate quick-reference filtering; coercive control statute lookup |
| `policy.js` | Research citation renderer; statute comparison table |
| `institutional.js` | Sidebar scroll-spy; section accordion; whistleblower resource lookup |

### Data Path

All JS references to `data.json` use absolute path: `/assets/js/dashboard/data.json`. No relative paths.

---

## DV Safety Requirements (Non-Negotiable)

These must be preserved exactly from the original:

1. **`noindex: true`** on `survivor.html` front matter — renders `<meta name="robots" content="noindex,nofollow">` in `<head>`. Prevents search engine indexing.
2. **Exit bar** — fixed position at top of viewport on survivor module. "Exit Site" button redirects to `https://weather.com` and clears browser history entry.
3. **Escape key handler** — same redirect as exit button.
4. **No survivor URL in nav children** — the CMD/CTRL nav entry links to `/del-cmd-ctrl/` (gate only). Survivor URL is not listed anywhere in nav or footer.

---

## Navigation

Add to `_data/nav.yml` (top-level, no children):

```yaml
- title: CMD/CTRL
  url: /del-cmd-ctrl/
```

Placement: after existing top-level entries (Services, Resources, About).

---

## What Is Not Changing

- `ouroboros-design/` npm package — untouched
- All existing layouts (`default.html` except 2 lines, `foundation.html`, `mission.html`, etc.)
- All existing collections and pages
- `assets/css/main.scss` — dashboard styles are in a separate `dashboard.scss`
- No new Jekyll collections — `del-cmd-ctrl/` is a plain directory of pages
