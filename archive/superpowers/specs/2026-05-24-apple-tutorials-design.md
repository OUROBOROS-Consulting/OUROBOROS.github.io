# Apple Device Tutorials — Design Spec

**Date:** 2026-05-24
**Status:** Approved

## Scope

Build four tutorials for the OUROBOROS Consulting site under a new "Apple Devices" tag cluster in the tutorials index. Content sourced from user's Obsidian notes at `_Sanctuary/OS/`.

1. **Auditing Your Apple Device for Surveillance Risks** (tag: Apple Devices)
2. **Protecting Your Data with iCloud Advanced Data Protection** (tag: Apple Devices)
3. **Using Focus Modes to Compartmentalize Your Digital Life** (tag: Apple Devices)
4. **Setting Up Encrypted Communication on Apple Devices** (tag: Apple Devices)

The existing three "Coming Soon" cards (Cybersecurity, Data Privacy, Technology) are out of scope.

## Architecture

### Layout

All four tutorials use `foundation.html` — identical to the institutional cluster tutorials already live. No new layout files or SCSS required.

### File Locations

```
OUROBOROS-Consulting.github.io/_resources/
  tutorial-apple-security-audit.md
  tutorial-icloud-adp.md
  tutorial-focus-modes.md
  tutorial-encrypted-communication.md
```

Permalinks follow the `_resources/` collection pattern: `/resources/:slug/`.

### Data Wire-Up

`_data/tutorials.yml` — append four new entries with `link:` set to real permalinks from the start (not `"#"`).

## Per-File Structure

Each tutorial follows this exact structure:

1. **Front matter**
   - `layout: foundation`
   - `title`, `description`, `permalink`, `category: Resources`
   - `back_url: /resources/tutorials/`
   - `cta_label: Get in Touch`

2. **TL;DR callout** — inline `<div>` with `style` attributes using CSS custom properties. NOT `<blockquote>` (forced italic by `_essay.scss`). 5–6 bullets covering the most critical action items. Designed for someone in an active situation who won't read further.

   ```html
   <div style="background:var(--calloutbg);border-left:3px solid var(--gold);padding:1.25rem 1.5rem;margin:2rem 0;border-radius:2px;">
   <p style="color:var(--gold);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;">TL;DR</p>
   <ul style="margin:0;padding-left:1.25rem;color:var(--text);">
   <li>...</li>
   </ul>
   </div>
   ```

3. **Prose intro** — 2–3 paragraphs: what this covers, who it's for, why it matters. Direct, non-hedging.

4. **`## Steps` section** — numbered list; each step gets 1–3 sentences of actionable context.

5. **`## Common Mistakes` section** — bulleted list of failure modes that undermine the tutorial's goal.

6. **`## Resources` section** — internal links only. Link to `/resources/survival/`, `/resources/glossary/`, other completed tutorials as relevant.

## Content Source

Each tutorial's content maps directly from the Obsidian notes:

### Tutorial 1: Security Audit (`tutorial-apple-security-audit.md`)
Source: `Security & Privacy.md` (Find My, Family Sharing, Screen Time, Location Services, AirTag detection)

TL;DR bullets:
- Open Find My → People tab → remove anyone who shouldn't see your location
- Settings → Privacy → Location Services → Camera → disable or set "Never"
- Settings → Messages → Text Message Forwarding → remove unrecognized devices
- Settings → Screen Time → verify no restrictions were set without your knowledge
- If alerted to an unknown AirTag: use Find My to locate it physically — take seriously
- Settings → [Your Name] → Sign-In & Security → remove unrecognized trusted devices

Steps:
1. Audit Find My shared location (Find My app → People tab)
2. Audit Family Sharing location (Settings → [Your Name] → Family Sharing → Location Sharing)
3. Audit Screen Time (Settings → Screen Time — check for "This is a Family device" or unexplained limits)
4. Audit Location Services per-app (Settings → Privacy & Security → Location Services — flag social media, camera)
5. Disable GPS in photo EXIF (Settings → Privacy → Location Services → Camera → Never)
6. Check Text Message Forwarding (Settings → Messages → Text Message Forwarding)
7. Review trusted Apple ID devices (Settings → [Your Name] → Sign-In & Security)
8. Enable AirTag detection awareness (automatic on iOS; take unknown AirTag alerts seriously)

Common Mistakes:
- Assuming "only family" have access — Family Sharing grants real-time location by default
- Ignoring AirTag alerts — these are active tracking alerts, not spam
- Leaving Location Services on Always for apps that don't need it
- Sharing original photos via email (EXIF GPS data intact; iMessage/AirDrop strip on send, email does not)
- Assuming Screen Time limits are self-set

### Tutorial 2: iCloud ADP (`tutorial-icloud-adp.md`)
Source: `iCloud.md` (Advanced Data Protection, Family Sharing safety, trusted device audit)

TL;DR bullets:
- Enable Advanced Data Protection: Settings → [Your Name] → iCloud → Advanced Data Protection
- Set a recovery contact or recovery key before enabling — without one, locked-out data is unrecoverable
- Recovery contact must be someone only you control — not a shared or family device
- Audit trusted phone numbers: Settings → [Your Name] → Sign-In & Security
- Remove any Apple ID trusted device you don't recognize
- ADP means Apple cannot read your Photos, Notes, Backups — only your devices can decrypt them

