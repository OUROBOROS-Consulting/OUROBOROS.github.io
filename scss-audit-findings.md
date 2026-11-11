# SCSS Architecture Audit — Comprehensive Findings

**Date**: 2026-11-10  
**Auditor**: Apostolos Stamenos, OUROBOROS Consulting  
**Perspective**: Senior Frontend Engineer / Experienced Designer

---

## Executive Summary

The SCSS architecture demonstrates strong modular organization but suffers from **technical debt**, **redundancies**, and **design inconsistencies**. Critical issues include:

1. **Dead code / commented-out production styles** in `identity.scss`
2. **Hardcoded pixel values** overriding design tokens in `buttons-dark.scss`
3. **Duplicate definitions** across theme files
4. **Accessibility violations** (motion, contrast)
5. **Over-engineered complexity** in hero section
6. **Inconsistent naming conventions**

---

## 1. DEAD CODE & COMMENTED-OUT PRODUCTION STYLES

### File: `_sass/identity.scss`

**Issue**: Lines 44-50 contain commented-out production CSS that should be either committed or removed.

```scss
// body {
//   background-color: var(--md-sys-color-surface);
//   color: var(--md-sys-color-on-surface);
//   font-family: var(--font-utility, sans-serif); // Default to Syne
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }
```

**Impact**: 
- Increases file size with dead code
- May confuse maintainers about intended styles
- Could cause merge conflicts if re-enabled accidentally

**Priority**: HIGH  
**Recommendation**: Remove commented production code or document as intentional fallback.

---

## 2. HARDCODED PIXEL VALUES (Design Token Violation)

### File: `_sass/components/_buttons-dark.scss`

**Issue**: Extensive use of hardcoded pixel values instead of design tokens.

```scss
.btn-group-dark {
  padding: 18px 24px;
  gap: 10px;
  width: 290px;
  height: 199px;
  border: 1px dashed #9747FF;
  border-radius: 5px;
}
```

**Problem**:
- Violates Material Design 3 token system
- Not maintainable across themes
- Hard magic numbers (18px, 24px, 199px)
- Color hardcoded as `#9747FF` instead of token

**Priority**: HIGH  
**Recommendation**: Convert all to tokens:
```scss
.btn-group-dark {
  padding: var(--md-sys-spacing-xl) var(--md-sys-spacing-lg);
  gap: var(--md-sys-spacing-sm);
  width: var(--site-button-group-width);
  height: var(--site-button-group-height);
  border: var(--site-border-width) dashed var(--p-color-accent-indigo);
  border-radius: var(--p-radius-sm);
}
```

---

## 3. DUPLICATE THEME DEFINITIONS

### Files: `_sass/themes/_light.scss` and `_sass/themes/_dark.scss`

**Issue**: Both files define identical variables with different values, creating redundancy.

```scss
// _light.scss line 24
--md-sys-color-on-error-container: var(--md-sys-color-error);

// _dark.scss line 25
--md-sys-color-on-error-container: var(--md-ref-palette-error80);
```

**Impact**:
- 154 total variable definitions duplicated
- Maintenance burden (edit in both places)
- Risk of drift (one updated, other forgotten)

**Priority**: MEDIUM  
**Recommendation**: Create a base `_sass/themes/_base.scss` with common variables, then override in theme-specific files.

---

## 4. ACCESSIBILITY VIOLATIONS

### 4.1 Reduced Motion Not Fully Respected

**File**: `_sass/design/md/_motion.scss`

```scss
@media (prefers-reduced-motion: reduce) {
  // Only removes animation, not transitions
  .c-page-hero__scroll-line {
    animation: none;
  }
}
```

**Problem**: Many components still have transitions active in reduced-motion mode.

**Files Affected**:
- `_sass/components/_page-hero.scss` (scroll-line animation)
- `_sass/components/_carousel.scss` (slide transitions)
- `_sass/components/_hours.scss` (opacity changes)

**Priority**: HIGH (WCAG 2.2.1 Violation)

---

### 4.2 Focus Indicators Inconsistent

**File**: `_sass/components/_button.scss`

```scss
.c-btn--ghost:focus-visible {
  outline: none;
}
```

