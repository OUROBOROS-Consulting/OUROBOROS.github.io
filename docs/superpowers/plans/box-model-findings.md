# Box-Model Audit Findings

Static code audit — branch `feature/cleanup`. No DevTools; findings derived from reading layout HTML and SCSS partials.

## Global: No Violations in These Categories

- **Box-sizing:** Global reset in `_base.scss` (`*, *::before, *::after { box-sizing: border-box }`) covers all elements. Zero violations.
- **Double-spacing (flex/grid gap + child margin-top):** No flex/grid container found where a gap-receiving child also carries `margin-top`. All containers with `gap` either have children with no `margin-top`, or children with an explicit `margin-top: 0`.
- **Fixed widths without mobile breakpoints:** All fixed-column grids (`180px 1fr`, `200px 1fr`, `repeat(2,1fr)`) have responsive overrides at appropriate breakpoints.

## Findings Table

| Layout | Component | Class | Issue | SCSS File | Fix |
|--------|-----------|-------|-------|-----------|-----|
| home.html | Section headers | `.work-header`, `.testimonials-header`, `.about-header` | Asymmetric top/bottom padding (`4.5rem` top, `2.5rem` bottom) | `_home.scss` | Intentional — negative-margin bleed effect. Keep as-is. |
| home.html | All homepage sections | `#about`, `#values`, `#services`, `#work`, `#testimonials` | None — symmetric padding, mobile breakpoints present | `_home.scss` | No fix needed. |
| foundation.html | — | — | No violations found | — | None. |
| service.html | Hero text panel | `.svc-hero-text` | Asymmetric top/bottom padding (`2.5rem` top, `2rem` bottom) | `_service.scss` | Fix: `padding: 2.5rem` |
| service.html | Hero CTA panel | `.svc-hero-cta` | Asymmetric top/bottom padding (`1.5rem` top, `1.2rem` bottom) | `_service.scss` | Fix: `padding: 1.5rem` |
| service.html | Stacked section label | `.svc-section--stacked .svc-section-label` | Asymmetric top/bottom padding (`2.5rem` top, `1.75rem` bottom) | `_service.scss` | Intentional — negative-margin bleed effect. Keep as-is. |
| service.html | Pull quote | `.pull-quote` | Asymmetric top/bottom padding (`3.5rem` top, `4rem` bottom) | `_service.scss` | Fix: `padding: 3.5rem 0` |
| mission.html | — | — | Shares service.html hero + svc-section classes; same findings apply. No additional issues. | — | None beyond service.html fixes. |
| dashboard.html | Dashboard wrap | `.dashboard-wrap` | Asymmetric top/bottom padding (`10rem` top, `5rem` bottom). No mobile breakpoint. | `dashboard.scss` | Top offset is intentional nav-height compensation. Dashboard is a desktop tool. Keep as-is. |
| All layouts | Card component | `.card` | Asymmetric top/bottom padding (`2rem` top, `2.5rem` bottom) | `_cards.scss` | Fix: `padding: 2rem` |
| All layouts | Framework pillar | `.framework-pillar` | Asymmetric top/bottom padding (`1.75rem` top, `2rem` bottom) | `_framework.scss` | Fix: `padding: 1.75rem` |

## Summary

| Category | Count |
|----------|-------|
| True violations (fixed) | 5 |
| Intentional asymmetry (kept) | 3 |
| No violation found | All other elements |

## Applied Fixes

1. `_service.scss` — `.svc-hero-text`: `padding: 2.5rem 2.5rem 2rem` → `padding: 2.5rem`
2. `_service.scss` — `.svc-hero-cta`: `padding: 1.5rem 1.5rem 1.2rem` → `padding: 1.5rem`
3. `_service.scss` — `.pull-quote`: `padding: 3.5rem 0 4rem` → `padding: 3.5rem 0`
4. `_cards.scss` — `.card`: `padding: 2rem 2rem 2.5rem` → `padding: 2rem`
5. `_framework.scss` — `.framework-pillar`: `padding: 1.75rem 1.75rem 2rem` → `padding: 1.75rem`
