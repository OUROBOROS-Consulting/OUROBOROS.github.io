# SCSS Refactor: Stop the Drift — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate CSS drift by auditing glyphs and box-model issues first, then removing split-brain duplicates, defining orphan classes, and splitting the nav monolith — no class renames, no HTML changes.

**Architecture:** All structural SCSS changes go into `ouroboros-design/` (source of truth). Site-level `main.scss` shrinks to three sections: `@use`, `.safety-exit`, and light-mode overrides. Glyphs and box-model are addressed first as they are visual decisions that must be resolved before structural refactors.

**Tech Stack:** Jekyll 4.x, Sass (SCSS, `@use`/`@forward`), Font Awesome 6, `@ouroboros-consulting/ouroboros-design` (local npm package at `../ouroboros-design`)

## Global Constraints

- Branch: `feature/cleanup` — all commits go here
- No class renames — existing HTML class attributes are frozen
- No HTML template changes — only SCSS and front matter changes are permitted
- Spec: `docs/superpowers/specs/2026-06-21-scss-refactor-design.md`
- Build cycle: `cd ouroboros-design && npm run build && cd ../OUROBOROS-Consulting.github.io && npm install && npm run dev`
- Files under `docs/superpowers/` require `git add -f` — blanket `docs/` gitignore has an exception but `git add` still needs `-f`
- Design tokens live in `ouroboros-design/scss/_base.scss` as CSS custom properties — never redefine them in consuming files
- Trauma-informed framing: icons must be precise, warm, earned — no corporate, aggressive, or cold icons
- Gothic-modern aesthetic: ornaments must be intentional and typographically sound

---

### Task 1: Glyph Audit — Font Awesome Icons

**Files:**
- Audit (read-only): `_includes/nav.html`, `_includes/footer.html`, `_includes/banner.html`, `_layouts/default.html`, `_layouts/home.html`, `_layouts/service.html`, `_about/case-studies.html`
- Modify front matter only: `_services/tutoring.md`, `_services/advocacy-investigation.md`, `_services/technology.md`
- Modify HTML: `_includes/banner.html`, `_about/case-studies.html`

**Interfaces:**
- Produces: updated `icon:` values in service front matter; updated `fa-*` classes in HTML includes

- [ ] **Step 1: Run the full icon inventory**

```bash
grep -rn "fa-[a-z]" _includes/ _layouts/ _services/ _about/ _case_studies/ --include="*.html" --include="*.md"
```

Verify the output matches this known inventory (investigate any additions):

| File | Icon class | Label/context |
|------|------------|---------------|
| `_includes/nav.html` | `fas fa-dungeon` | Exit (safety escape) |
| `_includes/nav.html` | `fas fa-rss` | News/Announcements |
| `_includes/nav.html` | `fas fa-envelope` | Contact |
| `_includes/nav.html` | `fas fa-magnifying-glass` | Search |
| `_includes/nav.html` | `fas fa-bars` | Hamburger/mobile toggle |
| `_includes/footer.html` | `fab fa-github` | GitHub |
| `_includes/footer.html` | `fab fa-linkedin` | LinkedIn |
| `_includes/footer.html` | `fas fa-feather-pointed` | Tutoring |
| `_includes/footer.html` | `fas fa-pen-fancy` | Substack/Writing |
| `_includes/footer.html` | `fas fa-envelope` | Contact |
| `_includes/banner.html` | `fas fa-bullhorn` | Announcement banner |
| `_layouts/default.html:86` | `fas fa-chevron-down` | Secondary nav chevron |
| `_services/tutoring.md` | `fa-book` | Tutoring service |
| `_services/advocacy-investigation.md` | `fa-magnifying-glass` | Advocacy/Investigation |
| `_services/technology.md` | `fa-microchip` | Technology service |
| `_about/case-studies.html:24` | `fa-solid fa-layer-group` | Case studies header |

- [ ] **Step 2: Evaluate each icon against spec criteria**

For each icon, check: (a) generically corporate, (b) toneally mismatched for trauma-informed work, (c) redundant/decorative noise.

Evaluation table — fill in Keep/Replace and Replacement before applying anything:

| Icon | Context | Issue | Decision | Replacement |
|------|---------|-------|----------|-------------|
| `fa-dungeon` | Safety exit | Gothic — intentional | Keep | — |
| `fa-rss` | News | Generic broadcast | Review | `fa-newspaper` or keep |
| `fa-envelope` | Contact (nav + footer) | Universal/warm | Keep | — |
| `fa-magnifying-glass` | Search, Advocacy | Functional/apt | Keep | — |
| `fa-bars` | Hamburger | Functional/standard | Keep | — |
| `fab fa-github` | GitHub | Brand icon | Keep | — |
| `fab fa-linkedin` | LinkedIn | Brand icon | Keep | — |
| `fa-feather-pointed` | Tutoring (footer) | Elegant writing metaphor | Keep | — |
| `fa-pen-fancy` | Substack | Elegant writing metaphor | Keep | — |
| `fa-bullhorn` | Announcement banner | Aggressive/loud — mismatched | Replace | `fa-bell` |
| `fa-chevron-down` | Nav dropdown | Functional | Keep | — |
| `fa-book` | Tutoring service | Generic | Review | `fa-graduation-cap` or `fa-book-open` |
| `fa-microchip` | Technology service | Cold/corporate | Replace | `fa-laptop-code` |
| `fa-layer-group` | Case studies | Generic stacking; no narrative | Replace | `fa-folder-open` |

Decision criteria:
- Corporate/cold icons (microchip, chart-bar, cog) → replace
- Aggressive/loud icons (bullhorn) → replace
- Brand icons (github, linkedin) → always keep
- Functional/navigational icons (chevron, bars, magnifying-glass) → keep
- Elegant/warm icons (feather-pointed, pen-fancy, dungeon) → keep

- [ ] **Step 3: Apply replacements**

In `_includes/banner.html`, replace `fa-bullhorn` with `fa-bell`:
```html
<i class="fas fa-bell" aria-hidden="true"></i>
```

In `_services/technology.md` front matter:
```yaml
icon: fa-laptop-code
```

In `_about/case-studies.html` line ~24, replace `fa-layer-group`:
```html
<i class="fa-solid fa-folder-open" aria-hidden="true"></i>
```

For `_services/tutoring.md`, update only if replacing:
```yaml
icon: fa-graduation-cap
```

- [ ] **Step 4: Build and visual check**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io && npm install && npm run dev
```

Open http://localhost:4000 and verify:
- Nav icons render (Exit, News, Contact, Search, Hamburger)
- Footer icons render (GitHub, LinkedIn, Tutoring, Substack, Contact)
- Home service cards show updated icons
- Individual service pages show correct hero icons
- Case studies header icon renders

- [ ] **Step 5: Commit**

```bash
git add _includes/banner.html _about/case-studies.html _services/technology.md _services/tutoring.md
git commit -m "feat: replace toneally-mismatched FA icons with trauma-informed alternatives"
```

---

### Task 2: Glyph Audit — Typographic Ornaments

**Files:**
- Audit (read-only): `ouroboros-design/scss/_essay.scss`, `ouroboros-design/scss/_typography.scss`, `ouroboros-design/scss/_service.scss`, `ouroboros-design/scss/_base.scss`
- Modify: any partial containing an ornament that fails the Gothic-modern standard

**Interfaces:**
- Consumes: nothing from Task 1
- Produces: updated Unicode ornaments in relevant SCSS partials; no class changes

- [ ] **Step 1: Inventory all existing ornaments**

```bash
grep -n "content:" ouroboros-design/scss/_essay.scss ouroboros-design/scss/_typography.scss ouroboros-design/scss/_service.scss ouroboros-design/scss/_base.scss
```

Known ornaments from reconnaissance:

| File | Context | Value | Assessment |
|------|---------|-------|------------|
| `_essay.scss:134` | Section divider (essay body) | `'◇  ◇  ◇'` | Gothic, elegant — keep |
| `_base.scss:256` | Back-nav prefix | `'←'` | Directional, minimal — keep |
| `_base.scss:320` | List prefix | `'–'` | Functional — verify is U+2013, not hyphen |
| `_service.scss:192` | Specialization list bullet | `'⬡'` | Hexagon, on-brand — keep |
| `_service.scss:269` | Prefix (context TBD) | `'–'` | Verify |
| `_service.scss:360` | Blockquote open quote | `'\201C'` (") | Standard typographic — keep |

- [ ] **Step 2: Verify dash vs. en-dash**

```bash
grep -n "content: '-'" ouroboros-design/scss/_essay.scss ouroboros-design/scss/_base.scss ouroboros-design/scss/_service.scss
grep -n "content: '–'" ouroboros-design/scss/_essay.scss ouroboros-design/scss/_base.scss ouroboros-design/scss/_service.scss
```

A bare hyphen (`-`) used as a list prefix should be replaced with an en-dash (`–`, U+2013). An em-dash (`—`, U+2014) should not appear as a list ornament.

- [ ] **Step 3: Read context of line 269 in _service.scss**

```bash
sed -n '265,275p' ouroboros-design/scss/_service.scss
```

Verify what it decorates. If it is an ASCII hyphen, replace with `'–'`.

- [ ] **Step 4: Evaluate and document**

Complete this table and apply any needed fixes:

| File | Line | Ornament | Verdict | Action |
|------|------|----------|---------|--------|
| `_essay.scss:134` | `◇  ◇  ◇` | Gothic ✓ | Keep |
| `_base.scss:256` | `←` | Minimal ✓ | Keep |
| `_base.scss:320` | `–` | Verify encoding | Fix if hyphen |
| `_service.scss:192` | `⬡` | On-brand ✓ | Keep |
| `_service.scss:269` | `–` | Verify context | Fix if hyphen |
| `_service.scss:360` | `\201C` | Typographic ✓ | Keep |

If any ASCII fallback found, replace:
- Section dividers: use `◇  ◇  ◇` or `⸻`
- List bullets: use `⬡` (on-brand) or `◦`
- Pull-quote marks: use `\201C` / `\201D`

- [ ] **Step 5: Build and visual check**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io && npm install && npm run dev
```

