---
layout: article
title: Protecting Your Data with iCloud Advanced Data Protection
description: How to enable end-to-end encryption for your iCloud data, set up a recovery method, audit trusted devices, and understand what is and isn't protected by default.
permalink: /resources/tutorial-icloud-adp/
category: Resources
back_url: /resources/tutorials/
lede: iCloud is not encrypted by default. Advanced Data Protection changes that — but it requires preparation before you enable it.
cta_body: Need help securing your iCloud account? Let's talk through your situation.
cta_label: Get in Touch
---

<div style="background: var(--calloutbg); border-left: 3px solid var(--gold); padding: 1.5rem 2rem; margin: 2rem 0 2.5rem;">
  <p style="font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin: 0 0 1rem 0;">TL;DR</p>
  <ul style="margin: 0; padding-left: 1.25rem; color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.75;">
    <li>iCloud is not end-to-end encrypted by default — Apple can access your data.</li>
    <li>Advanced Data Protection is opt-in: Settings → [Your Name] → iCloud → Advanced Data Protection.</li>
    <li>Set a recovery key or recovery contact <em>before</em> enabling — without one, lockout means permanent data loss.</li>
    <li>Recovery contact must be someone only you control — not a shared or family device.</li>
    <li>Audit trusted phone numbers: Settings → [Your Name] → Sign-In &amp; Security.</li>
    <li>With ADP enabled, Apple cannot read your Photos, Notes, or Backups — only your trusted devices can.</li>
  </ul>
</div>

By default, iCloud syncs your photos, notes, messages, backups, and documents to Apple's servers in a form that Apple can read. This is not a flaw — it enables features like iCloud.com access from any browser and account recovery via customer support. But it also means that iCloud data can be accessed by Apple in response to law enforcement requests, and potentially by anyone who gains access to your account credentials.

Advanced Data Protection (ADP) changes this. When enabled, your iCloud data is encrypted with keys that only your trusted devices hold. Apple cannot read it. Law enforcement requests to Apple return nothing. If you lose access to all your trusted devices and your recovery method, the data is unrecoverable — permanently.

This tutorial walks through enabling ADP safely, including the preparation steps that most people skip. Do not skip them.

## Steps

1. **Check your current iCloud encryption status.** Go to Settings → [Your Name] → iCloud. Scroll to the bottom. If you see "Advanced Data Protection: Off," you are on standard encryption. The settings screen lists which categories are currently protected by end-to-end encryption versus standard encryption.

2. **Set a recovery method before enabling ADP.** This is the most important step and must happen first. Go to Settings → [Your Name] → Sign-In &amp; Security → Account Recovery. You have two options: a Recovery Contact (another Apple ID user who can verify your identity) or a Recovery Key (a 28-character code you generate and store yourself). If you choose a recovery contact, it must be someone you trust completely and who is not connected to any threat you are protecting yourself from. If you choose a recovery key, print it or write it down and store it somewhere you physically control — not on iCloud, not in Notes, not in a photo.

3. **Enable Advanced Data Protection.** Go to Settings → [Your Name] → iCloud → Advanced Data Protection → Turn On Advanced Data Protection. Follow the prompts. You will be asked to update any devices on your Apple ID that are running older software — ADP requires all devices to be on iOS 16.2 / macOS 13.1 / watchOS 9.2 or later. Devices that can't update must be removed from your account before ADP can be enabled.

4. **Verify your protection status.** After enabling, return to Settings → [Your Name] → iCloud. The encryption section should now show expanded end-to-end encryption coverage including iCloud Backup, Photos, Notes, iCloud Drive, Reminders, Safari, Siri Shortcuts, Voice Memos, Wallet passes, and Health data. Some categories (Mail, Contacts, Calendars) remain on standard encryption due to interoperability requirements.

5. **Audit trusted phone numbers.** Go to Settings → [Your Name] → Sign-In &amp; Security. Review every phone number listed under Trusted Phone Numbers. These numbers can receive two-factor authentication codes for your Apple ID. Remove any number you don't control exclusively — a number shared with another person, a number on a line controlled by someone else, or a number you no longer own.

6. **Audit trusted devices.** On the same screen, scroll to the device list. Every device listed can receive 2FA codes and approve account changes. Remove any device you don't recognize or no longer have physical access to by tapping it and selecting Remove from Account. After removing devices, your recovery method becomes the only fallback — confirm it is in place before proceeding.

7. **Review iCloud.com access.** With ADP enabled, iCloud.com access from a browser requires additional device-based approval and provides access to fewer data categories. Go to Settings → [Your Name] → iCloud → Advanced Data Protection → Access iCloud Data on the Web. Consider disabling this if browser access is not something you use — it eliminates a potential account access vector.

## Common Mistakes

- **Enabling ADP without a recovery method.** If you lose access to all your devices and have no recovery contact or key, Apple cannot help you. The data is gone. Set the recovery method first, verify it, then enable ADP.
- **Using a family member as the recovery contact when family is the threat.** A recovery contact can initiate account recovery. If the person you are protecting yourself from controls that Apple ID, they can use it.
- **Leaving unrecognized trusted devices on the account.** Trusted devices can receive 2FA codes. An old device in someone else's possession is an active account access point.
- **Assuming iCloud is already end-to-end encrypted.** Apple's marketing uses "encryption" broadly. Standard iCloud encryption means encrypted in transit and at rest — but Apple holds the keys. ADP means Apple does not hold the keys.
- **Forgetting the recovery key.** A recovery key stored only in memory or on an iCloud-synced Notes file is not a recovery key. Write it down. Store the paper physically.

## Resources

- [Auditing Your Apple Device for Surveillance Risks](/resources/tutorial-apple-security-audit/) — audit device-level access before securing cloud data
- [Survival Resources](/resources/survival/) — legal aid, support organizations, and safety planning
- [Glossary](/resources/glossary/) — definitions for technical terms used in this tutorial
