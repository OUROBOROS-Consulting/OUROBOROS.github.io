# Apple Device Tutorials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build four Apple device tutorials under a new "Apple Devices" cluster in the tutorials index.

**Architecture:** Four `_resources/` markdown files using `foundation.html` layout, plus four new entries in `_data/tutorials.yml`. Same pattern as the institutional cluster tutorials already live.

**Tech Stack:** Jekyll, Markdown with inline HTML for TL;DR callout, CSS custom properties from `@ouroboros-consulting/ouroboros-design`

---

### Task 1: Wire tutorials.yml

**Files:**
- Modify: `_data/tutorials.yml`

- [ ] **Step 1: Append four entries to tutorials.yml**

Open `_data/tutorials.yml` and append at the end:

```yaml
- tag: Apple Devices
  title: Auditing Your Apple Device for Surveillance Risks
  description: Step-by-step audit of Find My, Family Sharing location access, Screen Time controls, Location Services, and trusted device settings — with practical steps to identify and remove unauthorized access.
  link: /resources/tutorial-apple-security-audit/

- tag: Apple Devices
  title: Protecting Your Data with iCloud Advanced Data Protection
  description: How to enable end-to-end encryption for your iCloud data, set up a recovery method, audit trusted devices, and understand what is and isn't protected by default.
  link: /resources/tutorial-icloud-adp/

- tag: Apple Devices
  title: Using Focus Modes to Compartmentalize Your Digital Life
  description: Configure Focus modes to enforce context boundaries, manage notification allowlists, disable Focus status sharing, and build a minimal-input recovery mode for high-stress periods.
  link: /resources/tutorial-focus-modes/

- tag: Apple Devices
  title: Setting Up Encrypted Communication on Apple Devices
  description: Verify iMessage E2EE status, configure iCloud Messages with Advanced Data Protection, set up Signal for cross-platform contacts, and audit which devices receive your messages.
  link: /resources/tutorial-encrypted-communication/
```

- [ ] **Step 2: Verify YAML syntax**

```bash
cd OUROBOROS-Consulting.github.io
ruby -e "require 'yaml'; YAML.load_file('_data/tutorials.yml'); puts 'OK'"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add _data/tutorials.yml
git commit -m "data: add Apple Devices tutorial cluster to tutorials index"
```

---

### Task 2: Create tutorial-apple-security-audit.md

**Files:**
- Create: `_resources/tutorial-apple-security-audit.md`

- [ ] **Step 1: Create the file**

