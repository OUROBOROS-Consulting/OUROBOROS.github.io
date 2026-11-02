---
layout: default
title: Services
permalink: /services/
description: "Private AI engineering, AI privacy consulting, data audits, and custom tools for organizations handling confidential data."
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
    {% for offer in site.data.offers %}
    {% include content-card.html item=offer card_type="offer" card_class="c-card--related" link_label=offer.link_label %}
    {% endfor %}
  </div>
</div>
