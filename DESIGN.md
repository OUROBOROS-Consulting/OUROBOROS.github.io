---
version: 1
name: ouroborOS Consulting
description: Dark editorial identity for private AI, data privacy, and consulting.
colors:
  canvas: "var(--md-sys-color-background)"
  surface: "var(--md-sys-color-surface)"
  text: "var(--md-sys-color-on-surface)"
  muted: "var(--md-sys-color-on-surface-variant)"
  primary: "var(--md-sys-color-primary)"
  secondary: "var(--md-sys-color-secondary)"
typography:
  display:
    fontFamily: "var(--font-authority)"
  body:
    fontFamily: "var(--font-utility)"
  technical:
    fontFamily: "var(--font-technical)"
spacing:
  xs: "var(--md-sys-spacing-xs)"
  sm: "var(--md-sys-spacing-sm)"
  md: "var(--md-sys-spacing-md)"
  lg: "var(--md-sys-spacing-lg)"
  xl: "var(--md-sys-spacing-xl)"
rounded:
  sm: "var(--site-radius-sm)"
  md: "var(--site-radius-md)"
  full: "var(--site-radius-full)"
motion:
  interaction: "var(--site-motion-interaction-duration)"
  reduced: "var(--site-motion-reduced-duration)"
components:
  button:
    backgroundColor: "var(--site-action-surface)"
    textColor: "var(--site-action-text)"
  banner:
    backgroundColor: "var(--site-action-surface)"
    textColor: "var(--site-action-text)"
    padding: "{spacing.sm} {spacing.md}"
  card:
    backgroundColor: "var(--site-card-surface)"
---

# Visual system

The canonical Sass tokens and themes live in `_sass/design/`. Import
`design/tokens`; do not redeclare token values or introduce a parallel palette.
The site defaults to a dark theme and supports the light theme through the
existing theme toggle.

Use the existing editorial typography, semantic color tokens, and spacing scale.
Keep decoration structural and restrained. Avoid flicker and non-essential
animation; honor `prefers-reduced-motion`. Decorative effects must not obscure
content or controls.

Filled buttons and every banner variant use the fixed gold action surface
(`--site-action-surface`, `#DDCBA3`) with black text (`--site-action-text`) in
both themes. All card surfaces use the fixed dark surface (`--site-card-surface`,
`#191B1C`) in either theme, with light text for contrast. The site banner is
opt-in. Its CRT test is a static scanline overlay using the banner's current text
color; it must not alter content, link behavior, or layout.
