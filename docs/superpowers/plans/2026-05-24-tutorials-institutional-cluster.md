# Tutorials — Institutional Survival Cluster — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create three tutorial pages in `_resources/` and wire them into the tutorials index.

**Architecture:** Three `foundation.html` markdown files with inline HTML TL;DR callouts, prose intros, numbered steps, and resource links. Data file update activates the tutorial cards on the existing tutorials index.

**Tech Stack:** Jekyll, Liquid, Markdown, SCSS (existing design system — no changes), CSS custom properties for inline callout styling.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `_data/tutorials.yml` | Wire `link:` fields for the three new tutorials |
| Create | `_resources/tutorial-documenting-interactions.md` | Documenting Interactions with Authorities tutorial |
| Create | `_resources/tutorial-safety-plan.md` | Building a Personal Safety Plan tutorial |
| Create | `_resources/tutorial-trauma-responses.md` | Managing Trauma Responses tutorial |

---

## Task 1: Update tutorials.yml to wire the three links

**Files:**
- Modify: `_data/tutorials.yml`

- [ ] **Step 1: Open `_data/tutorials.yml` and update the three link fields**

Replace the `link: "#"` entries for Institutional Navigation, Survival Strategies, and Mental Health with their actual permalinks. The full updated file:

```yaml
- tag: Cybersecurity
  title: Recognizing Social Engineering Tactics
  description: Learn to identify common manipulation techniques used in phishing, pretexting, and personal interactions. Includes real-world examples and defense strategies.
  link: "#"

- tag: Data Privacy
  title: Securing Your Digital Footprint
  description: Step-by-step guide to auditing and minimizing your online presence. Covers account management, privacy settings, and monitoring tools.
  link: "#"

- tag: Institutional Navigation
  title: Documenting Interactions with Authorities
  description: Best practices for recording conversations, preserving evidence, and maintaining records when dealing with government or institutional entities.
  link: /resources/tutorial-documenting-interactions/

- tag: Survival Strategies
  title: Building a Personal Safety Plan
  description: Comprehensive framework for assessing threats, establishing support networks, and creating actionable emergency protocols.
  link: /resources/tutorial-safety-plan/

- tag: Mental Health
  title: Managing Trauma Responses in High-Stress Situations
  description: Techniques for recognizing and coping with trauma triggers, maintaining mental clarity, and accessing appropriate support resources.
  link: /resources/tutorial-trauma-responses/

- tag: Technology
  title: Setting Up Encrypted Communication Channels
  description: Guide to choosing and configuring secure messaging apps, email encryption, and voice communication tools for sensitive conversations.
  link: "#"
```

- [ ] **Step 2: Commit**

```bash
git add _data/tutorials.yml
git commit -m "data: wire tutorial links for institutional cluster"
```

---

## Task 2: Create tutorial-documenting-interactions.md

**Files:**
- Create: `_resources/tutorial-documenting-interactions.md`

- [ ] **Step 1: Create the file with this exact content**

