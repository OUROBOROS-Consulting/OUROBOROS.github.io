---
title: Survival Resources
description: Resources to help you learn more about and survive antagonistic individuals, trauma, and the ensuing intitutional betrayal.
layout: foundation
category: Resources
lede: Abandon Most Hope, Ye who Enter
tags: [Antagonism, Trauma, Institutional Betrayal]
who: null

# ── About ──────────────────────────────────────────────────────────────────
about:
  heading: What the literature actually says
  body: >
    The gap between what psychology and sociology know about coercive control and institutional betrayal
    and what courts and institutions do about it is staggering.
    These references are the foundation of that knowledge.
    They are cited in clinical training, legal scholarship, and policy documents
    — and routinely ignored in practice.

# ── Pull quote ─────────────────────────────────────────────────────────────
pull_quote: >
  "The most dangerous thing about institutional betrayal
  is that it happens inside systems designed to look trustworthy."

# ── Page sections ──────────────────────────────────────────────────────────
sections:
  - id: general
    heading: General
    bibtex_src: /data/survival.yml

  - id: crisis
    heading: Crisis
    bibtex_src: /data/survival_crisis.yml

  - id: mental
    heading: Mental Health
    bibtex_src: /data/survival_mental.yml

  - id: legal
    heading: Legal
    bibtex_src: /data/survival_legal.yml

  - id: whistle
    heading: Whistleblower
    bibtex_src: /data/survival_whistleblower.yml

  - id: context
    heading: How to Use These
    body_paragraphs:
      - >
        Each section above draws from its own BibTeX file in <code>assets/</code> or <code>assets/bib/</code>.
        To add references to a section, open the corresponding <code>.bib</code> file
        and add entries in standard BibTeX format.
        Fields used: author, title, year, journal/booktitle/publisher, doi, url, note.
      - >
        Supported entry types: @article, @book, @inproceedings, @misc.
        DOIs are automatically linked via doi.org. If no DOI is present, the url field is used instead.
---