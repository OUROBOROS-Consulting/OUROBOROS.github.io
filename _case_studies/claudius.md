---
title: Website Devlopment with Claude by Anthropic
description: An honest account of using AI as a development collaborator — what it changed, what it didn't, and what it revealed about how good software gets made.
layout: foundation
back_url: /work/
category: Case Study
lede: When the consultant becomes the client — how Claude Code was used to design and build this very site, with a lot of human input.
date: 2026-04-01
tags: [Technology, Development, AI Use Case, Web Design, Design Systems]

# ── Overview blurb ──────────────────────────────────────────────────
about:
  heading: Engagement Overview
  body: >
    This is an unusual case study: I'm both the practitioner and the client. I built this
    website using Claude Code as a primary development collaborator — and I was watching
    the whole time. Not just using it, but observing how it reasoned, where it was useful,
    and where it needed correction. What began as a practical experiment in AI-assisted
    development became more instructive than I expected. This is what I actually saw.

# ── Pull quote ───────────────────────────────────────────────────────
pull_quote: >
  "The most useful thing Claude did was hold the context I couldn't hold myself —
  keeping the design system consistent, catching accessibility gaps I'd have missed,
  and pushing back when I was about to do something architecturally sloppy."

# ── Deep-dive sections ───────────────────────────────────────────────
sections:
  - id: context
    heading: The Starting Point
    body_paragraphs:
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
        The core of my workflow was Claude Code — Anthropic's agentic CLI — used
        iteratively across the full development lifecycle. This was not prompt-and-paste
        engineering, where you ask an AI to generate a function and integrate it by hand.
        It was closer to pair programming with a collaborator who could hold the full
        context of the codebase and reason about design decisions alongside implementation
        details. I asked open-ended questions. I pushed back. I paid attention to how it
        reasoned, not just what it produced.
      - >
        I worked in Git-branched cycles: a problem or feature would be scoped, handed
        to Claude to implement, reviewed, and merged or revised. Branch names like
        claude/add-glowing-moon-effect and claude/ecstatic-mcnulty — the latter a
        Claude-generated identifier that stuck — became part of the development record,
        a visible trace of the collaboration embedded in the commit history.
      - >
        Claude's role varied by phase. Early on, it was primarily architectural: structuring
        the Jekyll data files (_data/values.yml, _data/testimonials.yml, _data/nav.yml) so
        that content could be managed separately from layout, and establishing the Sass
        design system that would govern color, typography, and spacing across every page.
        These decisions were not glamorous, but they determined how much rework I'd face
        later. Getting them right early was worth the time.
      - >
        In the middle phases, Claude handled feature development — writing the JavaScript
        carousel system, implementing the canvas-based cursor animation, designing the moon
        glow effect in CSS — while I provided feedback and iterated toward the final
        result. Late in the process, Claude conducted a systematic accessibility audit that
        surfaced 28 issues across the codebase: broken HTML structure, missing ARIA
        attributes, navigation links returning 404s, and styling inconsistencies. These
        were addressed in a single comprehensive pass — the kind of review that is easy
        to defer indefinitely without explicit forcing.

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
        The cursor halo animation is a canvas-based effect written in roughly 120 lines
        of vanilla JavaScript. A golden ring orbits the cursor, spinning only when the
        cursor is at rest, with momentum-based physics that make the motion feel
        intentional rather than mechanical. It respects prefers-reduced-motion. The
        moon in the hero section is pure CSS — a circle with layered box-shadows and a
        five-second glow keyframe animation, with crater details rendered through
        pseudo-elements. Neither required a library. Both required thinking carefully
        about what the effect was supposed to communicate and what the minimal
        implementation would be.
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
        The honest answer is: the scope of what was achievable within a given time window.
        Features that would have required significant research and iteration — the cursor
        animation physics, the ARIA carousel implementation, the systematic accessibility
        pass — were completed in hours rather than days. That compression is real. For a small firm where engineering time is not the primary constraint, the time savings shift what becomes possible.
      - >
        What is less obvious is the nature of the quality benefit. Claude was useful not
        primarily because it wrote code faster, but because it held context consistently.
        It remembered the design system rules when implementing a new component. It caught
        cases where a new layout would break the mobile navigation. It pushed back —
        sometimes correctly, sometimes not — when an implementation choice seemed
        structurally questionable. That kind of sustained coherence is harder to maintain
        alone over a multi-week project than it sounds.
      - >
        The process also revealed the limits of AI collaboration clearly. Claude's output
        required review. Some implementations were technically correct but aesthetically
        wrong — functional carousels that felt stiff, animations that were accurate but
        didn't match the visual intent. Occasionally the reasoning itself was off: a
        suggestion that looked plausible on the surface but didn't hold up when I
        questioned the logic. The feedback loop was the actual work. Claude generated
        candidates; I evaluated and directed. Neither half of that loop is optional, and
        anyone who treats it as optional will eventually pay for that assumption.

  - id: lessons
    heading: What This Tells Us About AI-Assisted Development
    body_paragraphs:
      - >
        The most important lesson from this project is that AI collaboration does not
        reduce the need for judgment — it surfaces it more quickly. When Claude can
        implement a feature in an hour, the bottleneck shifts to knowing what to build,
        in what order, and to what standard. Those are human decisions. The faster the
        implementation, the more consequential the direction.
      - >
        For a solo practitioner or small team, that shift is broadly favorable. The
        parts of development that are hardest to delegate — taste, intent, editorial
        judgment about what the site is actually trying to do — remain with the human.
        The parts that slip under fatigue, inconsistency, or time pressure — thoroughness, coherence across a large codebase, systematic review — are where AI assistance is most valuable.
      - >
        I build websites for clients when the work calls for it, and I advise on AI
        tooling adoption. This project gave me a cleaner, firsthand understanding of what
        that collaboration looks like in practice — what to trust, what to verify, and
        where to push back. The result is the site you are reading. I think it's good
        work. I also think AI collaboration requires the same thing all high-stakes work
        requires: someone who is actually paying attention.
---