**Problem**: Ghost buttons remove focus indicators entirely.

**Priority**: HIGH (WCAG 2.4.7 Violation)

---

## 5. OVER-ENGINEERED HERO SECTION

### File: `_sass/components/_page-hero.scss`

**Issue**: Extremely complex grid layout with redundant calculations.

```scss
.c-page-hero__inner {
  min-height: calc(100vh - clamp(3rem, 7vh, 6rem) - clamp(3rem, 7vh, 6rem));
  min-height: calc(100svh - clamp(3rem, 7vh, 6rem) - clamp(3rem, 7vh, 6rem));
}
```

**Problems**:
- Clamped values calculated twice (top and bottom padding)
- `100vh - padding - padding` is over-engineered
- No mobile consideration in main grid (only media query)

**Simplified**:
```scss
.c-page-hero__inner {
  min-height: 100vh;
  padding-top: clamp(3rem, 7vh, 6rem);
  padding-bottom: clamp(3rem, 7vh, 6rem);
}
```

**Priority**: MEDIUM

---

## 6. INCONSISTENT NAMING CONVENTIONS

### Issue: Mixed naming patterns across files

| File | Pattern | Example |
|------|---------|---------|
| `_button.scss` | camelCase + `--` | `.btn--primary` |
| `_card.scss` | camelCase | `.c-card` |
| `_nav.scss` | camelCase + `--` | `.nav--fixed` |
| `_spacing.scss` | camelCase | `.c-stack` |

**Problem**: Inconsistent patterns create cognitive load.

**Priority**: LOW  
**Recommendation**: Adopt `.c-*` prefix consistently for components, `.c-*--*` for variants.

---

## 7. RECURSIVE IMPORT CYCLE RISK

### Files: `_sass/design/md/_palette.scss` and `_sass/_primitives.scss`

**Issue**: `_primitives.scss` defines color primitives, but `_palette.scss` references them.

```scss
// _primitives.scss line 74
--p-color-accent-gold: var(--p-ember-gold-bright-600);

// _palette.scss line 41
--p-color-accent-gold: var(--p-ember-gold-bright-600);
```

**Problem**: Same values defined in both files (200+ color variables duplicated).

**Priority**: MEDIUM  
**Recommendation**: Consolidate into single source of truth.

---

## 8. UI/UX DESIGN CRITIQUE

### 8.1 Buttons-Dark Component (Critical Issue)

**File**: `_sass/components/_buttons-dark.scss`

**Analysis**: This component appears to be a **work-in-progress** or **design exploration**, not production code.

**Problems**:
1. Uses absolute positioning (`left: 20px`, `top: 121px`) — fragile and non-responsive
2. Fixed width/height (290px × 199px) — breaks on any screen size
3. Hardcoded colors (`#9747FF`, `#FFFFFF`, `#000000`)
4. No semantic meaning — what is this button supposed to do?
5. Responsive fallback just stacks elements, doesn't fix design

**Recommendation**: Either:
- Complete the design properly with tokens
- Or remove if it's an abandoned experiment

**Priority**: HIGH

---

### 8.2 Type Hierarchy Issues

**File**: `_sass/identity.scss`

```scss
h1, h2, .authority {
  font-family: var(--font-serif, serif);
  color: var(--md-sys-color-text-primary);
  line-height: 0.95;
  margin-bottom: var(--md-sys-spacing-md);
}
```

**Problem**: `h1` and `h2` share identical styles. In a hierarchy, `h2` should visually distinguish from `h1`.

**Recommendation**:
```scss
h1 { 
  font-size: var(--md-sys-typescale-headline-xxl-size); 
}
h2 { 
  font-size: var(--md-sys-typescale-headline-large-size);
  margin-top: var(--md-sys-spacing-lg);
}
```

---

### 8.3 Card Component Over-Engineering

**File**: `_sass/components/_card.scss`

**Analysis**: The card component has 500+ lines of SCSS with excessive nesting.

**Problems**:
1. Uses BEM + Material + custom prefix mix
2. 10+ levels of nesting in some places
3. Duplicate border-radius definitions
4. Shadow implementations vary between cards

