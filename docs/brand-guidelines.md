# ouroborOS Brand Guidelines

Version 1.0 · 2026-10-18 · Reference: the live homepage, repo commit `dccdbe6`.

Where this file and the homepage disagree, the homepage wins and this file gets fixed. Every value below traces to a file in this repo or to the live stylesheet. Items I could not verify sit in section 7.

---

## 1. Positioning

**Audience.** Small businesses. Solopreneurs and independent professionals. Twin Cities base (Minneapolis, Central Time).

**Promise.** "Clearer brands and websites. Less repetitive work. Better technical decisions."

**Offers.** Three, named exactly as in `_data/offers.yml`:

| Offer | Category | Problem in the client's words |
| --- | --- | --- |
| Brand & Website | Identity & Strategy | The business outgrew its brand or site. |
| Workflow & Automation | Technology | Repetitive work eats attention. |
| Technical Review & Decision Support | Technology | A tool, AI idea, or technical question needs a grounded second opinion. |

**Method.** Understand, Choose, Hand off. Three ideas carry it: the smallest useful intervention, scope sized to what the client can maintain, and a handoff the client owns.

**Proof.** Federal work at HHS shows technical judgment and operational continuity. The homepage says so itself: those references are "not like-for-like small-business projects." Keep that disclosure next to every federal testimonial.

**Outside the consulting brand.** Survivor advocacy, institutional-betrayal framing, and memoir. Those belong to separate surfaces (section 8). The consulting site neither links to them by default nor borrows their vocabulary.

---

## 2. Voice

**One line.** A practitioner who tells you what the work involves, what it costs, and what you keep.

### Pillars

| Pillar | Sounds like | Avoid |
| --- | --- | --- |
| Plain | "Clearer brands and websites. Less repetitive work. Better technical decisions." | Jargon, hype, superlatives, "bespoke", "award-winning" with no named award |
| Scoped | "scoped around what you need and what you can maintain" | Open-ended promises, "end-to-end", "transform" |
| Candid | "It is not a security audit, certification, or guarantee." | Hidden limits, implied guarantees |
| Handoff-minded | "A handoff you can own." | Dependency language, retainers sold as rescue |
| Low pressure | "Tell me what your business is working on... I'll follow up within 72 hours." | Urgency, scarcity, "limited spots" |

### Person

- **I** for what the consultant does, decides, or promises. ("I read every intake within 72 hours.")
- **We** for work done jointly with the client. ("We clarify what is getting in the way.")
- **You** for the client's situation.
- The firm never refers to itself as "this firm" or "the firm" on client-facing pages.

### Sentences and structure

- Headlines: short fragments or triads, each ending in a period.
- Body: sentences under 25 words. Paragraphs of 3 sentences or fewer.
- Page pattern: eyebrow label (small, uppercase, tracked) then H2 then one-line subhead.
- Lede formula: the client's problem in "you" language, then what I do, then what they leave with.
- Numbered steps use `01 / Label`.

### Calls to action

- Verb first, four words or fewer: "Start a conversation", "Work with me", "Book a Consultation".
- Link CTAs end with an arrow: "→".
- Every CTA band repeats the 72-hour response promise once. The hours line does not repeat it.

### Punctuation and marks

- Periods and commas carry rhythm. Em dashes only for a true interruption. Parentheticals for asides.
- No "not X, but Y" contrast constructions. State the thing.
- Dingbat `⎈` separates service keywords in the hero eyebrow. Middle dot `·` separates footer links.
- No emoji. Phosphor fill icons only (section 3).

### Vocabulary

| Prefer | Avoid |
| --- | --- |
| practical, scoped, right-sized, maintain, handoff, tradeoffs, constraints, grounded, capable | delve, dive in, unpack, journey, unlock, leverage, game-changing |
| "make easier", "simplify", "connect", "automate steps you can maintain" | dramatic metaphors (death sentence, sea of sameness, gauntlet) |
| the plain noun: "website", "workflow", "tool" | "solution", "ecosystem", "synergy" |

### Claims discipline

1. Every factual claim traces to a document you can name.
2. Credential floor is MS. No doctorate, no "PhD candidate", no affiliation for an unfinished degree.
3. A number needs a source note in the repo (who, what period, where recorded).
4. Name awards with the year, or drop the word "award-winning".
5. Testimonials are verbatim. Cuts get an ellipsis. Initials do not make a quote anonymous.
6. Client work uses a pseudonym only with written consent, and the page says so.
7. AI assistance is disclosed (link `/llm-disclosure/`).

### Page review checklist

1. Who is the reader, and what do they leave with?
2. Does the first screen state the problem in "you" language?
3. Are scope, price or price range, and limits visible?
4. Any survivor, advocacy, or betrayal vocabulary left over?
5. "I" and "we" used by the rules above?
6. Any em dash used for rhythm, or a "not X, but Y" line?
7. Any claim without a named source?
8. One CTA, verb first, with the 72-hour promise?
9. Meta title under 60 characters, description under 155, both written for a buyer.
10. Reads aloud in one breath per sentence.

