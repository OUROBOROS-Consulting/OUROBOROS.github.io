---
layout: default
title: PSAs
description: "Free printable public-service announcements on technology, safety, records, and digital self-defense."
permalink: /resources/psas/
hide_cta: true
---

{% assign cta_count = site.data.psas.size %}
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
  lede="Free public-service announcements for general audiences. These materials are separate from the firm's consulting services."
  icon="ph ph-fill ph-megaphone"
  cta_text=cta_text
%}

<div class="page-body">
  {% if site.data.psas.size > 0 %}
  <div class="related-grid">
    {% for item in site.data.psas %}
    <article class="c-card c-card--framed">
      {% if item.category %}<p class="rc-tag">{{ item.category | escape }}</p>{% endif %}
      <h2 class="rc-title">{{ item.title | escape }}</h2>
      <p class="card-desc">{{ item.description | escape }}</p>
      <a class="card-link" href="{{ item.file | relative_url }}" download>Download PDF →</a>
    </article>
    {% endfor %}
  </div>

  {% else %}
  <p class="card-desc">No public-service announcements are available yet.</p>
  {% endif %}
</div>
