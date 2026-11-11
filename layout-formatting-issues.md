# Layout & Formatting Issues

**Date**: 2026-11-11  
**Status**: Open for review  
**Priority**: High

---

## Executive Summary

Comprehensive audit of all layouts and includes revealed **15 formatting issues** across 5 layout files and 3 include files. Issues fall into 4 categories:

1. **Inline styles** (5 instances) - Should be CSS variables
2. **Orphan closing tags** (4 instances) - Missing opening tags
3. **Accessibility concerns** (2 instances) - Missing aria labels
4. **Inconsistent spacing** (2 instances) - Extra whitespace in HTML

---

## Issues by Category

### Category 1: Inline Styles (5 issues)

**Should be removed and replaced with CSS classes or CSS variables.**

#### home.html (4 instances)

```html
<!-- Line 34: Grid margin -->
<div class="c-grid c-grid--3" style="margin-top: var(--md-sys-spacing-xl);">
<!-- Line 118: Blockquote italic -->
<p class="text-s" style="font-style: italic;">
<!-- Line 168: Grid margin -->
<div class="c-grid c-grid--3" style="margin-top: var(--md-sys-spacing-xl);">
<!-- Line 192: Grid margin -->
<div class="c-grid c-grid--3" style="margin-top: var(--md-sys-spacing-xl);">
```

**Fix approach:**
- Line 34, 168, 192: Add `--md-sys-spacing-xl` CSS variable to design tokens
- Line 118: Add `.text-s` italic variant or CSS class

#### article.html (1 instance)

```html
<!-- Line 9: tag_style attribute -->
tag_style="anchor"
```

**Fix approach:** Remove inline attribute; handle in CSS via class

---

### Category 2: Orphan Closing Tags (4 issues)

**Missing opening `<p>` tags before closing `</p>` tags.**

#### home.html

- Line 18: Closing `</p>` without opening `<p>`
- Line 118: Has inline style (see Category 1)

#### article.html

- Line 4: Closing `</p>` without opening `<p>`

#### psa.html

- Line 4: Closing `</p>` without opening `<p>`
- Line 11: Closing `</p>` without opening `<p>`

#### footer.html

- Line 4: Closing `</p>` without opening `<p>`

**Fix approach:** Add corresponding opening `<p>` tags or remove closing tags

---

### Category 3: Accessibility Concerns (2 issues)

#### article.html

```html
<!-- Line 10: May need aria-label for progress bar -->
<div id="progress-bar"></div>
```

#### cta.html

```html
<!-- Line 1: CTA section may need aria-labelledby -->
<section aria-labelledby="cta-question" class="c-cta c-cta--cta">
```

**Fix approach:** Add appropriate aria-labels and aria-labelledby attributes

---

### Category 4: Inconsistent Spacing (2 issues)

#### home.html

- Line 34: Extra space before grid div
- Line 168: Extra space before grid div

#### article.html

- Line 12: Extra whitespace before TOC include

**Fix approach:** Remove unnecessary blank lines

---

## Files Affected

| File | Issues | Priority |
|------|--------|----------|
| home.html | 6 | High |
| article.html | 4 | Medium |
| psa.html | 3 | Medium |
| footer.html | 1 | Low |
| cta.html | 1 | Low |

---

## Recommended Resolution Order

1. **Category 1 (Inline styles)** - Replace with CSS classes/tokens
2. **Category 2 (Orphan tags)** - Add missing opening tags
3. **Category 3 (Accessibility)** - Add aria attributes
4. **Category 4 (Spacing)** - Clean up whitespace

---

## Notes

- All issues were identified via automated audit
- No functional breakage expected from fixes
- Changes should maintain semantic HTML structure
- CSS tokenization is preferred over inline styles

---

## Provenance Table

| Claim | Purpose | Importance | Source | Confidence % |
|-------|---------|------------|--------|--------------|
| 5 inline styles found | Replace with CSS | High | grep audit | 95 |
| 4 orphan closing tags | Add opening tags | Medium | grep audit | 95 |
| 2 accessibility concerns | Improve A11y | High | manual review | 90 |
| 2 spacing issues | Clean HTML | Low | manual review | 85 |