---

## 3. Visual identity

Dark by default. Light theme follows the OS preference or the stored choice (`localStorage` key `ouroboros-theme`). Navigation, footer, page heroes, and the disclaimer bar stay dark in both themes.

### Color (tokens in `_sass/_primitives.scss`, themes in `_sass/themes/`)

| Role | Dark | Light | Contrast on its background |
| --- | --- | --- | --- |
| Background | `#000000` void-900 | `#F5F5F5` forensic-100 | n/a |
| Text | `#F5F5F5` | `#000000` | 19.26:1 both themes |
| Primary (links, CTA fill, borders) | `#DDCBA3` ember-gold-bright-600 | `#5C4B38` ember-gold-deep-900 | 13.15:1 dark, 7.65:1 light |
| Secondary (hover) | `#A69173` gold-bright-800 | `#73614A` gold-deep-800 | 5.44:1 light |
| Tertiary (rare highlight) | `#FFD700` amber-500 | `#8A6B00` amber-900 | 14.97:1 dark, 4.60:1 light |
| Surface variant | `#424242` forensic-700 | n/a | text on it: 9.22:1 |
| Outline | `#757575` forensic-500 | n/a | 4.56:1 on black |

Usage ratio: roughly 90% neutral, 9% gold primary, 1% amber. Button label on gold fill is black (13.15:1; 6.92:1 on the hover fill).

Ratios were computed with the WCAG relative-luminance formula on the hex values above. Mid-tone surfaces (marble overlays) are not covered here.

### Surfaces

- **Marble.** `Marble.png` tiles at 380px under a surface-colored gradient (40% to 77% transparent). Used on nav, footer, and `c-section--marble` bands. 1px primary border on nav.
- **Hero backdrop.** `Abstract.jpg`. Hero overlay token: void-900 at 38%.

### Typography (loaded in `_layouts/default.html`)

| Role | Family | Use |
| --- | --- | --- |
| Authority | Manufacturing Consent | `h1`, `h2`, `.authority`. Line height 0.95. |
| Utility | Syne 400 to 800 | Body, UI, buttons, labels |
| Forensic | Lora (loaded) | `em`, `blockquote`, `.forensic` subheads |
| Technical | IBM Plex Mono 400/500 (loaded) | `.technical` eyebrows, code, notation |

The last two roles are not wired yet. See section 6.

Scale (Material 3 tokens): display 57/45/36px, headline 32/28/24px, title 22/16/14px, body 16/14/12px, label 14/12/11px. Home hero H1: `clamp(3.25rem, 6.5vw, 5.75rem)`, right-aligned.

### Layout and shape

- Container max width 76rem. Grids: three columns for cards and steps, `related-grid` for card sets.
- Spacing: 0.25, 0.5, 1, 1.5, 2rem (`--md-sys-spacing-xs` to `-xl`).
- Radii: buttons pill (`9999px`); cards 12px by default; large cards 1.25rem.
- Elevation: `0 0.125rem 0.5rem rgb(0 0 0 / 14%)` on cards.
- Targets: buttons 2.75rem (44px) minimum height.

### Motion

- Standard easing `cubic-bezier(0.2, 0, 0, 1)`. Interaction duration 200ms. Card flip 500ms.
- Hover on linked cards lifts 0.1875rem. Buttons scale to 0.97 when pressed.
- `prefers-reduced-motion` disables smooth scroll. Any new motion must honor it.

### Components in use on the homepage

Banner ("Now accepting new clients →") · hero with logo emblem · offer cards · three-step process cards · flip-card audience grid · testimonial carousel with counter ("1 / 3") · stat cards · case study cards · CTA band ("A clear next step" / "Have a project in mind?") · hours line.

### Icons and logo

- Phosphor icons, fill style (`ph-fill`), from `@phosphor-icons/web@2.1.2`.
- Logo: `assets/images/logo.svg` (1000 x 1000). Hexagon, pawn, and lemniscate. Also the favicon and the hero emblem. Wordmark: `ouroborOS`.
- No clear-space or minimum-size rules exist yet (section 8).

### Imagery and video

- Textures and abstract forms. No stock photos of people at laptops.
- Hero video, if added: muted, looped, 8 to 12 seconds, 1920 x 1080 or smaller, WebM and MP4, under 3 MB, no audio track, self-hosted, poster frame `Abstract.jpg`.
- Needs a visible pause control (WCAG 2.2.2) and a still-image fallback under `prefers-reduced-motion`.
- Subject matter: slow marble, gold particles, dark architectural detail. Nothing with recognizable logos, brands, or faces.

### Accessibility invariants

- Target: WCAG 2.1 AA, conformance partial (stated on `/accessibility/`).
- Every interactive element shows a focus ring: 3px primary outline, 3px offset.
- Text contrast 4.5:1 or better against the surface it sits on.
- Never rely on color alone.

