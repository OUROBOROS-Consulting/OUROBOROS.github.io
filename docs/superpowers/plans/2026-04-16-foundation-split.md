# Foundation Layout Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `_layouts/foundation.html` into `mission.html` (sections mode) and a trimmed `foundation.html` (prose mode), removing dead `hero:` branch.

**Architecture:** `foundation.html` currently has two modes gated on `page.hero` and `page.sections`. Since no page ever sets `hero:`, the `{% if page.hero %}` branch is dead code. The split: `mission.html` handles the 12 pages with `sections:` (hero + about + pull_quote + sections loop + links + lazy scripts); `foundation.html` handles the 6 prose pages (hero + markdown content + who + CTA). Both declare `layout: default`.

**Tech Stack:** Jekyll (Liquid templating), SCSS via `@ouroboros-consulting/ouroboros-design` npm package

---

### Task 1: Create `_layouts/mission.html`

**Files:**
- Create: `_layouts/mission.html`

- [ ] **Step 1: Create `_layouts/mission.html` with the sections-mode content**

The file contains the `{% else %}` hero from foundation.html (the only branch ever reached since `hero:` is never set), plus the about/pull_quote/sections/links/lazy-script blocks. Replace the dead `{% if page.hero %}...{% else %}` wrapper with the `{% else %}` content directly.

```html
---
layout: default
---
<div id="progress-bar"></div>

<!-- ── Hero ── -->
<header class="svc-hero">
  <a class="post-back" href="{{ page.back_url | default: '/' | relative_url }}">Back</a>
  <div class="svc-hero-inner{% unless page.headshot %} svc-hero-inner--single{% endunless %}">
    <div class="svc-hero-text">
      <p class="post-category">{{ page.category }}</p>
      <h1 class="svc-title">{{ page.title }}</h1>
      <p class="hero-tagline">{{ page.tagline | markdownify }}</p>
      <p class="svc-lede">{{ page.lede }}</p>
      <div class="svc-tags">
        {% for tag in page.tags %}
        <div class="hero-cta"><a href="#{{ tag }}" class="btn">{{ tag }}</a></div>
        {% endfor %}
      </div>
    </div>
    {% if page.headshot %}
    <div class="hex-portrait">
      <img src="{{ page.headshot | relative_url }}" alt="{{ page.headshot_alt }}" />
    </div>
    {% endif %}
  </div>
</header>

<!-- ════════════════════════════════════════════════════════════════════════
     ABOUT BLURB
     ════════════════════════════════════════════════════════════════════════ -->
{% if page.about %}
<div class="svc-body">
  <section class="svc-section">
    <div class="svc-section-label">
      <p>{{ page.about.heading }}</p>
    </div>
    <div class="svc-section-content">
      <p>{{ page.about.body }}</p>
    </div>
  </section>
</div>
{% endif %}

<!-- ════════════════════════════════════════════════════════════════════════
     PULL QUOTE
     ════════════════════════════════════════════════════════════════════════ -->
{% if page.pull_quote %}
<div class="svc-body">
  <aside class="pull-quote">
    <blockquote>{{ page.pull_quote }}</blockquote>
  </aside>
</div>
{% endif %}

<!-- ════════════════════════════════════════════════════════════════════════
     CONTENT SECTIONS LOOP
     ════════════════════════════════════════════════════════════════════════ -->
{% if page.sections %}
<div class="svc-body">
  {% for section in page.sections %}
  <section id="{{ section.id }}" class="svc-section">
    <div class="svc-section-label">
      <p>{{ section.heading }}</p>
    </div>
    <div class="svc-section-content">
      {% if section.playlist_carousel %}
      {% assign _playlists = site.data[section.data_source] %}
      <div class="playlist-carousel" id="{{ section.id }}-carousel"
        aria-label="{{ section.heading }} playlist carousel">
        <div class="playlist-carousel-track" aria-live="polite">
          {% for pl in _playlists %}
          <div class="playlist-carousel-slide" role="group"
            aria-label="Playlist {{ forloop.index }} of {{ _playlists.size }}">
            <div class="card--formula">
              <div class="card--formula__interior playlist-card">
                <iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="{{ pl.height | default: 450 }}"
                  class="playlist-iframe" data-src="{{ pl.embed_url }}" title="{{ pl.title }}"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation">
                </iframe>
                {% if pl.title or pl.description %}
                <div class="playlist-meta">
                  {% if pl.title %}<p class="playlist-title">{{ pl.title }}</p>{% endif %}
                  {% if pl.description %}<p class="card-desc">{{ pl.description }}</p>{% endif %}
                </div>
                {% endif %}
              </div>
            </div>
          </div>
          {% endfor %}
        </div>

        {% if _playlists.size > 1 %}
        <div class="playlist-carousel-controls">
          <button class="carousel-btn playlist-btn--prev" aria-label="Previous playlist">&#8592;</button>
          <span class="playlist-carousel-count">1 / {{ _playlists.size }}</span>
          <button class="carousel-btn playlist-btn--next" aria-label="Next playlist">&#8594;</button>
        </div>
        <div class="carousel-dots playlist-carousel-dots" role="tablist" aria-label="Playlist navigation">
          {% for pl in _playlists %}
          <button class="carousel-dot{% if forloop.first %} active{% endif %}" role="tab"
            aria-label="Playlist {{ forloop.index }}"></button>
          {% endfor %}
        </div>
        {% endif %}
      </div>
      {% elsif section.data_source %}
      {% assign _items = site.data[section.data_source] %}
      <div class="testimonials-grid">
        {% for _item in _items %}
        <div class="bib-card">
          <span class="bib-title">{{ _item.title }}</span>
          {% if _item.author %}<p class="bib-byline">{{ _item.author }}</p>{% endif %}
          {% if _item.note %}<p class="bib-venue">{{ _item.note | markdownify }}</p>{% endif %}
          {% if _item.description %}<p class="bib-venue">{{ _item.description | markdownify }}</p>{% endif %}
          {% if _item.link and _item.link != "#" %}<a class="bib-link" href="{{ _item.link }}" target="_blank"
            rel="noopener">View →</a>{% endif %}
        </div>
        {% endfor %}
      </div>
      {% elsif section.bibtex_src %}
      <div class="testimonials-grid" data-bibtex-src="{{ section.bibtex_src }}">
        <p class="card-desc">Loading references…</p>
      </div>
      {% elsif section.html %}
      {{ section.html }}
      {% else %}
      <div class="card--formula">
        <div class="card--formula__interior">
          {% if section.body_paragraphs %}
          {% for paragraph in section.body_paragraphs %}
          {{ paragraph | markdownify }}
          {% endfor %}
          {% elsif section.body %}
          <p>{{ section.body }}</p>
          {% endif %}
        </div>
      </div>
      {% endif %}
    </div>
  </section>
  {% endfor %}
</div>
{% endif %}

<!-- ════════════════════════════════════════════════════════════════════════
     SOCIAL LINKS
     ════════════════════════════════════════════════════════════════════════ -->
{% if page.links %}
<div class="svc-body">
  <nav class="footer-links foundation-links">
    {% if page.links.github != "" %}<a href="{{ page.links.github }}" target="_blank" rel="noopener">GitHub</a>{% endif %}
    {% if page.links.linkedin != "" %}<a href="{{ page.links.linkedin }}" target="_blank" rel="noopener">LinkedIn</a>{% endif %}
    {% if page.links.orcid != "" %}<a href="{{ page.links.orcid }}" target="_blank" rel="noopener">ORCID</a>{% endif %}
    {% if page.links.tutor != "" %}<a href="{{ page.links.tutor }}" target="_blank" rel="noopener">Tutoring</a>{% endif %}
    {% if page.links.contact != "" %}<a href="{{ page.links.contact }}">Contact</a>{% endif %}
  </nav>
</div>
{% endif %}

{% assign _has_bibtex = false %}
{% assign _has_playlist = false %}
{% for section in page.sections %}
{% if section.bibtex_src %}{% assign _has_bibtex = true %}{% endif %}
{% if section.playlist_carousel %}{% assign _has_playlist = true %}{% endif %}
{% endfor %}
{% if _has_bibtex %}
<script src="{{ '/assets/js/bibtex.js' | relative_url }}" defer></script>
{% endif %}
{% if _has_playlist %}
<script src="{{ '/assets/js/playlist-carousel.js' | relative_url }}" defer></script>
{% endif %}

<script>
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  });
</script>
```

