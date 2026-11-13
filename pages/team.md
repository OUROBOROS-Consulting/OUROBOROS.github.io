---
layout: default
title: Team
permalink: /team/
category: About
description: "Meet Apostolos Stamenos, founder of ouroborOS, and learn about the experience informing the firm's private AI and data work."
---

{% include page-hero.html
  back_url="/about/"
  back_label="About"
  category="About"
  title="Our Team"
  lede="Meet founder Apostolos Stamenos and the experience behind the work."
  icon="ph ph-fill ph-users-three"
%}

<section class="team-section">
  <ul class="team-grid">
    {% for person in site.data.team %}
    <li class="c-card c-card--team">
      {% if person.photo %}
      <div class="hex-portrait team-portrait c-card--team__portrait">
        <img src="{{ person.photo | relative_url }}" alt="{{ person.photo_alt | default: person.name | escape }}" loading="lazy">
      </div>
      {% endif %}
      <div class="c-card--team__content">
        <p class="team-role">{{ person.role | escape }}</p>
        <h2 class="team-name">{{ person.name | escape }}</h2>
        {% if person.credentials %}
        <ul class="team-creds">
          {% for credential in person.credentials %}
          <li class="team-cred">{{ credential | escape }}</li>
          {% endfor %}
        </ul>
        {% endif %}
        <div class="team-bio">{{ person.bio | markdownify }}</div>
        {% if person.links %}
        <div class="team-links">
          {% if person.links.linkedin %}<a href="{{ person.links.linkedin }}" class="team-link" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="ph-fill ph-linkedin-logo"></i></a>{% endif %}
            {% if person.links.contact %}<a href="{{ person.links.contact | relative_url }}" class="team-link" aria-label="Contact"><i class="ph-fill ph-envelope"></i></a>{% endif %}
        </div>
        {% endif %}
      </div>
    </li>
    {% endfor %}
  </ul>
</section>
