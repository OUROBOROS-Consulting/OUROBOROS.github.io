# Service Lineup Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the OUROBOROS Consulting service lineup from 3 pages to 5 (add Investigations & Due Diligence and Brand & Digital Studio), with deterministic ordering, an updated nav, a trimmed Technology page, and a fifth intake card.

**Architecture:** Jekyll `_services` collection with permalink `/services/:slug/` — new pages are new files, ordering comes from a new `order:` front-matter key sorted in the two Liquid loops that list services. Nav is data-driven from `_data/nav.yml`. Intake branching is client-side JS keyed on space-separated `data-track` attributes.

**Tech Stack:** Jekyll 4 (rbenv Ruby 3.3.x), Liquid templates, YAML front matter, vanilla JS. No test framework — verification is `npm run build` plus inspection of `_site/` output.

**Spec:** `docs/superpowers/specs/2026-07-10-service-lineup-design.md` (approved).

## Global Constraints

- All work happens on branch `design`. Changes reach the live site only when merged/pushed to `main` — state this to the user at completion.
- **Navbar and hero are frozen.** The `_data/nav.yml` change is content-only. Do not edit nav markup, hero markup, or any SCSS/CSS anywhere in this plan.
- **No file renames in `_services/`.** Permalinks derive from filenames (`/services/:slug/`); renames break URLs.
- **No visual/style changes.** If a layout looks wrong with 5 cards, note it as a follow-up design task — do not fix it here.
- **Formspree is untouchable.** The form config block in `intake.html` (lines 589–593, `formId: 'xykbrlgb'`) must not be edited. Never send a test POST to Formspree — a prior diagnostic POST was explicitly denied; backend verification belongs to the user via their Formspree dashboard.
- **Copy rule (user preference — no first drafts):** structured front matter (tags, who, included, policies, pricing) in this plan is user-approved spec content and goes in verbatim. The `description`, `lede`, and `cta_body` strings in Tasks 3–4 are interim, assembled from spec wording so pages build and render; final prose and page body copy are drafted WITH the user in Task 8. **Task 8 must run in the main session — never dispatch it to a subagent.**
- **Mission framing:** commercial clients (attorneys, journalists, nonprofits, small businesses) are mission-aligned allies. No copy may frame commercial work as off-mission or second-class.
- **Pricing values are verbatim from the spec.** Do not round, reformat, or "improve" them.
- Build command: `npm run build` from the site root (`OUROBOROS-Consulting.github.io/`). Expected: exits 0, regenerates `_site/`. If Ruby errors appear, confirm rbenv Ruby 3.3.x is active (`ruby -v`) — Homebrew Ruby 4.x breaks Bundler/Jekyll.

---

### Task 1: Deterministic service ordering (`order:` keys + loop sorts)

**Files:**
- Modify: `_services/advocacy-investigation.md` (front matter, after `category: Services`)
- Modify: `_services/technology.md` (front matter, after `category: Services`)
- Modify: `_services/tutoring.md` (front matter, after `category: Services`)
- Modify: `_layouts/home.html:100`
- Modify: `services.html:29`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: the `order:` front-matter convention (integer, 1–5) that Tasks 3 and 4 must include in their new pages (`order: 2` and `order: 4` respectively), and two loops that sort by it.

- [ ] **Step 1: Add `order:` keys to the three existing service pages**

In `_services/advocacy-investigation.md`, after the line `category: Services` (line 6), add:

```yaml
order: 1
```

In `_services/technology.md`, after the line `category: Services` (line 6), add:

```yaml
order: 3
```

In `_services/tutoring.md`, after the line `category: Services` (line 6), add:

```yaml
order: 5
```

- [ ] **Step 2: Sort the homepage services loop by `order`**

In `_layouts/home.html`, the loop at line 100 currently reads:

```liquid
  <div class="testimonials-grid">
    {% for service in site.services %}
```

Change to:

```liquid
  <div class="testimonials-grid">
    {% assign sorted_services = site.services | sort: "order" %}
    {% for service in sorted_services %}
```

- [ ] **Step 3: Sort the services index loop by `order`**

In `services.html`, line 29 currently reads:

```liquid
    {% assign sorted_services = site.services | sort: "title" %}
```

Change to:

```liquid
    {% assign sorted_services = site.services | sort: "order" %}
```

- [ ] **Step 4: Build and verify order**

