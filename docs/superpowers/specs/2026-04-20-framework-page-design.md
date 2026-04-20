# Framework Page Design Spec
**Date:** 2026-04-20  
**Status:** Approved

---

## Overview

A new `/framework` page under About that presents the firm's seven equal intellectual pillars — four theoretical frameworks and three principled technology choices — using a `foundation` layout with a custom HTML pillar grid injected into the markdown body.

---

## Architecture

| Piece | Decision |
|---|---|
| File | `_about/framework.md` |
| Layout | `foundation` |
| Permalink | `/framework` |
| Collection | `_about` (outputs at `/:slug`) |
| CSS | New `_framework.scss` partial in `ouroboros-design/scss/` |

**Side-effect files:**
- `_about/about.html` — add Framework card to `.related-grid`
- `_data/nav.yml` — add Framework entry under About children

---

## Page Front Matter

```yaml
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
```

---

## Body Structure

### Intro Prose (markdown, 2 paragraphs)

> This firm operates from a set of explicit intellectual commitments — theoretical and operational in equal measure. The frameworks below are not decorative. They define how harm is named, how evidence is gathered, how tools are chosen, and what accountability actually looks like. Each one earns its place by doing real work in practice.
>
> The technology choices here are held to the same standard as the theoretical ones. Principled tool selection — based on privacy architecture, transparency, and values alignment — is itself an intellectual commitment. These are not defaults.

### Pillar Grid (raw HTML injected after prose)

A `.framework-grid` container with seven `.framework-pillar` tiles.

---

## The Seven Pillars

| # | Tag | Name | Body |
|---|---|---|---|
| I | Theory | Betrayal Trauma Theory | Jennifer Freyd's framework identifies a specific category of harm: trauma inflicted by institutions or individuals on whom the victim depends. Dependency suppresses detection and disclosure — a survival mechanism that institutions routinely exploit. The affirmative counterpart, institutional courage, defines the standard this firm holds organizations to: prioritizing accountability over self-protection. This is the load-bearing theory behind every institutional accountability engagement. |
| II | Taxonomy | HiTOP | The Hierarchical Taxonomy of Psychopathology replaces DSM categorical diagnoses with empirically derived spectra. Personality pathology, internalizing disorders, and externalizing behavior exist on dimensions — not in discrete boxes. This matters operationally: coercive control perpetrators rarely fit clean diagnostic profiles, and survivors rarely present with single-disorder pictures. HiTOP gives the firm a more accurate map of the psychological terrain it works in. |
| III | Framework | Coercive Control | Evan Stark's framework reframes intimate partner abuse as a liberty crime rather than an injury crime. Physical violence is one tactic within a larger pattern of isolation, surveillance, degradation, and microregulation of daily life. Measuring abuse by incident count systematically undercounts harm. This firm uses the coercive control framework in all survivor-facing work, in institutional accountability assessments, and in public education that addresses how harm actually operates. |
| IV | Practice | Trauma-Informed | Trauma-informed practice — grounded in SAMHSA's six principles — shapes both how services are delivered and how research is conducted. Safety, trustworthiness, peer support, collaboration, empowerment, and attention to cultural context are not aspirational values; they are design constraints. Work that ignores trauma history in its process will replicate harm regardless of its stated intent. Every client engagement and public resource is built against this standard. |
| V | AI | Claude | Anthropic's Claude is the AI system this firm uses for analysis, structured drafting, research synthesis, and reasoning under complexity. The choice is principled: Anthropic's Constitutional AI approach prioritizes safety and interpretability over capability at any cost. Claude was a collaborator in building this site and is used daily as a thinking partner in engagements where speed and rigor both matter. AI literacy is not optional in this work — it is part of the threat model. |
| VI | Infrastructure | GitHub | All public work produced by this firm is version-controlled and auditable on GitHub. The same principle that demands institutional transparency in accountability work applies here: the record should be legible, persistent, and independently verifiable. The site itself is hosted via GitHub Pages. Open-source tooling wherever possible is not sentiment — it is how you avoid depending on systems that can be quietly altered. |
| VII | Hardware | Apple | The firm's hardware and software stack is built on Apple's privacy-first architecture — on-device processing, end-to-end encrypted storage, and a platform where privacy is a design constraint rather than a compliance checkbox. For survivor advocacy work, operational security is not optional. The choice of Apple hardware is a direct consequence of the threat model: adversaries with resources, AI-accelerated tactics, and institutional cover require a baseline that treats privacy as default. |

---

## Visual Design

### Grid Layout

```
Desktop (≥900px):  [  I  ] [  II ] [ III ]
                   [ IV  ] [  V  ] [  VI ]
                   [      VII (centered)  ]

Tablet (≥600px):   [  I  ] [  II ]
                   [ III ] [ IV  ]
                   [  V  ] [  VI ]
                   [ VII (centered) ]

Mobile:            Single column
```

### Tile Anatomy

```
┌─────────────────────────────────────┐
│  THEORY                    ── i ──  │  ← tag (Cormorant SC, --muted) | roman numeral watermark (5% opacity, 4rem)
│                                     │
│  Betrayal Trauma Theory             │  ← Lora serif, --text, 1.25rem
│  ─────────────────── (gold rule)    │  ← thin --gold hr
│                                     │
│  Jennifer Freyd's framework...      │  ← Inter, --subdued, 0.9rem
│                                     │
└─────────────────────────────────────┘
```

### Tile States

- **Default:** `elevation-standard` background (scallop texture + `--bg2`), no border
- **Hover:** gold rule brightens to `--gold`, `3px solid var(--gold)` left border appears, subtle `translateY(-2px)` lift

### CSS File

New partial: `ouroboros-design/scss/_framework.scss`  
Import added to: `ouroboros-design/scss/index.scss`

Key selectors:
```
.framework-grid       — CSS grid container, 3-col desktop
.framework-pillar     — individual tile, elevation-standard
.fw-tag               — small caps eyebrow label
.fw-numeral           — roman numeral watermark, position: absolute, top-right
.fw-name              — Lora serif heading
.fw-rule              — thin gold hr
.fw-body              — Inter body paragraph
```

---

## Nav & About Grid Changes

### `_data/nav.yml` — add under About children:
```yaml
- title: Framework
  url: /framework/
```

### `_about/about.html` — add card to `.related-grid`:
```html
<a href="{{ '/framework/' | relative_url }}" class="related-card">
  <p class="rc-tag">Foundations</p>
  <h2 class="rc-title">Intellectual Framework</h2>
  <p class="card-desc">The seven theoretical and operational commitments that define how this firm works.</p>
  <span class="card-link">Read more →</span>
</a>
```

---

## Build Sequence

1. Write `ouroboros-design/scss/_framework.scss`
2. Import in `ouroboros-design/scss/index.scss`
3. Build design system: `cd ouroboros-design && npm run build`
4. Run `npm install` in site directory to pick up new CSS
5. Write `_about/framework.md` with front matter + intro prose + HTML pillar grid
6. Update `_about/about.html` — add Framework card
7. Update `_data/nav.yml` — add Framework nav entry
8. Verify with `npm run dev` at localhost:4000/framework/