```markdown
---
layout: article
title: Auditing Your Apple Device for Surveillance Risks
description: Step-by-step audit of Find My, Family Sharing, Screen Time, Location Services, and trusted device settings.
permalink: /resources/tutorial-apple-security-audit/
category: Resources
back_url: /resources/tutorials/
cta_label: Get in Touch
---

<div style="background:var(--calloutbg);border-left:3px solid var(--gold);padding:1.25rem 1.5rem;margin:2rem 0;border-radius:2px;">
<p style="color:var(--gold);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;">TL;DR</p>
<ul style="margin:0;padding-left:1.25rem;color:var(--text);">
<li>Open Find My → People tab → remove anyone who shouldn't see your location</li>
<li>Settings → Privacy & Security → Location Services → Camera → set to Never</li>
<li>Settings → Messages → Text Message Forwarding → remove unrecognized devices</li>
<li>Settings → Screen Time → check for unexplained limits or "This is a Family device"</li>
<li>If alerted to an unknown AirTag, use Find My to locate it physically — do not dismiss the alert</li>
<li>Settings → [Your Name] → Sign-In & Security → remove any trusted device you don't recognize</li>
</ul>
</div>

Apple devices collect and share significant location and access data by default. Many of these defaults are reasonable for standard household use — and become serious risks in adversarial contexts. This tutorial walks through a systematic audit of the access points most commonly exploited: shared location, Family Sharing permissions, Screen Time controls, and the trusted-device list tied to your Apple ID.

This audit is not a one-time fix. Settings change when devices update, when accounts are merged into Family Sharing groups, or when someone with physical device access modifies them. Run through these steps whenever your situation changes, after a breakup or separation, or before travel to a high-risk context.

The goal is not to disable everything — it is to make every active sharing relationship an explicit choice, not a default.

## Steps

1. **Audit Find My shared location.** Open the Find My app on your iPhone or iPad. Tap the People tab. Review every entry. Anyone listed can see your real-time location. Tap a contact and select Stop Sharing My Location to revoke access individually. Do not skip this step — location sharing persists until actively revoked.

2. **Audit Family Sharing location.** Go to Settings → [Your Name] → Family Sharing → Location Sharing. Review which family members are sharing location with you and with whom. If you are part of a Family group where the organizer is a risk, this is the entry point — the organizer can see all members' locations unless sharing is individually disabled.

3. **Audit Screen Time.** Go to Settings → Screen Time. If you see "This is a Family device" or limits you did not set yourself, someone with a Screen Time passcode (separate from your device passcode) has access. The Screen Time passcode is set by the Family organizer. Leaving Family Sharing removes this access.

4. **Audit Location Services per app.** Go to Settings → Privacy & Security → Location Services. Review every app with Always or While Using access. Social media apps, dating apps, and any app you share content with are high-risk — they may embed or transmit your location. Set each to Never or Ask unless you have a specific reason for location access.

5. **Disable GPS in photos.** Within Location Services, scroll to Camera. Set it to Never. Photos taken with location enabled embed GPS coordinates in their EXIF data. Anyone you send the original file to can extract the exact location. Note: iMessage and AirDrop compress or strip EXIF on send; email does not.

6. **Check Text Message Forwarding.** Go to Settings → Messages → Text Message Forwarding. This screen lists every device authorized to receive your SMS messages. Remove any device you do not recognize or no longer control.

7. **Review your Apple ID trusted devices.** Go to Settings → [Your Name] → Sign-In & Security. Scroll down to see every device signed into your Apple ID. Trusted devices receive two-factor authentication codes and can approve Apple ID changes. Remove any device you do not recognize — tap its name, then Remove from Account.

8. **Respond to AirTag alerts.** If iOS alerts you to an unknown AirTag traveling with you, take it seriously. Open the Find My app → Items tab to locate it. AirTags are small enough to slip into bags, coat pockets, or vehicles. If you locate one, do not panic — you can disable it by removing the battery. Document it before disabling if you intend to report it.

## Common Mistakes

- Assuming "only family" have shared location access — Family Sharing grants real-time location to all members by default unless individually disabled
- Dismissing AirTag alerts as spam — these are active tracking notifications, not false positives
- Setting Location Services to "While Using" for social apps that post to the internet — metadata can still travel with content
- Emailing original photos assuming they're stripped of metadata — only iMessage and AirDrop do this automatically
- Treating this as a one-time audit — access settings persist through device restores and OS updates; review after any significant relationship or living-situation change

## Resources

- [Survival Guide](/resources/survival/) — quick-reference safety resources
- [Glossary](/resources/glossary/) — definitions for technical terms used in this tutorial
- [Setting Up Encrypted Communication on Apple Devices](/resources/tutorial-encrypted-communication/) — follow-up tutorial on securing your messages
```

- [ ] **Step 2: Verify permalink matches tutorials.yml**

Confirm `permalink: /resources/tutorial-apple-security-audit/` matches the `link:` value added in Task 1.

- [ ] **Step 3: Commit**

```bash
git add _resources/tutorial-apple-security-audit.md
git commit -m "feat: add Apple device security audit tutorial"
```

---

### Task 3: Create tutorial-icloud-adp.md

**Files:**
- Create: `_resources/tutorial-icloud-adp.md`

- [ ] **Step 1: Create the file**

