---
layout: default
title: PSAs
description: "Free printable public service announcements on technology, personal safety, records, and digital self-defense. Written for people who need the answer, not the vendor pitch."
permalink: /resources/psas/
---

{% assign cta_count = site.psas.size %}
{% if cta_count == 1 %}
  {% assign cta_text = cta_count | append: " document" %}
{% else %}
  {% assign cta_text = cta_count | append: " documents" %}
{% endif %}

{% include page-hero.html
  back_url="/resources/"
  back_label="All Resources"
  category="Public Interest"
  title="PSAs"
  lede="Public service announcements on technology, psychopathology, coercive control, and related causes — written for general audiences."
  icon="ph ph-fill ph-warning"
  cta_text=cta_text
%}

<div class="page-body">
  {% if site.psas.size > 0 %}

  {% assign sorted_psas = site.psas | sort: "date" | reverse %}
  {% assign sections = sorted_psas | map: "section" | uniq | sort %}

  {% for section_name in sections %}
  {% assign section_psas = sorted_psas | where: "section", section_name %}

  <section class="psa-section">
    <div class="band-header band-header--compact">
      <h2 class="band-heading band-heading--compact">{{ section_name }}</h2>
      <span class="band-count">{{ section_psas.size }} {% if section_psas.size == 1 %}document{% else %}documents{% endif %}</span>
    </div>
    <div class="related-grid">
      {% for psa in section_psas %}
      <a href="{{ psa.url | relative_url }}" class="related-card">
        <p class="rc-tag">{{ psa.category | default: 'PSA' }}</p>
        <h3 class="rc-title">{{ psa.title }}</h3>
        {% if psa.lede %}<p class="card-desc">{{ psa.lede }}</p>{% endif %}
        {% if psa.date %}<p class="rc-date">{{ psa.date | date: "%B %Y" }}</p>{% endif %}
        <span class="card-link">View →</span>
      </a>
      {% endfor %}
    </div>
  </section>

  {% endfor %}

  {% else %}
  <div class="card--formula">
    <div class="card--formula__interior">
      <p class="card-desc">PSAs coming soon.</p>
    </div>
  </div>
  {% endif %}
</div>
