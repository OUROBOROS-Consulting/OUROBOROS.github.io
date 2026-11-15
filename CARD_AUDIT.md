# Card Component Audit & Standardization Plan

## Current State: Multiple Card Patterns

The site has **7+ distinct card patterns** with inconsistent structure, classes, and styling.

---

## Pattern Inventory

### 1. `c-card c-stack` — Stack Card (Non-interactive)
**Used in:** resume.html, home.html, content-card.html (variant="home")
**Structure:**
```html
<article class="c-card c-stack">
  <h3 class="authority c-card-title">Title</h3>
  <p class="technical text-t">Subtitle</p>
  <ul>...</ul>
</article>
```
**Issues:**
- Non-clickable (no `<a>` wrapper)
- Uses `authority` class for title (inconsistent with `rc-title`)
- Padding from `c-card` but no elevation
- Link at bottom (on home variant only)

---

### 2. `c-card c-card--related` — Related Card (Interactive)
**Used in:** resources.md, related-content.html
**Structure:**
```html
<a href="..." class="c-card c-card--related">
  <p class="rc-tag">Tag</p>
  <h3 class="rc-title">Title</h3>
  <p class="card-desc">Description</p>
  <span class="card-link">Link →</span>
</a>
```
**Issues:**
- Uses `rc-title` class (not `c-card-title`)
- No explicit footer alignment
- `card-desc` class (not in CSS component file)

---

### 3. `c-card c-card--framed` — Framed Card (Interactive)
**Used in:** content-card.html (default), case-studies.md, related-content.html
**Structure:**
```html
<a href="..." class="c-card c-card--framed">
  <p class="rc-tag">Tag</p>
  <h3 class="rc-title">Title</h3>
  <p class="card-desc">Description</p>
  <p class="rc-date">Date</p>
  <span class="card-link">Link →</span>
</a>
```
**Issues:**
- Uses `rc-title` instead of `c-card-title`
- Mix of `card-desc` and `rc-date` classes
- Inherits from `_sass/components/_card.scss` `.c-card--framed`

---

### 4. `c-card c-card--team` — Team Card
**Used in:** team.md
**Structure:**
```html
<li class="c-card c-card--team">
  <h2 class="team-name">Name</h2>
  <p class="team-role">Role</p>
  <ul class="team-creds">...</ul>
  <p class="team-bio">Bio</p>
  <span class="team-links">...</span>
</li>
```
**Issues:**
- Uses `h2` instead of `h3`
- Different class naming (`team-*` vs `c-*`)
- List item wrapper (not `<article>`)

---

### 5. `c-card--callout` — Callout Card
**Used in:** design-portfolio.html, services.md
**Structure:** (CSS only, HTML varies)
**Issues:**
- CSS defined but HTML structure not standardized
- Uses special tag/icon/title/body/link structure

---

### 6. `c-card c-card--formula` — Formula Card
**Used in:** design-system.html
**Issues:**
- Complex multi-line structure
- Different internal markup

---

### 7. `.values-card` — Flip Card (Interactive)
**Used in:** home.html (values section)
**Structure:**
```html
<div class="values-card">
  <div class="values-card__inner">
    <div class="values-card__surface">
      <span class="values-card__icon">Icon</span>
      <p class="values-card__name">Name</p>
      <p class="values-card__desc">Desc</p>
    </div>
  </div>
</div>
```
**Issues:**
- 3D flip animation
- Different class hierarchy
- Not in standard card grid

---

### 8. `.bib-card` — BibTeX Citation Card
**Used in:** bibliography pages
**Issues:**
- Different structure
- Special hover behavior

---

### 9. `.feed-item` — News Feed Item
**Used in:** news.md
**Structure:**
```html
<div class="feed-item">
  <p class="feed-date">Date</p>
  <p class="feed-title">Title</p>
  <p class="feed-outlet">Outlet</p>
  <p class="feed-summary">Summary</p>
</div>
```
**Issues:**
- Different class naming
- Feed-specific layout

---

## Key Inconsistencies

### 1. Title Classes
| Class | Files | Should Use |
|-------|-------|------------|
| `c-card-title` | resume.html, home.html, content-card.html (home) | ✓ Standard |
| `rc-title` | resources.md, related-content.html, content-card.html (default) | ✗ Inconsistent |