```markdown
---
layout: article
title: Protecting Your Data with iCloud Advanced Data Protection
description: How to enable end-to-end encryption for iCloud data, set up a recovery method, and audit trusted devices.
permalink: /resources/tutorial-icloud-adp/
category: Resources
back_url: /resources/tutorials/
cta_label: Get in Touch
---

<div style="background:var(--calloutbg);border-left:3px solid var(--gold);padding:1.25rem 1.5rem;margin:2rem 0;border-radius:2px;">
<p style="color:var(--gold);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;">TL;DR</p>
<ul style="margin:0;padding-left:1.25rem;color:var(--text);">
<li>iCloud is not end-to-end encrypted by default — Advanced Data Protection is opt-in</li>
<li>Enable it at: Settings → [Your Name] → iCloud → Advanced Data Protection</li>
<li>Set a recovery key or recovery contact before enabling — without one, locked-out data is permanently unrecoverable</li>
<li>Recovery contact must be someone you control exclusively — not a shared or family account</li>
<li>After enabling, audit trusted devices: Settings → [Your Name] → Sign-In & Security</li>
<li>With ADP enabled, Apple cannot read your Photos, Notes, or Backups — only your devices can decrypt them</li>
</ul>
</div>

iCloud syncs data across all your Apple devices and stores it on Apple's servers. By default, most of that data is encrypted in transit and at rest — but Apple holds the encryption keys, which means Apple can access it and is legally required to provide it to law enforcement with a valid order. Advanced Data Protection (ADP) changes this: it extends end-to-end encryption to most iCloud categories, so only your own devices hold the decryption keys.

ADP is not enabled by default because it introduces a trade-off: if you lose access to your Apple ID and have no recovery method set up, your data is gone. Apple cannot help you recover it. This tutorial walks through enabling ADP correctly — setting up a recovery method first, then enabling the feature, then auditing the account to ensure the protection is meaningful.

This is a one-time setup with ongoing maintenance. The audit steps at the end should be revisited any time your trusted device list changes.

## Steps

1. **Check current encryption status.** Go to Settings → [Your Name] → iCloud. Scroll to the bottom to see iCloud data categories and their encryption status. Without ADP, most show "Encrypted" but not "End-to-End Encrypted." Photos, Notes, and Backups are the most sensitive categories affected.

2. **Set up a recovery method before enabling ADP.** Go to Settings → [Your Name] → Sign-In & Security → Account Recovery. You have two options: a Recovery Contact (another Apple user you trust who can help verify your identity) or a Recovery Key (a 28-character code you store offline). Choose one. If you use a Recovery Contact, it must be someone only you control — not a shared device, not a family member who is also a risk. If you use a Recovery Key, print or write it and store it separately from your devices.

3. **Enable Advanced Data Protection.** Go to Settings → [Your Name] → iCloud → Advanced Data Protection → Turn On. Follow the prompts. iOS will confirm your recovery method before completing setup.

4. **Verify what ADP protects.** After enabling, return to Settings → [Your Name] → iCloud and confirm that Photos, Notes, iCloud Backup, Messages, and other key categories now show "End-to-End Encrypted." A small number of categories (Mail, Contacts, Calendar) remain standard encrypted to maintain interoperability with third-party apps.

5. **Audit trusted phone numbers.** Go to Settings → [Your Name] → Sign-In & Security → trusted phone numbers. These numbers can receive 2FA codes and be used to recover your account. Remove any number you do not exclusively control. A shared phone number undermines all other protections.

6. **Audit trusted devices.** On the same screen, scroll to see all devices signed into your Apple ID. Any device on this list can receive 2FA codes and approve Apple ID changes. Remove any device you do not recognize: tap it, then Remove from Account.

7. **Consider iCloud.com access.** With ADP enabled, browser access at icloud.com is limited — photos and notes are not accessible from a browser by default, which means someone who gains access to your Apple ID credentials cannot view your content from any device. This is a meaningful security improvement if browser-based access is a threat.

## Common Mistakes

- Enabling ADP without setting a recovery method — if you lose your device and Apple ID access simultaneously, your data is permanently inaccessible
- Using a recovery contact who is also a potential threat — the recovery contact has the ability to verify your identity and unlock your account
- Leaving unrecognized trusted devices on the account — these can receive 2FA codes without your knowledge
- Assuming standard iCloud encryption is equivalent to ADP — it is not; Apple can access standard-encrypted data
- Treating setup as final — audit trusted devices and phone numbers after any major life change

## Resources

- [Auditing Your Apple Device for Surveillance Risks](/resources/tutorial-apple-security-audit/) — companion tutorial covering Find My, Family Sharing, and Location Services
- [Survival Guide](/resources/survival/) — quick-reference safety resources
- [Glossary](/resources/glossary/) — definitions for end-to-end encryption, 2FA, and related terms
```

- [ ] **Step 2: Verify permalink matches tutorials.yml**

Confirm `permalink: /resources/tutorial-icloud-adp/` matches the `link:` value in Task 1.

- [ ] **Step 3: Commit**

