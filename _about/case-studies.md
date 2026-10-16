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

  {% assign sorted_studies = site.case_studies | sort: "date" | reverse %}
  {% assign categories = sorted_studies | map: "category" | uniq | sort %}

  {% for cat_name in categories %}
  {% assign cat_studies = sorted_studies | where: "category", cat_name %}

  <section class="psa-section">
    <div class="band-header band-header--compact">
      <h2 class="band-heading band-heading--compact">{{ cat_name }}</h2>
      <span class="band-count">{{ cat_studies.size }} {% if cat_studies.size == 1 %}engagement{% else %}engagements{%
        endif %}
      </span>
    </div>
    <div class="related-grid">
      {% for study in cat_studies %}
      <a href="{{ study.url | relative_url }}" class="c-card c-card--framed">
        <p class="rc-tag">{{ study.category }}</p>
        <h3 class="rc-title">{{ study.title }}</h3>
        {% if study.lede %}<p class="card-desc">{{ study.lede }}</p>{% endif %}
        {% if study.date %}<p class="rc-date">{{ study.date | date: "%B %Y" }}</p>{% endif %}
        {% if study.tags.size > 0 %}
        <p class="rc-tags">
          {% for tag in study.tags %}<span class="rc-tag-chip">{{ tag }}</span>{% endfor %}
        </p>
        {% endif %}
        <span class="card-link">Read more →</span>
      </a>
      {% endfor %}
    </div>
  </section>

  {% endfor %}

  {% else %}
  <div class="c-card">
    <p class="card-desc">Case studies coming soon.</p>
  </div>
  {% endif %}
</div>