- [ ] **Step 2: Verify file was created**

```bash
ls -la _layouts/mission.html
```
Expected: file exists.

- [ ] **Step 3: Commit**

```bash
git add _layouts/mission.html
git commit -m "feat: add mission.html layout (sections mode)"
```

---

### Task 2: Trim `_layouts/foundation.html` to prose mode only

**Files:**
- Modify: `_layouts/foundation.html`

- [ ] **Step 1: Replace foundation.html with prose-only content**

Remove the dead `{% if page.hero %}...{% else %}...{% endif %}` wrapper (keep only the `{% else %}` hero content). Remove about, pull_quote, sections, links, and lazy-script blocks — those now live only in `mission.html`.

```html
---
layout: default
---
<div id="progress-bar"></div>

<!-- ── Hero ── -->
<header class="svc-hero">
  <a class="post-back" href="{{ page.back_url | default: '/services/' | relative_url }}">Back</a>
  <div class="svc-hero-inner{% unless page.headshot %} svc-hero-inner--single{% endunless %}">
    <div class="svc-hero-text">
      <p class="post-category">{{ page.category }}</p>
      <h1 class="svc-title">{{ page.title }}</h1>
      <p class="hero-tagline">{{ page.tagline | markdownify }}</p>
      <p class="svc-lede">{{ page.lede }}</p>
      <div class="svc-tags">
        {% for tag in page.tags %}
        <div class="hero-cta"><a href="#{{ tag }}" class="btn">{{ tag }}</a></div>
        {% endfor %}
      </div>
    </div>
    {% if page.headshot %}
    <div class="hex-portrait">
      <img src="{{ page.headshot | relative_url }}" alt="{{ page.headshot_alt }}" />
    </div>
    {% endif %}
  </div>
</header>

<!-- ── Prose Body ── -->
<article class="svc-body">
  <div class="post-body">
    {{ content }}
  </div>
</article>

<!-- ── Service Sections ── -->
<div class="svc-body">
  {% if page.who %}
  <section class="svc-section">
    <div class="svc-section-label">
      <p>Who It's For</p>
    </div>
    <div class="svc-section-content">
      {{ page.who | markdownify }}
    </div>
  </section>
  {% endif %}

  <section class="svc-section svc-section--cta">
    <div class="svc-section-label">
      <p>Get Started</p>
    </div>
    <div class="svc-section-content">
      <p class="svc-cta-body">{{ page.cta_body | default: 'Reach out and we can find a time to talk through what you need.' }}</p>
      <a href="{{ page.cta_url | default: '/intake' | relative_url }}" class="btn">
        {{ page.cta_label | default: 'Get in Touch' }}
      </a>
    </div>
  </section>
</div>

<script>
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add _layouts/foundation.html
git commit -m "refactor: trim foundation.html to prose mode, remove dead hero branch"
```