```markdown
---
layout: foundation
title: Documenting Interactions with Authorities
description: Best practices for recording conversations, preserving evidence, and maintaining records when dealing with government or institutional entities.
permalink: /resources/tutorial-documenting-interactions/
category: Resources
back_url: /resources/tutorials/
lede: What you record, and how you store it, determines whether patterns of conduct ever become visible.
cta_body: Working through a dispute with an institution or authority figure? Let's talk through your situation.
cta_label: Get in Touch
---

<div style="background: var(--calloutbg); border-left: 3px solid var(--gold); padding: 1.5rem 2rem; margin: 2rem 0 2.5rem;">
  <p style="font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin: 0 0 1rem 0;">TL;DR</p>
  <ul style="margin: 0; padding-left: 1.25rem; color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.75;">
    <li>Write notes within hours of any contact — not days.</li>
    <li>Record date, time, location, names, and direct quotes (not summaries).</li>
    <li>Back up to a location the other party cannot access.</li>
    <li>Follow verbal conversations with a written summary email to create a timestamped record.</li>
    <li>Know your jurisdiction's recording laws before recording calls or meetings.</li>
    <li>Never edit originals — add dated annotations in a separate document.</li>
  </ul>
</div>

Documenting interactions with government agencies, law enforcement, courts, and institutional actors is not about being adversarial — it is about being accurate. Institutions have documentation systems. You should have one too. What you record and how you store it can determine whether patterns of conduct become visible, whether complaints are credible, and whether you can prove what happened when it matters.

This tutorial is for anyone navigating a dispute with an institution, a workplace, or an authority figure where the record may later matter. It is especially relevant if you have reason to believe the other party may dispute your account.

The most common documentation failure is not a lack of records — it is records that cannot be used. Notes written days later, stored in a shared account, summarizing conversations rather than quoting them. This guide addresses each of those failure modes.

## Steps

1. **Write notes immediately.** Document within two hours of any contact. Memory degrades fast under stress, and anything written days later becomes easier for an opposing party to challenge as reconstructed rather than contemporaneous.

2. **Use a consistent format.** Every entry should include: date, time, location (or medium — phone, in-person, email), full names and titles of everyone present, what was said in direct quotes where possible, and any decisions made or commitments given. "Jane Smith said she would provide a written response by Friday, May 30" is usable. "She said she'd get back to me" is not.

3. **Back up to a location outside the other party's control.** A device or account that the other party administers, shares access to, or could compel you to unlock is not a safe backup location. Options: encrypted cloud storage under your sole control, email to a personal account the other party does not know about, physical printouts stored off-site.

4. **Follow verbal interactions with a written summary email.** After any significant conversation, send a follow-up email: "Following up on our call today — my understanding is that you committed to X by Y date. Please correct me if I've misunderstood." This creates a timestamped, third-party-delivered record and gives the other party an opportunity to dispute the record in writing, which is itself useful.

5. **Know your jurisdiction's recording laws before recording.** Recording laws vary: some jurisdictions require only one-party consent (you can record your own calls without telling the other party); others require all-party consent. Recording without the required consent may make the recording inadmissible and could expose you to liability. Look up your state's law before recording anyone.

6. **Preserve originals.** Never edit, annotate, or mark up the original document. If you need to add context or notes, create a separate dated document referencing the original. Courts and investigators look at metadata; an edited original looks like tampering.

## Common Mistakes

- **Waiting days to write notes.** Courts and investigators are trained to ask when notes were made relative to the events they describe. Same-day notes are far more defensible than reconstructed ones.
- **Storing records on shared devices or accounts.** If the other party has administrator access, or if a device is in a shared home, treat it as accessible to them.
- **Summarizing rather than quoting.** Summaries are your interpretation. Quotes are evidence. Write what was said, not what you understood it to mean.
- **Editing originals.** Adding a note to a document changes its metadata. Create a new file for any annotations.
- **Discarding unfavorable records.** Document everything, including interactions that did not go well for you. Selective documentation is easily exposed and damages credibility.

## Resources

- [Glossary: Documentation chain](/resources/glossary/) — definition and storage principles
- [Survival Resources: Legal](/resources/survival/) — legal aid, whistleblower resources, and related support
```

- [ ] **Step 2: Start the dev server and verify the page renders**

```bash
cd /path/to/OUROBOROS-Consulting.github.io
npm run dev
```

Open `http://localhost:4000/resources/tutorial-documenting-interactions/` in a browser.

Expected: Page renders with the foundation layout — back link reading "Back" pointing to `/resources/tutorials/`, the TL;DR callout block with gold left border, prose paragraphs, numbered steps, and the CTA section at the bottom.

If the back link reads "Back" but points to `/services/`, the `back_url` front matter key is not being picked up — verify it is spelled exactly `back_url` (not `back-url` or `backUrl`).

- [ ] **Step 3: Verify the tutorials index shows a live link**

Open `http://localhost:4000/resources/tutorials/` in a browser.

Expected: "Documenting Interactions with Authorities" card renders as an `<a>` tag (not a `<div class="related-card--soon">`). The "Read Tutorial →" link is visible, not "Coming Soon."

- [ ] **Step 4: Stop the server and commit**

```bash
git add _resources/tutorial-documenting-interactions.md
git commit -m "feat: add documenting interactions tutorial"
```

---