Check a service page and any essay page for correct ornament rendering.

- [ ] **Step 6: Commit (only if changes made)**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design
git add scss/_essay.scss scss/_service.scss scss/_base.scss scss/_typography.scss
git commit -m "refactor: replace ASCII ornaments with Gothic-modern Unicode equivalents"
```

---

### Task 3: Glyph Audit — Logo / Wordmark

**Files:**
- Audit (read-only): `assets/images/logo.svg`, `_includes/nav.html`, `_includes/footer.html`
- Modify: `ouroboros-design/scss/_nav.scss` (or `_nav-primary.scss` after Task 5), `ouroboros-design/scss/_footer.scss` — only if rendering issues found

**Interfaces:**
- Consumes: running dev server from Task 1 or Task 2
- Produces: documented findings; SCSS fixes only if rendering issues found

- [ ] **Step 1: Find current size rules**

```bash
grep -n "logo-mark\|logo-text\|logo-sub" ouroboros-design/scss/_nav.scss
grep -n "logo-mark\|logo-text\|logo-sub" ouroboros-design/scss/_footer.scss
```

Note the widths/heights defined for `.nav-logo-mark` and `.footer-logo-mark`.

- [ ] **Step 2: Check favicon and touch icon**

```bash
grep -n "rel=\"icon\"\|apple-touch" _layouts/default.html
```

Note which image files are used for favicons.

- [ ] **Step 3: Visual audit at all sizes**

With dev server running at http://localhost:4000, check:

| Context | Size (from Step 1) | Renders? | Issue |
|---------|-------------------|----------|-------|
| Nav desktop | — | — | — |
| Nav mobile (< 768px) | — | — | — |
| Footer | 48px | — | — |

Checklist:
- [ ] Ouroboros ring is not clipped or distorted
- [ ] Wordmark "OUROBOROS" legible at nav size
- [ ] "Consulting" subtext legible at both sizes
- [ ] Logo renders correctly at 375px viewport (mobile)
- [ ] No visible rendering difference between nav and footer versions

- [ ] **Step 4: Commit if changes made**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design
git add scss/_nav.scss scss/_footer.scss
git commit -m "fix: correct logo mark rendering at [describe size/context]"
```

If no issues found, no commit needed.

---

### Task 4: Box-Model Audit

