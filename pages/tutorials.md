---
layout: default
title: Tutorials
permalink: /resources/tutorials/
description: "Practical guides to AI privacy, data protection, device security, and public-interest safety topics."
---

{% include page-hero.html
  back_url="/resources/"
  back_label="Resources"
  category="Resources"
  title="Guides & Tutorials"
  lede="Practical guides on AI privacy, data protection, and device security. Public-interest safety guides are grouped separately."
  icon="ph-book-open-text"
%}

<div class="page-body c-container">
  {% assign sections = site.data.tutorials | group_by: "section" %}
  <h2 class="authority">AI, privacy &amp; device security</h2>
  {% for group in sections %}
  {% unless group.name == "Institutional Navigation & Survival" %}
  <section id="{{ group.name }}" class="stack" style="margin-bottom: var(--md-sys-spacing-xl);">
    <div class="stack">
      <p class="technical text-t">{{ group.name }}</p>
      <h2 class="authority">{{ group.name | capitalize }}</h2>
    </div>

    <div class="grid grid-3">
      {% for tutorial in group.items %}
      {% if tutorial.link and tutorial.link != "#" %}
      <a href="{{ tutorial.link }}" class="c-card btn-secondary c-stack">
        <p class="technical text-t">{{ tutorial.tag }}</p>
        <h3 class="authority" style="font-size: 1.2rem; margin:0;">{{ tutorial.title }}</h3>
        <p class="text-s">{{ tutorial.description }}</p>
        <span class="technical text-t" style="margin-top:auto; border-top: 1px solid var(--md-sys-color-outline); padding-top:10px;">Read Tutorial &rarr;</span>
      </a>
      {% else %}
      <div class="c-card c-card--disabled c-stack">
        <p class="technical text-t">{{ tutorial.tag }}</p>
        <h3 class="authority" style="font-size: 1.2rem; margin:0;">{{ tutorial.title }}</h3>
        <p class="text-s">{{ tutorial.description }}</p>
        <span class="technical text-t" style="margin-top:auto;">Coming Soon</span>
      </div>
      {% endif %}
      {% endfor %}
    </div>
  </section>
  {% endunless %}
  {% endfor %}

  <h2 class="authority">Public-interest safety guides</h2>
  <p>These guides cover personal safety and institutional navigation. They are educational resources, not consulting services or professional advice.</p>
  {% for group in sections %}
  {% if group.name == "Institutional Navigation & Survival" %}
  <section id="{{ group.name | slugify }}" class="stack" style="margin-bottom: var(--md-sys-spacing-xl);">
    <div class="stack">
      <p class="technical text-t">{{ group.name }}</p>
      <h3 class="authority">{{ group.name }}</h3>
    </div>
    <div class="grid grid-3">
      {% for tutorial in group.items %}
      {% if tutorial.link and tutorial.link != "#" %}
      <a href="{{ tutorial.link }}" class="c-card btn-secondary c-stack">
        <p class="technical text-t">{{ tutorial.tag }}</p>
        <h4 class="authority" style="font-size: 1.2rem; margin:0;">{{ tutorial.title }}</h4>
        <p class="text-s">{{ tutorial.description }}</p>
        <span class="technical text-t" style="margin-top:auto; border-top: 1px solid var(--md-sys-color-outline); padding-top:10px;">Read guide &rarr;</span>
      </a>
      {% else %}
      <div class="c-card c-card--disabled c-stack">
        <p class="technical text-t">{{ tutorial.tag }}</p>
        <h4 class="authority" style="font-size: 1.2rem; margin:0;">{{ tutorial.title }}</h4>
        <p class="text-s">{{ tutorial.description }}</p>
        <span class="technical text-t" style="margin-top:auto;">Coming Soon</span>
      </div>
      {% endif %}
      {% endfor %}
    </div>
  </section>
  {% endif %}
  {% endfor %}
</div>