Steps:
1. Check current iCloud encryption status (Settings → [Your Name] → iCloud → scroll to encryption section)
2. Set a recovery method (Settings → [Your Name] → Sign-In & Security → Account Recovery — add recovery contact or generate recovery key; store key offline)
3. Enable Advanced Data Protection (Settings → [Your Name] → iCloud → Advanced Data Protection → Turn On)
4. Audit trusted phone numbers (Settings → [Your Name] → Sign-In & Security → trusted phone numbers — remove any you don't control exclusively)
5. Audit trusted devices (same screen → scroll to devices — remove any unrecognized device)
6. Review iCloud.com access (ADP limits what's accessible at icloud.com from a browser — verify this matches your threat model)
7. Review Family Sharing permissions (Settings → [Your Name] → Family Sharing → confirm who has access to what)

Common Mistakes:
- Enabling ADP without setting a recovery method first — if locked out, data is permanently unrecoverable
- Using a family member's device as the recovery contact — if that relationship is the threat, this defeats the purpose
- Leaving unrecognized trusted devices on the Apple ID — these can receive 2FA codes and access your account
- Assuming iCloud is E2EE by default — it is not; ADP is opt-in

### Tutorial 3: Focus Modes (`tutorial-focus-modes.md`)
Source: `Focus.md` (all modes, cross-platform, safety notes)

TL;DR bullets:
- Focus modes are not hidden — anyone with device access can see which mode is active and its settings
- Contact allowlists are visible in Settings — use neutral names for contacts if device access is a risk
- Disable Focus status sharing: Settings → Focus → Share Focus Status → off
- Focus modes suppress notifications but do not encrypt or hide message content
- Separate "Consultant" and "Personal" modes prevent cross-context notification bleed
- The Ouroboros mode (minimal input, no social/news) is a deliberate reset tool — not avoidance

Steps:
1. Access Focus settings (Settings → Focus)
2. Create a new Focus mode (tap +, choose Custom or a preset)
3. Configure allowed contacts (People tab — whitelist specific contacts whose notifications break through)
4. Configure allowed apps (Apps tab — restrict to only what the context requires)
5. Disable Share Focus Status (Settings → Focus → Share Focus Status → off — prevents iMessage contacts from seeing "has notifications silenced")
6. Set a schedule or trigger (time-based, location-based, or paired with a Shortcut)
7. Pair with Home scenes if using HomeKit (Focus → Home → assign a scene to activate on Focus entry)
8. Create an Ouroboros-style recovery mode (minimal allowlist, no social apps, no news — used during high-stress or context-collapse periods)

Common Mistakes:
- Treating Focus as private — it is visible on the device
- Leaving Share Focus Status enabled — contacts see when you're silencing them
- Using real names for sensitive contacts in allowlists — lock screen notifications show contact names
- Using a single Focus mode for everything — separate modes enforce cleaner context boundaries
- Expecting Focus to hide message content — it only suppresses notification delivery

### Tutorial 4: Encrypted Communication (`tutorial-encrypted-communication.md`)
Source: `Communication.md`, `iCloud.md` (iMessage, SMS, Signal, Hide My Email, Focus integration)

TL;DR bullets:
- Blue bubbles = iMessage (E2EE). Green bubbles = SMS (unencrypted, goes through carrier).
- For non-Apple contacts where security matters, use Signal — not SMS
- Enable iCloud Messages with Advanced Data Protection for E2EE message history
- Hide My Email (iCloud+) generates relay addresses — real email address never exposed to senders
- Check Text Message Forwarding: Settings → Messages → Text Message Forwarding — remove any unrecognized device
- FaceTime call logs appear in Phone → Recents — visible to anyone with device access

Steps:
1. Verify iMessage is enabled (Settings → Messages → iMessage — toggle on; requires Apple ID)
2. Confirm contacts are on iMessage (blue bubbles in Messages — green = SMS, not encrypted)
3. Enable iCloud Messages (Settings → [Your Name] → iCloud → Messages → toggle on; enable ADP for E2EE)
4. Install and configure Signal (download from App Store; register with a phone number; enable Note to Self for secure notes; configure disappearing messages per contact)
5. Set up Hide My Email (Settings → [Your Name] → iCloud → Hide My Email → create addresses for sign-ups and untrusted senders)
6. Disable read receipts if needed (Settings → Messages → Send Read Receipts → off)
7. Audit Text Message Forwarding (Settings → Messages → Text Message Forwarding — remove any device you don't recognize)
8. Configure Focus to protect communication (Settings → Focus → [mode] → People — whitelist only the contacts appropriate for that context)

Common Mistakes:
- Sending sensitive information via SMS (green bubbles) assuming it's private
- Relying on iMessage alone for non-Apple contacts — Signal is required for cross-platform E2EE
- Using a real email for sign-ups — Hide My Email relay addresses can be deactivated instantly
- Leaving FaceTime call logs visible in Recents — these persist unless manually deleted
- Assuming iCloud Messages is E2EE without enabling Advanced Data Protection first

## Content Constraints

- Tone: consistent with existing site voice — direct, clinical, non-patronizing
- No hedging language ("you might want to consider…")
- No legal advice disclaimers
- Internal links only in Resources sections
- Layered depth: TL;DR for crisis readers, full content for preparatory readers
- Reference the specific iOS/macOS settings path in every step (Settings → ... navigation)

## Out of Scope

- New SCSS or layout files
- New `_includes/` components
- The three existing Coming Soon cards (Cybersecurity, Data Privacy, Technology)
- Any changes to `tutorials.html` or tutorials index layout
- The `terminal.md`, `Smart Home.md`, or `Shortcuts.md` notes (not in this batch)