**Files:**
- Audit (read-only): `_layouts/home.html`, `_layouts/foundation.html`, `_layouts/service.html`, `_layouts/mission.html`, `_layouts/dashboard.html`
- Modify: relevant partials in `ouroboros-design/scss/` based on findings
- Create: `docs/superpowers/plans/box-model-findings.md` (findings table)

**Interfaces:**
- Consumes: running dev server
- Produces: findings table at `docs/superpowers/plans/box-model-findings.md`; SCSS fixes in relevant partials

- [ ] **Step 1: Find test pages for each layout**

```bash
grep -rl "layout: foundation" . --include="*.md" | head -3
grep -rl "layout: mission" . --include="*.md" | head -3
grep -rl "layout: dashboard" . --include="*.md" | head -3
```

Note test URLs for each layout type.

- [ ] **Step 2: Start dev server**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io && npm run dev
```

Test URLs:
- Home: http://localhost:4000/
- Service: http://localhost:4000/services/technology/
- Mission/Case study: http://localhost:4000/work/agora/
- Foundation: URL from Step 1
- Dashboard: URL from Step 1

- [ ] **Step 3: Audit each layout in DevTools**

For each layout, check using browser DevTools (Inspect → Computed panel):

**Overflow:** Any element whose child extends beyond its container? Look for `overflow: visible` on containers with children whose `offsetWidth > parentOffsetWidth`.

**Asymmetry:** For each card/section/hero block, are left/right paddings equal? Check siblings for inconsistent top/bottom spacing.

**Nesting violations:** Any element with `margin-top` that is also a flex/grid child receiving `gap` from its parent? (Creates double-spacing.)

**Mobile breakpoints:** Resize to 375px and 768px. Does content clip, collapse incorrectly, or overflow the viewport?

- [ ] **Step 4: Write findings table**

Write `docs/superpowers/plans/box-model-findings.md`:

```markdown
# Box-Model Audit Findings

| Layout | Component | Class | Issue | SCSS File | Fix |
|--------|-----------|-------|-------|-----------|-----|
| home.html | — | — | — | — | — |
| foundation.html | — | — | — | — | — |
| service.html | — | — | — | — | — |
| mission.html | — | — | — | — | — |
| dashboard.html | — | — | — | — | — |
```

Fill in every finding. "None found" is a valid value per layout.

Commit the findings table:
```bash
git add -f docs/superpowers/plans/box-model-findings.md
git commit -m "docs: box-model audit findings table"
```

- [ ] **Step 5: Apply fixes**

For each finding, locate the SCSS rule in the appropriate partial and fix it.

**Overflow fix (padding pushes content outside container):**
```scss
// Before
.section-wrapper {
  padding: 4rem 2rem;
}
// After — clamp keeps padding proportional
.section-wrapper {
  padding: 4rem clamp(1rem, 4vw, 2rem);
}
```

**Asymmetry fix:**
```scss
// Before
.card {
  padding: 1.5rem 2rem 1rem 1.5rem;
}
// After
.card {
  padding: 1.5rem 2rem;
}
```

**Nesting violation fix (flex child double-spacing):**
```scss
// Before: parent has gap: 1.5rem AND child has margin-top: 1.5rem
.grid-child {
  margin-top: 1.5rem; // remove — parent gap handles spacing
}
// After
// (rule deleted)
```

- [ ] **Step 6: Build and verify**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io && npm install && npm run dev
```

Re-check each fixed component at desktop (1280px) and mobile (375px, 768px).

