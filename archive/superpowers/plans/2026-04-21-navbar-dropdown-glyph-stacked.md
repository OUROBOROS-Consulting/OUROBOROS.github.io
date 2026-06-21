# Navbar Dropdown Glyph Stacked Layout

**Date:** 2026-04-21  
**Scope:** Main navigation dropdown toggles only  
**Branch:** main

## Overview

Change the main navigation dropdown toggles (About, Services, Projects, Work, Resources) from a horizontal icon-text layout to a vertical stacked layout with icon above text.

## Current State

`.nav-dropdown-toggle` currently uses:
- `display: inline-flex`
- `align-items: center` 
- `gap: 0.4rem` (horizontal spacing)

This renders icon and text side-by-side: `[icon] Text`

## Desired State

`.nav-dropdown-toggle` should render icon above text:
```
  [icon]
  Text
```

## Implementation

**File:** `ouroboros-design/scss/_nav.scss`  
**Selector:** `.nav-dropdown-toggle`

**Changes:**
1. Add `flex-direction: column` to stack items vertically
2. Keep `align-items: center` for centering
3. Adjust `gap` from `0.4rem` to `0.35rem` for appropriate vertical spacing
4. Icon font-size and width remain unchanged

**Mobile behavior:** No change needed — mobile nav is flattened to a list view and doesn't use `.nav-dropdown-toggle` styling in the same way.

## Scope Boundaries

✓ Affects: Main dropdown toggles in `.nav-links`  
✗ Does not affect: Dropdown menu items (children), contact icons, logo, hamburger toggle  
✗ Does not affect: Mobile navigation layout (already handled separately in media query)

## Success Criteria

- Main dropdown toggles display icon centered above text
- Vertical spacing is balanced and readable
- Nav bar height increases naturally (no overflow, no truncation)
- Hover/focus states work as before
- All 5 toggles (About, Services, Projects, Work, Resources) display correctly
