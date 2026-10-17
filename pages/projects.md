---
layout: default
title: Projects
permalink: /projects/
description: "Case studies, public service announcements, and essays — across technology, research, and advocacy."
---

{% assign case_count = site.case_studies.size | default: 0 %}
{% assign psa_count = site.psas.size | default: 0 %}
{% assign total_count = case_count | plus: psa_count %}
{% assign page.cta_text = total_count | append: " pieces" %}

{% include page-hero.html 
  back_url="/" 
  back_label="Home" 
  category="Projects" 
  title="Projects" 
  lede="Case studies, public service announcements, and essays — across technology, research, and advocacy." 
  icon="ph ph-briefcase"
%}

<div class="page-body c-container">
  <div class="c-grid c-grid--2">

    <a href="{{ '/case-studies/' | relative_url }}" class="c-card c-stack">
      <p class="technical text-t">Client Work</p>
      <h2 class="authority" style="margin:0; font-size: 1.5rem;">Case Studies</h2>
      <p class="text-s">Selected engagements across technology consulting, research, and advocacy — from federal COVID response to elder abuse intervention.</p>
      <span class="technical text-t" style="margin-top:auto; border-top: 1px solid var(--md-sys-color-outline); padding-top:10px;">{{ case_count }} engagements &rarr;</span>
    </a>

    <a href="{{ '/resources/psas/' | relative_url }}" class="c-card c-stack">
      <p class="technical text-t">Public Interest</p>
      <h2 class="authority" style="margin:0; font-size: 1.5rem;">PSAs</h2>
      <p class="text-s">Public service announcements on technology, psychopathology, coercive control, and related topics — written for general audiences.</p>
      <span class="technical text-t" style="margin-top:auto; border-top: 1px solid var(--md-sys-color-outline); padding-top:10px;">{{ psa_count }} {% if psa_count == 1 %}document{% else %}documents{% endif %} &rarr;</span>
    </a>

  </div>
</div>
