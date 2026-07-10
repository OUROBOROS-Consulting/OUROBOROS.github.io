# Service Lineup Redesign — Design Spec

**Date:** 2026-07-10
**Status:** Approved approach (A: audience-led, 5 services); spec pending user review
**Scope:** Content restructure only. No visual/design changes. Navbar and hero remain frozen; the Services dropdown change is content, not design.

## Problem

Market demand spans five areas: OSINT investigations, brand growth, graphic design, web development, and AI. Current lineup (Technology & AI, Advocacy & Investigation, Tutoring) covers AI well, covers OSINT only under survivor-focused framing, buries web development in Technology tags, and has no home for brand growth or graphic design. The nav also links a dead page (`/services/design/`, removed in commit `6ff4340`).

Demand is roughly even between mission-aligned clients (survivors, advocates) and commercial clients (attorneys, small orgs, businesses). All services delivered personally by Apostolos.

## Design

### Service architecture — five pages in `_services/`

| # | File | Title | URL | Status |
|---|------|-------|-----|--------|
| 1 | `advocacy-investigation.md` | Advocacy & Investigation | `/services/advocacy-investigation/` | Unchanged content |
| 2 | `investigations.md` | Investigations & Due Diligence | `/services/investigations/` | **New** |
| 3 | `technology.md` | Technology & AI Consulting | `/services/technology/` | Trimmed |
| 4 | `design.md` | Brand & Digital Studio | `/services/design/` | **New** |
| 5 | `tutoring.md` | Tutoring Services | `/services/tutoring/` | Unchanged |

**No file renames.** Collection permalink is `/services/:slug/` (slug derives from filename), so renaming would break existing URLs. Ordering is controlled by a new `order:` front-matter key (1–5 per the table) plus a one-line change to each of the two service loops:

- `_layouts/home.html:100` — `{% for service in site.services %}` → sort by `order`
- `services.html:29` — `sort: "title"` → `sort: "order"`

The new studio page deliberately reuses `/services/design/`: it resurrects the dead nav URL and recovers any backlinks to the old Design Systems page.

**Why two investigation pages:** same skill set, different audiences. Attorneys and organizations should not land on a trauma-informed survivor page with sliding-scale $0 rates; survivors should not land on a commercial due-diligence page. Rates, tone, and intake framing differ. Each page cross-links the other:

- On Advocacy & Investigation: "Attorney, journalist, or organization? See Investigations & Due Diligence."
- On Investigations & Due Diligence: "Navigating this as a survivor of abuse or institutional betrayal? Start with Advocacy & Investigation instead."

**Why one studio page:** brand growth, graphic design, and web development are one buying decision for the target client, framed as a project ladder: identity → site → growth.

### New page: Investigations & Due Diligence (`investigations.md`)

Front matter per `service.html` layout conventions:

- **layout:** service · **category:** Services · **order:** 2
- **icon:** `fa-magnifying-glass-chart`
- **title:** Investigations & Due Diligence
- **description / lede:** copy drafted collaboratively at implementation (outline-first per user preference); positioning: rigorous open-source investigation for professionals — attorney-ready, methodologically sound, ethically bounded
- **tags:** OSINT, Public Records, Due Diligence, Background Research, Litigation Support, Timeline Analysis
- **who:** attorneys, journalists, nonprofits, and small businesses needing investigation capacity — vetting a counterparty, supporting litigation, verifying claims, reconstructing events
- **included:**
  - Scoping call — free, defines question, sources, and deliverable
  - Public records & OSINT research — court records, corporate filings, property, licensing, digital footprint
  - Background & identity verification — counterparty vetting, pre-transaction diligence
  - Litigation support research — fact development, witness background, exhibit-ready sourcing
  - Timeline & pattern analysis — event reconstruction from fragmented records
  - Written reports — sourced, reproducible, attorney-ready
- **policies:**
  - Free scoping call
  - Public sources only — no surveillance, no trespass, no pretexting, no illegal access
  - No investigations targeting survivors, or serving stalking/harassment purposes; engagements screened for misuse
  - Conflict check before every engagement
  - Findings reported as sourced facts, not conclusions for hire
  - Response within 48 hours
- **pricing:**
  - Records & OSINT Research — $150–$250/hr
  - Analysis & Written Reports — $175–$275/hr
  - Litigation Support Retainer — contact
  - Flat-rate scoped investigations — contact
- **cta_label / cta_body:** point to `/intake` ("Investigative Research" category)

Ethics note (required, trauma-informed lens): the misuse-screening policy is load-bearing. Commercial OSINT tooling is the same tooling abusers use to locate survivors. The screening line and the "no investigations targeting survivors" boundary appear in the published policies, not just internally.

