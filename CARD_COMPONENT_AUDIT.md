# Card Component Audit & Standardization Report

**Date:** November 14, 2026  
**Author:** Automated Audit  
**Scope:** All card components in OUROBOROS-Consulting.github.io  
**Status:** Complete Analysis

---

## Executive Summary

The site uses **8 distinct card patterns** with inconsistent structure, class naming, and styling approaches. This audit identifies all inconsistencies, proposes a standardized card architecture, and provides actionable before/after examples.

### Key Findings

| Category | Count | Status |
|----------|-------|--------|
| Card CSS Classes | 8 | ✅ Standardized in `_sass/components/_card.scss` |
| HTML Implementations | 12+ files | ⚠️ Inconsistent usage |
| Missing CSS Classes | 3 | 🔴 Need addition |
| Inconsistent Class Naming | 7 instances | 🔴 Need refactoring |

---

## 1. Card Pattern Inventory

### 1.1 Base Card (`.c-card`)
**File:** `_sass/components/_card.scss` lines 5-37

**Structure:**
```scss
.c-card {
  display: flex;
  flex-direction: column;
  padding: var(--site-card-padding-compact);
  border-radius: var(--site-card-radius);
  background-color: var(--site-card-surface);
  color: var(--p-color-ink-palantir-light);
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  transition: background-color var(--site-motion-interaction-duration) var(--site-motion-easing-standard),
              border-color var(--site-motion-interaction-duration) var(--site-motion-easing-standard);
  
  &--elevated { box-shadow: var(--site-card-elevation); }
  &--subtle { border: none; }
  
  &__header { margin-bottom: var(--md-sys-spacing-md); }
  &__body { flex-grow: 1; }
  &__footer { margin-top: auto; padding-top: var(--md-sys-spacing-md); }
}
```

**Used in:** General card container (line 5)

---

### 1.2 Card Title & Value (`.c-card-title`, `.c-card-value`)
**File:** `_sass/components/_card.scss` lines 39-50

**Structure:**
```scss
.c-card-title {
  margin: 0;
  font-size: var(--site-card-title-size);
  line-height: var(--site-card-title-line-height);
}

.c-card-value {
  font-family: var(--font-mono);
  font-size: var(--site-stat-value-size);
  font-variant-numeric: tabular-nums;
}

.c-card-action {
  margin-top: auto;
}
```

**Used in:** resume.html (lines 28, 46, 50, 55, 66), home.html (lines 35, 40, 45)

---

### 1.3 Citation Card (`.c-card--citation`)
**File:** `_sass/components/_card.scss` lines 92-100

**Structure:**
```scss
.c-card--citation {
  min-width: 0;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  background-color: var(--site-card-surface);
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-sm);
}
```

**Used in:** `_layouts/sections.html` line 188

---

### 1.4 Team Card (`.c-card--team`)
**File:** `_sass/components/_card.scss` lines 102-131

**Structure:**
```scss
.c-card--team {
  min-width: 0;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  background-color: var(--site-card-surface);
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-md);
  
  &__header { margin-bottom: var(--md-sys-spacing-md); }
  &__bio { flex-grow: 1; }
  &__footer { margin-top: auto; padding-top: var(--md-sys-spacing-md); }
  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--md-sys-spacing-sm);
    margin-top: auto;
    padding-top: var(--md-sys-spacing-md);
  }
}
```

**Used in:** `pages/team.md` line 21

**Related classes (lines 370-408):**
```scss
.team-role {
  margin: 0;
  color: var(--md-sys-color-primary);
  font-size: var(--md-sys-typescale-label-medium-size);
}

.team-name {
  margin: 0;
  color: var(--md-sys-color-on-surface);
  font-family: var(--font-serif);
  font-size: var(--site-card-title-size);
  line-height: var(--site-card-title-line-height);
}

.team-creds {
  display: flex;
  flex-wrap: wrap;
  gap: var(--md-sys-spacing-xs) var(--md-sys-spacing-sm);
  margin: 0;
  padding: 0;
  list-style: none;
}

.team-bio p { margin: 0; }

.team-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--md-sys-spacing-sm);
  margin-top: auto;
  padding-top: var(--md-sys-spacing-md);
}

.team-link { color: var(--md-sys-color-primary); }
```

**Used in:** `pages/team.md` lines 27-42

---

### 1.5 Formula Card (`.c-card--formula`)
**File:** `_sass/components/_card.scss` lines 133-177  
**Also defined in:** `_sass/components/_card-formula.scss` lines 1-60

