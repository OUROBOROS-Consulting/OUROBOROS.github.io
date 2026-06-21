# Framework Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/framework` About page presenting seven equal intellectual pillars in a custom pillar grid.

**Architecture:** New `_framework.scss` partial added to the `ouroboros-design` design system, consumed by the Jekyll site via `foundation` layout. Raw HTML grid injected into the markdown body of `_about/framework.md`. Two side-effect edits: About landing grid and nav.

**Tech Stack:** Jekyll static site, SCSS design system (`ouroboros-design/`), CSS Grid, Google Fonts (Lora/Inter already loaded)

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `ouroboros-design/scss/_framework.scss` | All pillar grid styles |
| Modify | `ouroboros-design/scss/index.scss` | Import new partial |
| Create | `_about/framework.md` | Page content — front matter + intro + HTML grid |
| Modify | `_about/about.html` | Add Framework card to `.related-grid` |
| Modify | `_data/nav.yml` | Add Framework under About children |

---

## Task 1: Write `_framework.scss` and import it

**Files:**
- Create: `ouroboros-design/scss/_framework.scss`
- Modify: `ouroboros-design/scss/index.scss`

- [ ] **Step 1: Create `_framework.scss`**

Create `/Users/apostolos/Claude/Code/ouroboros-design/scss/_framework.scss` with this exact content:

```scss
// ── Framework pillars grid ────────────────────────────────────────────────────

.framework-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;

  // 7th item alone in its row on 3-col grid → place in center column
  .framework-pillar:last-child:nth-child(3n + 1) {
    grid-column: 2;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);

    // Reset 3-col centering rule
    .framework-pillar:last-child:nth-child(3n + 1) {
      grid-column: unset;
    }

    // 7th item alone in its row on 2-col grid → center it
    .framework-pillar:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      max-width: 380px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;

    .framework-pillar:last-child:nth-child(odd) {
      grid-column: unset;
      max-width: none;
      margin-left: 0;
      margin-right: 0;
    }
  }
}

.framework-pillar {
  position: relative;
  padding: 1.75rem 1.75rem 2rem;
  border-left: 3px solid transparent;
  transition: border-color 0.2s, transform 0.2s;
  overflow: hidden;
  @include elevation-standard;

  &:hover {
    border-color: var(--gold);
    transform: translateY(-2px);

    .fw-rule {
      opacity: 1;
    }
  }
}

.fw-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.fw-tag {
  @include label-caps(0.65rem, 0.2em);
  color: var(--muted);
}

.fw-numeral {
  font-family: $font-serif;
  font-style: italic;
  font-size: 3.5rem;
  line-height: 1;
  color: var(--gold);
  opacity: 0.05;
  user-select: none;
  pointer-events: none;
}

.fw-name {
  font-family: $font-serif;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.3;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.fw-rule {
  height: 1px;
  border: none;
  background: linear-gradient(90deg, var(--gold) 0%, transparent 60%);
  margin-bottom: 1rem;
  opacity: 0.4;
  transition: opacity 0.2s;
}

.fw-body {
  font-family: $font-sans;
  font-size: 0.875rem;
  line-height: 1.75;
  color: var(--subdued);
  margin: 0;
}
```

- [ ] **Step 2: Add import to `index.scss`**

In `/Users/apostolos/Claude/Code/ouroboros-design/scss/index.scss`, add `@import "framework";` after `@import "floorplan";`:

```scss
// before:
@import "floorplan";

// after:
@import "floorplan";
@import "framework";
```

- [ ] **Step 3: Build the design system**

```bash
cd /Users/apostolos/Claude/Code/ouroboros-design && npm run build
```

Expected: `dist/ouroboros.css` rebuilt with no errors. You'll see a success message from the sass compiler.

- [ ] **Step 4: Reinstall in the site to pick up the new CSS**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS-Consulting.github.io && npm install
```

Expected: Completes without error. The `node_modules/@ouroboros-consulting/ouroboros-design/dist/ouroboros.css` now contains `.framework-grid` and `.framework-pillar`.

- [ ] **Step 5: Verify classes exist in built CSS**

```bash
grep -c "framework-grid\|fw-rule\|fw-numeral" /Users/apostolos/Claude/Code/OUROBOROS-Consulting.github.io/node_modules/@ouroboros-consulting/ouroboros-design/dist/ouroboros.css
```

Expected: `3` (one match per selector).

- [ ] **Step 6: Commit**

```bash
cd /Users/apostolos/Claude/Code/ouroboros-design
git add scss/_framework.scss scss/index.scss dist/ouroboros.css
git commit -m "feat(framework): add framework pillar grid component"
```

---

## Task 2: Write `_about/framework.md`

**Files:**
- Create: `_about/framework.md`

- [ ] **Step 1: Create `_about/framework.md`**

Create `/Users/apostolos/Claude/Code/OUROBOROS-Consulting.github.io/_about/framework.md` with this exact content:

```markdown
---
layout: foundation
title: Intellectual Framework
category: About
permalink: /framework/
back_url: /about/
lede: >
  Seven commitments — theoretical and operational in equal measure —
  that define how this firm names harm, gathers evidence, and chooses its tools.
