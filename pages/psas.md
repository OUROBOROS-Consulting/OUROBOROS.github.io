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

  {% include grouped-content-list.html
    items=site.psas
    group_by="section"
    singular_label="document"
    plural_label="documents"
    card_class="c-card--related"
    category_default="PSA"
    link_label="View"
  %}

  {% else %}
  <div class="c-card--formula">
    <div class="c-card-formula__interior">
      <p class="card-desc">PSAs coming soon.</p>
    </div>
  </div>
  {% endif %}
</div>