**Structure:**
```scss
.c-card--formula {
  min-width: 0;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  background-color: var(--site-card-surface);
  padding: var(--site-card-padding-comfortable);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-md);
  
  &__interior {
    display: flex;
    flex-direction: column;
    gap: var(--md-sys-spacing-md);
  }
  
  &__item {
    display: flex;
    align-items: baseline;
    gap: var(--md-sys-spacing-sm);
  }
  
  &__marker {
    color: var(--md-sys-color-primary);
    font-size: var(--md-sys-typescale-body-medium-size);
  }
  
  &__content {
    display: flex;
    flex-direction: column;
  }
  
  &__title {
    margin: 0;
    font-weight: var(--md-ref-typeface-weight-semibold);
    color: var(--md-sys-color-on-surface);
  }
  
  &__desc {
    margin: 0;
    color: var(--md-sys-color-on-surface-variant);
    font-size: var(--md-sys-typescale-body-small-size);
  }
}
```

**Used in:**
- `_layouts/sections.html` line 141 (playlist card)
- `_layouts/sections.html` line 230 (default card body)
- `pages/design-system.html` (specimen formulas)

---

### 1.6 Framed Card (`.c-card--framed`)
**File:** `_sass/components/_card.scss` lines 183-227

**Structure:**
```scss
.c-card--framed {
  min-width: 0;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  background-color: var(--site-card-surface);
  padding: var(--site-card-padding-comfortable);
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-md);
  
  &__tag {
    color: var(--md-sys-color-primary);
    font-family: var(--font-mono);
    font-size: var(--md-sys-typescale-label-small-size);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0;
  }
  
  &__title {
    margin: var(--md-sys-spacing-sm) 0;
    color: var(--md-sys-color-on-surface);
    font-family: var(--font-serif);
    font-size: var(--site-card-title-size);
    line-height: var(--site-card-title-line-height);
  }
  
  &__desc {
    color: var(--md-sys-color-on-surface-variant);
  }
  
  &__link {
    display: inline-flex;
    align-items: center;
    gap: var(--md-sys-spacing-xs);
    margin-top: auto;
    padding-top: var(--md-sys-spacing-md);
    color: var(--md-sys-color-primary);
    font-family: var(--font-mono);
    font-size: var(--md-sys-typescale-label-small-size);
    font-weight: var(--md-ref-typeface-weight-semibold);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
}
```

**Used in:**
- `_includes/content-card.html` line 18 (default variant)
- `_includes/related-content.html` line 12
- `pages/case-studies.md` line 24
- `_layouts/sections.html` (data_source grid)

---

### 1.7 Callout Card (`.c-card--callout`)
**File:** `_sass/components/_card.scss` lines 229-285

**Structure:**
```scss
.c-card--callout {
  min-width: 0;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  background-color: var(--site-card-surface);
  padding: var(--site-card-padding-comfortable);
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-md);
  
  &__tag {
    color: var(--md-sys-color-primary);
    font-weight: var(--md-ref-typeface-weight-semibold);
  }
  
  &__interior {
    display: flex;
    flex-direction: column;
    gap: var(--md-sys-spacing-md);
  }
  
  &__icon {
    color: var(--md-sys-color-primary);
    font-size: var(--site-card-icon-size);
    
    img {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
  
  &__title {
    margin: var(--md-sys-spacing-sm) 0;
    color: var(--md-sys-color-on-surface);
    font-family: var(--font-serif);
  }
  
  &__body,
  &__desc {
    color: var(--md-sys-color-on-surface-variant);
  }
  
  &__link {
    display: inline-flex;
    align-items: center;
    gap: var(--md-sys-spacing-xs);
    margin-top: auto;
    padding-top: var(--md-sys-spacing-md);
    color: var(--md-sys-color-primary);
    font-family: var(--font-mono);
    font-size: var(--md-sys-typescale-label-small-size);
    font-weight: var(--md-ref-typeface-weight-semibold);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
}
```

**Used in:** design-portfolio.html, services.md (CSS defined but HTML varies)

---

### 1.8 Related Card (`.c-card--related`)
**File:** `_sass/components/_card.scss` lines 287-331

**Structure:**
```scss
.c-card--related {
  min-width: 0;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  background-color: var(--site-card-surface);
  padding: var(--site-card-padding-comfortable);
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-md);
  
  &__tag {
    color: var(--md-sys-color-primary);
    font-family: var(--font-mono);
    font-size: var(--md-sys-typescale-label-small-size);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0;
  }
  
  &__title {
    margin: var(--md-sys-spacing-sm) 0;
    color: var(--md-sys-color-on-surface);
    font-family: var(--font-serif);
    font-size: var(--site-card-title-size);
    line-height: var(--site-card-title-line-height);
  }
  
  &__desc {
    color: var(--md-sys-color-on-surface-variant);
  }
  
  &__link {
    display: inline-flex;
    align-items: center;
    gap: var(--md-sys-spacing-xs);
    margin-top: auto;
    padding-top: var(--md-sys-spacing-md);
    color: var(--md-sys-color-primary);
    font-family: var(--font-mono);
    font-size: var(--md-sys-typescale-label-small-size);
    font-weight: var(--md-ref-typeface-weight-semibold);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
}
```