### New page: Brand & Digital Studio (`design.md`)

- **layout:** service · **category:** Services · **order:** 4
- **icon:** `fa-pen-nib`
- **title:** Brand & Digital Studio
- **description / lede:** drafted collaboratively at implementation; positioning: identity, website, and growth for small organizations and practitioners — accessible, performance-first, no framework bloat
- **tags:** Brand Strategy, Visual Identity, Graphic Design, Web Design, Web Development, Accessibility, Design Systems, SCSS, Typography, Content Strategy
- **who:** small organizations, independent practitioners, and nonprofits that need a credible public presence — a coherent identity, a site that loads fast and works for everyone, and a plan to grow
- **included:** (project-ladder order)
  - Brand positioning & messaging — voice, audience, differentiation
  - Visual identity — logo, typography, color, usage guidelines
  - Graphic design — print and digital collateral, decks, one-pagers
  - Web design & development — accessible (WCAG), performance-first, static-first, no unnecessary frameworks
  - Design systems — reusable component and token architecture for teams that maintain their own sites
  - Content & growth strategy — editorial calendar, SEO fundamentals, analytics setup
  - Maintenance & growth retainer — ongoing updates, iteration, reporting
- **policies:**
  - Free 20-minute discovery call
  - Sites built accessible by default — WCAG conformance is included, not an add-on
  - You own everything: source files, code, accounts, documentation
  - Nonprofits, students & survivors: reduced and sliding-scale rates available
  - Response within 48 hours
- **pricing:**
  - Brand & Growth Advisory — $100–$175/hr
  - Design & Build — $125–$200/hr
  - Flat-Rate Site Packages — contact (identity + site bundles quoted fixed)
  - Growth Retainer — contact (monthly)

### Trim: Technology & AI Consulting (`technology.md`)

Move to Brand & Digital Studio, remove here:

- Specializations: edit line 49 ("Systems design (data tooling, automations, workflow architecture, frontend)") to drop the word "frontend"; delete lines 50–53 entirely ("Design systems & component architecture (SCSS, CSS custom properties)", "Frontend implementation (vanilla JS, Jekyll, performance-first, no unnecessary frameworks)", "Accessibility (WCAG, ARIA, semantic HTML, keyboard navigation)", "Typography & editorial systems").
- Tags: remove `Design Systems`, `Accessibility`, `Frontend Implementation`, `SCSS`.
- Add `order: 3`. Nothing else changes — pricing, policies, body copy, survivor sections stay.

### Unchanged pages

- `advocacy-investigation.md`: add `order: 1` and the one-line cross-link to Investigations & Due Diligence. All other content untouched.
- `tutoring.md`: add `order: 5` only. Wyzant funnel stays.

### Navigation (`_data/nav.yml`)

Services children become:

```yaml
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

This removes the dead "Design Systems" entry (fixes the 404) and mirrors the `order:` sequence. Content-only change to the frozen navbar; no markup or style edits.

### Intake form (`intake.html`)

The four service-category cards are audience-framed, not page-mapped. "Investigative Research" (value `investigative`) already covers both investigation pages. One addition — a fifth card:

- value: `studio` · icon: `fa-pen-nib` · title: "Brand & Digital Studio" · desc: "Brand identity, graphic design, web design & development, growth strategy"
- Conditional-section wiring: `studio` shows the same generic sections as `technical` (verify exact branching in intake JS at implementation).

### Homepage impact

- `#services` grid renders 5 cards instead of 3 via the existing loop — no template change beyond the `order` sort. Grid uses `.testimonials-grid`; verify 5-card wrap looks acceptable at desktop widths (3+2 or 2+2+1 depending on grid rules). If it breaks, that is a follow-up design task, not part of this restructure.
- Hero and "Who This Is For" audience cards: frozen, untouched. A commercial-audience card is a candidate for a later pass.

## Out of scope

- Any visual/style changes; hero and audience sections
- Page body copy (drafted collaboratively at implementation, outline-first)
- Homepage bug fixes from the earlier debugging session (testimonial markdownify, Formspree backend status) — separate track
- `/services/` index lede copy update (mentions only tech/instruction/navigation; small wording follow-up, can ride along at implementation if desired)

## Verification

- `npm run build` passes; no Liquid errors
- `/services/design/` and `/services/investigations/` render with all service.html sections
- Nav dropdown: five entries, zero 404s
- Homepage and `/services/` list five cards in order 1–5
- Existing URLs unchanged (advocacy-investigation, technology, tutoring)
- Intake: fifth card renders, form still submits, conditional sections behave for `studio`