---

### Task 3: Update front matter — 12 pages to `layout: mission`

**Files (all change `layout: foundation` → `layout: mission`):**
- Modify: `_about/mission.md`
- Modify: `_about/survival.md`
- Modify: `archive/cybernetics.md`
- Modify: `archive/interests.md`
- Modify: `_projects/ouroboros.md`
- Modify: `_resources/scholarly.md`
- Modify: `_resources/survival.md`
- Modify: `_resources/artistic.html`
- Modify: `_case_studies/sanctuary.md`
- Modify: `_case_studies/agora.md`
- Modify: `_case_studies/cassandra.md`
- Modify: `_case_studies/martha.md`

- [ ] **Step 1: Bulk-update all 12 files**

In each file, change the front matter line `layout: foundation` to `layout: mission`. All 12 files have `sections:` in their front matter (verified by grep before writing this plan).

Run this to update all 12 at once:
```bash
sed -i '' 's/^layout: foundation$/layout: mission/' \
  _about/mission.md \
  _about/survival.md \
  archive/cybernetics.md \
  archive/interests.md \
  _projects/ouroboros.md \
  _resources/scholarly.md \
  _resources/survival.md \
  _resources/artistic.html \
  _case_studies/sanctuary.md \
  _case_studies/agora.md \
  _case_studies/cassandra.md \
  _case_studies/martha.md
```

- [ ] **Step 2: Verify all 12 changed correctly**

```bash
grep -l "layout: mission" _about/mission.md _about/survival.md archive/cybernetics.md archive/interests.md _projects/ouroboros.md _resources/scholarly.md _resources/survival.md _resources/artistic.html _case_studies/sanctuary.md _case_studies/agora.md _case_studies/cassandra.md _case_studies/martha.md
```
Expected: all 12 files listed.

```bash
grep "layout: foundation" _about/mission.md _about/survival.md archive/cybernetics.md archive/interests.md _projects/ouroboros.md _resources/scholarly.md _resources/survival.md _resources/artistic.html _case_studies/sanctuary.md _case_studies/agora.md _case_studies/cassandra.md _case_studies/martha.md
```
Expected: no output (none should still say `foundation`).

- [ ] **Step 3: Confirm the 6 prose pages still say `layout: foundation`**

```bash
grep "layout:" archive/design-system.md archive/record.html _projects/healthdata.ego.md _resources/glossary.md _case_studies/claudius.md causes.md
```
Expected: all 6 show `layout: foundation`.

- [ ] **Step 4: Commit**

```bash
git add _about/mission.md _about/survival.md archive/cybernetics.md archive/interests.md _projects/ouroboros.md _resources/scholarly.md _resources/survival.md _resources/artistic.html _case_studies/sanctuary.md _case_studies/agora.md _case_studies/cassandra.md _case_studies/martha.md
git commit -m "chore: migrate 12 sections-mode pages to layout: mission"
```

---

### Task 4: Build verification

**Files:** none modified

- [ ] **Step 1: Run Jekyll build**

```bash
bundle exec jekyll build 2>&1
```
Expected: `Build complete!` with no errors. Any `Liquid` template errors indicate a typo in the new layout files.

- [ ] **Step 2: Spot-check rendered output for one mission page and one foundation page**

```bash
# Mission page — should contain svc-hero and svc-section elements, no CTA "Get Started" section
grep -c "svc-section" _site/about/mission/index.html

# Foundation page — should contain post-body and "Get Started" CTA
grep -c "post-body\|Get Started" _site/resources/glossary/index.html
```
Expected: both return counts > 0.

- [ ] **Step 3: Verify no page still renders the dead hero branch**

```bash
grep -r "Mission Hero\|Service Hero" _site/ | head -5
```
Expected: no output (those HTML comments were removed).