```bash
git add _resources/tutorial-icloud-adp.md
git commit -m "feat: add iCloud Advanced Data Protection tutorial"
```

---

### Task 4: Create tutorial-focus-modes.md

**Files:**
- Create: `_resources/tutorial-focus-modes.md`

- [ ] **Step 1: Create the file**

```markdown
---
layout: article
title: Using Focus Modes to Compartmentalize Your Digital Life
description: Configure Focus modes to enforce context boundaries, manage notification allowlists, and build a minimal-input recovery mode for high-stress periods.
permalink: /resources/tutorial-focus-modes/
category: Resources
back_url: /resources/tutorials/
cta_label: Get in Touch
---

<div style="background:var(--calloutbg);border-left:3px solid var(--gold);padding:1.25rem 1.5rem;margin:2rem 0;border-radius:2px;">
<p style="color:var(--gold);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;">TL;DR</p>
<ul style="margin:0;padding-left:1.25rem;color:var(--text);">
<li>Focus modes are not hidden — device access reveals which mode is active and all its settings</li>
<li>Contact allowlists are visible in Settings — use neutral names for any contact whose name on a lock screen is a risk</li>
<li>Disable Focus status sharing: Settings → Focus → Share Focus Status → off</li>
<li>Focus suppresses notifications but does not encrypt, hide, or delete message content</li>
<li>Separate modes for work, personal, and client contexts prevent cross-context notification bleed</li>
<li>A minimal-input recovery mode — near-total silence, no social, no news — is a deliberate reset tool</li>
</ul>
</div>

Focus modes control which notifications reach you and when. Each mode maintains a separate allowlist of contacts and apps, can trigger Home automations and Shortcuts, and syncs across all your Apple devices instantly. The practical result: switching Focus is the same as switching contexts — a different set of signals gets through, and everything else waits.

For people managing multiple professional identities, high-stress situations, or adversarial relationship dynamics, Focus modes serve a second function: enforcing boundaries between contexts so that personal emergencies don't interrupt client work, and client channels don't bleed into personal recovery time. The separation is enforced at the OS level, not by willpower.

This tutorial covers setting up Focus modes for context management, configuring them safely, and building a minimal-input mode for periods when reducing incoming stimuli is the priority.

## Steps

1. **Access Focus settings.** Go to Settings → Focus. You'll see default modes (Do Not Disturb, Personal, Sleep, Work) and the option to create custom modes.

2. **Create a custom Focus mode.** Tap the + button in the top right. Select Custom. Name it for its context — Consultant, Recovery, Client — not for a person. The name is visible on the lock screen when active.

3. **Configure allowed contacts.** Tap People (or Allowed Notifications → People). Add only the contacts whose notifications should break through in this context. Anyone not on this list is silenced. Important: the contact's name will appear on lock screen notifications — use a neutral name or initials for any contact whose identity is sensitive if someone else might see your screen.

4. **Configure allowed apps.** Tap Apps. Add only apps that are appropriate for the context. A Work mode does not need social apps; a Personal mode does not need work email. Every app not listed is silenced.

5. **Disable Share Focus Status.** Go to Settings → Focus → Share Focus Status → toggle off. When enabled, iMessage contacts see "has notifications silenced" when they message you. Disabling this prevents any signal about your current mode from reaching contacts.

6. **Set a trigger.** Focus modes can activate on a schedule, on arrival at a location, or when a specific app is opened. For context management, a time-based schedule (Work hours) or a manual toggle via Control Center are both practical. Avoid location-based triggers if location privacy is a concern.

7. **Pair with a Shortcut (optional).** In the Focus settings, tap Add to Shortcuts. This allows a single tap to set Focus mode, open relevant apps, and trigger a Home scene simultaneously — a useful "start session" ritual.

8. **Build a recovery mode.** Create a custom Focus called something neutral (Recovery, Reset, Ouroboros). Set the allowed contacts list to one or two people maximum — emergency contacts only. Disable all apps except what you absolutely need. No social media, no news, no email. Activate this mode during high-stress periods or after context collapse. It is a deliberate reduction of incoming stimuli, not avoidance — the same way closing unneeded browser tabs is not avoidance.

## Common Mistakes

- Treating Focus as private — the active mode is visible to anyone who picks up the device
- Leaving Share Focus Status enabled — contacts receive a signal when you're silencing them; this may prompt unwanted follow-up
- Using a contact's real name in the allowlist without considering lock screen visibility
- Using a single Focus mode for everything — one mode cannot enforce context separation; you need distinct modes
- Expecting Focus to hide or delete messages — messages from non-whitelisted contacts still arrive; they're delivered silently and visible in the app

## Resources

- [Setting Up Encrypted Communication on Apple Devices](/resources/tutorial-encrypted-communication/) — companion tutorial on securing the messages that arrive during any Focus mode
- [Survival Guide](/resources/survival/) — quick-reference safety resources
- [Glossary](/resources/glossary/) — definitions for terms used in this tutorial
```