## Task 3: Create tutorial-safety-plan.md

**Files:**
- Create: `_resources/tutorial-safety-plan.md`

- [ ] **Step 1: Create the file with this exact content**

```markdown
---
layout: foundation
title: Building a Personal Safety Plan
description: Comprehensive framework for assessing threats, establishing support networks, and creating actionable emergency protocols.
permalink: /resources/tutorial-safety-plan/
category: Resources
back_url: /resources/tutorials/
lede: A safety plan is a decision tree you build when calm, so you do not have to think clearly when you are not.
cta_body: Working through a situation where your safety is at risk? Let's talk through what you need.
cta_label: Get in Touch
---

<div style="background: var(--calloutbg); border-left: 3px solid var(--gold); padding: 1.5rem 2rem; margin: 2rem 0 2.5rem;">
  <p style="font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin: 0 0 1rem 0;">TL;DR</p>
  <ul style="margin: 0; padding-left: 1.25rem; color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.75;">
    <li>Write your plan when you have clarity — not during a crisis.</li>
    <li>Name 2–3 people who know your situation and how to reach you.</li>
    <li>Identify a specific safe location, not a vague category.</li>
    <li>Keep a go-bag with ID, medications, cash, and essential contacts accessible.</li>
    <li>Define the threshold that triggers leaving — in writing, in advance.</li>
    <li>Review and update every three months.</li>
  </ul>
</div>

A personal safety plan is not a sign that something bad is about to happen — it is a decision framework you build when you have the clarity to think it through. The point is that when a situation deteriorates, you have already decided what to do, who to call, and where to go. Decisions made under duress are almost always worse than decisions made in advance.

This tutorial is for anyone in a situation where their physical or psychological safety may be at risk — whether from an individual, an institution, or an unfolding crisis. The framework applies to intimate partner situations, workplace conflicts with escalating retaliation, housing crises, and any other context where conditions could change faster than you can plan.

The most common problem with personal safety plans is that they exist at a level of generality that makes them useless under stress. "I'll call a friend" is not a plan. "I will call Maya at 555-0182, tell her the word 'umbrella,' and she will come to the Walgreens at Fifth and Main" is a plan.

## Steps

1. **Conduct a specific threat assessment.** Write down specifically what you are protecting against. "Something might happen" is not a threat. "My landlord has threatened to change the locks" or "my partner has taken my documents before and may try again" are threats. The plan should be calibrated to actual scenarios, not abstract risk.

2. **Name your safe contacts.** Identify 2–3 people who know your situation, know how to reach you if you go quiet, and know what to do if they cannot. Give each of them: your location at any given time (or a regular check-in schedule), a word or phrase that signals you need help without alerting someone nearby, and a fallback contact in case they cannot reach you directly.

3. **Identify a specific safe location.** Not "a friend's place" — a named address. If you had to leave in the next 30 minutes, where would you go? If that location is unavailable, what is the backup? Know whether your destination is accessible without a car, without a phone, or without cash.

4. **Agree on a communication protocol.** Establish a check-in schedule with your contacts — if you miss it without warning, that is the signal. Agree on a secure channel (Signal is preferable for sensitive conversations). Have a code word that means "I need help and cannot say so openly."

5. **Prepare a go-bag.** Gather and store in an accessible, non-obvious location: government-issued ID, passport if you have one, list of medications with dosages, three to five days of essential medications if possible, some cash (cards can be tracked or frozen), phone charger, and a written list of important phone numbers (do not rely on a locked phone for this). Update it every six months.

6. **Define your financial threshold.** Decide in advance: which accounts you would need to access, which you would freeze, who has authority to act if you cannot. If someone else has access to shared accounts, know the process for securing your portion. Write this down before you need it.

7. **Set a review date.** Circumstances change. Add a calendar reminder to review the plan every three months — update contacts, locations, and the go-bag as needed.

## Common Mistakes

- **Making the plan too general.** A plan that requires decisions under stress is not a plan. Every element should be a fact, not a category.
- **Not telling anyone.** A plan only you know is a plan that cannot be activated by anyone else. Your contacts need to know it exists and what to do.
- **Storing the plan where it could be found.** Keep it in a location the other party cannot access — a personal cloud account, a trusted contact's home, a secure note app with a password they do not know.
- **Skipping the financial piece.** Access to money is access to options. Financial control is a common feature of coercive situations; this step is not peripheral.
- **Treating the plan as permanent.** A plan written six months ago with outdated contact information or an old safe location is not a safety net.

## Resources

- [Survival Resources: Crisis](/resources/survival/) — crisis hotlines, shelter resources, immediate safety support
- [Survival Resources: Legal](/resources/survival/) — legal aid and rights information
- [Glossary: Coercive control](/resources/glossary/) — definition and pattern recognition
```