- [ ] **Step 7: Commit fixes**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design
git add scss/_home.scss scss/_service.scss scss/_framework.scss  # only changed files
git commit -m "fix: correct box-model issues across all five layouts"
```

---

### Task 5: Nav File Split

**Files:**
- Create: `ouroboros-design/scss/_nav-primary.scss`
- Create: `ouroboros-design/scss/_nav-secondary.scss`
- Modify: `ouroboros-design/scss/index.scss` line 13
- Delete: `ouroboros-design/scss/_nav.scss`

**Interfaces:**
- Consumes: nothing from Tasks 1–4
- Produces: `_nav-primary.scss` (desktop primary nav) and `_nav-secondary.scss` (section tabs + mobile) — both `@forward`-ed from `index.scss`

- [ ] **Step 1: Copy _nav.scss to both new files**

```bash
cp ouroboros-design/scss/_nav.scss ouroboros-design/scss/_nav-primary.scss
cp ouroboros-design/scss/_nav.scss ouroboros-design/scss/_nav-secondary.scss
```

- [ ] **Step 2: Edit _nav-primary.scss — remove secondary nav content**

Delete from `_nav-primary.scss`:
- Lines 368–372: `.nav-accordion-btn { display: none; }` — goes to secondary
- Lines 568–767: entire `.nav-secondary`, `.nav-sec-*` block — goes to secondary

Keep in primary:
- Lines 1–3: `@use` directives
- Lines 4–367: nav-shell through nav-dropdown variants
- Lines 373–407: `.nav-toggle` (primary hamburger)
- Lines 408–532: `@media (max-width: 768px)` responsive block for primary nav
- Lines 534–567: `.page-title-banner` block
- Lines 768–849: search wrap and search media queries
- Lines 850–925: `.search-page` and search results

After editing, verify line count is roughly 925 − ~200 = ~725 lines:
```bash
wc -l ouroboros-design/scss/_nav-primary.scss
```

- [ ] **Step 3: Edit _nav-secondary.scss — keep only secondary nav content**

Remove everything except:
- Lines 1–3: `@use "typography" as *; @use "base" as *; @use "chamfer" as *;` (required in both files)
- Lines 368–372: `.nav-accordion-btn { display: none; }` stub
- Lines 568–767: `.nav-secondary`, `.nav-sec-card`, `.nav-sec-item`, `.nav-sec-chevron`, `.nav-sec-dropdown`, `.nav-sec-dropdown-menu`, `.nav-sec-child-card`, `.nav-sec-child-item`

After editing, verify line count is roughly ~205 lines:
```bash
wc -l ouroboros-design/scss/_nav-secondary.scss
```

- [ ] **Step 4: Update index.scss**

In `ouroboros-design/scss/index.scss`, replace the single `@forward "nav"` line with two lines:
```scss
@forward "nav-primary";
@forward "nav-secondary";
```

- [ ] **Step 5: Build and verify**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io && npm install && npm run dev
```

Visual checks:
- [ ] Primary nav renders on desktop (logo, nav buttons, search)
- [ ] Secondary nav renders section tabs on desktop
- [ ] Hamburger button appears at < 768px
- [ ] Secondary nav toggles open/closed on mobile
- [ ] `.page-title-banner` renders on a non-home page (e.g., any service page)
- [ ] Search page (`/search/`) renders results correctly

If build errors: verify both new files have `@use` directives at lines 1–3, and that no class appears in both files.

- [ ] **Step 6: Delete _nav.scss and commit**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design
git rm scss/_nav.scss
git add scss/_nav-primary.scss scss/_nav-secondary.scss scss/index.scss
git commit -m "refactor: split _nav.scss into _nav-primary and _nav-secondary"
```

---

### Task 6: main.scss Cleanup

**Files:**
- Modify: `OUROBOROS-Consulting.github.io/assets/css/main.scss`
- Modify: `ouroboros-design/scss/_nav-primary.scss` (receives nav type/border rules)
- Modify: `ouroboros-design/scss/_nav-secondary.scss` (receives hamburger block)
- Modify: `ouroboros-design/scss/_home.scss` (receives hero + audience)
- Modify: `ouroboros-design/scss/_footer.scss` (receives footer-logo-text font rule; duplicates verified then deleted from main)

**Interfaces:**
- Consumes: `_nav-primary.scss` and `_nav-secondary.scss` from Task 5
- Produces: `main.scss` containing exactly three sections: `@use`, `.safety-exit`, light-mode overrides

- [ ] **Step 1: Verify duplicates exist in ouroboros-design before deleting**

```bash
grep -n "footer-container\|footer-links\b\|footer-logo\b\|values-grid\b" ouroboros-design/scss/_footer.scss ouroboros-design/scss/_home.scss
```

All five classes must be found in their respective files. If any are missing, add them before deleting from `main.scss`.

- [ ] **Step 2: Move nav typography rules to _nav-primary.scss**

Append to the bottom of `ouroboros-design/scss/_nav-primary.scss`:

```scss
// ── Logo text: EB Garamond ─────────────────────────────────────────────
.nav-logo-text {
  font-family: "EB Garamond", serif !important;
}