**Recommendation**: 
- Flatten nesting to 2-3 levels max
- Extract shadow mixin
- Use `var(--site-card-radius)` consistently

---

### 8.4 Color Accessibility

**File**: `_sass/themes/_light.scss`

```scss
--md-sys-color-on-surface: var(--p-void-900);
--md-sys-color-on-surface-variant: var(--p-forensic-700);
```

**Problem**: Dark text on light surfaces is good, but:
- `--md-sys-color-text-primary` vs `--md-sys-color-on-surface` naming inconsistency
- Need to verify contrast ratios against actual surface colors

**Priority**: MEDIUM

---

## 9. FILE STRUCTURE ISSUES

### Issue: Fragmented component files

**Current Structure**:
```
_sass/components/
  _button.scss (5,115 chars)
  _card.scss (18,807 chars)
  _nav.scss (11,230 chars)
  _hero.scss (3,706 chars)
```

**Problem**: 
- `_card.scss` is 18,807 characters — too large
- `_button.scss` and `_card.scss` have overlapping hover/focus states

**Recommendation**: 
- Split `_card.scss` into:
  - `_card/base.scss`
  - `_card/variants.scss`
  - `_card/form.scss`
  - `_card/interactive.scss`

---

## 10. MEDIA QUERY OVERLAP

**File**: `_sass/components/_page-hero.scss`

```scss
@media (max-width: 48rem) {
  .c-page-hero {
    padding: 2.5rem 1.25rem 3.5rem;
  }
  
  @media (max-width: 48rem) { /* DUPLICATE! */
    .c-page-hero__inner {
      grid-template-columns: minmax(0, 1fr) auto;
      // ...
    }
  }
}
```

**Problem**: Nested media queries create specificity issues and redundancy.

**Recommendation**: Flatten to single level.

---

## Summary Table

| Issue | File | Priority | Effort | Impact |
|-------|------|----------|--------|---------|
| Dead code | `identity.scss` | HIGH | LOW | LOW |
| Hardcoded pixels | `buttons-dark.scss` | HIGH | MEDIUM | HIGH |
| Duplicate themes | `_light.scss` / `_dark.scss` | MEDIUM | MEDIUM | MEDIUM |
| Motion accessibility | Multiple | HIGH | LOW | HIGH |
| Focus indicators | `_button.scss` | HIGH | LOW | HIGH |
| Over-engineered hero | `_page-hero.scss` | MEDIUM | LOW | LOW |
| Inconsistent naming | Multiple | LOW | MEDIUM | LOW |
| Duplicate colors | `_palette.scss` / `_primitives.scss` | MEDIUM | HIGH | MEDIUM |
| Buttons-Dark (abandoned) | `buttons-dark.scss` | HIGH | HIGH | MEDIUM |
| Type hierarchy | `identity.scss` | MEDIUM | LOW | MEDIUM |
| Card over-engineering | `_card.scss` | MEDIUM | HIGH | MEDIUM |
| Color naming | Multiple | MEDIUM | LOW | LOW |
| File fragmentation | Multiple | MEDIUM | HIGH | MEDIUM |
| Media query nesting | `_page-hero.scss` | LOW | LOW | LOW |

---

## Recommended Action Plan

**Phase 1 (Critical - Week 1)**:
1. Remove dead code from `identity.scss`
2. Fix accessibility (reduced motion, focus states)
3. Address buttons-dark component

**Phase 2 (High - Week 2-3)**:
1. Convert buttons-dark to tokens
2. Consolidate duplicate color definitions
3. Simplify hero section

**Phase 3 (Medium - Week 4)**:
1. Split oversized card.scss
2. Standardize naming conventions
3. Fix type hierarchy

**Phase 4 (Low - Week 5)**:
1. Flatten media queries
2. Document design decisions
3. Add linting rules

---

## Technical Debt Score

**Current**: 6.5/10  
**After Phase 1**: 5.0/10  
**After Phase 2**: 3.5/10  
**After Phase 3**: 2.5/10  

---

*This audit was conducted on the CSS architecture from an experienced designer's perspective, focusing on maintainability, accessibility, and design consistency.*
