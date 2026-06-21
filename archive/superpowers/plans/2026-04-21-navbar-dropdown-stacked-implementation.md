# Navbar Dropdown Glyph Stacked Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update main navigation dropdown toggles to display icon above text in a vertical stack.

**Architecture:** Modify `.nav-dropdown-toggle` CSS in the design system package to use `flex-direction: column` instead of the default horizontal flex layout. This is a single-file CSS change in the design system, followed by a rebuild and visual verification in the consuming site.

**Tech Stack:** SCSS (design system), Jekyll (consuming site), npm build tools

---

## Task 1: Update `.nav-dropdown-toggle` styling

**Files:**
- Modify: `ouroboros-design/scss/_nav.scss:112-136`

- [ ] **Step 1: Open the SCSS file and locate the selector**

File: `ouroboros-design/scss/_nav.scss`  
Selector to modify: `.nav-dropdown-toggle` (starting at line 112)

- [ ] **Step 2: Update the CSS to add vertical stacking**

Replace the current `.nav-dropdown-toggle` rule with:

```scss
.nav-dropdown-toggle {
  background: transparent;
  border: none;
  color: var(--muted);
  font-family: $font-sans;
  font-size: var(--label-size);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;

  i {
    font-size: 0.95rem;
    width: 1.2rem;
    text-align: center;
  }

  &:hover {
    color: var(--gold);
  }
}
```

Key changes from original:
- Line 8: Added `flex-direction: column;` to stack items vertically
- Line 10: Changed `gap` from `0.4rem` to `0.35rem` for appropriate vertical spacing

- [ ] **Step 3: Commit the SCSS change**

```bash
git add ouroboros-design/scss/_nav.scss
git commit -m "style: stack navbar dropdown toggle icon above text

Change nav dropdown toggles to vertical layout with icon centered
above text. Adjust gap to 0.35rem for appropriate vertical spacing."
```

---

## Task 2: Build the design system

**Files:**
- Design system output: `ouroboros-design/dist/ouroboros.css`

- [ ] **Step 1: Navigate to design system directory**

```bash
cd ouroboros-design
```

- [ ] **Step 2: Run the build command**

```bash
npm run build
```

Expected output: Build completes without errors, `dist/ouroboros.css` is updated.

- [ ] **Step 3: Verify the built CSS contains the changes**

```bash
grep -A 5 "flex-direction: column" dist/ouroboros.css | head -10
```

Expected: Should show the flex-direction property in the output.

- [ ] **Step 4: Return to project root**

```bash
cd ..
```

- [ ] **Step 5: Commit the built design system**

```bash
git add ouroboros-design/dist/
git commit -m "build: rebuild design system with navbar dropdown stacking"
```

---

## Task 3: Update consuming site and test visually

**Files:**
- Package install: `package.json` (installs design system updates)
- Visual testing: Homepage at http://localhost:4000

- [ ] **Step 1: Reinstall npm dependencies to pick up updated design system**

```bash
npm install
```

This updates the local `node_modules` copy of the design system to the latest built version.

- [ ] **Step 2: Start the dev server**

```bash
npm run dev
```

Server will start at `http://localhost:4000` with live reload enabled.

- [ ] **Step 3: Open browser and navigate to homepage**

URL: `http://localhost:4000`

- [ ] **Step 4: Visually verify the navbar dropdown toggles**

Check each of the 5 main dropdown toggles (About, Services, Projects, Work, Resources):
- Icon should be centered above the text (not side-by-side)
- Spacing between icon and text should be balanced
- Text should be readable and not truncated
- Hover state should work (text color changes to gold)
- Toggles should not overflow or overlap with other nav elements

- [ ] **Step 5: Test dropdown menu interaction**

Hover over each dropdown toggle to verify the dropdown menu still appears correctly below:
- Dropdown items should render in their own layout (unchanged)
- Animation should be smooth
- Menu should close when moving away

- [ ] **Step 6: Test on multiple pages (optional but recommended)**

Visit a few other pages to ensure navbar consistency:
- `/services/` (e.g., any service page)
- `/work/` (e.g., any case study)
- Any other page to spot-check navbar appearance

- [ ] **Step 7: Stop the dev server**

```bash
Ctrl+C
```

---

## Task 4: Final commit and verification

**Files:**
- Site root `package.json` and build state

- [ ] **Step 1: Check git status to confirm all changes are committed**

```bash
git status
```

Expected output: No changes in the working directory; all changes already committed.

- [ ] **Step 2: View commit history to confirm the 2 commits**

```bash
git log --oneline -3
```

Expected output: Should show recent commits including "style: stack navbar..." and "build: rebuild design system..."

- [ ] **Step 3: Verify no uncommitted design system files remain**

```bash
git diff --name-only
```

Expected output: Empty (no uncommitted changes).

---

## Success Criteria Checklist

After completing all tasks, verify:

- ✅ `.nav-dropdown-toggle` in SCSS uses `flex-direction: column`
- ✅ `gap` is set to `0.35rem`
- ✅ Design system builds without errors
- ✅ Main navbar dropdown toggles display icon above text (vertical stack)
- ✅ All 5 toggles (About, Services, Projects, Work, Resources) render correctly
- ✅ Hover states work
- ✅ Dropdown menus open/close as before
- ✅ Nav bar height increases naturally (no visual issues)
- ✅ Changes committed to main branch