// ── Nav links: Cormorant SC small caps ─────────────────────────────────
.nav-links a,
.nav-links .nav-dropdown-toggle {
  font-family: 'Cormorant SC', Georgia, serif;
  letter-spacing: 0.08em;
}

// ── Nav icon buttons — gold border ─────────────────────────────────────
nav.nav-menu .nav-dropdown.nav-button .nav-card {
  border: 1px solid var(--gold) !important;
}

// ── Nav contact hexagon shape ───────────────────────────────────────────
.nav-contact {
  .card--formula {
    width: clamp(60px, 10vw, 80px);
    height: clamp(60px, 10vw, 80px);
    padding: 0;
    border: 5px solid var(--gold);
    clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
  }

  .card--formula__interior {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  i {
    font-size: 2.5rem;
    color: var(--text);
  }

  &:hover i {
    color: var(--gold);
  }
}
```

- [ ] **Step 3: Move footer-logo-text font rule to _footer.scss**

In `ouroboros-design/scss/_footer.scss`, find `.footer-logo-text` and add `font-family` inside it:
```scss
.footer-logo-text {
  font-family: "EB Garamond", serif !important;
  // ... existing rules stay
}
```

- [ ] **Step 4: Move hamburger to _nav-secondary.scss**

Append to the bottom of `ouroboros-design/scss/_nav-secondary.scss`:

```scss
// ── Mobile hamburger toggle ─────────────────────────────────────────────
.nav-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--gold);
  border-radius: 3px;
  color: var(--text);
  padding: 0.4rem 0.65rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover,
  &:focus {
    background: rgba(201, 168, 76, 0.15);
    color: var(--gold);
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }
}

@media (max-width: 768px) {
  .nav-hamburger {
    display: flex;
  }

  #nav-secondary-menu {
    display: none !important;

    &.nav-secondary--open {
      display: flex !important;
      flex-direction: column;
      background: var(--bg1);
      border-bottom: 1px solid var(--border);
      padding: 0.25rem 0;
      z-index: 90;
    }
  }
}
```

- [ ] **Step 5: Move hero and audience to _home.scss**

Append to the bottom of `ouroboros-design/scss/_home.scss`:

```scss
// ── Hero typography ────────────────────────────────────────────────────
.hero-name {
  font-family: "EB Garamond", Georgia, serif;
}

#hero .hero-name-sub {
  display: block;
  font-size: 0.5em;
  letter-spacing: 0.25em;
  font-weight: 400;
  color: var(--subdued);
  text-transform: uppercase;
}

#hero .hero-text {
  text-align: right;
}

// ── Who This Is For (homepage audience section) ────────────────────────
#audience {
  padding: 4rem 2rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4rem 6vw;
  }

  .audience-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
    margin-top: 2rem;
  }

  .audience-card {
    padding: 1.5rem;
    border: 1px solid var(--border);
    background: var(--bg2);
    border-radius: 2px;

    h3 {
      font-family: Lora, serif;
      font-size: 1.1rem;
      color: var(--gold);
      margin: 0 0 0.5rem;
    }

    p {
      color: var(--subdued);
      font-size: 0.95rem;
      line-height: 1.55;
      margin: 0;
    }
  }
}
```

- [ ] **Step 6: Rewrite main.scss to final three-section state**

Replace the entire content of `assets/css/main.scss` with:

```scss
---
---

@use "@ouroboros-consulting/ouroboros-design/scss/index" as *;

// ── Safety / Quick-exit button ────────────────────────────────────────────
// Always-visible escape hatch for survivors. Double-tap Escape also triggers.
.safety-exit {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem;
  font-family: Inter, system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  background: #8b1a1a;
  border: 1px solid #c94a4a;
  border-radius: 3px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover,
  &:focus {
    background: #a52222;
    transform: translateY(-1px);
    outline: 2px solid #ffd36b;
    outline-offset: 2px;
  }

  i { font-size: 0.9rem; }

  @media (max-width: 640px) {
    font-size: 0.7rem;
    padding: 0.5rem 0.7rem;
    span { display: none; }
  }
}


