---
title: "Public Service Announcements"
description: "High-impact visual briefs and research findings on technology, design, and institutional integrity."
layout: default
category: PSA
---

# Public Service Announcements

These briefings serve as my professional business cards—distilling complex observations into high-impact visual guides. They highlight the intersections of design flaws, technical liabilities, and systemic failures.

<div class="psa-gallery">
  {% for psa in site.data.psas %}
  <a href="{{ psa.slug | prepend: '/_psas/' | append: '.html' }}" class="psa-card">
    <div class="psa-card__icon">
      <i class="{{ psa.icon }}"></i>
    </div>
    <div class="psa-card__content">
      <span class="psa-card__category">{{ psa.category }}</span>
      <h3 class="psa-card__title">{{ psa.title }}</h3>
      <p class="psa-card__description">{{ psa.description }}</p>
    </div>
    <div class="psa-card__arrow">
      <i class="ph ph-caret-right"></i>
    </div>
  </a>
  {% endfor %}
</div>

<style>
.psa-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--ourob-space-8);
  margin-top: var(--ourob-space-10);
}

.psa-card {
  display: flex;
  flex-direction: column;
  padding: var(--ourob-space-7);
  background: var(--ourob-color-surface-1);
  border: 1px solid rgba(177, 147, 93, 0.15);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  height: 100%;

  &:hover {
    border-color: var(--ourob-color-mark);
    transform: translateY(-4px);
    background: rgba(177, 147, 93, 0.04);
  }
}

.psa-card__icon {
  font-size: var(--ourob-type-size-8);
  color: var(--ourob-color-mark);
  margin-bottom: var(--ourob-space-5);
}

.psa-card__category {
  font-family: var(--font-sans);
  font-size: var(--ourob-type-size-1);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ourob-color-mark-border);
  margin-bottom: var(--ourob-space-2);
}

.psa-card__title {
  font-family: var(--font-body);
  font-size: var(--ourob-type-size-7);
  color: var(--ourob-color-ink-3);
  margin-bottom: var(--ourob-space-4);
}

.psa-card__description {
  font-family: var(--font-sans);
  font-size: var(--ourob-type-size-2);
  color: var(--ourob-color-ink-1);
  line-height: 1.6;
  flex-grow: 1;
}

.psa-card__arrow {
  margin-top: var(--ourob-space-5);
  color: var(--ourob-color-mark);
  text-align: right;
  transition: transform 0.2s ease;
}

.psa-card:hover .psa-card__arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .psa-gallery {
    grid-template-columns: 1fr;
  }
}
</style>