**Used in:**
- `pages/psas.md` line 30
- `pages/services.md` line 24 (via content-card.html)

---

### 1.9 BibTeX Card (`.bib-card`)
**File:** `_sass/components/_card.scss` lines 333-368

**Structure:**
```scss
.bib-card {
  min-width: 0;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  border-radius: var(--site-card-radius);
  background-color: var(--site-card-surface);
  color: var(--p-color-ink-palantir-light);
  padding: var(--site-card-padding-compact);
  transition: background-color var(--site-motion-interaction-duration) var(--site-motion-easing-standard),
              border-color var(--site-motion-interaction-duration) var(--site-motion-easing-standard);
  
  &:is(a[href], [role="button"]):hover {
    transform: translateY(calc(-1 * var(--site-card-hover-distance)));
    border-color: var(--p-color-ink-palantir-light);
  }
  
  .bib-title {
    color: var(--md-sys-color-on-surface);
    font-size: var(--md-sys-typescale-title-medium-size);
    font-weight: var(--md-ref-typeface-weight-semibold);
  }
  
  .bib-byline,
  .bib-venue {
    color: var(--md-sys-color-on-surface-variant);
    margin: 0;
  }
  
  .bib-link {
    align-self: flex-start;
    margin-top: auto;
    padding-top: var(--md-sys-spacing-md);
    color: var(--md-sys-color-primary);
  }
}
```

**Used in:** `_layouts/sections.html` line 188 (data_source grid)

---

### 1.10 Flip Card (`.values-card`)
**File:** `_sass/components/_card.scss` lines 410-478

**Structure:**
```scss
.values-card {
  min-width: 0;
  height: var(--site-card-flip-height);
  perspective: var(--site-card-flip-perspective);
  cursor: pointer;
  
  &:hover .values-card__inner {
    transform: rotateY(180deg);
  }
  
  &__inner {
    position: relative;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform var(--site-card-flip-duration) var(--site-motion-easing-standard);
  }
  
  &.is-flipped &__inner {
    transform: rotateY(180deg);
  }
  
  &__surface {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--md-sys-spacing-md);
    min-height: var(--site-card-flip-height);
    height: 100%;
    padding: var(--md-sys-spacing-lg);
    border: var(--site-border-width) solid var(--md-sys-color-outline);
    border-radius: var(--site-card-radius);
    background-color: var(--site-card-surface);
    color: var(--p-color-ink-palantir-light);
  }
  
  &__front,
  &__back {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
  }
  
  &__back {
    transform: rotateY(180deg);
  }
  
  &__icon {
    font-size: var(--site-card-icon-size);
    
    &--gold {
      color: var(--md-sys-color-primary);
    }
  }
  
  &__name {
    color: var(--md-sys-color-on-surface);
    font-family: var(--font-serif);
    font-size: var(--site-card-title-size);
    text-align: center;
  }
  
  &__desc {
    margin: 0;
    color: var(--p-color-ink-palantir-light);
    text-align: center;
  }
}
```

**Used in:**
- `_layouts/home.html` lines 64-79 (audience section)

---

### 1.11 Feed Item (`.feed-item`)
**File:** `_sass/components/_card.scss` lines 480-531

**Structure:**
```scss
.feed-item {
  min-width: 0;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  border-radius: var(--site-card-radius);
  background-color: var(--site-card-surface);
  color: var(--p-color-ink-palantir-light);
  padding: var(--site-card-padding-compact);
  display: flex;
  flex-direction: column;
  transition: background-color var(--site-motion-interaction-duration) var(--site-motion-easing-standard),
              border-color var(--site-motion-interaction-duration) var(--site-motion-easing-standard);
  
  &:is(a[href], [role="button"]):hover {
    transform: translateY(calc(-1 * var(--site-card-hover-distance)));
    border-color: var(--p-color-ink-palantir-light);
  }
  
  .feed-date {
    margin: 0 0 var(--md-sys-spacing-xs) 0;
    font-size: var(--md-sys-typescale-label-small-size);
    color: var(--md-sys-color-on-surface-variant);
  }
  
  .feed-text {
    display: flex;
    flex-direction: column;
    gap: var(--md-sys-spacing-xs);
  }
  
  .feed-title {
    margin: 0;
    font-size: var(--md-sys-typescale-title-medium-size);
    font-weight: var(--md-ref-typeface-weight-semibold);
    color: var(--md-sys-color-on-surface);
    line-height: var(--site-card-title-line-height);
  }
  
  .feed-outlet {
    margin: 0;
    font-size: var(--md-sys-typescale-label-small-size);
    color: var(--md-sys-color-primary);
    font-family: var(--font-mono);
  }
  
  .feed-summary {
    margin: 0;
    color: var(--md-sys-color-on-surface-variant);
    font-size: var(--md-sys-typescale-body-medium-size);
  }
}
```

