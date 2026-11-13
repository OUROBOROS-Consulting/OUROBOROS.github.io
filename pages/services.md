---
layout: default
title: Services
permalink: /services/
description: "Private AI engineering, AI privacy consulting, data audits. Custom tools for confidential data."
---

{% include page-hero.html
  back_url="/"
  back_label="Home"
  category="Services"
  title="Private AI & Data Privacy"
  lede="Most teams don't know where their data goes once it hits AI. I build private AI, audit data quality, and help you set rules your team can follow."
  icon="ph ph-fill ph-briefcase"
  cta_mode="service"
  cta_url="/intake"
  cta_label="Request a free 20-minute AI privacy call"
%}

<div class="page-body">
  <h2 class="authority">Start with what you need</h2>
  <div class="related-grid">
    {% for service in site.data.nav[0].children %}
    {% include content-card.html item=service card_type="offer" card_class="c-card--framed" link_label=service.link_label %}
    {% endfor %}
  </div>

  <section class="page-section">
    <div class="page-section-label">
      <p>Additional services</p>
    </div>
    <div class="page-section-content">
      <h2 class="authority">Design and education</h2>
      <p>I do web design and AI privacy training. Separate services.</p>
      <ul>
        <li><a href="/services/design/">Explore web and graphic design services</a></li>
        <li><a href="/design-portfolio/">View the design portfolio</a></li>
        <li><a href="/services/identity/#training">Explore AI privacy training</a></li>
      </ul>
    </div>
  </section>

  <p class="text-s">Pricing: $150-350/hr. Call details, data handling: <a href="/consulting-faq/">Read the consulting FAQ</a>.</p>

  {% include lead-magnet-pricing.html %}

</div>
