---
title: Website Development with Claude by Anthropic
description: An honest account of using AI as a development collaborator — what it changed, what it didn't, and what it revealed about how good software gets made.
layout: mission
back_url: /work/
category: Startup Operations
lede: When the consultant becomes the client — how Claude Code was used to design and build this very site, with a lot of human input.
date: 2026-04-01
tags: [Technology, Development, AI Use Case, Web Design, Design Systems]

# ── Overview blurb ──────────────────────────────────────────────────
about:
  heading: Engagement Overview
  body: >
    This is an unusual case study: I'm both the practitioner and the client. I built this
    website using Claude Code as a primary development collaborator—and I was watching
    the whole time. I set the direction, made the judgment calls, and held the standards.
    Claude executed with tireless context-holding and coherence. What began as a practical
    experiment in AI-assisted development became a proof of concept for a new consulting
    model: how to use agentic AI as a force multiplier for startups and small firms who
    need high-quality technical work but can't sustain a full engineering team. This is
    what I actually saw, and what I'm now offering to clients.

# ── Pull quote ───────────────────────────────────────────────────────
pull_quote: >
  "The world of the future will be an ever more demanding struggle against the
  limitations of our own intelligence, not a comfortable hammock in which we can
  lie down to be waited upon by our robot slaves." — Norbert Wiener

