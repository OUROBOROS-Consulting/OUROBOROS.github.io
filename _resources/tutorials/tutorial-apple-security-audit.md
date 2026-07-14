---
layout: foundation
title: Auditing Your Apple Device for Surveillance Risks
description: Step-by-step audit of Find My, Family Sharing location access, Screen Time controls, Location Services, and trusted device settings — with practical steps to identify and remove unauthorized access.
permalink: /resources/tutorial-apple-security-audit/
category: Resources
back_url: /resources/tutorials/
lede: Your device knows where you are, who you've contacted, and what you've searched. Controlling that starts with knowing who else has access.
cta_body: Concerned about surveillance on your device? Let's talk through your situation.
cta_label: Get in Touch
---

<div style="background: var(--calloutbg); border-left: 3px solid var(--gold); padding: 1.5rem 2rem; margin: 2rem 0 2.5rem;">
  <p style="font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin: 0 0 1rem 0;">TL;DR</p>
  <ul style="margin: 0; padding-left: 1.25rem; color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.75;">
    <li>Open Find My → People tab → remove anyone who shouldn't see your location.</li>
    <li>Settings → Privacy &amp; Security → Location Services → Camera → set to Never.</li>
    <li>Settings → Messages → Text Message Forwarding → remove unrecognized devices.</li>
    <li>Settings → Screen Time → verify no restrictions were set without your knowledge.</li>
    <li>If alerted to an unknown AirTag: use Find My to locate it physically — take it seriously.</li>
    <li>Settings → [Your Name] → Sign-In &amp; Security → remove unrecognized trusted devices.</li>
  </ul>
</div>

Your iPhone and Mac are tracking your location, logging your communications, and syncing that data with your Apple ID. By default, many of these systems are configured for convenience — shared family location, automatic photo geotagging, messages forwarded to a Mac. In an adversarial context, these same features become surveillance vectors.

This tutorial is a systematic audit of the access points most commonly exploited in domestic abuse situations, coercive control, and stalking cases. It assumes your Apple ID is your own, but that others may have added themselves to location sharing, created Screen Time restrictions, or enrolled their devices to receive your messages.

Work through the steps in order. Each step takes one to three minutes. If you find something unexpected, don't remove it immediately — take a screenshot first.

## Steps

1. **Audit Find My shared location.** Open the Find My app and tap the People tab. Review every person listed. Anyone shown here can see your real-time location. Tap a name and select Stop Sharing My Location to remove them. If the list is empty, you are not currently sharing location with anyone.

2. **Audit Family Sharing location.** Go to Settings → [Your Name] → Family Sharing. If Family Sharing is active, tap Location Sharing. Any member with sharing enabled can see your location even if they don't appear in the Find My People tab. You can disable sharing with individual members, or leave the Family Sharing group entirely from the same screen.

3. **Audit Screen Time.** Go to Settings → Screen Time. If Screen Time is active and shows "This is a Family Device" or if a Screen Time passcode is set that you didn't create, someone has administrator-level control over your device's usage. Note what restrictions are set before making changes. To remove Screen Time entirely, scroll to Turn Off Screen Time — you will need the passcode if one was set.

4. **Audit Location Services per app.** Go to Settings → Privacy &amp; Security → Location Services. Review which apps have Always or While Using access. Social media apps, navigation apps, and any app you don't recognize should be set to Never or While Using. Always access means the app can track your location in the background without you opening it.

5. **Disable GPS in photo EXIF data.** Within Location Services, scroll to Camera and set it to Never. When location access is on, every photo you take is embedded with GPS coordinates that persist when you share the file via any channel — including iMessage, AirDrop, and email. No messaging app reliably strips GPS metadata before delivery. Setting Camera to Never is the only safeguard that works consistently.

6. **Check Text Message Forwarding.** Go to Settings → Messages → Text Message Forwarding. Any device listed here receives copies of every SMS and iMessage you send or receive. Remove any device you don't recognize or no longer use. Note that Macs and iPads registered to the same Apple ID can be added here without you seeing a prompt on the secondary device.

7. **Review trusted Apple ID devices.** Go to Settings → [Your Name] → Sign-In &amp; Security. Scroll to the Devices section. Every device listed can receive two-factor authentication codes for your Apple ID — which means it can be used to reset your password or approve account changes. Remove any device you don't recognize or no longer own by tapping it and selecting Remove from Account.

8. **Enable AirTag detection awareness.** iOS automatically alerts you when an unknown AirTag has been traveling with you. If you receive an alert, open the Find My app to see the AirTag's serial number and a map of where it's been. Use the Play Sound feature to locate it physically. An unknown AirTag alert is not spam — it means someone else's tag is in your vicinity. Take it seriously.

## Common Mistakes

- **Assuming "only family" have access.** Family Sharing grants real-time location visibility by default. A family member added under duress is still a surveillance point.
- **Ignoring AirTag alerts.** iOS alerts only appear after the tag has been separated from its owner for a period — by the time you see the alert, it has been with you for hours.
- **Leaving Location Services on Always for apps that don't need it.** Weather apps, retail apps, and social media do not need background location. Set them to While Using or Never.
- **Sharing photos without removing GPS metadata first.** No messaging app — including iMessage and AirDrop — reliably strips GPS coordinates before delivery. Every photo taken with location access enabled carries embedded GPS data that travels with the file. Remove EXIF data manually before sharing any photo where location privacy matters.
- **Assuming Screen Time limits were self-set.** Screen Time can be configured remotely through Family Sharing. If you see limits or content restrictions you don't remember setting, someone else may have configured them.

## Resources

- [Setting Up Encrypted Communication on Apple Devices](/resources/tutorial-encrypted-communication/) — secure your messages after locking down access
- [Survival Resources](/resources/survival/) — legal aid, support organizations, and safety planning
- [Glossary](/resources/glossary/) — definitions for technical terms used in this tutorial