- [ ] **Step 2: Verify permalink matches tutorials.yml**

Confirm `permalink: /resources/tutorial-focus-modes/` matches the `link:` value in Task 1.

- [ ] **Step 3: Commit**

```bash
git add _resources/tutorial-focus-modes.md
git commit -m "feat: add Focus Modes tutorial"
```

---

### Task 5: Create tutorial-encrypted-communication.md

**Files:**
- Create: `_resources/tutorial-encrypted-communication.md`

- [ ] **Step 1: Create the file**

```markdown
---
layout: article
title: Setting Up Encrypted Communication on Apple Devices
description: Verify iMessage E2EE status, configure iCloud Messages with Advanced Data Protection, set up Signal for cross-platform contacts, and audit which devices receive your messages.
permalink: /resources/tutorial-encrypted-communication/
category: Resources
back_url: /resources/tutorials/
cta_label: Get in Touch
---

<div style="background:var(--calloutbg);border-left:3px solid var(--gold);padding:1.25rem 1.5rem;margin:2rem 0;border-radius:2px;">
<p style="color:var(--gold);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 0.75rem;">TL;DR</p>
<ul style="margin:0;padding-left:1.25rem;color:var(--text);">
<li>Blue bubbles = iMessage (end-to-end encrypted between Apple devices). Green bubbles = SMS (unencrypted, readable by carrier).</li>
<li>For non-Apple contacts where security matters, use Signal — not SMS</li>
<li>Enable iCloud Messages + Advanced Data Protection to make your message history E2EE in the cloud</li>
<li>Hide My Email (iCloud+) generates relay addresses — your real email is never exposed to senders</li>
<li>Check Settings → Messages → Text Message Forwarding — remove any device you don't recognize</li>
<li>FaceTime call logs appear in Phone → Recents and are visible to anyone with device access</li>
</ul>
</div>

Apple's communication apps are split between secure and insecure channels in ways that aren't always obvious. iMessage is end-to-end encrypted — but only between Apple devices, only when both parties have iMessage active, and only when iCloud Messages is paired with Advanced Data Protection. SMS (the fallback for Android contacts and international numbers) is not encrypted and is readable by the carrier, by law enforcement with a valid order, and in some cases by other actors.

The practical implication: the color of the bubble matters. Blue is encrypted. Green is not. For sensitive conversations with non-Apple contacts, Signal provides the same level of encryption across platforms. This tutorial covers verifying your iMessage configuration, enabling message E2EE in the cloud, setting up Signal, and auditing which devices and accounts can receive your messages.

Communication security is only as strong as its weakest channel. A single green-bubble message containing sensitive information undermines an otherwise secure setup.

## Steps

1. **Verify iMessage is enabled.** Go to Settings → Messages → iMessage. The toggle should be on. iMessage requires an Apple ID and internet connection. When active, messages to other Apple users default to iMessage (blue) rather than SMS (green).

2. **Check your contacts.** Open a conversation in Messages. Blue background = iMessage (E2EE). Green background = SMS (unencrypted). There is no in-app prompt — the color is the only indicator. For sensitive contacts on Android, plan to use Signal instead.

3. **Enable iCloud Messages.** Go to Settings → [Your Name] → iCloud → Messages → toggle on. This syncs your full message history to iCloud so it's available across your devices. On its own, this is standard encryption — Apple holds the keys. To make it E2EE, enable Advanced Data Protection (see companion tutorial).

4. **Install and configure Signal.** Download Signal from the App Store. Register with your phone number. In Settings → Privacy, enable Screen Lock and set a short timeout. For conversations where source protection matters, enable disappearing messages. Signal works for text, voice, and video — it is the strongest available option for communication with non-Apple users.

5. **Set up Hide My Email.** Go to Settings → [Your Name] → iCloud → Hide My Email (requires iCloud+ subscription). Create relay addresses for sign-ups, untrusted senders, or any context where exposing your real email creates a risk. Relay addresses forward to your real inbox and can be deactivated instantly, cutting off the sender without revealing your address.

6. **Disable read receipts if needed.** Go to Settings → Messages → Send Read Receipts → toggle off. This prevents iMessage contacts from seeing when you've read their messages. Can also be disabled per-contact: open a conversation → tap the contact's name → toggle off Send Read Receipts.

7. **Audit Text Message Forwarding.** Go to Settings → Messages → Text Message Forwarding. This screen lists every device authorized to receive your SMS messages as they arrive. Remove any device you do not recognize or no longer control. A device on this list can read every SMS you receive in real time.

8. **Use Focus modes to control communication channels.** Configure Focus modes with contact allowlists (Settings → Focus → [mode] → People) to control which contacts can reach you in each context. This does not encrypt messages — it controls notification delivery. Combine with the encryption steps above for layered protection.

## Common Mistakes

- Sending sensitive information in green-bubble conversations — SMS is not encrypted and is readable by the carrier
- Assuming iCloud Messages is E2EE without enabling Advanced Data Protection — it is not by default
- Not installing Signal for non-Apple contacts — there is no encrypted fallback within Apple's ecosystem for Android users
- Using a real email address for sign-ups and untrusted senders — Hide My Email relay addresses can be deactivated; your real address cannot
- Ignoring Text Message Forwarding — a secondary device silently receiving your SMS is invisible unless you check this screen

## Resources

- [Auditing Your Apple Device for Surveillance Risks](/resources/tutorial-apple-security-audit/) — audit Find My, trusted devices, and message forwarding
- [Protecting Your Data with iCloud Advanced Data Protection](/resources/tutorial-icloud-adp/) — enable E2EE for iCloud Messages
- [Survival Guide](/resources/survival/) — quick-reference safety resources
- [Glossary](/resources/glossary/) — definitions for end-to-end encryption, Signal, and related terms
```

