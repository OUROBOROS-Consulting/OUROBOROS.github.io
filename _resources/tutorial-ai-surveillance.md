---
layout: foundation
title: AI Surveillance and Reducing Your Exposure
description: How AI-powered facial recognition, behavioral profiling, and data brokerage work — and practical steps to reduce your exposure.
permalink: /resources/tutorial-ai-surveillance/
category: Resources
back_url: /resources/tutorials/
lede: Facial recognition doesn't need your cooperation. Most behavioral profiling happens before you open an app.
cta_body: Concerned about surveillance or being tracked? Let's talk through your situation.
cta_label: Get in Touch
---

<div style="background: var(--calloutbg); border-left: 3px solid var(--gold); padding: 1.5rem 2rem; margin: 2rem 0 2.5rem;">
  <p style="font-family: 'Inter', sans-serif; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin: 0 0 1rem 0;">TL;DR</p>
  <ul style="margin: 0; padding-left: 1.25rem; color: var(--text); font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.75;">
    <li>Facial recognition operates in airports, transit systems, retail stores, and law enforcement databases — no opt-in required.</li>
    <li>Your behavioral profile is assembled from app usage, purchase history, location data, and social graph — often without any single data point being sensitive on its own.</li>
    <li>Reducing exposure is incremental. Partial reduction is meaningful — this is not all-or-nothing.</li>
    <li>Data brokers aggregate and sell your profile; you have the right to request deletion from the major ones.</li>
    <li>Covering your face in public is legal in most U.S. jurisdictions — know the exceptions before relying on this.</li>
  </ul>
</div>

AI surveillance does not require your participation. Facial recognition systems identify individuals from camera feeds without any action on the subject's part. Behavioral profiling assembles a predictive model of your patterns, preferences, and relationships from data collected across dozens of platforms — most of it provided through routine activity. The result is that a detailed profile of who you are, where you go, and who you know is built and maintained by entities you have never interacted with.

This matters practically. AI-powered surveillance is used by law enforcement, by domestic abusers using commercial stalkerware, by employers monitoring remote workers, and by advertisers building targeting profiles. It is also sold by data brokers to investigators, landlords, and insurers.

This tutorial covers the main surveillance vectors, what data they collect, and the steps you can take to reduce your exposure. No single step eliminates risk. The goal is incremental reduction — removing the easiest access points first.

## Steps

1. **Understand what AI surveillance actually captures.** The most consequential surveillance vectors for most people are: facial recognition from cameras in public and commercial spaces; location tracking via phone GPS, cell tower data, and Wi-Fi probe requests; behavioral profiling from app usage, purchase history, and social graph; and data broker aggregation that combines all of the above into a searchable profile. Understanding which vectors apply to your situation determines which steps have the most impact.

2. **Audit and restrict your location data sources.** Your phone's location is shared more broadly than most people realize. On iPhone: Settings → Privacy & Security → Location Services. Review every app. Most do not need "Always" location access — set them to "While Using" or "Never." Also disable Significant Locations (Settings → Privacy & Security → Location Services → System Services → Significant Locations), which logs everywhere you go at the device level. On Android: Settings → Location → App permissions. Note that your carrier sells location data to aggregators independently of app permissions — this is not controllable through phone settings.

3. **Review camera and microphone permissions.** Any app with camera or microphone access can potentially capture visual and audio data. On iPhone: Settings → Privacy & Security → Camera / Microphone. Revoke access for any app that does not have a clear functional need for it. Social media apps rarely need camera access outside of their in-app camera — use your native camera and share the result instead. Be particularly cautious of apps that request both camera and microphone access without an obvious reason.