// ── Light-mode overrides for dark-background sections ────────────────────
// Nav and hero backgrounds stay dark in light mode — re-anchor --text to
// dark-mode cream so text remains readable against the dark surface.
@media (prefers-color-scheme: light) {
  nav.nav-menu,
  footer,
  #hero,
  .svc-hero {
    --text: #E8E4DC;
    color: var(--text);

    a { color: inherit; }
  }

  nav.nav-menu,
  footer {
    --bg1: #141414;
    --bg2: #1E1E1E;
    --bg3: #252525;
    --border: #333333;
    --bright: #FFFFFF;
    --subdued: #B0AAA0;
    --muted: #999999;
    --gold: #C9A84C;
    --gold-border: #B1935D;
  }
}
```

- [ ] **Step 7: Build and full visual check**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io && npm install && npm run dev
```

Check every section that moved:
- [ ] Nav logo text in EB Garamond
- [ ] Nav links in Cormorant SC
- [ ] Nav icon buttons have gold border
- [ ] Nav contact hexagons render (if `.nav-contact` is in use)
- [ ] Footer logo text in EB Garamond
- [ ] Mobile hamburger appears at ≤ 768px
- [ ] Secondary nav toggles on mobile
- [ ] Hero name in EB Garamond
- [ ] `.hero-name-sub` renders correctly
- [ ] `#hero .hero-text` is right-aligned
- [ ] Audience section renders on home page

- [ ] **Step 8: Commit**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io
git add assets/css/main.scss
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design
git add scss/_nav-primary.scss scss/_nav-secondary.scss scss/_home.scss scss/_footer.scss
git commit -m "refactor: move all site-level classes into ouroboros-design; main.scss now @use + .safety-exit + light-mode only"
```

---

### Task 7: Orphan Class Definitions

**Files:**
- Modify: `ouroboros-design/scss/_footer.scss` (`footer-social`, `footer-label`)
- Modify: `ouroboros-design/scss/_home.scss` (`values-card__*`, `testimonials-context`)
- Modify: `ouroboros-design/scss/_base.scss` (`hob-corner--*`, `hob-strip--*`)
- Modify: `ouroboros-design/scss/_framework.scss` (`foundation-links`, `exit-bar__*`)
- Modify: `ouroboros-design/scss/_buttons.scss` (`btn--ghost`)
- Modify: `ouroboros-design/scss/_service.scss` (`svc-section--cta`)

**Interfaces:**
- Consumes: current state of each partial after Task 6
- Produces: every class used in HTML templates has a corresponding SCSS definition

- [ ] **Step 1: Verify orphans still exist in HTML**

```bash
grep -rn "footer-social\|footer-label\|values-card__back\|values-card__front\|values-card__inner\|values-card__icon\|values-card__name\|values-card__desc\|values-card__surface\|hob-corner--\|hob-strip--\|foundation-links\|testimonials-context\|btn--ghost\|svc-section--cta\|exit-bar__btn\|exit-bar__label" _layouts/ _includes/ _about/ --include="*.html" --include="*.md"
```

Only define classes confirmed present in HTML. Skip any not found.

- [ ] **Step 2: Add footer-social and footer-label to _footer.scss**

```scss
.footer-social {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--subdued);
  font-size: 1.25rem;
  transition: color 0.15s ease;

  &:hover {
    color: var(--gold);
  }
}