---

This firm operates from a set of explicit intellectual commitments — theoretical and operational in equal measure. The frameworks below are not decorative. They define how harm is named, how evidence is gathered, how tools are chosen, and what accountability actually looks like. Each one earns its place by doing real work in practice.

The technology choices here are held to the same standard as the theoretical ones. Principled tool selection — based on privacy architecture, transparency, and values alignment — is itself an intellectual commitment. These are not defaults.

<div class="framework-grid">

  <div class="framework-pillar">
    <div class="fw-header">
      <span class="fw-tag">Theory</span>
      <span class="fw-numeral">i</span>
    </div>
    <h3 class="fw-name">Betrayal Trauma Theory</h3>
    <hr class="fw-rule">
    <p class="fw-body">Jennifer Freyd's framework identifies a specific category of harm: trauma inflicted by institutions or individuals on whom the victim depends. Dependency suppresses detection and disclosure — a survival mechanism that institutions routinely exploit. The affirmative counterpart, institutional courage, defines the standard this firm holds organizations to: prioritizing accountability over self-protection. This is the load-bearing theory behind every institutional accountability engagement.</p>
  </div>

  <div class="framework-pillar">
    <div class="fw-header">
      <span class="fw-tag">Taxonomy</span>
      <span class="fw-numeral">ii</span>
    </div>
    <h3 class="fw-name">HiTOP</h3>
    <hr class="fw-rule">
    <p class="fw-body">The Hierarchical Taxonomy of Psychopathology replaces DSM categorical diagnoses with empirically derived spectra. Personality pathology, internalizing disorders, and externalizing behavior exist on dimensions — not in discrete boxes. This matters operationally: coercive control perpetrators rarely fit clean diagnostic profiles, and survivors rarely present with single-disorder pictures. HiTOP gives the firm a more accurate map of the psychological terrain it works in.</p>
  </div>

  <div class="framework-pillar">
    <div class="fw-header">
      <span class="fw-tag">Framework</span>
      <span class="fw-numeral">iii</span>
    </div>
    <h3 class="fw-name">Coercive Control</h3>
    <hr class="fw-rule">
    <p class="fw-body">Evan Stark's framework reframes intimate partner abuse as a liberty crime rather than an injury crime. Physical violence is one tactic within a larger pattern of isolation, surveillance, degradation, and microregulation of daily life. Measuring abuse by incident count systematically undercounts harm. This firm uses the coercive control framework in all survivor-facing work, in institutional accountability assessments, and in public education that addresses how harm actually operates.</p>
  </div>

  <div class="framework-pillar">
    <div class="fw-header">
      <span class="fw-tag">Practice</span>
      <span class="fw-numeral">iv</span>
    </div>
    <h3 class="fw-name">Trauma-Informed</h3>
    <hr class="fw-rule">
    <p class="fw-body">Trauma-informed practice — grounded in SAMHSA's six principles — shapes both how services are delivered and how research is conducted. Safety, trustworthiness, peer support, collaboration, empowerment, and attention to cultural context are not aspirational values; they are design constraints. Work that ignores trauma history in its process will replicate harm regardless of its stated intent. Every client engagement and public resource is built against this standard.</p>
  </div>

  <div class="framework-pillar">
    <div class="fw-header">
      <span class="fw-tag">AI</span>
      <span class="fw-numeral">v</span>
    </div>
    <h3 class="fw-name">Claude</h3>
    <hr class="fw-rule">
    <p class="fw-body">Anthropic's Claude is the AI system this firm uses for analysis, structured drafting, research synthesis, and reasoning under complexity. The choice is principled: Anthropic's Constitutional AI approach prioritizes safety and interpretability over capability at any cost. Claude was a collaborator in building this site and is used daily as a thinking partner in engagements where speed and rigor both matter. AI literacy is not optional in this work — it is part of the threat model.</p>
  </div>

  <div class="framework-pillar">
    <div class="fw-header">
      <span class="fw-tag">Infrastructure</span>
      <span class="fw-numeral">vi</span>
    </div>
    <h3 class="fw-name">GitHub</h3>
    <hr class="fw-rule">
    <p class="fw-body">All public work produced by this firm is version-controlled and auditable on GitHub. The same principle that demands institutional transparency in accountability work applies here: the record should be legible, persistent, and independently verifiable. The site itself is hosted via GitHub Pages. Open-source tooling wherever possible is not sentiment — it is how you avoid depending on systems that can be quietly altered.</p>
  </div>

  <div class="framework-pillar">
    <div class="fw-header">
      <span class="fw-tag">Hardware</span>
      <span class="fw-numeral">vii</span>
    </div>
    <h3 class="fw-name">Apple</h3>
    <hr class="fw-rule">
    <p class="fw-body">The firm's hardware and software stack is built on Apple's privacy-first architecture — on-device processing, end-to-end encrypted storage, and a platform where privacy is a design constraint rather than a compliance checkbox. For survivor advocacy work, operational security is not optional. The choice of Apple hardware is a direct consequence of the threat model: adversaries with resources, AI-accelerated tactics, and institutional cover require a baseline that treats privacy as default.</p>
  </div>

