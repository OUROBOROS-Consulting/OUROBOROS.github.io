---
layout: default
title: Services
permalink: /services/
description: "Consulting in technology and AI, teaching, brand and web design, and survivor advocacy. For individuals, nonprofits, small businesses, and startups."
---

<header class="page-hero authority">
  <a class="post-back" href="{{ '/' | relative_url }}">Home</a>
  <div class="page-hero-inner container">
    <div class="page-hero-text stack">
      <p class="post-category technical text-t">Services</p>
      <h1 class="page-hero-title">What I Offer</h1>
      <p class="page-hero-lede text-s">Advocacy, teaching, technology, and design. Rigorous work for people and organizations operating where standard tools weren't designed to reach.</p>
      <div class="page-hero-cta stack">
        <a href="{{ '/intake' | relative_url }}" class="btn btn-primary">Book a Consultation</a>
      </div>
    </div>
    <div class="page-hero-emblem page-hero-emblem--infinity" aria-hidden="true">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- <path d="M50,50 C50,34 24,34 24,50 C24,66 50,66 50,50 C50,34 76,34 76,50 C76,66 50,66 50,50 Z" -->
          <!-- fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /> -->
      </svg>
    </div>
  </div>
</header>

<div class="page-body container">

  {% if page.specializations %}
  <section id="specialties" class="stack" style="margin-bottom: var(--md-sys-spacing-xl);">
    <p class="technical text-t">Specialties</p>
    <h2 class="authority">Focus Areas</h2>
    <div class="grid grid-3">
      {% for item in page.specializations %}
      <div class="c-card c-stack">
        <span class="technical text-t">◇</span>
        <h3 class="authority" style="font-size: 1.2rem; margin:0;">{{ item }}</h3>
      </div>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  <!-- Policies -->
  {% if page.policies %}
  <section id="policies" class="stack" style="margin-bottom: var(--md-sys-spacing-xl);">
    <p class="technical text-t">Operating Principles</p>
    <h2 class="authority">Policies</h2>
    <div class="c-card c-stack">
      {% for item in page.policies %}
      <div class="stack">
        <span class="technical text-t">◇</span>
        <p class="text-s">{{ item.item }}</p>
      </div>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  <!-- What's included -->
  {% if page.included %}
  <section id="included" class="stack" style="margin-bottom: var(--md-sys-spacing-xl);">
    <p class="technical text-t">Scope of Work</p>
    <h2 class="authority">What's Included</h2>
    <div class="grid grid-1">
      {% for item in page.included %}
      <div class="c-card c-stack">
        <div class="stack" style="flex-direction: row; align-items: flex-start; gap: 12px;">
            <span class="technical text-t">◇</span>
            <div>
                <h3 class="authority" style="font-size: 1.1rem; margin:0;">{{ item.title }}</h3>
                <p class="text-s">{{ item.description }}</p>
            </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  <!-- Pricing -->
  {% if page.pricing %}
  <section id="pricing" class="stack">
    <p class="technical text-t">Investment</p>
    <h2 class="authority">Pricing</h2>
    <div class="stack">
      <p class="forensic text-s">{{ page.rate_principle | default: "Rates run on a subsidy model. Commercial engagements fund the sliding scale for survivors, seniors, and veterans. Ranges reflect the complexity and scope of the work, and we set the figure together before anything begins." }}</p>
      <div class="grid grid-1" style="margin-top: var(--md-sys-spacing-md);">
        {% for tier in page.pricing %}
        <div class="c-card c-stack">
          <div class="stack" style="flex-direction: row; justify-content: space-between; align-items: flex-end;">
              <span class="authority" style="font-size: 1.5rem;">{{ tier.name }}</span>
              <span class="technical text-t">{{ tier.rate }}</span>
          </div>
          {% if tier.notes %}
          <p class="text-s">{{ tier.notes }}</p>
          {% endif %}
        </div>
        {% endfor %}
      </div>
    </div>
  </section>
  {% endif %}

</div>