**Used in:** News feed items (CSS only, no HTML implementation found)

---

### 1.12 Service Cards (`.service-card`)
**File:** `pages/intake.html` lines 52-77 (HTML only, no CSS class)

**Structure:**
```html
<div class="service-cards">
  <label class="service-card">
    <input type="radio" name="service_type" value="technology" required>
    <span class="service-card-inner">
      <span class="service-card-index technical">01 / Technology</span>
      <span class="service-card-title">Private AI &amp; data</span>
      <span class="service-card-desc">AI privacy, locally hosted workflows...</span>
    </span>
  </label>
</div>
```

**Status:** ❌ **NO CSS DEFINED** - Requires new CSS class creation

---

### 1.13 Hex Portrait (`.hex-portrait`)
**File:** `_sass/components/_card.scss` lines 76-90

**Structure:**
```scss
.hex-portrait {
  box-sizing: border-box;
  width: min(100%, 18rem);
  aspect-ratio: 5 / 6;
  margin-inline: auto;
  overflow: hidden;
  
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

**Used in:** `pages/team.md` lines 22-25

---

## 2. Key Inconsistencies Identified

### 2.1 Title Class Inconsistency

| File | Line | Current Class | Should Use |
|------|------|---------------|------------|
| `_includes/content-card.html` | 21 | `rc-title` | `c-card-title` |
| `pages/psas.md` | 32 | `c-card-title` | ✅ Correct |
| `_includes/related-content.html` | 14 | `c-card-title` | ✅ Correct |

**Impact:** Inconsistent title styling across card types

---

### 2.2 Description Class Inconsistency

| File | Line | Current Class | Should Use |
|------|------|---------------|------------|
| `pages/psas.md` | 33 | `card-desc` | `.c-card--related__desc` |
| `_includes/content-card.html` | 10, 23 | `text-s` | `.c-card--related__desc` (for offer variant) |
| `_includes/content-card.html` | 26 | `text-s` | `.c-card--framed__desc` (for default variant) |

**Impact:** Description styling varies by file, not CSS token

---

### 2.3 Link Class Inconsistency

| File | Line | Current Class | Should Use |
|------|------|---------------|------------|
| `pages/psas.md` | 34 | `card-link` | `.c-card--related__link` |
| `_includes/content-card.html` | 15 | `c-card-action` | ✅ Correct (for stack variant) |
| `_includes/content-card.html` | 34 | `card-link` | `.c-card--framed__link` |

**Impact:** Link styling not consistent across interactive cards

---

### 2.4 Tag Class Inconsistency

| File | Line | Current Class | Should Use |
|------|------|---------------|------------|
| `_includes/content-card.html` | 6, 7 | `technical text-t` | `.rc-tag-chip` or `.rc-tag` |
| `_includes/content-card.html` | 19, 20 | `rc-tag` | ✅ Correct |
| `_includes/related-content.html` | 13 | `rc-tag` | ✅ Correct |

**Impact:** Tag styling varies based on file, not semantic class

---

### 2.5 Container Structure Inconsistency

| Card Type | Current HTML | Standard HTML |
|-----------|--------------|---------------|
| Interactive Framed | `<a class="c-card c-card--framed">` | ✅ Correct |
| Interactive Related | `<a class="c-card c-card--related">` | ✅ Correct |
| Non-Interactive Stack | `<article class="c-card c-stack">` | ✅ Correct |
| Team | `<li class="c-card c-card--team">` | ✅ Correct (separate pattern) |
| Formula | `<div class="c-card c-card--formula">` | ⚠️ Should be `<article>` for semantic consistency |

**Impact:** Semantic HTML inconsistency affects accessibility

---

### 2.6 Date Class Inconsistency

| File | Line | Current Class | Issue |
|------|------|---------------|-------|
| `_includes/content-card.html` | 28 | `rc-date` | Not defined in CSS |
| `_includes/related-content.html` | 15 | `rc-date` | Not defined in CSS |

**Impact:** Date styling relies on undefined CSS classes

---

### 2.7 Service Cards - Missing CSS

| File | Line | Class | Status |
|------|------|-------|--------|
| `pages/intake.html` | 53 | `service-card` | ❌ NO CSS |
| `pages/intake.html` | 55 | `service-card-inner` | ❌ NO CSS |
| `pages/intake.html` | 57 | `service-card-index` | ❌ NO CSS |
| `pages/intake.html` | 58 | `service-card-title` | ❌ NO CSS |
| `pages/intake.html` | 59 | `service-card-desc` | ❌ NO CSS |

**Impact:** Radio button cards have no styling definition

---

## 3. Standardization Plan

### 3.1 Decision Matrix

| Use Case | Recommended Classes | Container Type | Interactive? |
|----------|---------------------|----------------|--------------|
| **Interactive Framed** | `c-card c-card--framed` | `<a>` | Yes |
| **Interactive Related** | `c-card c-card--related` | `<a>` | Yes |
| **Non-Interactive Stack** | `c-card c-stack` | `<article>` | No |
| **Team Card** | `c-card c-card--team` | `<li>` | No |
| **Formula/Content** | `c-card c-card--formula` | `<div>` or `<article>` | No |
| **Citation/Bibliography** | `c-card c-card--citation` | `<div>` | No |
| **Flip Card** | `values-card` | `<div>` | Yes (hover) |

---

### 3.2 Class Naming Convention

```
.c-card                    → Base card container
.c-card--framed            → Interactive framed card
.c-card--related           → Interactive related card
.c-card--team              → Team member card
.c-card--formula           → Formula/content card
.c-card--citation          → Citation card
.c-card--callout           → Callout card
.c-card--disabled          → Disabled state
.c-card--elevated          → Elevated shadow
.c-card--subtle            → No border