- [ ] **Step 2: Verify the page renders**

Open `http://localhost:4000/resources/tutorial-safety-plan/` in a browser (dev server from Task 2 may still be running; restart with `npm run dev` if not).

Expected: Foundation layout with TL;DR callout, prose paragraphs, 7 numbered steps, Common Mistakes and Resources sections, and the CTA block at the bottom.

- [ ] **Step 3: Verify the tutorials index card is live**

Open `http://localhost:4000/resources/tutorials/`.

Expected: "Building a Personal Safety Plan" card renders as a live `<a>` link with "Read Tutorial →".

- [ ] **Step 4: Commit**

```bash
git add _resources/tutorial-safety-plan.md
git commit -m "feat: add personal safety plan tutorial"
```

---

## Task 4: Create tutorial-trauma-responses.md

**Files:**
- Create: `_resources/tutorial-trauma-responses.md`

- [ ] **Step 1: Create the file with this exact content**

```markdown
---
layout: foundation
title: Managing Trauma Responses in High-Stress Situations
description: Techniques for recognizing and coping with trauma triggers, maintaining mental clarity, and accessing appropriate support resources.
permalink: /resources/tutorial-trauma-responses/
category: Resources
back_url: /resources/tutorials/
lede: Trauma responses are the nervous system doing exactly what it evolved to do. Managing them means having a plan that does not require good judgment to execute.
cta_body: Navigating a dispute or institutional process while managing trauma? Let's talk through your situation.
cta_label: Get in Touch
---

<div style="background: var(--calloutbg); border-left: 3px solid var(--gold); padding: 1.5rem 2rem; margin: 2rem 0 2.5rem;">
  <p style="font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin: 0 0 1rem 0;">TL;DR</p>
  <ul style="margin: 0; padding-left: 1.25rem; color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.75;">
    <li>Trauma responses are nervous system states — not choices, not weakness.</li>
    <li>Identify your early warning signs before you are fully activated.</li>
    <li>Have one grounding technique you can use anywhere; practice it when calm.</li>
    <li>Write a decision rule for activation: what you will not do while flooded.</li>
    <li>Distinguish between protective avoidance and avoidance that maintains the threat response.</li>
    <li>Disclose trauma history to institutions strategically, not reflexively.</li>
  </ul>
</div>

Trauma responses are not character flaws. They are the nervous system doing exactly what it evolved to do — prioritizing survival over deliberate cognition in the presence of perceived threat. The problem is that the threat cue is often no longer the original danger but something that resembles it: a tone of voice, a document format, an institutional setting that looks like a previous one.

Managing trauma responses in high-stress situations means two things: recognizing when you are in a physiological state that impairs your judgment, and having a plan for that moment that does not require good judgment to execute.

This tutorial is for people navigating institutional disputes, legal proceedings, or ongoing conflict with individuals who have caused them harm — contexts where you will regularly encounter triggers and need to stay functional. It is not a substitute for clinical care, but it is applicable immediately.

## Steps

1. **Learn your early warning signs.** The physiological response begins before conscious awareness. For most people it includes elevated heart rate, tension in the jaw or chest, a narrowing of attention, or a feeling of unreality. Identify your specific pattern — ideally with a clinician, but self-observation works too. You cannot intervene in a response you cannot recognize.

2. **Name the state when it's happening.** Saying aloud or internally "I am flooded right now" or "my nervous system is activated" engages the prefrontal cortex slightly, which creates a small window of deliberate processing. This is not metaphor or positive thinking — it is functional neurological intervention. The naming does not need to be elaborate.

3. **Choose one grounding technique and practice it.** Two options that require no equipment: the 5-4-3-2-1 technique (name 5 things you can see, 4 you can feel, 3 you can hear, 2 you can smell, 1 you can taste) and physiological sigh (double inhale through the nose, long slow exhale through the mouth, repeat twice). Practice when calm. The technique needs to be automatic under activation, which means you need prior repetition.

4. **Write a decision rule for activation.** In advance, when you are not activated, write: "If I am flooded, I will not sign anything, reply to any email, make any financial decision, or have any legal conversation for 24 hours." This converts a difficult judgment call under stress into a pre-committed rule you simply execute. Store this somewhere visible.

5. **Distinguish avoidance from recovery.** Limiting exposure to triggering material during high-stress periods — not checking your inbox after 9pm, not reading documents right before bed — is adaptive. Using avoidance as a permanent strategy is not. If you cannot approach the relevant material at all, that is clinical information about what kind of support you need, not a management strategy.

6. **Manage disclosure to institutions strategically.** In legal or institutional contexts — HR, court proceedings, law enforcement — trauma history can be weaponized against you. It can be used to discredit your account, characterize your behavior as unreliable, or reframe your responses to harm as your pathology. Before disclosing trauma history in any institutional context, discuss what to disclose, in what framing, and at what stage with an attorney, advocate, or clinician who understands the strategic dimension.

## Common Mistakes

- **Pushing through without any regulation strategy.** The nervous system does not respond to willpower. Forcing yourself to continue when flooded produces worse decisions and often escalates the activation.
- **Using only avoidance.** Avoidance maintains the nervous system's threat model — it prevents the recalibration that exposure, in a controlled way, enables. Long-term avoidance narrows your life and entrenches the response.
- **Disclosing trauma history without strategic advice.** Honesty with institutions is not the same as safety. In adversarial contexts, disclosure without strategy gives the other party material.
- **Seeking general therapy rather than specialized care.** Complex trauma and PTSD require clinicians trained specifically in those presentations. General therapy, while not harmful, is often insufficient for the depth and specific mechanisms involved.
- **Treating the responses as permanent.** Trauma responses are malleable. With appropriate support and practice, the threshold for activation rises and the recovery time shortens.

## Resources

- [Scholarly Resources: Trauma & Recovery](/resources/scholarly/) — clinical literature on trauma and nervous system response
- [Survival Resources: Mental Health](/resources/survival/) — mental health support and referral resources
- [Glossary: Betrayal trauma](/resources/glossary/) — definition and clinical framework
```

