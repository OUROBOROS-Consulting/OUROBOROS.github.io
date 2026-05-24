# Tutorials — Institutional Survival Cluster

**Date:** 2026-05-24
**Status:** Approved

## Scope

Build the first three tutorials for the OUROBOROS Consulting site, activating the "Institutional Survival" cluster of the existing tutorials index:

1. **Documenting Interactions with Authorities** (tag: Institutional Navigation)
2. **Building a Personal Safety Plan** (tag: Survival Strategies)
3. **Managing Trauma Responses in High-Stress Situations** (tag: Mental Health)

The remaining three tutorials (Cybersecurity, Data Privacy, Technology) are out of scope for this implementation.

## Architecture

### Layout

All three tutorials use `foundation.html` — the prose layout already used by `glossary.md`. It renders `{{ content }}` as processed markdown, supports inline HTML for callout components, and requires no new layout files or SCSS.

### File Locations

```
OUROBOROS-Consulting.github.io/_resources/
  tutorial-documenting-interactions.md
  tutorial-safety-plan.md
  tutorial-trauma-responses.md
```

Permalinks follow the existing `_resources/` collection pattern: `/resources/:slug/`.

### Data Wire-Up

`_data/tutorials.yml` — update `link:` field for all three entries from `"#"` to the actual permalink. This activates the tutorial cards on `/resources/tutorials/`.

## Per-File Structure

Each tutorial follows this exact structure:

1. **Front matter**
   - `layout: foundation`
   - `title`, `description`, `permalink`, `category: Resources`

2. **TL;DR callout** — inline `<div>` styled with design system tokens (`--calloutbg` background, `--gold` left border, `--gold` label). No `.callout` class exists; use inline `style` attributes referencing CSS custom properties. Contains 5–6 bullet points (not italic — override the `.post-body blockquote` rule by using a `div`, not a `blockquote`). Designed to be useful to someone in an active situation who won't read further.

3. **Prose intro** — 2–3 paragraphs: what this tutorial covers, who it's for, why it matters. Authoritative, non-hedged register consistent with the Glossary.

4. **`## Steps` section** — numbered, each step gets 1–3 sentences of context. Actionable, not vague.

5. **`## Common Mistakes` section** — short list of things that undermine the tutorial's goal. Informs without being preachy.

6. **`## Resources` section** — links to related site pages (`/resources/survival/`, `/resources/glossary/`, etc.).

## Content Constraints

- Tone: consistent with existing site voice — direct, clinical, non-patronizing
- No hedging language ("you might want to consider…")
- No legal advice disclaimers — the site does not use them elsewhere
- Internal links only in Resources sections; no external links unless they are already present on the Survival page
- Layered depth: TL;DR handles crisis readers; full content handles preparatory readers

## Out of Scope

- New SCSS or layout files
- New `_includes/` components
- The remaining three tutorials (Cybersecurity, Data Privacy, Technology)
- Any changes to `tutorials.html` or the tutorials index layout
