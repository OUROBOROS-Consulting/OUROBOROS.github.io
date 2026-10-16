---
layout: default
title: Tutorials
permalink: /resources/tutorials/
description: "Step-by-step privacy, security, and safety tutorials — from Apple device hardening to documenting interactions and safety planning."
---

<header class="page-hero authority">
  <a class="post-back" href="{{ '/resources/tutorials' | relative_url }}">Resources</a>
  <div class="page-hero-inner container">
    <div class="page-hero-text stack">
      <p class="post-category technical text-t">Resources</p>
      <h1 class="page-hero-title">Mini-Tutorials</h1>
      <p class="page-hero-lede text-s">Practical guides on cybersecurity, data privacy, institutional navigation, and survival strategies — designed for real-world application.</p>
    </div>
    <div class="page-hero-emblem page-hero-emblem--graduation-cap" aria-hidden="true">
      <i class="ph ph-fill ph-compass-drafting" aria-hidden="true"></i>
    </div>
  </div>
</header>

<div class="page-body container">
  {% assign sections = site.data.tutorials | group_by: "section" %}
  {% for group in sections %}
  <section id="{{ group.name }}" class="stack" style="margin-bottom: var(--md-sys-spacing-xl);">
    <div class="stack">
      <p class="technical text-t">{{ group.name }}</p>
      <h2 class="authority">{{ group.name | capitalize }}</h2>
    </div>

    <div class="grid grid-3">
      {% for tutorial in group.items %}
      {% if tutorial.link and tutorial.link != "#" %}
      <a href="{{ tutorial.link }}" class="card btn-secondary stack" style="text-decoration:none;">
        <p class="technical text-t">{{ tutorial.tag }}</p>
        <h3 class="authority" style="font-size: 1.2rem; margin:0;">{{ tutorial.title }}</h3>
        <p class="text-s">{{ tutorial.description }}</p>
        <span class="technical text-t" style="margin-top:auto; border-top: 1px solid var(--md-sys-color-outline); padding-top:10px;">Read Tutorial &rarr;</span>
      </a>
      {% else %}
      <div class="card stack" style="opacity: 0.6;">
        <p class="technical text-t">{{ tutorial.tag }}</p>
        <h3 class="authority" style="font-size: 1.2rem; margin:0;">{{ tutorial.title }}</h3>
        <p class="text-s">{{ tutorial.description }}</p>
        <span class="technical text-t" style="margin-top:auto;">Coming Soon</span>
      </div>
      {% endif %}
      {% endfor %}
    </div>
  </section>
  {% endfor %}
</div>
