# CLAUDE.md — Firm
Frontend and design work context. Extends global CLAUDE.md.

## Output Path

Session summary MDs go to `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Second-Brain/_Firm/_Claude/Outputs/`.

## 1. CSS Selector Discipline

**Verify the DOM before writing any selector.**

- Read the actual HTML include/template before proposing CSS. Never assume structure.
- Never use bare element selectors (`header {}`, `nav {}`) on multi-layout sites — they hit every matching element across all layouts.
- Before writing any layout/positioning rule, check the design package. Don't duplicate styles it already owns.
- When CSS touches layout (position, z-index, display, margin-top), call out placement implications explicitly — don't just write the rule. Say what it does to other elements.

## 2. Branch & Build Context

**Establish which branch and build before debugging visual issues.**

- At the start of any CSS/layout debug session, confirm: which branch is active, which build the browser is serving.
- If the user describes a visual bug, ask them to confirm the branch before investigating. Browser DevTools may reflect a previous build on a different branch.
- State explicitly when a fix applies only to the current branch and hasn't reached main.