### 2. Description Classes
| Class | Files | Should Use |
|-------|-------|------------|
| `card-desc` | resources.md, content-card.html | ✗ Not in component CSS |
| `c-card--related__desc` | CSS only | ✓ Standardized |
| `.c-card--framed__desc` | CSS only | ✓ Standardized |

### 3. Link Classes
| Class | Files | Should Use |
|-------|-------|------------|
| `card-link` | resources.md, content-card.html | ✗ Not in component CSS |
| `.c-card--related__link` | CSS only | ✓ Standardized |

### 4. Tag Classes
| Class | Files | Should Use |
|-------|-------|------------|
| `rc-tag` | resources.md, related-content.html | ✓ OK for tag chips |
| `rc-tag-chip` | content-card.html | ✓ OK for chip variant |

### 5. Container Structure
- `c-card c-stack` — non-interactive, stacked content
- `<a class="c-card c-card--framed">` — interactive framed
- `<a class="c-card c-card--related">` — interactive related
- `<article class="c-card">` — non-interactive article

---

## Standardization Plan

### Goal: Single Source of Truth

All cards should use the CSS classes defined in `_sass/components/_card.scss`.

### Decision Matrix

| Use Case | Classes | Structure |
|----------|---------|-----------|
| **Interactive Card (Framed)** | `c-card c-card--framed` | `<a class="...">` |
| **Interactive Card (Related)** | `c-card c-card--related` | `<a class="...">` |
| **Non-Interactive Card** | `c-card c-stack` | `<article class="...">` |
| **Home Variant** | `c-card c-stack` | `<article class="...">` |

### Required Changes

#### 1. Standardize Title Class
Replace `rc-title` with `c-card-title` in:
- `_includes/content-card.html` line 21
- `_includes/related-content.html` line 14
- `pages/resources.md` (all 5 cards)
- `pages/psas.md` line 32

#### 2. Standardize Description Class
Replace `card-desc` with appropriate CSS class:
- For `c-card--related`: use `.c-card--related__desc`
- For `c-card--framed`: use `.c-card--framed__desc`
- For `c-stack`: use `.text-s` (existing)

#### 3. Standardize Link Class
Replace `card-link` with appropriate CSS class:
- For `c-card--related`: use `.c-card--related__link`
- For `c-card--framed`: use `.c-card--framed__link`
- For `c-stack`: use `.c-card-action` (existing)

#### 4. Standardize Tag Class
Replace `rc-tag` with `rc-tag` (keep for tag chips) or `rc-tag-chip`:
- Use `rc-tag-chip` for small pill-style tags
- Use `rc-tag` for larger tag labels

#### 5. Standardize Date Class
Use `.rc-date` consistently or define `.c-card--framed__date`

#### 6. Container Structure
- Interactive cards: `<a class="c-card c-card--framed">`
- Non-interactive: `<article class="c-card c-stack">`
- Team cards: `<li class="c-card c-card--team">` (keep separate)

---

## Implementation Order

1. **Update CSS** — Add missing classes to `_sass/components/_card.scss`
2. **Update includes** — `_includes/content-card.html`, `_includes/related-content.html`
3. **Update pages** — `resources.md`, `psas.md`, `team.md`, `case-studies.md`
4. **Update includes** — `_layouts/home.html`
5. **Rebuild** — `npm run build`
6. **Verify** — Check all pages for consistency

---

## Questions for Decision

1. **Should all interactive cards be clickable?** 
   - Current: `c-card--framed` and `c-card--related` are clickable
   - `c-card c-stack` is NOT clickable (except home variant)

2. **Should `c-stack` cards ever be clickable?**
   - Currently only home variant has a link
   - Resume cards should NOT be clickable

3. **Tag placement:**
   - Before title (current) or after title?
   - Pill style or inline?

4. **Link placement:**
   - Always at bottom (pushed by flex) or explicit footer?

5. **Date display:**
   - Show on all cards or specific types?
   - Format: `Month YYYY` vs `Month Day, YYYY`?

---

## Next Steps

1. Confirm decisions above
2. Update CSS with missing classes
3. Update includes
4. Update pages
5. Rebuild and verify