Run: `npm run build`
Expected: exits 0, no Liquid errors.

Run: `awk '/<section id="services">/,/<\/section>/' _site/index.html | grep -o 'href="/services/[a-z-]*/"'`
Expected (3 lines, in this order):

```
href="/services/advocacy-investigation/"
href="/services/technology/"
href="/services/tutoring/"
```

Run: `grep -o 'rc-title">[^<]*' _site/services/index.html`
Expected order: Advocacy & Investigation, Technology & AI Consulting, Tutoring Services (note: `&` renders as `&amp;`).

- [ ] **Step 5: Commit**

```bash
git add _services/advocacy-investigation.md _services/technology.md _services/tutoring.md _layouts/home.html services.html
git commit -m "feat: sort service listings by order front-matter key"
```

---

### Task 2: Trim `_services/technology.md` (frontend/design scope moves to the studio page)

**Files:**
- Modify: `_services/technology.md:11` (tags) and `:49-53` (specializations) — line numbers are pre-Task-1; after Task 1's `order: 3` insertion each is one line lower. Match on content, not line number.

**Interfaces:**
- Consumes: Task 1's `order: 3` already present in this file.
- Produces: a Technology page scoped to tech/AI only; the removed items reappear on the studio page in Task 4 (tags `Design Systems`, `Accessibility`, `SCSS` and the design/frontend/accessibility/typography offerings).

- [ ] **Step 1: Trim the tags line**

The tags line currently reads:

```yaml
tags: [Apple Ecosystem, Agentic AI, Claude, Automation, Smart Home, Records Management, Data Science, Statistics, R, Python, Workflow Design, Design Systems, Accessibility, Frontend Implementation, SCSS]
```

Replace with (removes `Design Systems`, `Accessibility`, `Frontend Implementation`, `SCSS`):

```yaml
tags: [Apple Ecosystem, Agentic AI, Claude, Automation, Smart Home, Records Management, Data Science, Statistics, R, Python, Workflow Design]
```

- [ ] **Step 2: Trim the specializations list**

The specializations list currently ends with:

```yaml
  - Systems design (data tooling, automations, workflow architecture, frontend)
  - Design systems & component architecture (SCSS, CSS custom properties)
  - Frontend implementation (vanilla JS, Jekyll, performance-first, no unnecessary frameworks)
  - Accessibility (WCAG, ARIA, semantic HTML, keyboard navigation)
  - Typography & editorial systems
```

Replace those five lines with this single line (drops "frontend" from the systems-design item; deletes the other four entirely):

```yaml
  - Systems design (data tooling, automations, workflow architecture)
```

Nothing else in the file changes — pricing, policies, body copy, and survivor sections stay.

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: exits 0.

Run: `grep -c 'Frontend Implementation\|Typography &amp; editorial' _site/services/technology/index.html`
Expected: `0` (grep exits 1 with count 0 — that is the pass condition).

Run: `grep -c 'svc-pricing-tier' _site/services/technology/index.html`
Expected: `6` (pricing untouched).

- [ ] **Step 4: Commit**

```bash
git add _services/technology.md
git commit -m "feat: scope technology page to tech/AI; design work moves to studio page"
```

---

### Task 3: Create `_services/investigations.md` (Investigations & Due Diligence)

**Files:**
- Create: `_services/investigations.md`

**Interfaces:**
- Consumes: the `order:` convention from Task 1 (this page is `order: 2`).
- Produces: page at `/services/investigations/` — linked by Task 5 (advocacy cross-link) and Task 6 (nav). Title string `Investigations & Due Diligence` must match Task 6's nav entry exactly.

- [ ] **Step 1: Create the file**

Create `_services/investigations.md` with exactly this content. Structured front matter (tags, who, included, policies, pricing) is approved spec content — verbatim. `description`, `lede`, and `cta_body` are interim spec-derived strings refined with the user in Task 8. The body contains only the spec-mandated survivor cross-link; body copy is drafted in Task 8.

