---
title: Building a Smart Fortress
description: An honest account of building a smart home for protecting a survivor who was betrayed by law enforcement — myself.
layout: foundation
back_url: /work/
category: Survivor Security
lede: When institutions betrayed me and failed to keep me safe, I built my own.
date: 2026-04-01
tags: [Smart Home, Security, Privacy, Apple HomeKit]

about:
  heading: Case Overview
  body: >
    This case study is unusual: a practitioner writing about his own home. After law
    enforcement failed to protect me from a documented abuser — and in several instances
    compounded the harm — I did what I advise clients to do: I audited my threat model
    and built infrastructure appropriate to it. This is an account of that build: what
    was installed, how it was configured, and what it has and has not changed.

    That’s one of my various interrelated missions: to make survival operational by
    applying the same systems thinking and technology rigor I used on the Federal
    COVID-19 response.

pull_quote: >
  "When institutions refuse to protect you, you build your own. The math is
  uncomfortable, but the conclusion is not optional."

sections:
  - id: context
    heading: The Starting Point
    body_paragraphs:
      - >
        The threat model here was specific and documented: an abusive ex-partner with
        a history of stalking, physical violence, and demonstrated willingness to exploit
        institutional access. Standard advice — call the police, file reports — was not
        only insufficient in this context but occasionally actively counterproductive.
        The home needed to function as its own security infrastructure.
      - >
        I’ve converted my apartment to a smart home, so I don’t have to worry about my
        physical safety or privacy. My blinds literally close after the sun sets — good
        luck to any PI my adversaries may hire.
      - >
        The design requirements followed directly from the threat: perimeter awareness
        without relying on a third party to relay it; logging that could not be tampered
        with; remote visibility into home status from anywhere; and reliable operation
        without vendor subscriptions that could lapse or services that could be subpoenaed
        for data that should remain private.

  - id: platform
    heading: Why Apple HomeKit
    body_paragraphs:
      - >
        Apple HomeKit was the platform choice for one primary reason: privacy architecture.
        HomeKit processes data locally on Apple devices and syncs through end-to-end
        encrypted iCloud channels. Unlike most consumer smart home platforms — which route
        every sensor activation through vendor cloud servers — HomeKit data does not leave
        the device ecosystem in a readable form. For a threat model that included concern
        about sophisticated information access, this distinction was not academic.
      - >
        HomeKit Secure Video stores motion-triggered camera footage in iCloud with
        end-to-end encryption, accessible only through authenticated Apple devices. No
        Apple employee can view it. A subpoena to the camera manufacturer would yield
        nothing — the footage exists in a form accessible only to the account holder.
        That design constraint was a deliberate selection criterion, not an afterthought.

  - id: controller
    heading: Controller for HomeKit
    body_paragraphs:
      - >
        Native HomeKit's interface handles individual device control well but is limited
        for continuous situational awareness. Controller for HomeKit — a third-party iOS
        and macOS application that interfaces directly with the HomeKit API — extends this
        substantially. Its floor plan view (shown below) is a live monitoring interface:
        each icon reflects the current state of the device at that position in real time.
        Active lights appear in gold; door and window sensors show open/closed state; the
        climate sensor displays a live temperature and humidity reading. It provides
        spatial, at-a-glance awareness without navigating through multiple app screens.

  - id: security
    heading: The Security Layer
    body_paragraphs:
      - >
        The perimeter layer consists of door and window contact sensors on every ingress
        point. Each sensor sends an immediate notification when triggered and logs the
        event with a timestamp. This does not prevent entry — nothing in this stack does —
        but it eliminates the ambiguity that stalking situations routinely exploit: the
        question of whether something happened or whether you are overreacting. When a
        sensor fires at 2:00 a.m., the log is dated and precise.
      - >
        Three motion sensors cover the interior across two rooms, providing zone-based
        presence detection. Three interior cameras running HomeKit Secure Video capture
        motion-triggered recordings continuously. The footage is not intended for
        real-time intervention — response time assumptions would be wrong in this context —
        but for documentation: timestamped, encrypted evidence of presence and activity
        patterns that is useful in legal proceedings and that does not depend on law
        enforcement to initiate, preserve, or provide access to.

  - id: floorplan
    heading: The Layout
    html: |
      <figure class="fp-wrap" aria-label="Smart home floor plan — Apple HomeKit">
        <p class="fp-caption">Floor plan · Apple HomeKit via Controller</p>
        <div class="card--formula">
        <div class="card--formula__interior">
        <div class="fp-layout">
          <div class="fp-annex">
            <span class="fp-room-name">Utility</span>
            <span class="fp-dev fp-l" style="left:50%;top:50%" title="Ceiling light" aria-label="Ceiling light">L</span>
          </div>
          <div class="fp-body">
            <div class="fp-bedroom">
              <span class="fp-room-name">Bedroom</span>
              <span class="fp-dev fp-d"  style="left:5%;top:42%"   title="Door contact sensor"                     aria-label="Door contact sensor">D</span>
              <span class="fp-dev fp-m"  style="left:33%;top:28%"  title="Motion sensor"                           aria-label="Motion sensor">M</span>
              <span class="fp-dev fp-l"  style="left:18%;top:65%"  title="Table lamp"                              aria-label="Table lamp">L</span>
              <span class="fp-dev fp-la" style="left:56%;top:48%"  title="Ceiling light (active)"                  aria-label="Ceiling light, active">L</span>
              <span class="fp-dev fp-sv" style="left:52%;top:16%"  title="Apple TV"                                aria-label="Apple TV">V</span>
              <span class="fp-dev fp-l"  style="left:80%;top:52%"  title="Table lamp"                              aria-label="Table lamp">L</span>
              <span class="fp-dev fp-w"  style="left:27%;top:90%"  title="Window contact sensor"                   aria-label="Window contact sensor">W</span>
              <span class="fp-dev fp-c"  style="left:68%;top:72%"  title="Security camera (HomeKit Secure Video)"  aria-label="Security camera">C</span>
            </div>
            <div class="fp-living">
              <span class="fp-room-name">Living Room</span>
              <span class="fp-dev fp-m"  style="left:16%;top:24%"  title="Motion sensor"                           aria-label="Motion sensor">M</span>
              <span class="fp-dev fp-sv" style="left:8%;top:52%"   title="HomePod"                                 aria-label="HomePod">S</span>
              <span class="fp-dev fp-sv" style="left:22%;top:40%"  title="Apple TV / media center"                 aria-label="Apple TV">V</span>
              <span class="fp-dev fp-la" style="left:32%;top:76%"  title="Ceiling fan + light (active)"            aria-label="Ceiling fan light, active">L</span>
              <span class="fp-dev fp-la" style="left:47%;top:76%"  title="Ceiling fan + light (active)"            aria-label="Ceiling fan light, active">L</span>
              <span class="fp-dev fp-h"  style="left:38%;top:88%"  title="HVAC / heating"                          aria-label="HVAC">H</span>
              <span class="fp-dev fp-c"  style="left:52%;top:88%"  title="Security camera (HomeKit Secure Video)"  aria-label="Security camera">C</span>
              <span class="fp-dev fp-d"  style="left:95%;top:42%"  title="Door contact sensor"                     aria-label="Door contact sensor">D</span>
              <span class="fp-dev fp-l"  style="left:88%;top:18%"  title="Table lamp"                              aria-label="Table lamp">L</span>
              <span class="fp-dev fp-t"  style="left:68%;top:38%"  title="Climate sensor — 71.24 °F · 35% RH"      aria-label="Climate sensor">T</span>
              <span class="fp-dev fp-c"  style="left:74%;top:58%"  title="Security camera (HomeKit Secure Video)"  aria-label="Security camera">C</span>
              <span class="fp-dev fp-m"  style="left:52%;top:52%"  title="Motion sensor"                           aria-label="Motion sensor">M</span>
              <span class="fp-dev fp-w"  style="left:58%;top:90%"  title="Window contact sensor"                   aria-label="Window contact sensor">W</span>
              <span class="fp-dev fp-w"  style="left:82%;top:90%"  title="Window contact sensor"                   aria-label="Window contact sensor">W</span>
            </div>
          </div>
        </div>
        <div class="fp-footer">
          <div class="fp-legend">
            <div class="fp-li"><div class="fp-ld fp-ld--d"></div>Door sensor</div>
            <div class="fp-li"><div class="fp-ld fp-ld--w"></div>Window sensor</div>
            <div class="fp-li"><div class="fp-ld fp-ld--m"></div>Motion sensor</div>
            <div class="fp-li"><div class="fp-ld fp-ld--c"></div>Camera</div>
            <div class="fp-li"><div class="fp-ld fp-ld--la"></div>Active light</div>
            <div class="fp-li"><div class="fp-ld fp-ld--t"></div>Climate sensor</div>
            <div class="fp-li"><div class="fp-ld fp-ld--h"></div>HVAC</div>
          </div>
          <div class="fp-badge">71.24 °F · 35% RH</div>
        </div>
        </div>
        </div>
      </figure>

  - id: environment
    heading: Environmental Intelligence
    body_paragraphs:
      - >
        Two ceiling fan and light fixtures in the living room run on scheduled automations —
        evening-on, late-night-off — that simulate occupancy patterns regardless of physical
        location. This is standard deterrence practice. The climate sensor (currently reading
        71.24 °F and 35% relative humidity) provides environmental monitoring beyond comfort:
        humidity spikes can indicate water intrusion; anomalous thermal readings can flag open
        windows or HVAC failure that might otherwise go unnoticed.
      - >
        I’ve set up Apple workflows to automate records management and document interactions
        with antagonistic individuals and institutions. I’ve used AI to strategically think
        through situations that no human should ever be in.
      - >
        A HomePod in the living room provides local voice control for HomeKit without requiring
        cloud connectivity for commands. It also functions as a room-level audio sensor for
        presence-based automations: the system can distinguish occupied from unoccupied states
        and adjust lighting and alert thresholds accordingly. The combination of motion, climate,
        and audio presence creates a richer environmental picture than any single sensor type
        would provide alone.

  - id: lessons
    heading: What It Achieves
    body_paragraphs:
      - >
        The primary value this system provides is not prevention but information: immediate
        notification, precise logging, and encrypted documentation. Every sensor event is
        timestamped and stored in a form that is tamper-resistant by design. These are the
        three things that have historically been hardest for survivors to establish
        credibly — and they are now available without depending on law enforcement to
        initiate or maintain them.
      - >
        There is also a psychological dimension that is difficult to quantify but real. The
        ability to verify, at any moment, whether doors are locked and the perimeter is intact
        changes the quality of presence in the space. Anxiety that previously had no
        addressable object — the feeling that something might have happened — now has, in most
        cases, a data answer. That shift is not trivial for someone who has experienced the
        particular form of paranoia that targeted abuse produces.
      - >
        Not everyone needs such a high-tech setup, and if they do, it must be handled
        responsibly. Those same tools, in the hands of a malicious agent, can be used for
        surveillance, harassment, and worse.
      - >
        The limits of this system are worth naming. It provides awareness, not control. It
        documents, but it does not guarantee that documentation will be acted upon by
        institutions that have already failed you once. It is one component of a security
        posture that includes legal records, trusted contacts, and physical measures — not
        a substitute for any of them. It is the layer that did not exist before, and had
        to be built from scratch.
---