# ── Deep-dive sections ───────────────────────────────────────────────
sections:
  - id: context
    heading: The Starting Point
    body_paragraphs:
      - >
        I spent two years at HHS (2021–2023) building and deploying FedRAMP-compliant ML systems,
        leading agency-wide transitions of mission-critical public health infrastructure, and designing
        custom automation tooling. I led a technical team, published peer-reviewed work in biostatistics,
        and learned to translate vague policy requirements into production systems that actually work.
        I'm now building a consulting practice: helping early-stage startups think clearly about product
        operations, infrastructure, and tooling without needing a full engineering team on staff.
        This case study documents what happened when I used Claude Code as a collaborator—not to replace
        judgment, but to compress delivery timelines while maintaining the coherence and polish that
        clients expect. It's a proof of concept for a new kind of technical consulting.
      - >
        Building a credible professional website from scratch involves an uncomfortable
        number of overlapping domains: visual design, front-end architecture, content
        strategy, performance, and accessibility. A solo practitioner with deep expertise
        in one area is rarely expert in all of them simultaneously. Most professional sites fail because of this: technically functional but visually undistinguished, or visually ambitious but brittle and inaccessible.
      - >
        I had a clear sense of what this firm should feel like: precise, serious, quietly
        distinguished. A set of technical requirements followed from that — a dark palette
        with gold accents, custom animations that didn't feel gratuitous, a content
        architecture that could scale, and accessibility standards that actually held up
        under scrutiny. The question was how to get there without the overhead of a
        dedicated engineering team.

  - id: approach
    heading: How We Worked with Claude
    body_paragraphs:
      - >
        The core of my workflow was Claude Code — Anthropic's agentic CLI — used iteratively
        across the full development lifecycle. I was explicit about my role: I set the architectural
        direction, made the judgment calls, and held the standards. I scoped the work. I decided
        what was worth building, in what order, and to what standard. Claude executed the decisions.
        This was closer to pair programming than delegation — I asked open-ended questions, pushed
        back when reasoning didn't hold up, and paid attention to how it reasoned, not just what it produced.
      - >
        I came to this with prior Jekyll experience — at HHS I managed the full deployment lifecycle
        of Healthdata.gov and other public systems using Federalist. I knew the constraints and
        possibilities. I coded most of this site myself: wrote the templates, built the Sass architecture,
        implemented the JavaScript. I also hit blockers — design patterns I wanted to scale properly,
        animation mechanics that weren't behaving as intended, architectural questions that needed
        pressure-testing. That's when Claude became essential. I'd identify the specific problem,
        ask a focused question, get the response, and keep building. It was genuine collaboration,
        not delegation.
      - >
        Early phases were architectural. I needed to decide how to structure content so it could scale
        without database overhead. I worked with Claude on data file organization and the Sass design
        system — not as a reviewer of Claude's work, but as someone building the actual implementation
        and wanting feedback on the approach. I chose the strategy; Claude helped me think through
        edge cases and scaling concerns. I then built it.
      - >
        Middle phases were implementation. Most of the code is mine. But when I got stuck on the carousel
        animation mechanics — I knew what I wanted (swipe support, ARIA live regions, pause-on-hover),
        but the implementation was tricky — Claude became the sounding board. When I needed to understand
        how to implement momentum physics on the cursor animation while respecting prefers-reduced-motion,
        Claude provided the technical depth. I took that knowledge and built it. Some features I built
        entirely alone; others were collaborative problem-solving that happened over multiple turns.
      - >
        Late in the project, I brought Claude in specifically for a systematic accessibility audit.
        I know accessibility patterns — I've implemented ARIA regions, semantic HTML, keyboard
        navigation — but a fresh, rigorous pass catches what fades into your own blind spots. Claude
        surfaced 28 issues: broken HTML structure, missing ARIA attributes, navigation links returning
        404s, styling inconsistencies. I reviewed each one, prioritized what was critical, and
        implemented the fixes myself. That's where Claude became irreplaceable — not as the person
        doing the work, but as the mechanism for forcing a comprehensive review that I would have
        deferred indefinitely without explicit pressure. The audit was the collaboration; the remediation
        was mine.

  - id: technical
    heading: What Was Built
    body_paragraphs:
      - >
        The site is a Jekyll-based static site hosted on GitHub Pages. Its visible
        complexity — the dark theme, the gold accents, the animated hero, the responsive
        carousels — is built on top of a deliberately minimal technical foundation. No
        JavaScript frameworks. No build pipelines beyond Jekyll's native compilation.
        No external UI libraries. The design system lives in a handful of Sass files and
        is expressed through a small set of reusable CSS classes.
      - >
        The moon in the hero section is pure CSS — a circle with layered box-shadows and a
        five-second glow keyframe animation, with crater details rendered through pseudo-elements.
        It required thinking carefully about what the effect was supposed to communicate and
        what the minimal implementation would be.
      - >
        The carousel system — used for both the values section and the testimonials — is
        a single reusable initialization function that handles two distinct modes: manual
        navigation with dot indicators, and auto-advancing with pause-on-hover. Swipe
        gestures work. ARIA live regions update on slide change. The implementation is
        around 150 lines. It does one thing well.
      - >
        Content architecture separates data from presentation throughout. Testimonials,
        navigation structure, core values, and reading recommendations all live in YAML
        files under _data/. Layouts consume them. Adding a new testimonial or service link
        is a one-line edit in a data file, not a search-and-replace through HTML templates.
        That distinction compounds over time.

  - id: what-changed
    heading: What the Collaboration Actually Changed
    body_paragraphs:
      - >
        Measurably: the time I spent on specific problems. When I needed to design the ARIA carousel
        system (swipe support, live regions, pause-on-hover) or think through the data architecture
        for scaling testimonials and navigation without duplication, or needed a comprehensive
        accessibility audit—those moments that would normally mean days of research and iteration were
        compressed into focused conversations. That compression is real. It shifted what became possible
        in the available calendar time.
      - >
        What's less obvious is the quality benefit. Claude was useful not because it wrote code faster,
        but because it held context consistently. It remembered the design system rules when implementing
        new components. It caught cases where a layout change would break mobile navigation. It questioned
        architectural choices—sometimes correctly, sometimes requiring me to push back. That kind of
        sustained coherence across a multi-week project is genuinely hard to maintain alone. Most solo
        practitioners slip on this; I didn't have to, because the system was holding the pattern.
      - >
        The tradeoff is clear: Claude's output required review. Some implementations were technically
        correct but aesthetically wrong—carousels that functioned perfectly but felt stiff, animations
        that were mathematically accurate but didn't match the visual intent. The reasoning itself was
        occasionally off—plausible-sounding suggestions that didn't hold up under scrutiny. The feedback
        loop was where the actual work happened. Claude generated candidates; I evaluated, directed,
        and sometimes rejected. Neither half is optional. Anyone treating AI output as ready-to-ship
        without judgment will pay for that assumption.
      - >
        This is the model I'm demonstrating to clients. You get a consultant who knows how to set
        direction, hold standards, and use AI as a force multiplier rather than a replacement for
        judgment. The result is a site that took weeks, not months, to deliver to a professional standard.
        That economics shift what small firms and solo practitioners can do.

  - id: lessons
    heading: What This Reveals About Technical Consulting in the Age of Agentic AI
    body_paragraphs:
      - >
        The central lesson is not about AI—it's about judgment. AI collaboration doesn't reduce the need
        for judgment; it surfaces it more quickly. When Claude can implement a feature in an hour, the
        bottleneck shifts to knowing what to build, in what order, and to what standard. Those are human
        decisions. The faster the implementation, the more consequential the direction. This is the
        consulting work I do for clients: helping them think clearly about what they actually need,
        why they need it, and to what standard.
      - >
        For early-stage startups and solo practitioners, this shift is favorable. The parts that are
        hardest to delegate—taste, intent, understanding what the product is actually trying to do—stay
        with the human. The parts that slip under fatigue, inconsistency, and time pressure—thoroughness,
        coherence across a large codebase, systematic review—are where AI assistance multiplies value most.
        I provide the direction and judgment; Claude provides the tireless execution and context-holding.
        The result is work that would normally require a team, delivered faster and more coherently.
      - >
        This project gave me a clean, firsthand understanding of what that collaboration looks like in
        practice for clients: what to trust, what to verify, where to push back. I've taken it from theory
        to lived experience, running the full cycle myself. The result is the site you're reading now. I
        think it's good work—not despite the AI collaboration, but because I was clear about what I brought
        to it: judgment, taste, accessibility expertise, the ability to catch architectural slop before it
        compounds. Claude brought tireless execution and coherence across thousands of lines.
      - >
        If you're a startup that needs solid technical infrastructure, a clear design system, and a coherent
        product but can't afford a three-person engineering team, that's a conversation I'm having. You get
        someone who knows how to set direction, hold standards, and leverage agentic AI as a multiplier. No
        prompt-and-paste. No treating AI output as ready-to-ship. Just clear thinking, high standards, and
        delivery that reflects them.

        [See the Agentic AI Strategy & Integration service](/services/agentic-ai/) if you want to explore this model further.
---
