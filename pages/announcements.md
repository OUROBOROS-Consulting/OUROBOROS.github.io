---
layout: default
title: Announcements
permalink: /announcements/
description: "News and updates from ouroborOS Consulting."
---

{% include page-hero.html 
  back_url="/" 
  back_label="Home" 
  category="News" 
  title="Announcements" 
  lede="Updates on new projects, partnerships, publications, and practice developments." 
  icon="ph ph-megaphone"
%}

<div class="page-body">
  {% assign sorted_announcements = site.announcements | sort: "date" | reverse %}
  {% if sorted_announcements.size > 0 %}
  <div class="related-grid">
    {% for item in sorted_announcements %}
    <a href="{{ item.url | relative_url }}" class="c-card c-card--related">
      {% if item.category %}<p class="rc-tag">{{ item.category }}</p>{% endif %}
      <h2 class="rc-title">{{ item.title }}</h2>
      {% if item.lede %}<p class="card-desc">{{ item.lede }}</p>{% endif %}
      {% if item.date %}<p class="rc-date">{{ item.date | date: "%B %-d, %Y" }}</p>{% endif %}
      <span class="card-link">Read →</span>
    </a>
    {% endfor %}
  </div>
  {% else %}
  <p class="page-hero-lede" style="color:var(--muted);padding:2rem 0">No announcements yet.</p>
  {% endif %}
</div>