```markdown
---
layout: service
title: Investigations & Due Diligence
icon: fa-magnifying-glass-chart
description: "Rigorous open-source investigation for attorneys, journalists, and organizations — methodologically sound, ethically bounded, attorney-ready."
category: Services
order: 2
lede: >
  Rigorous open-source investigation for professionals — attorney-ready,
  methodologically sound, ethically bounded. Public records, background
  verification, litigation support, and timeline reconstruction.
tags: [OSINT, Public Records, Due Diligence, Background Research, Litigation Support, Timeline Analysis]
cta_label: Book a Scoping Call
cta_body: Scoping calls are always free — we define the question, the sources, and the deliverable before any work begins. Every engagement starts with a conflict check. I respond within 48 hours.
who: >
  Attorneys, journalists, nonprofits, and small businesses that need
  investigation capacity — vetting a counterparty, supporting litigation,
  verifying claims, or reconstructing events.
included:
  - title: Scoping Call
    description: Free. Defines the question, the sources, and the deliverable before any work begins.
  - title: Public Records & OSINT Research
    description: Court records, corporate filings, property records, licensing, and digital footprint research.
  - title: Background & Identity Verification
    description: Counterparty vetting and pre-transaction diligence using public sources.
  - title: Litigation Support Research
    description: Fact development, witness background, and exhibit-ready sourcing.
  - title: Timeline & Pattern Analysis
    description: Event reconstruction from fragmented records.
  - title: Written Reports
    description: Sourced, reproducible, attorney-ready.
policies:
  - item: "Scoping call: Free"
  - item: "Public sources only — no surveillance, no trespass, no pretexting, no illegal access"
  - item: "No investigations targeting survivors, or serving stalking or harassment purposes — engagements are screened for misuse"
  - item: "Conflict check before every engagement"
  - item: "Findings reported as sourced facts, not conclusions for hire"
  - item: "Response time: Within 48 hours"
pricing:
  - name: Records & OSINT Research
    rate: $150–$250/hr
  - name: Analysis & Written Reports
    rate: $175–$275/hr
  - name: Litigation Support Retainer
    rate: Contact me
  - name: Flat-Rate Scoped Investigations
    rate: Contact me
---

*Navigating this as a survivor of abuse or institutional betrayal? Start with [Advocacy & Investigation](/services/advocacy-investigation/) instead.*
```

Note (trauma-informed, load-bearing): the misuse-screening and "no investigations targeting survivors" policies are published on the page deliberately — commercial OSINT tooling is the same tooling abusers use to locate survivors. Do not soften, shorten, or move these to a private note.

- [ ] **Step 2: Build and verify the page renders with all sections**

Run: `npm run build`
Expected: exits 0.

Run: `test -f _site/services/investigations/index.html && echo EXISTS`
Expected: `EXISTS`

Run: `grep -c 'svc-pricing-tier' _site/services/investigations/index.html`
Expected: `4`

Run: `grep -c 'screened for misuse' _site/services/investigations/index.html`
Expected: `1`

Run: `awk '/<section id="services">/,/<\/section>/' _site/index.html | grep -o 'href="/services/[a-z-]*/"'`
Expected (4 lines, in this order): advocacy-investigation, investigations, technology, tutoring.

- [ ] **Step 3: Commit**

```bash
git add _services/investigations.md
git commit -m "feat: add Investigations & Due Diligence service page"
```

---

### Task 4: Create `_services/design.md` (Brand & Digital Studio)

**Files:**
- Create: `_services/design.md`

**Interfaces:**
- Consumes: the `order:` convention from Task 1 (this page is `order: 4`).
- Produces: page at `/services/design/` — resurrects the dead nav URL from commit `6ff4340`, linked by Task 6 (nav). Title string `Brand & Digital Studio` must match Task 6's nav entry and Task 7's intake card title exactly.

- [ ] **Step 1: Create the file**

Create `_services/design.md` with exactly this content. Same copy rule as Task 3: structured front matter verbatim from spec; `description`/`lede`/`cta_body` interim; body empty until Task 8.

