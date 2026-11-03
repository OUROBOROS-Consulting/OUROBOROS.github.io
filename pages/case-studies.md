---
layout: default
title: Case Studies
description: "Client and in-house work in private technology, AI-assisted development, and brand and web design."
permalink: /case-studies/
---

{% include page-hero.html
  back_url="/projects/"
  back_label="All Projects"
  category="Work"
  title="Case Studies"
  lede="What the work involved, what changed, and what it can—and cannot—show."
  icon="ph ph-fill ph-folder-open"
%}

<div class="page-body">
  {% if site.case_studies.size > 0 %}
  {% include grouped-content-list.html
    items=site.case_studies
    group_by="category"
    singular_label="case study"
    plural_label="case studies"
    card_class="c-card--framed"
    link_label="Read case study"
    show_tags="true"
  %}
  {% else %}
  <div class="c-card">
    <p class="card-desc">Case studies coming soon.</p>
  </div>
  {% endif %}
</div>
