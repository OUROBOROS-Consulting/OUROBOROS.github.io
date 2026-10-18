---
layout: default
title: Services
permalink: /services/
description: "Brand and website design, workflow automation, and practical technical advice for small businesses and independent professionals."
---

{% include page-hero.html
  back_url="/"
  back_label="Home"
  category="Services"
  title="What I Offer"
  lede="Practical help for three common needs: a clearer brand and website, less repetitive work, or a grounded technical second opinion."
  icon="ph ph-fill ph-briefcase"
  cta_mode="service"
  cta_url="/intake"
  cta_label="Book a Consultation"
%}

<div class="page-body">
  <h2 class="authority">Start with what you need</h2>
  <div class="related-grid">
    {% for offer in site.data.offers %}
    {% include content-card.html item=offer card_type="offer" card_class="c-card--related" link_label=offer.link_label %}
    {% endfor %}
  </div>
</div>
