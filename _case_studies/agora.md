---
title: Communications Infrastructure for Graduate Labor Organizing
description: Applying Federal IT and data engineering skills to build a more resilient comms pipeline for a graduate worker union than the administration has.
layout: foundation
back_url: /work/
category: Changemaking
lede: When the institution fails you, the union shows up. And when it does, you show up back — with a better technical stack than they have.
date: 2026-04-01
tags: [Labor Organizing, Data Engineering, Communications, Advocacy, Higher Education]

# ── Overview blurb ──────────────────────────────────────────────────
about:
  heading: Engagement Overview
  body: >
    Graduate worker unions operate on tight budgets and donated time, but they're fighting
    institutions with dedicated legal teams, communications departments, and administrative
    infrastructure. The gap is real — and it's largely a technical one. This case study
    documents an ongoing effort to close that gap: applying the same data engineering and
    communications tooling skills used in Federal public health infrastructure to graduate
    labor organizing at the University of Minnesota. The tools are different. The stakes
    are similar: keeping critical information current, getting it to the right people,
    and making collective action easy to take.

# ── Pull quote ───────────────────────────────────────────────────────
pull_quote: >
  "Strong people don't need strong leaders." — Ella Baker

# ── Deep-dive sections ───────────────────────────────────────────────
sections:
  - id: context
    heading: How This Started
    body_paragraphs:
      - >
        I spent two years at HHS (2021–2023) building mission-critical infrastructure
        for the national COVID response — FedRAMP-compliant ML systems, data pipelines
        ingesting health data from across federal and state sources, system transition
        management for Vaccines.gov and HHS Protect. I learned, in a high-stakes environment,
        what it means to keep critical information flowing when failure has real consequences.
        I then enrolled in a PhD program in Biostatistics at the University of Minnesota,
        and encountered quickly what many graduate workers find: that universities treat their
        own workforce with the same institutional indifference that characterizes bureaucracies
        everywhere — with less accountability and fewer external checks.
      - >
        The union was different. When I needed support, the union showed up — without
        conditions, before I was even a dues-paying member. That kind of institutional
        solidarity is rare and worth protecting. My response was practical: apply the
        skills I've developed — data engineering, process automation, web infrastructure,
        communications systems — to help the union communicate more effectively than its
        institutional adversaries do. That's not a high bar. Administrations have
        communications offices staffed with professionals. Unions have volunteers.
        Technical infrastructure is how you close that asymmetry.

  - id: approach
    heading: The Technical Stack
    body_paragraphs:
      - >
        The core framing is simple: labor organizing is an information problem. Members
        need to know what's happening, what they can do about it, and how to act without
        friction. Most union comms fail on the third criterion — the action step requires
        too many clicks, too much context, too much prior knowledge. The campaigns infrastructure
        I'm building addresses that directly.
      - >
        Action Network provides embeddable HTML campaign widgets that let visitors send
        pre-written letters to officials, sign petitions, and register for events without
        leaving the union website. The integration requires a front-end developer; I'm building
        a dedicated Campaigns page that embeds these directly. Every visitor becomes a potential
        participant. The friction is close to zero. For a union that needs to demonstrate
        active membership engagement to administration, this kind of low-effort participation
        infrastructure has direct strategic value.
      - >
        Data automation is the second component. Union websites often have stale information —
        not because no one cares, but because updating a website manually requires a specific
        person to do a specific task on a specific schedule. That dependency is fragile. I'm
        designing automated pipelines that ingest structured data (member updates, campaign
        status, event schedules) and push it to the site without requiring manual intervention.
        The underlying principle is the same one I applied at HHS: information that people
        depend on should not require a human bottleneck to stay current.
      - >
        The third component is not technical at all. I've made connections with established
        figures in industrial-organizational psychology, psychological safety research, and
        workplace bullying activism. These are credentialed experts with published work on
        exactly the conditions graduate workers describe. Facilitating formal collaboration
        between those allies and the union — written analyses, public letters, expert testimony
        if needed — gives the organizing effort a different kind of authority. Data engineering
        can show what's happening; expert testimony explains why it's harmful and what
        responsibility institutions have.

  - id: what-is-built
    heading: What Gets Built and Why It Matters
    body_paragraphs:
      - >
        A Campaigns page that functions as a low-friction advocacy portal: embedded
        Action Network forms for letter-writing, petition signing, and event registration.
        Visitors arrive, see a clear call to action, and act in under two minutes. No
        account required. No learning curve. The administration has professional communicators
        managing its messaging. The union will have a more responsive digital presence.
      - >
        Automated data pipelines that keep the site current without requiring a volunteer
        webmaster to manually update every field. This is a solved engineering problem —
        structured data plus a CI/CD workflow — applied to a context where it's genuinely
        underused. The result is an organization that looks and operates like it has
        dedicated technical staff, without the budget to hire any.
      - >
        An allied expert network that can produce materials — written analyses,
        public commentary, testimony — grounded in established research on psychological
        safety, workplace bullying, and institutional power dynamics. Labor disputes
        are won and lost in part on the credibility of the narrative. Expert backing
        from credentialed figures in relevant fields changes what administrators can
        plausibly dismiss.

  - id: lessons
    heading: What This Demonstrates About Technical Consulting for Causes
    body_paragraphs:
      - >
        The skills that make an effective Federal IT consultant — systems thinking, data
        engineering, communications infrastructure design — transfer directly to labor
        organizing contexts. The difference is the client. Most of what makes union comms
        weak is not a resource problem in the raw sense; it's a systems problem. No one
        has applied a systems lens to the communication infrastructure. That's a consulting
        problem, not a budget problem.
      - >
        This project is one instance of a broader pattern I'm developing: applying
        technical depth to causes that typically can't access it. Early-stage startups
        face the same structural disadvantage that unions do — they have goals but not
        the technical infrastructure to pursue them efficiently. The skills are the same.
        The stakes are different. The approach is identical: understand the information
        flows, identify the bottlenecks, engineer a system that doesn't depend on
        individual heroics to function.
      - >
        If you're running an organization — a union, an advocacy group, a startup —
        that is spending volunteer hours on manual processes that could be automated,
        or missing campaign momentum because your website requires a developer to update,
        that's a tractable problem. I've solved versions of it in Federal environments
        with much higher complexity and compliance overhead. The union case is where
        I'm applying those skills for a cause I believe in. The same work is available
        for organizations with similar problems and different missions.
---
