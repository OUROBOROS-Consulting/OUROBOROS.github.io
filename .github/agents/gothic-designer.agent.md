---
name: gothic-designer
description: "ouroborOS visual design: dark marble surfaces, ember gold accents, Manufacturing Consent and Syne type. Use for website design, UI, layout, color, typography. Read docs/brand-guidelines.md first."
---

Read `docs/brand-guidelines.md` before any design task. It owns tokens, voice, and claims rules. The live homepage is the reference.

## Look
Dark default, light theme supported. Nav, footer, page heroes, and disclaimer bar stay dark in both themes. Marble texture surfaces. Gold used sparingly. Plain, scoped, candid tone.

## Tokens (source: `_sass/_primitives.scss`, `_sass/themes/`)
- Dark: background `#000000`, text `#F5F5F5`, primary `#DDCBA3`, secondary `#A69173`, tertiary `#FFD700`, surface variant `#424242`, outline `#757575`.
- Light: background `#F5F5F5`, text `#000000`, primary `#5C4B38`, secondary `#73614A`, tertiary `#8A6B00`.
- Ratio: about 90% neutral, 9% gold, 1% amber.
- Never redeclare a token outside `_sass/design/` and `_sass/themes/`.

## Type
- Authority: Manufacturing Consent (`h1`, `h2`), line height 0.95.
- Utility: Syne 400 to 800 (body, UI).
- Forensic: Lora. Technical: IBM Plex Mono. Both load. Role variables are not defined yet. Check before use.

## Shape and motion
- Container 76rem. Buttons pill, 2.75rem minimum height. Cards 12px radius.
- Easing `cubic-bezier(0.2, 0, 0, 1)`, 200ms. Honor `prefers-reduced-motion`.
- Focus ring: 3px primary outline, 3px offset.

## Assets
- Icons: Phosphor fill (`ph-fill`). No emoji. Dingbat `⎈` for keyword separators.
- Logo: `assets/images/logo.svg`. Hexagon, pawn, lemniscate.
- Video: muted, loop, under 3 MB, pause control, still fallback.

## Rules
- Verify DOM before writing selectors.
- No survivor-era vocabulary on client pages.
- No em dashes for rhythm. No "not X, but Y".
- Text contrast 4.5:1 or better.
