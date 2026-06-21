# SCSS Refactor: Stop the Drift
**Date:** 2026-06-21
**Branch:** `feature/cleanup`
**Scope:** Approach A — no class renames, no HTML changes

---

## Problem Statement

Three structural problems cause maintenance friction:

1. **Split-brain duplicates.** `main.scss` redefines `.footer-links`, `.footer-logo`, `.values-grid`, etc., which already exist in `ouroboros-design`. Two sources of truth for the same class → unpredictable cascade.
2. **Orphan classes.** ~35 class names appear in templates with no SCSS definition (silent unstyled elements).
3. **nav.scss monolith.** At 925 lines, `_nav.scss` is 18% of all SCSS. Primary nav and secondary nav are unrelated concerns.

---

## Out of Scope

- Class renames (including `rc-` → `related-*`)
- Template/HTML changes
- Stylelint enforcement (deferred to a follow-up PR)
- Any visual changes

---

## 1. Nav File Split

Split `ouroboros-design/scss/_nav.scss` into two files.

**`_nav-primary.scss`** — desktop primary nav:
- `.nav-shell`, `.nav-logo`, `.nav-logo-mark`, `.nav-logo-text`, `.nav-logo-sub`
- `.nav-links`, `.nav-dropdown`, `.nav-dropdown-menu`, `.nav-dropdown-toggle`
- `.nav-card`, `.nav-card__interior`
- `.nav-contact`, `.nav-buttons`, `.nav-btn-label`
- `.nav-toggle`, `.nav-search-wrap`, `.nav-search__input`, `.nav-search__submit`
- `.page-title-banner`, `.page-title-banner__eyebrow`, `.page-title-banner__title`

**`_nav-secondary.scss`** — section tabs and mobile:
- `.nav-secondary`, `.nav-sec-item`, `.nav-sec-card`, `.nav-sec-chevron`
- `.nav-sec-dropdown`, `.nav-sec-dropdown-menu`, `.nav-sec-child-item`, `.nav-sec-child-card`
- `.nav-accordion-btn`
- `.nav-hamburger` (currently in `main.scss` — moves here)
- Mobile responsive overrides for secondary nav

**`index.scss` change:**
```scss
// Before
@forward "nav";

// After
@forward "nav-primary";
@forward "nav-secondary";
```

---

## 2. `main.scss` Cleanup

### Delete (duplicates already in ouroboros-design)
| Class | Already defined in |
|-------|--------------------|
| `.footer-container` | `_footer.scss` |
| `.footer-logo` | `_footer.scss` |
| `.footer-links` | `_footer.scss` |
| `.footer-logo-text` (font rule) | `_footer.scss` |
| `.values-grid` | `_home.scss` |

### Move to ouroboros-design
| Class | Destination |
|-------|-------------|
| `.nav-logo-text` EB Garamond rule | `_nav-primary.scss` |
| `.nav-links a` Cormorant SC rule | `_nav-primary.scss` |
| `nav.nav-menu .nav-dropdown.nav-button .nav-card` border rule | `_nav-primary.scss` |
| `.nav-contact` (hexagon shape + hover) | `_nav-primary.scss` |
| `.nav-hamburger` (full block) | `_nav-secondary.scss` |
| `@media (max-width: 768px)` secondary nav toggle | `_nav-secondary.scss` |
| `#hero .hero-name-sub`, `#hero .hero-text` | `_home.scss` |
| `.hero-name` font rule | `_home.scss` |
| `#audience`, `.audience-grid`, `.audience-card` | `_home.scss` |

### Stays in `main.scss`
- `@use "@ouroboros-consulting/ouroboros-design/scss/index" as *`
- `.safety-exit` (site-specific sensitive functionality)
- `@media (prefers-color-scheme: light)` overrides (site-specific opinion about dark nav/footer)

---

## 3. Orphan Class Definitions

Add SCSS for classes that exist in HTML but have no styles. No visual changes — fill in structural rules that should exist.

| Class | File | What to define |
|-------|------|----------------|
| `footer-social`, `footer-label` | `_footer.scss` | Social icon cluster and label text |
| `values-card__back`, `values-card__front`, `values-card__inner`, `values-card__icon`, `values-card__name`, `values-card__desc`, `values-card__surface` | `_home.scss` | Flip card internals (structural only — no animation if none exists) |
| `hob-corner--tl`, `--tr`, `--bl`, `--br` | `_base.scss` | Directional variants for existing `.hob-corner` |
| `hob-strip--top`, `--bottom`, `--left`, `--right` | `_base.scss` | Directional variants for existing `.hob-strip` |
| `foundation-links` | `_framework.scss` | Link row on foundation layout pages |
| `testimonials-context` | `_home.scss` | Supporting text/label in testimonials block |
| `btn--ghost` | `_buttons.scss` | Ghost button variant (transparent bg, border only) |
| `svc-section--cta` | `_service.scss` | CTA section modifier (likely already has styles via base `.svc-section`) |
| `exit-bar__btn`, `exit-bar__label` | `_framework.scss` or `main.scss` | Exit bar button parts |

---

## 4. Naming Convention (documented, not enforced)

Add a comment block to the top of `ouroboros-design/scss/index.scss`:

```scss
// ── Naming convention ────────────────────────────────────────────────
//  <prefix>-<element>          svc-hero, nav-card, post-body
//  <prefix>-<element>--mod     svc-hero--single, nav-card--active
//
//  Prefix = page/layout namespace (svc, nav, hero, post, values, etc.)
//  No new __ BEM elements. Existing card--formula__interior is legacy.
//  Modifiers: --double-dash only.
//  All classes: lowercase kebab. No camelCase, no underscores.
// ────────────────────────────────────────────────────────────────────
```

---

## Success Criteria

- `main.scss` contains ≤ 3 sections: `@use`, `.safety-exit`, light-mode overrides
- No class defined in both `main.scss` and `ouroboros-design`
- Every class used in a layout/include has a corresponding SCSS definition
- `_nav.scss` deleted; `_nav-primary.scss` and `_nav-secondary.scss` exist
- Site builds and renders identically before and after (`npm run build` passes)

---

## Build + Verify Sequence

```
1. Edit ouroboros-design SCSS
2. cd ouroboros-design && npm run build
3. cd ../OUROBOROS-Consulting.github.io && npm install && npm run dev
4. Visual check: home, a service page, a mission/case-study page, resources
5. Check mobile nav hamburger and secondary nav
```