4. **Request deletion from major data brokers.** Data brokers — companies like Spokeo, Whitepages, Intelius, BeenVerified, and LexisNexis — collect, aggregate, and sell personal information including name, address history, relatives, phone numbers, and behavioral data. Most have an opt-out or deletion request process, though it is often deliberately difficult to navigate. Start with the largest brokers; services like DeleteMe (subscription-based) or the free opt-out instructions maintained by privacyrights.org can accelerate this process. Opt-outs are not permanent — brokers routinely re-populate profiles from new data sources within 6–12 months. Treat opt-out as periodic maintenance, not a one-time action.

5. **Reduce your social graph exposure.** Social graph data — who you know, how you communicate with them, how often — is as revealing as location data and significantly harder to protect because it requires the cooperation of your contacts. Practical steps: make social media profiles private or delete them; remove or limit contact syncing in messaging apps (contact sync is rarely necessary for core functionality); be selective about which apps can access your address book. Understand that if your contacts use apps that sync their address books, your name, number, and email are already in commercial databases regardless of your own app choices. This is not fully preventable — it is a reason to be selective about who has your contact information.

6. **Understand where facial recognition is deployed.** In the United States, facial recognition is used operationally by federal agencies (FBI, DHS, CBP at ports of entry), by a growing number of state and local police departments, and commercially by retailers for loss prevention and venue access management. A small number of cities have banned government use — San Francisco, Boston — but most have not. If you are in an environment where identification is a concern — a protest, a legal proceeding, a high-conflict encounter — wearing a mask, hat, or glasses meaningfully degrades automated recognition. This is legal in most jurisdictions; some states have anti-mask statutes with exceptions that vary. Look up your state's specific law before relying on this.

7. **Know your legal rights when AI is used against you.** Several U.S. states have enacted biometric privacy laws — Illinois (BIPA), Texas (CUBI), and Washington — that restrict collection of biometric identifiers including facial geometry. Illinois and Texas require affirmative prior consent; Washington allows an opt-out mechanism as an alternative. If you believe your biometric data was collected without compliance in Illinois, you may have a private right of action under BIPA. In Texas and Washington, enforcement is through the state attorney general — contact your state AG's office or consult an attorney for options specific to your situation. The Federal Trade Commission takes enforcement action against deceptive or unfair data practices more broadly. If you become aware of surveillance directed at you — stalkerware on a device, unauthorized access to your location data — document the circumstances including where and when it occurred and what entity may have operated the system.

## Common Mistakes

- **Treating location services as the only tracking vector.** Location permissions are one layer. Carrier-level location data, Wi-Fi probe requests, Bluetooth beacons, and purchase history all generate location signals independent of your phone's GPS settings.
- **Using private browsing as a surveillance countermeasure.** Private or incognito browsing prevents local browsing history from being saved on your device. It does not prevent your ISP, your employer's network, or the websites you visit from logging your activity. It does not hide your IP address.
- **Assuming opt-out from data brokers is permanent.** Brokers re-ingest data from new sources on a rolling basis. Opt-out submission is not a one-time fix.
- **Focusing only on your own app choices.** Your data exists in the contact lists and social graphs of everyone you've communicated with. People in your network who use data-hungry apps contribute to your profile without your knowledge or consent.
- **Thinking surveillance is only a government problem.** Commercial surveillance infrastructure — data brokers, behavioral profiling, stalkerware — is available to private individuals including abusive partners, private investigators, and hostile employers. The steps that limit government access also limit commercial and personal surveillance.

## Resources

- [Auditing Your Apple Device for Surveillance Risks](/resources/tutorial-apple-security-audit/) — audit device access and location sharing settings
- [Using Focus Modes to Compartmentalize Your Digital Life](/resources/tutorial-focus-modes/) — limit data exposure through context separation
- [Setting Up Encrypted Communication on Apple Devices](/resources/tutorial-encrypted-communication/) — protect communications from interception
- [Recognizing and Responding to Deepfakes and Voice Cloning](/resources/tutorial-ai-deepfakes/) — when AI is used to fabricate your identity
- [Survival Resources](/resources/survival/) — safety planning and legal aid resources
- [Glossary](/resources/glossary/) — definitions for technical terms used in this tutorial
