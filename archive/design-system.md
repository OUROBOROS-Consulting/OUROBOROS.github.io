---
layout: foundation
category: Reference
title: Design System
tagline: Color, typography, elevation. The complete palette.
lede: Interactive preview of OUROBOROS tokens.
tags:
  - Colors
  - Typography
  - Elevation
---

## Color Palette

### Surfaces
<div class="color-grid">
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #141414; border: 1px solid #333;"></div>
    <code>--bg1</code>
    <p>#141414</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #1E1E1E;"></div>
    <code>--bg2</code>
    <p>#1E1E1E</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #252525;"></div>
    <code>--bg3</code>
    <p>#252525</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #333333;"></div>
    <code>--border</code>
    <p>#333333</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #2A2A2A;"></div>
    <code>--calloutbg</code>
    <p>#2A2A2A</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #080808; border: 1px solid #333;"></div>
    <code>--shadow</code>
    <p>#080808</p>
  </div>
</div>

### Text & Luminance
<div class="color-grid">
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #FFFFFF;"></div>
    <code>--bright</code>
    <p>#FFFFFF</p>
    <span class="contrast-note">18.4:1</span>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #E8E4DC;"></div>
    <code>--text</code>
    <p>#E8E4DC</p>
    <span class="contrast-note">14.5:1</span>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #B0AAA0;"></div>
    <code>--subdued</code>
    <p>#B0AAA0</p>
    <span class="contrast-note">8.0:1</span>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #999999;"></div>
    <code>--muted</code>
    <p>#999999</p>
    <span class="contrast-note">6.5:1</span>
  </div>
</div>

### Accents
<div class="color-grid">
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #C9A84C;"></div>
    <code>--gold</code>
    <p>#C9A84C</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #7B8FA1;"></div>
    <code>--steel</code>
    <p>#7B8FA1</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #967ABB;"></div>
    <code>--amethyst</code>
    <p>#967ABB</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #6A8E7F;"></div>
    <code>--sage</code>
    <p>#6A8E7F</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #4a6b5f;"></div>
    <code>--teal</code>
    <p>#4a6b5f</p>
  </div>
  <div class="color-swatch">
    <div class="swatch-box" style="background-color: #E8640A;"></div>
    <code>--claude</code>
    <p>#E8640A</p>
  </div>
</div>

---

## Typography

### Lora (Serif)

<div class="typography-sample" style="font-family: 'Lora', Georgia, serif;">
  <h3 style="font-size: 2.5rem; line-height: 1.2; margin-bottom: 0.5rem;">Headlines & body prose</h3>
  <p style="font-size: 1rem; line-height: 1.75;">The quick brown fox jumps over the lazy dog. Lora's generous spacing and clean serifs make it ideal for editorial content and long-form reading. Used for headings, body text, and all narrative content.</p>
</div>

### Inter (Sans)

<div class="typography-sample" style="font-family: 'Inter', 'DejaVu Sans', system-ui, sans-serif;">
  <h3 style="font-size: 1.3rem; line-height: 1.2; margin-bottom: 0.5rem;">UI labels & navigation</h3>
  <p style="font-size: 0.95rem; line-height: 1.5;">The quick brown fox jumps over the lazy dog. Inter's tight metrics and optical adjustments excel at small sizes and UI. Used for buttons, labels, navigation, and interface elements.</p>
</div>

### JetBrains Mono (Monospace)

<div class="typography-sample" style="font-family: 'JetBrains Mono', monospace;">
  <code style="display: block; font-size: 0.9rem; line-height: 1.6; background: var(--bg2); padding: 1rem; border-radius: 0.25rem;">--gold: #C9A84C;
--text: #E8E4DC;
@include scallop-standard;</code>
</div>

---

## Elevation & Texture

The site uses a three-tier scallop pattern system for depth.

### Recessed

<div class="elevation-demo" style="background-color: var(--bg1); background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27%3E%3Cpath d=%27M0 12 Q3 7.5 6 4.5 Q9 7.5 12 12%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%270.3%27 stroke-opacity=%270.08%27/%3E%3Cpath d=%27M-6 6 Q-3 1.5 0 -1.5 Q3 1.5 6 6%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%270.3%27 stroke-opacity=%270.08%27/%3E%3Cpath d=%27M6 6 Q9 1.5 12 -1.5 Q15 1.5 18 6%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%270.5%27 stroke-opacity=%270.08%27/%3E%3C/svg%3E'); background-size: 12px 12px; padding: 2rem; border-radius: 0.25rem;">
  <p style="color: var(--subdued); margin: 0;">Subtle. 12px tile, 0.08 opacity. Use for body backgrounds and recessed surfaces.</p>
</div>

### Standard

<div class="elevation-demo" style="background-color: var(--bg2); background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27%3E%3Cpath d=%27M0 16 Q4 10 8 6 Q12 10 16 16%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%270.6%27 stroke-opacity=%270.18%27/%3E%3Cpath d=%27M-8 8 Q-4 2 0 -2 Q4 2 8 8%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%270.8%27 stroke-opacity=%270.18%27/%3E%3Cpath d=%27M8 8 Q12 2 16 -2 Q20 2 24 8%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%270.6%27 stroke-opacity=%270.18%27/%3E%3C/svg%3E'); background-size: 16px 16px; box-shadow: 0 2px 8px var(--shadow); padding: 2rem; border-radius: 0.25rem;">
  <p style="color: var(--text); margin: 0;">Default. 16px tile, 0.18 opacity. Use for cards and standard surfaces.</p>
</div>

### Elevated

<div class="elevation-demo" style="background-color: var(--bg2); background-image: linear-gradient(180deg, var(--bg3) 0%, transparent 40%), url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27%3E%3Cpath d=%27M0 24 Q6 15 12 9 Q18 15 24 24%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%271.3%27 stroke-opacity=%270.28%27/%3E%3Cpath d=%27M-12 12 Q-6 3 0 -3 Q6 3 12 12%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%271.3%27 stroke-opacity=%270.28%27/%3E%3Cpath d=%27M12 12 Q18 3 24 -3 Q30 3 36 12%27 fill=%27none%27 stroke=%27%23C9A84C%27 stroke-width=%271.3%27 stroke-opacity=%270.28%27/%3E%3C/svg%3E'); background-size: 100% 100%, 24px 24px; box-shadow: 0 4px 16px var(--shadow), 0 1px 0 rgba(255,255,255,0.04) inset; padding: 2rem; border-radius: 0.25rem;">
  <p style="color: var(--text); margin: 0;">Prominent. 24px tile, 0.28 opacity + gradient. Use for modals and hero surfaces.</p>
</div>

---

## Components

### Buttons

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0;">
  <button class="btn">Primary</button>
  <button class="btn" style="background-color: var(--steel); color: var(--text); border-color: var(--steel);">Steel</button>
  <button class="btn" style="background-color: transparent; border-color: var(--amethyst); color: var(--amethyst);">Amethyst</button>
  <button class="btn btn--ghost">Ghost</button>
</div>

### Link Grid

Color tokens are inherited by any semantic link. Style them in context.

---

## Implementation

All values live in `_base.scss` as `:root` CSS custom properties. Import `main.scss` to load the full system including typography utilities and component styles from all `_sass/` partials.

Reference any token in your CSS:

```scss
background-color: var(--gold);
color: var(--text);
```

Or in HTML inline styles:

```html
<div style="background-color: var(--bg2);">...</div>
```
