---
layout: default
title: Case Studies
description: "How the work actually goes. Engagements in advocacy, teaching, technology, and design, written up with the constraints and the tradeoffs left in."
permalink: /case-studies/
---

{% include page-hero.html 
  back_url="/projects/" 
  back_label="All Projects" 
  category="Work" 
  title="Case Studies" 
  lede="Technology consulting, advocacy, and research — documented honestly, including what was hard."
  icon="ph ph-fill ph-folder-open"
%}

<div class="page-body">
  {% if site.case_studies.size > 0 %}

  {% include grouped-content-list.html
    items=site.case_studies
    group_by="category"
    singular_label="engagement"
    plural_label="engagements"
    card_class="c-card--framed"
    link_label="Read more"
    show_tags="true"
  %}

  {% else %}
  <div class="c-card">
    <p class="card-desc">Case studies coming soon.</p>
  </div>
  {% endif %}
</div>