- [ ] **Step 2: Verify the page renders**

Open `http://localhost:4000/resources/tutorial-trauma-responses/` in a browser.

Expected: Foundation layout with TL;DR callout, prose paragraphs, 6 numbered steps, Common Mistakes and Resources sections, and the CTA at the bottom.

- [ ] **Step 3: Verify all three tutorials index cards are live**

Open `http://localhost:4000/resources/tutorials/`.

Expected: All three cards — "Documenting Interactions with Authorities," "Building a Personal Safety Plan," and "Managing Trauma Responses in High-Stress Situations" — render as `<a>` links with "Read Tutorial →". The remaining three cards (Cybersecurity, Data Privacy, Technology) still show "Coming Soon."

- [ ] **Step 4: Commit**

```bash
git add _resources/tutorial-trauma-responses.md
git commit -m "feat: add trauma responses tutorial"
```

---

## Self-Review Notes

- **Spec coverage:** All three tutorials created with TL;DR, prose intro, numbered steps, Common Mistakes, Resources. `tutorials.yml` updated with live links. ✓
- **No placeholders:** All file contents are complete — no TBD, TODO, or "similar to above." ✓
- **Type consistency:** N/A — content files, no function signatures. ✓
- **foundation.html back_url:** Verified against layout source — `page.back_url` is the correct front matter key. ✓
- **Inline TL;DR styling:** Uses `var(--calloutbg)` and `var(--gold)` tokens directly — no `.callout` class assumed. ✓
- **CTA override:** `cta_body:` and `cta_label:` override the default "Get in Touch" text in foundation.html. ✓