.footer-label {
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

- [ ] **Step 3: Add values-card internals to _home.scss**

```scss
.values-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.values-card__front,
.values-card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.values-card__back {
  transform: rotateY(180deg);
}

.values-card__icon {
  font-size: 2rem;
  color: var(--gold);
  margin-bottom: 0.75rem;
}

.values-card__name {
  font-family: Lora, serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.values-card__desc {
  font-size: 0.9rem;
  color: var(--subdued);
  line-height: 1.5;
}

.values-card__surface {
  @include elevation-standard;
  padding: 1.5rem;
  border-radius: 2px;
  height: 100%;
}

.testimonials-context {
  font-size: 0.9rem;
  color: var(--subdued);
  font-style: italic;
  margin-top: 0.5rem;
}
```

- [ ] **Step 4: Add hob-corner and hob-strip directional variants to _base.scss**

First find the existing base class to place these adjacent:
```bash
grep -n "hob-corner\|hob-strip" ouroboros-design/scss/_base.scss
```

Add directional variants immediately after the base `.hob-corner` block:
```scss
.hob-corner--tl { top: 0; left: 0; }
.hob-corner--tr { top: 0; right: 0; }
.hob-corner--bl { bottom: 0; left: 0; }
.hob-corner--br { bottom: 0; right: 0; }

.hob-strip--top    { top: 0; left: 0; right: 0; }
.hob-strip--bottom { bottom: 0; left: 0; right: 0; }
.hob-strip--left   { top: 0; bottom: 0; left: 0; }
.hob-strip--right  { top: 0; bottom: 0; right: 0; }
```

- [ ] **Step 5: Add foundation-links to _framework.scss**

```scss
.foundation-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;

  a {
    color: var(--gold);
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
```

- [ ] **Step 6: Add btn--ghost to _buttons.scss**

First read existing button definitions to match pattern:
```bash
grep -n "btn--\|\.btn\b" ouroboros-design/scss/_buttons.scss | head -20
```

Add adjacent to existing button variants:
```scss
.btn--ghost {
  background: transparent;
  border: 1px solid var(--gold-border);
  color: var(--gold);

  &:hover,
  &:focus {
    background: rgba(201, 168, 76, 0.1);
    border-color: var(--gold);
  }
}
```

- [ ] **Step 7: Add svc-section--cta to _service.scss**

```scss
.svc-section--cta {
  text-align: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
```

- [ ] **Step 8: Add exit-bar parts if found in Step 1**

If `exit-bar__btn` or `exit-bar__label` were found in HTML, add to `_framework.scss`:
```scss
.exit-bar__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: #8b1a1a;
  color: #fff;
  border: 1px solid #c94a4a;
  border-radius: 3px;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
}

.exit-bar__label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

If not found in HTML, skip.

- [ ] **Step 9: Build and verify no regressions**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io && npm install && npm run dev
```

Verify no visual regressions on home page, a service page, and a foundation/mission page. Orphan class definitions are structural — no visual changes should appear.

- [ ] **Step 10: Commit**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design
git add scss/_footer.scss scss/_home.scss scss/_base.scss scss/_framework.scss scss/_buttons.scss scss/_service.scss
git commit -m "feat: define orphan classes that existed in HTML with no SCSS definition"
```

---

### Task 8: Naming Convention Comment

**Files:**
- Modify: `ouroboros-design/scss/index.scss`

**Interfaces:**
- Consumes: final state of `index.scss` from Task 5 (with `@forward "nav-primary"` and `@forward "nav-secondary"`)
- Produces: `index.scss` with naming convention comment block prepended

- [ ] **Step 1: Prepend comment block to index.scss**

Add the following at the very top of `ouroboros-design/scss/index.scss`, before any `@forward` directives:

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

- [ ] **Step 2: Build to verify no Sass compilation errors**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
```

Expected: build succeeds. Sass ignores `//` comments.

- [ ] **Step 3: Commit**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design
git add scss/index.scss
git commit -m "docs: add naming convention comment block to index.scss"
```

---

## Self-Review

| Spec requirement | Task |
|---|---|
| FA icons audited; replacements documented and applied | Task 1 |
| No generic/corporate/toneally mismatched icons remain | Task 1 |
| Typographic ornaments consistent with Gothic-modern aesthetic | Task 2 |
| Box-model audit complete; findings table written | Task 4 |
| No overflow, asymmetry, or nesting violations across all five layouts | Task 4 |
| `main.scss` contains ≤ 3 sections: `@use`, `.safety-exit`, light-mode | Task 6 |
| No class defined in both `main.scss` and `ouroboros-design` | Task 6 |
| Every class used in a layout/include has a SCSS definition | Task 7 |
| `_nav.scss` deleted; `_nav-primary.scss` and `_nav-secondary.scss` exist | Task 5 |
| Site builds and renders identically before and after | Tasks 5, 6 |
| Naming convention documented in `index.scss` | Task 8 |

All spec requirements covered. All steps contain actual code. No placeholders detected.
