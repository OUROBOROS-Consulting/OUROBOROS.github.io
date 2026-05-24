---
layout: foundation
title: Setting Up Encrypted Communication on Apple Devices
description: Verify iMessage E2EE status, configure iCloud Messages with Advanced Data Protection, set up Signal for cross-platform contacts, and audit which devices receive your messages.
permalink: /resources/tutorial-encrypted-communication/
category: Resources
back_url: /resources/tutorials/
lede: Blue is encrypted. Green is not. That distinction matters more than most people realize.
cta_body: Need help securing your communications? Let's talk through your situation.
cta_label: Get in Touch
---

<div style="background: var(--calloutbg); border-left: 3px solid var(--gold); padding: 1.5rem 2rem; margin: 2rem 0 2.5rem;">
  <p style="font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin: 0 0 1rem 0;">TL;DR</p>
  <ul style="margin: 0; padding-left: 1.25rem; color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.75;">
    <li>Blue bubbles = iMessage (end-to-end encrypted). Green bubbles = SMS (unencrypted, goes through your carrier).</li>
    <li>For non-Apple contacts where security matters, use Signal — not SMS.</li>
    <li>Enable iCloud Messages with Advanced Data Protection for end-to-end encrypted message history.</li>
    <li>Hide My Email (iCloud+) generates relay addresses — your real email is never exposed to senders.</li>
    <li>Check Text Message Forwarding: Settings → Messages → Text Message Forwarding — remove unrecognized devices.</li>
    <li>FaceTime call logs appear in Phone → Recents — visible to anyone with device access.</li>
  </ul>
</div>

Most people assume their phone calls and messages are private. They are not, by default. SMS messages travel unencrypted through your carrier's network — your carrier can read them, and so can anyone who requests records. iMessage is different: Apple's iMessage protocol is end-to-end encrypted between Apple devices, meaning Apple cannot read the content in transit. But several conditions determine whether your iMessage conversations are actually private, and most people haven't verified them.

This tutorial covers the full communication security picture on Apple devices: iMessage status and configuration, iCloud message storage, Signal for non-Apple contacts, Hide My Email for email addresses, and the Text Message Forwarding setting that silently routes your messages to other devices.

Work through these steps in order. Each builds on the previous.

## Steps

1. **Verify iMessage is enabled.** Go to Settings → Messages. The iMessage toggle should be on and showing a connected Apple ID. If iMessage is off, all your messages default to SMS regardless of what your contact is using. If you see a "Waiting for Activation" message, iMessage is failing to connect — verify your Apple ID is signed in under Settings → [Your Name].

2. **Confirm your contacts are on iMessage.** Open a conversation in the Messages app. Blue conversation bubbles indicate iMessage — end-to-end encrypted between Apple devices. Green bubbles indicate SMS or MMS — unencrypted and routed through your carrier. A contact on Android will always show green. An Apple user with iMessage disabled will also show green. There is no workaround: if a conversation is green, use Signal for sensitive content.

3. **Enable iCloud Messages with Advanced Data Protection.** By default, if you have iCloud Messages enabled, your message history is stored in iCloud under standard encryption — Apple holds the keys. To protect your message history, enable both iCloud Messages and Advanced Data Protection. Go to Settings → [Your Name] → iCloud → Messages to enable sync, then follow the [iCloud Advanced Data Protection tutorial](/resources/tutorial-icloud-adp/) to enable ADP. With both active, your message history is end-to-end encrypted in iCloud.

4. **Install and configure Signal.** Signal provides end-to-end encryption for both Apple and non-Apple users. Download Signal from the App Store and register with your phone number. Within Signal: enable Note to Self (tap your name at the top) for encrypted personal notes; set disappearing messages per contact for sensitive conversations (tap the contact name → Disappearing Messages). Signal also supports encrypted voice and video calls. For contacts on Android or Windows where iMessage is unavailable, Signal is the correct tool.

5. **Set up Hide My Email.** If you have an iCloud+ subscription, you have access to Hide My Email. Go to Settings → [Your Name] → iCloud → Hide My Email → Create New Address. Generate a unique relay address for each sign-up, subscription, or untrusted sender. Emails to that address forward to your real inbox, but senders never see your actual email. If a relay address gets compromised or starts receiving spam, deactivate it — your real address is unaffected.

6. **Disable read receipts if needed.** Go to Settings → Messages → Send Read Receipts and turn it off. With read receipts off, contacts won't know when you've opened their messages. This is a bilateral setting — you also won't see read receipts from others unless they have enabled them per-contact. Read receipts can be turned off per-conversation for individual contacts by tapping their name in a thread and adjusting the setting there.

7. **Audit Text Message Forwarding.** Go to Settings → Messages → Text Message Forwarding. Any device listed here receives a copy of every SMS and iMessage you send or receive. Macs and iPads on the same Apple ID can be added to this list. Remove any device you don't recognize or no longer use. This is a common vector for passive monitoring — a device added to this list continues to receive message copies silently.

8. **Manage FaceTime call log visibility.** FaceTime calls appear in the Phone app under Recents alongside regular calls. Anyone with your device can see who you've called and when. To clear the log, go to Phone → Recents → tap Edit → tap the red minus next to individual entries, or Clear to remove all. Be aware that clearing Recents is a destructive action with no recovery — if the log matters for documentation, screenshot it before clearing.

## Common Mistakes

- **Sending sensitive information via green bubble conversations.** Green means SMS — unencrypted, carrier-visible, and subpoenable. If a conversation is green and the content is sensitive, move it to Signal.
- **Assuming iMessage is sufficient for non-Apple contacts.** iMessage only works Apple-to-Apple. Signal is required for cross-platform end-to-end encryption.
- **Using your real email for sign-ups.** A real email address, once exposed, cannot be retracted. Hide My Email relay addresses can be deactivated instantly. Use them for anything that isn't a close personal contact.
- **Leaving FaceTime call logs visible.** Call logs are often the most revealing artifact on a device — showing who you've been in contact with and how often. Clear them routinely if device access is a risk.
- **Assuming iCloud Messages is private without ADP.** iCloud Messages sync is on by default for convenience. Without Advanced Data Protection, Apple holds the encryption keys for that message history.

## Resources

- [Auditing Your Apple Device for Surveillance Risks](/resources/tutorial-apple-security-audit/) — audit device access before securing communications
- [Protecting Your Data with iCloud Advanced Data Protection](/resources/tutorial-icloud-adp/) — required for end-to-end encrypted message history in iCloud
- [Survival Resources](/resources/survival/) — legal aid, support organizations, and safety planning
- [Glossary](/resources/glossary/) — definitions for technical terms used in this tutorial