---

## 4. Naming

- Wordmark: `ouroborOS`. Running text: "ouroborOS Consulting". The hero H1 shows `ouroborOS` only.
- Founder: Apostolos Stamenos, MS.
- Other businesses use the same word. Ouroboros Consulting LLC (ouroboros-consulting.com) sells defense acquisitions support. A Facebook page uses the name for solopreneur coaching. Keep the location (Twin Cities) and the offer terms (brand, website, automation) in titles so searches separate you from them.

---

## 5. Where things live

| What | File |
| --- | --- |
| Color primitives | `_sass/_primitives.scss` |
| Font roles and base type | `_sass/identity.scss` |
| Theme tokens | `_sass/themes/`, `_sass/design/md/` |
| Site-level tokens (radius, motion, sizes) | `_sass/design/_semantic-tokens.scss` |
| Components | `_sass/components/` |
| Homepage copy | `index.md`, `_data/offers.yml`, `_data/audience.yml`, `_data/testimonials.yml`, `_data/banner.yml` |
| Response hours and promise | `_data/availability.yml` |
| Machine-readable identity | `_includes/schema.html`, `llms.txt` |
| Design agent | `.github/agents/gothic-designer.agent.md` |

The standalone `ouroboros-design` repo is legacy. This repo owns the tokens.

---

## 6. Known drift (verified in the repo, 2026-10-18)

1. `--font-forensic` and `--font-technical` have no definition anywhere. Eyebrows and subheads fall back to generic `monospace` and `serif`. Lora and IBM Plex Mono load but go unused for these roles. Confirm the computed fonts in the browser.
2. `identity.scss` comments name Spectral and Space Mono. The layout loads Lora and IBM Plex Mono.
3. `identity.scss` sets `body` to `var(--blush)`, `var(--ink)`, `var(--body)`. None is defined. Another rule probably overrides them. Confirm, then delete.
4. Google Fonts and jsDelivr requests load on every page. `/privacy/` discloses this. `/accessibility/` ("Fonts are self-hosted") and `llms.txt` ("No third-party requests") do not match.
5. The skip link in `_layouts/default.html` (line 96) is commented out. `/accessibility/` lists a skip-to-content link as built.
6. `README.md` and the design agent described an older system (Lora and Inter, navy surfaces, `#C9A84C` gold, chamfered corners, scallop textures). The site no longer uses chamfers or scallops.
7. `llms.txt` still describes survivors, seniors, veterans, and advocacy as clients and services.
8. `framework.md` meta says nine commitments. `about.md` says seven.

---

## 7. Claims register

| Claim | Where | Status |
| --- | --- | --- |
| "Award-winning federal data scientist" | `_data/team.yml` | Supported by the resume (HHS OCIO Employee of the Quarter 2022, Rookie of the Year 2023). Name them and the year on the page. |
| "5+ Years in Data Science & Research" | `index.md` | Consistent with the resume (Sep 2020 to Aug 2025 plus consulting). Record how the count is built. |
| "5 HHS Divisions Served (Federal Career)" | `index.md` | Unverified. Not on the resume. Needs a source. |
| HHS Protect and Vaccines.gov transition lead | `_data/testimonials.yml` | Supported by named-initial references. The resume's counts (8,900 datasets, 3,900 users) have no outside source. |
| Price range "$150 to $350 per hour; project pricing from $1,500" | `_includes/schema.html` | Matches `_services/identity.md` and `_services/technology.md`. |
| "MS, Statistics" | `team.yml`, `llms.txt` | Resume says Master of Statistics, NC State, August 2023. Use one exact form. |
| Skip-to-content link built | `legal/accessibility.md` | Contradicted by `_layouts/default.html:96`. |
| Fonts self-hosted | `legal/accessibility.md` | Contradicted by `_layouts/default.html:49-56` and `legal/privacy.md`. |
| "No third-party requests, no analytics, no trackers" | `llms.txt` | Contradicted by `legal/privacy.md` (Google Fonts, jsDelivr, Formspree, GitHub hosting). |

---

## 8. Open decisions

1. **Surfaces.** Which memoir and advocacy pieces, if any, link from the consulting site. Default: none.
2. **Forensic and technical fonts.** Adopt Lora and IBM Plex Mono (already loaded), or choose others.
3. **"Explore" in CTA labels.** Four homepage CTAs use it ("Explore Services", "Explore brand and website work →" and two more). Keep for navigation labels, or switch to "See services".
4. **Em dash and contrast lines on the homepage.** `tagline_2` and `offers.yml` (Technical Review) each use one em dash, and the Technical Review description carries a "not a sales pitch" contrast. Keep or edit.
5. **Self-host Syne and Manufacturing Consent.** Removes the Google Fonts request and makes the privacy claims uniformly true.
6. **Logo rules.** Clear space, minimum size, and one-color versions.
7. **Name disambiguation.** Add "Twin Cities" to the site title tag, or accept shared results.