.c-card-title              → Card title
.c-card-value              → Card value/statistic
.c-card-action             → Card action/link

.c-card--framed__tag       → Framed card tag
.c-card--framed__title     → Framed card title
.c-card--framed__desc      → Framed card description
.c-card--framed__link      → Framed card link

.c-card--related__tag      → Related card tag
.c-card--related__title    → Related card title
.c-card--related__desc     → Related card description
.c-card--related__link     → Related card link

.c-card--team__header      → Team card header
.c-card--team__bio         → Team card bio
.c-card--team__links       → Team card links
```

---

## 4. Required Changes

### 4.1 Add Missing CSS Classes

**File:** `_sass/components/_card.scss`

**Add after line 531 (after `.feed-item`):**

```scss
/* ── Service Radio Card (Intake Form) ─────────────────────────────────────── */
.service-cards {
  display: grid;
  gap: var(--md-sys-spacing-md);
}

.service-card {
  position: relative;
  cursor: pointer;
  border: var(--site-border-width) solid var(--md-sys-color-outline);
  border-radius: var(--site-card-radius);
  background-color: var(--site-card-surface);
  padding: var(--site-card-padding-comfortable);
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-spacing-md);
  transition:
    background-color var(--site-motion-interaction-duration) var(--site-motion-easing-standard),
    border-color var(--site-motion-interaction-duration) var(--site-motion-easing-standard);
  
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  &:has(input[type="radio"]:checked) {
    border-color: var(--md-sys-color-primary);
    background-color: color-mix(in srgb, var(--md-sys-color-primary), transparent 90%);
  }
  
  &:is(input[type="radio"]):focus-visible + & {
    outline: var(--site-focus-ring-width) solid var(--md-sys-color-primary);
    outline-offset: var(--site-focus-ring-offset);
  }
  
  &:has(input[type="radio"]:checked):hover {
    transform: translateY(calc(-1 * var(--site-card-hover-distance)));
  }
  
  &__inner {
    display: flex;
    flex-direction: column;
    gap: var(--md-sys-spacing-sm);
  }
  
  &-index {
    color: var(--md-sys-color-primary);
    font-family: var(--font-mono);
    font-size: var(--md-sys-typescale-label-small-size);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0;
  }
  
  &-title {
    margin: 0;
    color: var(--md-sys-color-on-surface);
    font-family: var(--font-serif);
    font-size: var(--site-card-title-size);
    line-height: var(--site-card-title-line-height);
  }
  
  &-desc {
    margin: 0;
    color: var(--md-sys-color-on-surface-variant);
    font-size: var(--md-sys-typescale-body-medium-size);
  }
}

/* ── Date Class ───────────────────────────────────────────────────────────── */
.rc-date {
  margin: 0;
  font-size: var(--md-sys-typescale-label-small-size);
  color: var(--md-sys-color-on-surface-variant);
  font-family: var(--font-mono);
}

/* ── Card Desc Fallback (for c-stack) ─────────────────────────────────────── */
.card-desc {
  margin: 0;
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-body-medium-size);
}