</div>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS-Consulting.github.io
git add _about/framework.md
git commit -m "feat(framework): add /framework page with seven intellectual pillars"
```

---

## Task 3: Update About grid and nav

**Files:**
- Modify: `_about/about.html`
- Modify: `_data/nav.yml`

- [ ] **Step 1: Add Framework card to `_about/about.html`**

In `_about/about.html`, add the following card inside the `.related-grid` div, after the CV card (last existing card):

```html
    <a href="{{ '/framework/' | relative_url }}" class="related-card">
      <p class="rc-tag">Foundations</p>
      <h2 class="rc-title">Intellectual Framework</h2>
      <p class="card-desc">The seven theoretical and operational commitments that define how this firm works.</p>
      <span class="card-link">Read more →</span>
    </a>
```

The full `.related-grid` div should now contain six cards total (Mission, Survival, Causes, Interests, CV, Framework).

- [ ] **Step 2: Add Framework to `_data/nav.yml`**

In `_data/nav.yml`, add `Framework` as a child of `About`. The About block currently ends with `url: /cv`. Add after it:

```yaml
    - title: Framework
      url: /framework/
```

The full About block should look like:

```yaml
- title: About
  url: /about/
  children:
    - title: Case Studies
      url: /case-studies/
    - title: Mission
      url: /mission
    - title: Story
      url: /story
    - title: Causes
      url: /causes/
    - title: CV
      url: /cv
    - title: Framework
      url: /framework/
```

- [ ] **Step 3: Commit**

```bash
git add _about/about.html _data/nav.yml
git commit -m "feat(framework): add Framework to About nav and landing grid"
```

---

## Task 4: Visual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: Jekyll builds successfully and serves at `http://localhost:4000`. No SCSS or liquid errors in the output.

- [ ] **Step 2: Check `/framework/`**

Open `http://localhost:4000/framework/` and verify:

- [ ] Hero renders with "Intellectual Framework" title and lede
- [ ] Back link goes to `/about/`
- [ ] Intro prose (2 paragraphs) appears above the grid
- [ ] 7 tiles render in a 3-column grid
- [ ] Each tile has: tag label (muted, small caps), roman numeral watermark (faint, top-right), Lora heading, gold rule, body paragraph
- [ ] Tile 7 (Apple) appears centered in its row
- [ ] Hover on any tile: left gold border appears, tile lifts 2px, gold rule brightens

- [ ] **Step 3: Check responsive**

Resize browser to ~750px wide: grid collapses to 2 columns, tile 7 spans full row and centers.  
Resize to ~400px: single column, no centering quirks.

- [ ] **Step 4: Check About landing (`/about/`)**

Open `http://localhost:4000/about/`. Verify "Intellectual Framework" card appears in the grid.

- [ ] **Step 5: Check nav**

Open any page. Click About in the nav. Verify "Framework" appears in the dropdown and links to `/framework/`.

- [ ] **Step 6: Final commit (if any minor fixes needed)**

```bash
git add -p  # stage only the specific fix
git commit -m "fix(framework): <describe what you fixed>"
```