- [ ] **Step 2: Verify permalink matches tutorials.yml**

Confirm `permalink: /resources/tutorial-encrypted-communication/` matches the `link:` value in Task 1.

- [ ] **Step 3: Commit**

```bash
git add _resources/tutorial-encrypted-communication.md
git commit -m "feat: add encrypted communication tutorial"
```

---

### Task 6: Cross-file review

**Files:** All files created/modified in Tasks 1–5

- [ ] **Step 1: Verify all four permalinks match tutorials.yml links**

```bash
grep "permalink:" OUROBOROS-Consulting.github.io/_resources/tutorial-apple-security-audit.md \
  OUROBOROS-Consulting.github.io/_resources/tutorial-icloud-adp.md \
  OUROBOROS-Consulting.github.io/_resources/tutorial-focus-modes.md \
  OUROBOROS-Consulting.github.io/_resources/tutorial-encrypted-communication.md

grep "link:" OUROBOROS-Consulting.github.io/_data/tutorials.yml
```

Confirm each `permalink:` value matches the corresponding `link:` in tutorials.yml.

- [ ] **Step 2: Verify all tutorials use correct layout and back_url**

```bash
grep -h "layout:\|back_url:" OUROBOROS-Consulting.github.io/_resources/tutorial-apple-*.md \
  OUROBOROS-Consulting.github.io/_resources/tutorial-icloud-adp.md \
  OUROBOROS-Consulting.github.io/_resources/tutorial-focus-modes.md \
  OUROBOROS-Consulting.github.io/_resources/tutorial-encrypted-communication.md
```

Expected: all show `layout: foundation` and `back_url: /resources/tutorials/`

- [ ] **Step 3: Verify internal cross-links are consistent**

The tutorials link to each other:
- Security Audit → Encrypted Communication
- iCloud ADP → Security Audit
- Focus Modes → Encrypted Communication
- Encrypted Communication → Security Audit, iCloud ADP

Confirm each linked permalink exists as a file with that exact permalink value.

- [ ] **Step 4: Commit if any fixes needed**

```bash
git add -p
git commit -m "fix: correct cross-file inconsistencies in Apple tutorials"
```