/* ── Card Link Fallback (for c-stack) ─────────────────────────────────────── */
.card-link {
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-spacing-xs);
  margin-top: auto;
  padding-top: var(--md-sys-spacing-md);
  color: var(--md-sys-color-primary);
  font-family: var(--font-mono);
  font-size: var(--md-sys-typescale-label-small-size);
  font-weight: var(--md-ref-typeface-weight-semibold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ── RC Title Fallback (for legacy rc-title) ──────────────────────────────── */
.rc-title {
  margin: var(--md-sys-spacing-sm) 0;
  color: var(--md-sys-color-on-surface);
  font-family: var(--font-serif);
  font-size: var(--site-card-title-size);
  line-height: var(--site-card-title-line-height);
}

/* ── RC Tag Fallback (for legacy rc-tag) ──────────────────────────────────── */
.rc-tag {
  color: var(--md-sys-color-primary);
  font-family: var(--font-mono);
  font-size: var(--md-sys-typescale-label-small-size);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 0;
}

/* ── RC Tag Chip (for small pill-style tags) ─────────────────────────────── */
.rc-tag-chip {
  display: inline-block;
  padding: var(--md-sys-spacing-xs) var(--md-sys-spacing-sm);
  background-color: color-mix(in srgb, var(--md-sys-color-primary), transparent 90%);
  color: var(--md-sys-color-primary);
  font-family: var(--font-mono);
  font-size: var(--md-sys-typescale-label-small-size);
  border-radius: var(--site-radius-sm);
  margin: 0;
}
```

---

### 4.2 Update HTML Templates

#### File: `_includes/content-card.html`

**Line 6, 7:** Change `technical text-t` to `rc-tag-chip`
```html
{% if label %}<p class="rc-tag-chip">{{ label }}</p>{% endif %}
{% if item.work_type %}<p class="rc-tag-chip">{{ item.work_type }}</p>{% endif %}
```

**Line 21:** Change `rc-title` to `c-card-title`
```html
<h3 class="c-card-title">{{ item.title }}</h3>
```

**Line 28:** Change `rc-date` to use `.rc-date` class
```html
{% if item.date %}<p class="rc-date">{{ item.date | date: "%B %Y" }}</p>{% endif %}
```

**Line 34:** Change `card-link` to `.c-card--framed__link`
```html
<a href="{{ item.url | relative_url }}" class="c-card--framed__link">{{ include.link_label | default: "Read more" }} &rarr;</a>
```

---

#### File: `_includes/related-content.html`

**Line 14:** Change `rc-title` to `c-card-title`
```html
<h3 class="c-card-title">{{ item.title }}</h3>
```

---

#### File: `pages/psas.md`

**Line 33:** Change `card-desc` to `.c-card--related__desc`
```html
<p class="c-card--related__desc">{{ item.description | escape }}</p>
```

**Line 34:** Change `card-link` to `.c-card--related__link`
```html
<a class="c-card--related__link" href="{{ item.file | relative_url }}" download>Download PDF &rarr;</a>
```

---

#### File: `pages/team.md`

**Line 27:** Change `team-role` to `c-card--team__header`
```html
<p class="c-card--team__header">{{ person.role | escape }}</p>
```

**Line 36:** Change `team-bio` to `c-card--team__bio`
```html
<div class="c-card--team__bio">{{ person.bio | markdownify }}</div>
```

**Line 40:** Change `team-links` to `c-card--team__links`
```html
<div class="c-card--team__links">
```

---

### 4.3 Add Interactive States to Service Cards

Add to `_sass/components/_card.scss` after the service card styles:

```scss
.service-card:has(input[type="radio"]:checked) {
  border-color: var(--md-sys-color-primary);
  background-color: color-mix(in srgb, var(--md-sys-color-primary), transparent 90%);
}

.service-card:has(input[type="radio"]:focus-within) {
  outline: var(--site-focus-ring-width) solid var(--md-sys-color-primary);
  outline-offset: var(--site-focus-ring-offset);
}
```

---

## 5. Before/After Examples

### 5.1 Framed Card

**BEFORE (psas.md line 30-34):**
```html
<article class="c-card c-card--related">
  <h3 class="c-card-title">{{ item.title | escape }}</h3>
  <p class="card-desc">{{ item.description | escape }}</p>
  <a class="card-link" href="{{ item.file | relative_url }}" download>Download PDF &rarr;</a>
</article>
```

**AFTER:**
```html
<article class="c-card c-card--related">
  <h3 class="c-card-title">{{ item.title | escape }}</h3>
  <p class="c-card--related__desc">{{ item.description | escape }}</p>
  <a class="c-card--related__link" href="{{ item.file | relative_url }}" download>Download PDF &rarr;</a>
</article>
```

**CSS Impact:**
- Title: Uses standardized `c-card-title` with `var(--site-card-title-size)`
- Description: Uses `c-card--related__desc` with proper color token
- Link: Uses `c-card--related__link` with uppercase styling and proper spacing

---

### 5.2 Content Card (Default Variant)

**BEFORE (content-card.html line 18-34):**
```html
<article class="c-card {{ include.card_class | default: 'c-card--framed' }}">
  {% if label %}<p class="rc-tag">{{ label }}</p>{% endif %}
  {% if item.work_type %}<p class="rc-tag">{{ item.work_type }}</p>{% endif %}
  <h3 class="c-card-title">{{ item.title }}</h3>
  {% if include.card_type == "offer" %}
  <p class="text-s">{{ item.lede }}</p>
  <p class="text-s">{{ item.description }}</p>
  {% elsif summary %}
  <p class="text-s">{{ summary }}</p>
  {% endif %}
  {% if item.date %}<p class="rc-date">{{ item.date | date: "%B %Y" }}</p>{% endif %}
  {% if include.show_tags == "true" and item.tags.size > 0 %}
  <p class="rc-tags">
    {% for tag in item.tags %}<span class="rc-tag-chip">{{ tag }}</span>{% endfor %}
  </p>
  {% endif %}
  <a href="{{ item.url | relative_url }}" class="card-link">{{ include.link_label | default: "Read more" }} &rarr;</a>
</article>
```

**AFTER:**
```html
<article class="c-card {{ include.card_class | default: 'c-card--framed' }}">
  {% if label %}<p class="rc-tag-chip">{{ label }}</p>{% endif %}
  {% if item.work_type %}<p class="rc-tag-chip">{{ item.work_type }}</p>{% endif %}
  <h3 class="c-card-title">{{ item.title }}</h3>
  {% if include.card_type == "offer" %}
  <p class="c-card--framed__desc">{{ item.lede }}</p>
  <p class="c-card--framed__desc">{{ item.description }}</p>
  {% elsif summary %}
  <p class="c-card--framed__desc">{{ summary }}</p>
  {% endif %}
  {% if item.date %}<p class="rc-date">{{ item.date | date: "%B %Y" }}</p>{% endif %}
  {% if include.show_tags == "true" and item.tags.size > 0 %}
  <p class="rc-tags">
    {% for tag in item.tags %}<span class="rc-tag-chip">{{ tag }}</span>{% endfor %}
  </p>
  {% endif %}
  <a href="{{ item.url | relative_url }}" class="c-card--framed__link">{{ include.link_label | default: "Read more" }} &rarr;</a>
</article>
```

---

### 5.3 Team Card

**BEFORE (team.md line 21-43):**
```html
<li class="c-card c-card--team">
  {% if person.photo %}
  <div class="hex-portrait team-portrait">
    <img src="{{ person.photo | relative_url }}" alt="...">
  </div>
  {% endif %}
  <p class="team-role">{{ person.role | escape }}</p>
  <h2 class="team-name">{{ person.name | escape }}</h2>
  {% if person.credentials %}
  <ul class="team-creds">
    {% for credential in person.credentials %}
    <li class="team-cred">{{ credential | escape }}</li>
    {% endfor %}
  </ul>
  {% endif %}
  <div class="team-bio">{{ person.bio | markdownify }}</div>
  {% if person.links %}
  <div class="team-links">
    {% if person.links.linkedin %}<a href="{{ person.links.linkedin }}" class="team-link" target="_blank" rel="noopener">LinkedIn</a>{% endif %}
    {% if person.links.contact %}<a href="{{ person.links.contact | relative_url }}" class="team-link">Contact</a>{% endif %}
  </div>
  {% endif %}
</li>
```

**AFTER:**
```html
<li class="c-card c-card--team">
  {% if person.photo %}
  <div class="hex-portrait team-portrait">
    <img src="{{ person.photo | relative_url }}" alt="...">
  </div>
  {% endif %}
  <p class="c-card--team__header">{{ person.role | escape }}</p>
  <h2 class="team-name">{{ person.name | escape }}</h2>
  {% if person.credentials %}
  <ul class="team-creds">
    {% for credential in person.credentials %}
    <li class="team-cred">{{ credential | escape }}</li>
    {% endfor %}
  </ul>
  {% endif %}
  <div class="c-card--team__bio">{{ person.bio | markdownify }}</div>
  {% if person.links %}
  <div class="c-card--team__links">
    {% if person.links.linkedin %}<a href="{{ person.links.linkedin }}" class="team-link" target="_blank" rel="noopener">LinkedIn</a>{% endif %}
    {% if person.links.contact %}<a href="{{ person.links.contact | relative_url }}" class="team-link">Contact</a>{% endif %}
  </div>
  {% endif %}
</li>
```

---

## 6. Implementation Priority

### Phase 1: Critical (Add Missing CSS)
1. **Add service card CSS** to `_sass/components/_card.scss`
2. **Add `.rc-date` class** to `_sass/components/_card.scss`
3. **Add `.card-desc`, `.card-link`, `.rc-title`, `.rc-tag` fallbacks** to `_sass/components/_card.scss`

**Time:** 30 minutes

---

### Phase 2: High Priority (Update Templates)
4. **Update `_includes/content-card.html`** - lines 6, 7, 19, 20, 28, 34
5. **Update `_includes/related-content.html`** - line 14
6. **Update `pages/psas.md`** - lines 33, 34
7. **Update `pages/team.md`** - lines 27, 36, 40

**Time:** 45 minutes

---

### Phase 3: Medium Priority (Semantic Improvements)
8. **Update `pages/case-studies.md`** - line 29 (change `<div>` to `<article>`)
9. **Update `_layouts/sections.html`** - line 230 (change `<div>` to `<article>`)

**Time:** 15 minutes

---

### Phase 4: Verification
10. **Run `npm run build`**
11. **Verify all pages render correctly**
12. **Check accessibility (tab order, focus states)**

**Time:** 30 minutes

---

## 7. CSS Variable Reference

All card components use the following design tokens:

| Variable | Purpose | Value |
|----------|---------|-------|
| `--site-card-padding-compact` | Compact card padding | `var(--md-sys-spacing-md)` (16px) |
| `--site-card-padding-comfortable` | Comfortable card padding | `var(--md-sys-spacing-lg)` (24px) |
| `--site-card-radius` | Card border radius | `var(--p-radius-none)` (0px) |
| `--site-card-surface` | Card background | `var(--p-color-ink-palantir-dark)` |
| `--site-card-elevation` | Card shadow | `var(--site-shadow-2)` |
| `--site-card-hover-distance` | Hover lift amount | `var(--md-sys-spacing-sm)` (8px) |
| `--site-card-title-size` | Card title size | `var(--md-sys-typescale-title-large-size)` |
| `--site-card-title-line-height` | Card title line height | `var(--md-sys-typescale-title-large-line-height)` |
| `--site-card-grid-min-width` | Grid min-width | `17rem` |
| `--site-card-flip-height` | Flip card height | `15rem` |
| `--site-card-flip-perspective` | Flip perspective | `62.5rem` |
| `--site-card-flip-duration` | Flip animation | `var(--md-sys-motion-duration-500)` |

---

## 8. Accessibility Notes

### 8.1 Interactive Cards
- All clickable cards must have `tabindex="0"` or be wrapped in `<a>` or `<button>`
- Focus visible states use `var(--site-focus-ring-width)` and `var(--md-sys-color-primary)`
- Hover states use `transform: translateY(calc(-1 * var(--site-card-hover-distance)))`

### 8.2 Reduced Motion
```scss
@media (prefers-reduced-motion: reduce) {
  .c-card,
  .c-card--related,
  .c-card--framed,
  .c-card--callout,
  .c-card--formula,
  .related-card,
  .card--framed,
  .values-card__inner {
    transition-duration: var(--site-motion-reduced-duration);
  }
  
  .c-card:is(a[href], [role="button"]):hover,
  .c-card--related:is(a[href], [role="button"]):hover,
  .c-card--framed:is(a[href], [role="button"]):hover,
  .card:is(a[href], [role="button"]):hover,
  .related-card:is(a[href], [role="button"]):hover {
    transform: none;
  }
}
```

### 8.3 Service Radio Cards
- Use `:has(input:checked)` for checked state styling
- Use `focus-within` for focus states on container
- Radio buttons are hidden with `opacity: 0` but remain keyboard accessible

---

## 9. Conclusion

This audit identifies **7 key inconsistencies** across card implementations:

1. **Title class inconsistency** (`rc-title` vs `c-card-title`)
2. **Description class inconsistency** (`card-desc`, `text-s` vs standardized classes)
3. **Link class inconsistency** (`card-link` vs standardized link classes)
4. **Tag class inconsistency** (mixed usage of `rc-tag`, `rc-tag-chip`, `technical text-t`)
5. **Date class not defined** (`rc-date` needs CSS definition)
6. **Service cards have no CSS** (entire component missing)
7. **Semantic HTML inconsistency** (`<div>` vs `<article>` vs `<li>`)

### Recommended Actions

1. ✅ **Add missing CSS classes** (6 classes needed)
2. ✅ **Standardize HTML templates** (6 files to update)
3. ✅ **Verify accessibility** (focus states, reduced motion)
4. ✅ **Test after changes** (build and visual inspection)

---

**Total Estimated Implementation Time:** 2 hours 30 minutes

**Priority:** High - affects visual consistency and accessibility across the site

---

*Generated by automated card component audit on November 14, 2026*