```markdown
---
layout: service
title: Brand & Digital Studio
icon: fa-pen-nib
description: "Identity, website, and growth for small organizations and practitioners — accessible, performance-first, no framework bloat."
category: Services
order: 4
lede: >
  Identity, website, and growth for small organizations and independent
  practitioners — accessible, performance-first, and free of framework bloat.
  One project ladder: identity, then site, then growth.
tags: [Brand Strategy, Visual Identity, Graphic Design, Web Design, Web Development, Accessibility, Design Systems, SCSS, Typography, Content Strategy]
cta_label: Book a Discovery Call
cta_body: Discovery calls are free (20 minutes). Tell me where your public presence stands and where you want it to go — I respond within 48 hours.
who: >
  Small organizations, independent practitioners, and nonprofits that need
  a credible public presence — a coherent identity, a site that loads fast
  and works for everyone, and a plan to grow.
included:
  - title: Brand Positioning & Messaging
    description: Voice, audience, and differentiation.
  - title: Visual Identity
    description: Logo, typography, color, and usage guidelines.
  - title: Graphic Design
    description: Print and digital collateral, decks, and one-pagers.
  - title: Web Design & Development
    description: Accessible (WCAG), performance-first, static-first — no unnecessary frameworks.
  - title: Design Systems
    description: Reusable component and token architecture for teams that maintain their own sites.
  - title: Content & Growth Strategy
    description: Editorial calendar, SEO fundamentals, and analytics setup.
  - title: Maintenance & Growth Retainer
    description: Ongoing updates, iteration, and reporting.
policies:
  - item: "Discovery call: Free (20 min)"
  - item: "Sites built accessible by default — WCAG conformance is included, not an add-on"
  - item: "You own everything: source files, code, accounts, documentation"
  - item: "Nonprofits, students & survivors: Reduced and sliding-scale rates available — ask"
  - item: "Response time: Within 48 hours"
pricing:
  - name: Brand & Growth Advisory
    rate: $100–$175/hr
  - name: Design & Build
    rate: $125–$200/hr
  - name: Flat-Rate Site Packages
    rate: Contact me
    notes: Identity + site bundles quoted as a fixed price.
  - name: Growth Retainer
    rate: Contact me
    notes: Monthly retainer for ongoing updates, iteration, and reporting.
---
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exits 0.

Run: `test -f _site/services/design/index.html && echo EXISTS`
Expected: `EXISTS`

Run: `grep -c 'svc-pricing-tier' _site/services/design/index.html`
Expected: `4`

Run: `awk '/<section id="services">/,/<\/section>/' _site/index.html | grep -o 'href="/services/[a-z-]*/"'`
Expected (5 lines, in this order): advocacy-investigation, investigations, technology, design, tutoring.

Run: `grep -o 'rc-title">[^<]*' _site/services/index.html`
Expected order: Advocacy & Investigation, Investigations & Due Diligence, Technology & AI Consulting, Brand & Digital Studio, Tutoring Services (with `&amp;` for `&`).

- [ ] **Step 3: Commit**

```bash
git add _services/design.md
git commit -m "feat: add Brand & Digital Studio service page at /services/design/"
```

---

### Task 5: Cross-link on the Advocacy & Investigation page

**Files:**
- Modify: `_services/advocacy-investigation.md` (body, after the paragraph ending "…evidence courts and investigators believe.")

**Interfaces:**
- Consumes: `/services/investigations/` created in Task 3 (link target must exist — do not run this task before Task 3).
- Produces: the professional-audience routing line the spec requires on the survivor page.

- [ ] **Step 1: Insert the cross-link paragraph**

In `_services/advocacy-investigation.md`, the body intro ends with this paragraph (line 89 pre-Task-1):

```markdown
I don't do surveillance, trespass, or illegal access. What I do: research publicly documented information, identify patterns in institutional behavior, help you navigate institutional channels strategically, and synthesize findings into evidence courts and investigators believe.
```

Immediately after it (before the `## AI and the Acceleration of Coercive Control` heading), insert a blank line and:

```markdown
*Attorney, journalist, or organization? See [Investigations & Due Diligence](/services/investigations/).*
```

No other content in the file changes.

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: exits 0.

Run: `grep -c 'href="/services/investigations/"' _site/services/advocacy-investigation/index.html`
Expected: `1`

- [ ] **Step 3: Commit**

```bash
git add _services/advocacy-investigation.md
git commit -m "feat: cross-link advocacy page to Investigations & Due Diligence"
```

---

### Task 6: Update Services nav dropdown (`_data/nav.yml`)

**Files:**
- Modify: `_data/nav.yml:3-11` (children of the Services entry only)

**Interfaces:**
- Consumes: `/services/investigations/` (Task 3) and `/services/design/` (Task 4) — both must exist or the nav ships 404s.
- Produces: five nav children mirroring the `order:` sequence; removes the dead "Design Systems" entry (fixes the standing 404).

- [ ] **Step 1: Replace the Services children**

`_data/nav.yml` lines 1–11 currently read:

```yaml
- title: Services
  url: /services/
  children:
    - title: Technology & AI
      url: /services/technology/
    - title: Design Systems
      url: /services/design/
    - title: Advocacy & Investigation
      url: /services/advocacy-investigation/
    - title: Pedagogy
      url: /services/tutoring/
```

Replace with:

```yaml
- title: Services
  url: /services/
  children:
    - title: Advocacy & Investigation
      url: /services/advocacy-investigation/
    - title: Investigations & Due Diligence
      url: /services/investigations/
    - title: Technology & AI
      url: /services/technology/
    - title: Brand & Digital Studio
      url: /services/design/
    - title: Pedagogy
      url: /services/tutoring/
```

The Resources, About, Work, and Projects entries below are untouched. This is a content-only change to a frozen navbar — no markup or style edits.

- [ ] **Step 2: Build and verify zero 404s**

Run: `npm run build`
Expected: exits 0.

Run:

```bash
for p in advocacy-investigation investigations technology design tutoring; do
  test -f "_site/services/$p/index.html" && echo "OK $p" || echo "MISSING $p"
done
```

Expected: five `OK` lines, no `MISSING`.

Run: `grep -c 'Design Systems' _site/index.html`
Expected: `0` in the nav (the string may legitimately appear inside the studio card's tags/description — if the count is nonzero, confirm every hit sits inside page content, not inside the nav markup).

- [ ] **Step 3: Commit**

```bash
git add _data/nav.yml
git commit -m "feat: five-service nav dropdown; remove dead Design Systems entry"
```

---

### Task 7: Intake form — fifth service card + `studio` track wiring

**Files:**
- Modify: `intake.html` (card grid ~lines 53–89; two `data-track` attributes at lines 417 and 459)

**Interfaces:**
- Consumes: the `Brand & Digital Studio` title from Task 4 (card title must match the page title).
- Produces: radio value `studio` that the existing branching JS (intake.html lines 570–586) routes to the technical Project Scope section. **The Formspree config block (lines 589–593) must not be touched.**

- [ ] **Step 1: Add the fifth service card**

In `intake.html`, inside `<div class="service-cards">`, after the fourth `<label class="service-card">` (the pedagogy card, closing `</label>` at line 88) and before the grid's closing `</div>` (line 89), insert — matching the indentation of the existing cards:

```html
      <label class="service-card">
        <input type="radio" name="service_type" value="studio" required>
        <div class="service-card-inner">
          <div class="service-card-icon"><i class="fa-solid fa-pen-nib"></i></div>
          <div class="service-card-title">Brand &amp; Digital Studio</div>
          <div class="service-card-desc">Brand identity, graphic design, web design &amp; development, growth strategy</div>
        </div>
      </label>
```

- [ ] **Step 2: Wire `studio` into the Project Scope track**

The branching JS shows an element when its space-separated `data-track` contains the selected radio value — no JS changes are needed, only two attribute edits.

Run: `grep -n 'data-track="technical"' intake.html`
Expected: exactly two matches — the Project Scope `track-section` (line 417) and its divider (line 459).

Change both occurrences of:

```html
data-track="technical"
```

to:

```html
data-track="technical studio"
```

(The other tracks — `survivor`, `survivor investigative`, `investigative`, `pedagogy` — are untouched.)

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: exits 0.

Run: `grep -c 'value="studio"' _site/intake/index.html`
Expected: `1`
(If `_site/intake/index.html` does not exist, locate the built page with `ls _site/intake*` and grep that file.)

Run: `grep -c 'data-track="technical studio"' _site/intake/index.html`
Expected: `2`

Run: `grep -c 'formId' _site/intake/index.html`
Expected: unchanged from before this task (verify with `git diff intake.html` that the Formspree block shows no changes).

- [ ] **Step 4: Manual browser check**

Run: `npm run dev` and open `http://localhost:4000/intake`. Verify:
- Five cards render; selecting **Brand & Digital Studio** shows the Project Scope section (same as Technical Advisory); selecting other cards still shows their sections.
- Desktop card grid is `repeat(4, 1fr)`, so the fifth card wraps to a second row at one-quarter width. **This is expected.** If it looks unacceptable, report it as a follow-up design task — do NOT edit CSS in this plan (visual changes are out of scope).

Stop the dev server when done.

- [ ] **Step 5: Commit**

```bash
git add intake.html
git commit -m "feat: add Brand & Digital Studio intake card wired to project-scope track"
```

---

### Task 8: Collaborative copy pass (USER-GATED — main session only)

**Files:**
- Modify: `_services/investigations.md` (body; possibly `description`/`lede`/`cta_body`)
- Modify: `_services/design.md` (body; possibly `description`/`lede`/`cta_body`)
- Modify (optional, user's call): `services.html:14-15` (index lede)

**Interfaces:**
- Consumes: the two pages created in Tasks 3–4 with interim copy.
- Produces: final user-approved prose. Nothing downstream depends on the wording.

**Do NOT dispatch this task to a subagent. Do NOT write draft prose before the user responds to the outlines.** Apostolos' standing preference: outline first, iterate collaboratively; he sets the writing agenda. Apply mission framing: commercial clients are allies serving the same mission — different tone and rates, never second-class.

- [ ] **Step 1: Present body outlines to the user and wait**

Present these outlines (as outlines, not drafts) and ask what to keep, cut, or reorder:

Investigations & Due Diligence body outline:
1. Methodology and credibility — statistical research background, federal IT, reproducible sourcing; why findings hold up.
2. Ethics and boundaries — public sources only; misuse screening rationale (the same tooling abusers use to find survivors); conflict checks.
3. Engagement models — hourly, retainer, flat-rate scoped investigations.
(The survivor cross-link is already in place from Task 3.)

Brand & Digital Studio body outline:
1. Approach — one buying decision, one project ladder: identity, then site, then growth.
2. Build philosophy — accessible by default, performance-first, static-first, no framework bloat; client owns everything.
3. Engagement models — advisory hourly, design & build hourly, flat-rate packages, growth retainer.

Also ask: should the `/services/` index lede (currently "Bespoke technology solutions, rigorous instruction, and precise institutional navigation…") be updated to reflect five services? The spec marks this as an optional ride-along.

- [ ] **Step 2: Draft with the user, section by section**

Iterate on each section per the user's direction. Also offer a quick review of the interim `description`, `lede`, and `cta_body` strings on both pages.

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: exits 0; spot-check both pages in `_site/services/investigations/index.html` and `_site/services/design/index.html` for the new body content.

- [ ] **Step 4: Commit**

```bash
git add _services/investigations.md _services/design.md services.html
git commit -m "feat: final copy for investigations and studio pages"
```

---

### Task 9: Full verification pass (spec checklist)

**Files:** none modified — verification only.

**Interfaces:**
- Consumes: everything above.
- Produces: confirmation against the spec's Verification section.

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: exits 0, no Liquid errors or warnings about `_services`.

- [ ] **Step 2: Run the spec checklist**

```bash
# New pages render with service.html sections
for p in investigations design; do
  echo "== $p =="
  grep -c 'svc-section' "_site/services/$p/index.html"
done
# Expected: a nonzero count for each (who/specialties-or-policies/included/pricing/CTA sections)

# Nav: five service entries, zero 404s
for p in advocacy-investigation investigations technology design tutoring; do
  test -f "_site/services/$p/index.html" && echo "OK $p" || echo "MISSING $p"
done

# Homepage + /services/ order 1–5
awk '/<section id="services">/,/<\/section>/' _site/index.html | grep -o 'href="/services/[a-z-]*/"'
grep -o 'rc-title">[^<]*' _site/services/index.html

# Intake card + wiring
grep -c 'value="studio"' _site/intake/index.html
grep -c 'data-track="technical studio"' _site/intake/index.html
```

Expected: all pages OK; order advocacy-investigation → investigations → technology → design → tutoring; intake counts 1 and 2.

- [ ] **Step 3: Manual smoke test**

Run `npm run dev`, then check in the browser: nav dropdown shows five entries and each resolves; homepage shows five service cards in order; `/services/` shows five cards; `/intake` behaves per Task 7 Step 4. Existing URLs (`/services/advocacy-investigation/`, `/services/technology/`, `/services/tutoring/`) unchanged.

Homepage `#services` uses `.testimonials-grid`, which now wraps five cards (3+2 or 2+2+1 depending on grid rules). Per spec: verify it looks acceptable at desktop widths; if it breaks, report it as a follow-up design task — do NOT edit CSS.

- [ ] **Step 4: Report to user**

State plainly: all changes live on branch `design` only; the production site updates when this merges to `main`. Form backend status (Formspree form `xykbrlgb`) remains the user's to verify in their dashboard — out of scope here.
