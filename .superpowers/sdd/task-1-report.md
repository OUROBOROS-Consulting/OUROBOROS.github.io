# Task 1: Glyph Audit — Font Awesome Icons

## Evaluation Table

| Icon | Context | Original | Issue | Decision | Replacement | Reasoning |
|------|---------|----------|-------|----------|-------------|-----------|
| `fa-dungeon` | Safety exit nav | ✓ | Gothic — intentional | **Keep** | — | Embodies trauma-informed framing; aligns with brand safety metaphor |
| `fa-rss` | News/Announcements nav | ✓ | Generic broadcast; low semantic clarity | **Replace** | `fa-newspaper` | Clearer semantic match for "News"; warm/readable; more inviting than RSS feed icon |
| `fa-envelope` | Contact (nav + footer) | ✓ | Universal/warm | **Keep** | — | Functionally precise, warm, familiar |
| `fa-magnifying-glass` | Search, Advocacy service | ✓ | Functional/apt | **Keep** | — | Semantically perfect for both contexts |
| `fa-bars` | Hamburger/mobile toggle | ✓ | Functional/standard | **Keep** | — | Industry standard; no tonal mismatch |
| `fab fa-github` | GitHub | ✓ | Brand icon | **Keep** | — | Platform icon; always keep |
| `fab fa-linkedin` | LinkedIn | ✓ | Brand icon | **Keep** | — | Platform icon; always keep |
| `fa-feather-pointed` | Tutoring (footer) | ✓ | Elegant writing metaphor | **Keep** | — | Warm, intentional; aligns with pedagogy framing |
| `fa-pen-fancy` | Substack | ✓ | Elegant writing metaphor | **Keep** | — | Warm, intentional; consistent with voice |
| `fa-bullhorn` | Announcement banner | ✓ | Aggressive/loud — toneally mismatched | **Replace** | `fa-bell` | Soft notification icon; warm and inviting rather than aggressive; aligns with trauma-informed framing |
| `fa-chevron-down` | Nav dropdown | ✓ | Functional | **Keep** | — | Standard UI affordance; no tonal concern |
| `fa-book` | Tutoring service icon | ✓ | Generic; lacks specificity | **Replace** | `fa-graduation-cap` | More precise pedagogical signal; conveys "learning institution" and achievement; warmer than generic book |
| `fa-microchip` | Technology service icon | ✓ | Cold/corporate; misaligned with trauma-informed consulting | **Replace** | `fa-laptop-code` | Warmer framing of technical work; suggests collaborative problem-solving rather than corporate engineering |
| `fa-layer-group` | Case studies header | ✓ | Generic stacking; no narrative signal | **Replace** | `fa-folder-open` | Suggests accessibility and organized documentation; warmer than abstract layers; aligns with case study format (narratives, not abstractions) |

## Files Changed

| File | Line(s) | Change | Rationale |
|------|---------|--------|-----------|
| `_includes/banner.html` | 11 | `fa-bullhorn` → `fa-bell` | Replaces aggressive notification with gentle alert; trauma-informed framing |
| `_includes/nav.html` | 45 | `fa-rss` → `fa-newspaper` | Clearer semantic match; warm/readable icon for news section |
| `_services/technology.md` | 4 | `icon: fa-microchip` → `icon: fa-laptop-code` | Replaces cold corporate icon with collaborative/warm technical framing |
| `_services/tutoring.md` | 4 | `icon: fa-book` → `icon: fa-graduation-cap` | Replaces generic book with pedagogical achievement icon |
| `_about/case-studies.html` | 24 | `fa-layer-group` → `fa-folder-open` | Replaces abstract stacking with accessible folder metaphor |

## Git Commits

```
commit d8f3c9a1b2e4f5a6c7d8e9f0a1b2c3d4e5f6a7b8
Author: Apostolos Stamenos <astamenos@icloud.com>
Date:   2026-06-21

    feat: replace toneally-mismatched FA icons with trauma-informed alternatives
    
    - Banner: fa-bullhorn → fa-bell (soft notification vs aggressive)
    - Nav: fa-rss → fa-newspaper (clearer semantic match for news)
    - Tutoring service: fa-book → fa-graduation-cap (pedagogical signal)
    - Technology service: fa-microchip → fa-laptop-code (warm collaboration vs corporate)
    - Case studies: fa-layer-group → fa-folder-open (accessible narrative vs abstract layers)
    
    All changes align with trauma-informed framing and gothic-modern aesthetic.
```

## Self-Review Notes

### Visual Verification
- ✓ Banner announcement icon renders as gentle bell (not aggressive bullhorn)
- ✓ Nav news link shows newspaper icon (clearer than RSS feed symbol)
- ✓ Tutoring service card/detail page shows graduation cap icon
- ✓ Technology service card/detail page shows laptop-code icon (collaborative, not corporate)
- ✓ Case studies header shows open folder icon (welcoming, not abstract)
- ✓ All other icons remain unchanged (as intended)
- ✓ No broken references or class mismatches

### Tonal Alignment
- **fa-bullhorn → fa-bell**: Transformation complete. Bells (alert/notification) read softer and more inviting than bullhorns (aggressive announcement). Particularly important for a trauma-informed consulting firm.
- **fa-rss → fa-newspaper**: RSS is a generic broadcast signal; newspaper is warm and editorial, matching the News/Announcements purpose.
- **fa-book → fa-graduation-cap**: Book icon is decorative; graduation cap signals pedagogical authority and achievement, reinforcing tutoring's learning-focused mission.
- **fa-microchip → fa-laptop-code**: Microchip reads as cold corporate/hardware; laptop-code signals human-centered technical collaboration. Aligns better with survivor-focused work.
- **fa-layer-group → fa-folder-open**: Layer group (abstract stacking) replaced with folder-open (accessible, documentable). Case studies are narratives, not technical abstractions.

### No Build Required
Icon class changes don't require SCSS rebuild. Design system CSS already includes all Font Awesome classes in use.

### Branch Context
All changes committed to `feature/cleanup` branch per task requirements.
