# Codebase Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove verified-dead code (includes, one layout, two SCSS partials, five empty collections), extract intake.html's 488-line inline stylesheet to the site's existing `extra_css` convention, and sync stale documentation — with zero change to built output except where explicitly specified.

**Architecture:** Jekyll static site (`OUROBOROS-Consulting.github.io/`) consuming a local SCSS design package (`../ouroboros-design/`, its own git repo) via `file:` npm dependency. No test suite exists; the regression harness for this plan is **built-output diffing**: snapshot `_site/` and `dist/ouroboros.css` before starting, rebuild after each task, and diff. Dead-code removals must produce a byte-identical build; the intake extraction has an exact expected diff.

**Tech Stack:** Jekyll (Ruby 3.3.x via rbenv), Dart Sass via npm, Liquid templates.

## Global Constraints

- **NEVER `git push`.** GitHub Actions deploys on push to `main`. All commits stay local.
- **NEVER stage with `git add -A`, `git add .`, or `git add -u`.** The working tree has pre-existing uncommitted user work that must remain untouched and unstaged: `.DS_Store`, `_includes/footer.html`, `_layouts/foundation.html`, `_layouts/home.html`, `assets/css/main.scss`, `index.md`, `accessibility.md`, `disclaimer.md`, `privacy.md`, `assets/images/Chess-Abstract.png`, `assets/images/accessibility.svg`, `assets/images/disclaimer.svg`, `assets/images/privacy.svg`. Stage only the exact paths named in each commit step.
- **Do not edit any file in the pre-existing dirty list above.** No task in this plan requires it.
- **Do not touch:** `archive/`, `del-cmd-ctrl/`, `.worktrees/`, `assets/js/dashboard/`, `assets/css/dashboard.scss`, `assets/css/quiz.scss`, nav or hero templates/styles (design-frozen).
- **Do not publish** the npm package (`npm publish` forbidden). Local `npm run build` only.
- Site working dir: `/Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io` (git repo, branch `main`). Design package: `/Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design` (separate git repo).
- Baseline snapshot dir (create in Task 0): `/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline/`
- `jekyll-sitemap` derives `<lastmod>` from file mtimes — `sitemap.xml` diffs on files a task legitimately edits are expected; any other `sitemap.xml` diff is a regression.
- SCSS imports must not use `~` prefix (`_config.yml` uses `sass: load_paths: [node_modules]`).

---

### Task 0: Baseline snapshots

**Files:**
- Create: `/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline/{_site,ouroboros.css}` (snapshots only — nothing in either repo)

**Interfaces:**
- Produces: `refactor-baseline/_site/` and `refactor-baseline/ouroboros.css`, which every later task diffs against.

- [x] **Step 1: Confirm clean starting state**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io
git status --short
```

Expected: exactly the 13 pre-existing dirty/untracked files listed in Global Constraints, nothing else. If anything else appears, STOP and report.

- [x] **Step 2: Build design package and site**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
cd ../OUROBOROS-Consulting.github.io && npm install && npm run build
```

Expected: `dist/ouroboros.css` regenerated; `_site/` generated with no Jekyll errors. If the build fails on Ruby version, verify `rbenv version` reports 3.3.x.

- [x] **Step 3: Snapshot**

```bash
BASE=/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline
mkdir -p "$BASE"
cp -R _site "$BASE/_site"
cp ../ouroboros-design/dist/ouroboros.css "$BASE/ouroboros.css"
```

Expected: both snapshots exist. No commit for this task.

---

### Task 1: Delete dead includes

Five files in `_includes/` are referenced by no layout, page, or collection document (verified by repo-wide grep excluding `_site`, `node_modules`, `.worktrees`, `archive`): `campaign.html`, `substack.html`, `arch-divider.html`, `timeline.html`, `framed.html`. `timeline.html` additionally iterates `site.data.timeline`, and `_data/timeline.yml` does not exist.

**Files:**
- Delete: `_includes/campaign.html`, `_includes/substack.html`, `_includes/arch-divider.html`, `_includes/timeline.html`, `_includes/framed.html`

**Interfaces:**
- Consumes: baseline snapshot from Task 0.
- Produces: nothing later tasks depend on. (Task 6 updates README references to these files.)

- [x] **Step 1: Re-verify each file is unreferenced (the failing-test analogue)**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io
for f in campaign substack arch-divider timeline framed; do
  echo "== $f"
  grep -rn "include $f" --include="*.html" --include="*.md" . \
    --exclude-dir=_site --exclude-dir=node_modules --exclude-dir=.worktrees \
    --exclude-dir=.git --exclude-dir=archive
done
```

Expected: zero matches for all five (README.md mentions the filenames in prose but contains no `include` directives; only `{% include <name> %}` matches matter). Any real match → remove that file from the deletion list and report.

- [x] **Step 2: Delete**

```bash
git rm _includes/campaign.html _includes/substack.html _includes/arch-divider.html _includes/timeline.html _includes/framed.html
```

- [x] **Step 3: Rebuild and diff against baseline**

```bash
npm run build
BASE=/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline
diff -r "$BASE/_site" _site
```

Expected: **empty output** (includes are not copied to `_site`, so deleting unused ones changes nothing). Any diff → restore with `git restore --staged --worktree _includes/`, investigate, report.

- [x] **Step 4: Commit**

```bash
git commit -m "refactor: remove five unused includes (campaign, substack, arch-divider, timeline, framed)"
```

---

### Task 2: Delete dead layout `essays.html`

`grep -rn "layout: essays"` across all content (excluding `_site`, `node_modules`, `.worktrees`, `.git`, `archive`) finds zero pages. The `essays` collection directory `_essays/` does not exist. The layout is dead.

**Files:**
- Delete: `_layouts/essays.html`

**Interfaces:**
- Consumes: baseline snapshot from Task 0.
- Produces: nothing later tasks depend on. (Task 6 removes the README mention.)

- [x] **Step 1: Re-verify unused**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io
grep -rn "layout: essays" . --exclude-dir=_site --exclude-dir=node_modules \
  --exclude-dir=.worktrees --exclude-dir=.git --exclude-dir=archive
grep -rn '"essays"\|layout=essays' _layouts _includes
```

Expected: zero matches from both. Any match → STOP this task, keep the layout, report.

- [x] **Step 2: Delete, rebuild, diff**

```bash
git rm _layouts/essays.html
npm run build
BASE=/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline
diff -r "$BASE/_site" _site
```

Expected: **empty output**. Any diff → restore (`git restore --staged --worktree _layouts/essays.html`), report.

- [x] **Step 3: Commit**

```bash
git commit -m "refactor: remove unused essays layout"
```

---

### Task 3: Delete dead design-system partials and tidy `index.scss`

In `../ouroboros-design/scss/index.scss`, `timeline`, `floorplan`, and `linkedin` forwards are already commented out — the partials are not compiled into `dist/ouroboros.css`. `_linkedin.scss` was already deleted (only the comment remains); `_timeline.scss` (344 lines) and `_floorplan.scss` (233 lines) are dead files. `_timeline.scss` styled `_includes/timeline.html`, deleted in Task 1. This task works in the **ouroboros-design repo**, which gets its own commit.

**Files:**
- Delete: `../ouroboros-design/scss/_timeline.scss`, `../ouroboros-design/scss/_floorplan.scss`
- Modify: `../ouroboros-design/scss/index.scss` (remove three commented forwards)

**Interfaces:**
- Consumes: baseline `ouroboros.css` snapshot from Task 0.
- Produces: nothing later tasks depend on.

- [x] **Step 1: Re-verify the partials are not forwarded or imported anywhere**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design
grep -rn 'timeline\|floorplan' scss/index.scss
grep -rln '@use.*timeline\|@use.*floorplan\|@forward "timeline"\|@forward "floorplan"' scss/*.scss | grep -v '_timeline\|_floorplan'
```

Expected: first grep shows only the two commented (`// @forward`) lines; second grep shows nothing. Any live reference → STOP, report.

- [x] **Step 2: Delete the files**

```bash
git rm scss/_timeline.scss scss/_floorplan.scss
```

- [x] **Step 3: Edit `index.scss`** — remove exactly these three lines (keep `// @forward "design-system";` and its comment, which document an intentional optional partial):

```scss
// @forward "linkedin";
// @forward "timeline";
// @forward "floorplan";
```

- [x] **Step 4: Rebuild and verify byte-identical CSS**

```bash
npm run build
BASE=/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline
cmp dist/ouroboros.css "$BASE/ouroboros.css" && echo IDENTICAL
```

Expected: `IDENTICAL`. Any difference → restore both files and the index.scss edit, report.

- [x] **Step 5: Check the design-package README for stale mentions**

```bash
grep -n 'timeline\|floorplan\|linkedin' README.md 2>/dev/null
```

If matches exist, delete those list entries/lines from `README.md` (surgical: only lines naming the removed partials).

- [x] **Step 6: Commit (in ouroboros-design repo)**

```bash
git add scss/index.scss
git add README.md   # only if Step 5 changed it
git commit -m "refactor: remove dead _timeline and _floorplan partials"
```

(The `git rm` in Step 2 already staged the deletions.)

---

### Task 4: Prune empty collections from `_config.yml`

`_config.yml` declares ten collections; five have no source directory: `essays`, `projects`, `notes`, `linkedin`, `psas`. **Only four may be pruned.** `psas` stays even though `_psas/` doesn't exist: `_resources/psas.html:17,26,28` and `projects.html:18,43` render `{{ site.psas.size }}` — with the empty collection declared, that renders `0`; with the collection removed, `site.psas` is nil and the output blanks out (a functional change). `site.essays` is referenced only by `_layouts/essays.html`, which Task 2 deleted. Collections to keep: `services`, `resources`, `case_studies`, `psas`, `announcements`, `about`.

**Files:**
- Modify: `_config.yml:10-40` (collections block)

**Interfaces:**
- Consumes: baseline snapshot from Task 0; Task 2 must be complete (it removes the last `site.essays` reference).
- Produces: nothing later tasks depend on. (Task 6 removes README rows for the dead collections.)

- [x] **Step 1: Re-verify the four collections are empty and unreferenced in templates**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io
ls -d _essays _projects _notes _linkedin 2>&1
grep -rnE 'site\.(essays|projects|notes|linkedin)[^_]' \
  _layouts _includes _about _services _resources _case_studies _announcements *.html *.md 2>/dev/null
```

Expected: four "No such file or directory" lines; grep matches only `site.linkedin_url` lines (`_layouts/default.html:49`, `_includes/footer.html:14`) — that is a site variable, not the collection. Any true collection reference (`site.essays`, `site.projects`, `site.notes`, `site.linkedin` followed by `.size`, a filter, or a for-loop) → keep that collection, prune only the others, and report.

- [x] **Step 2: Edit `_config.yml`** — delete only the `essays`, `projects`, `notes`, and `linkedin` entries (each entry is 3 lines: name, `output: true`, `permalink:`). The block becomes exactly:

```yaml
collections:
  services:
    output: true
    permalink: /services/:slug/
  resources:
    output: true
    permalink: /resources/:slug/
  case_studies:
    output: true
    permalink: /work/:slug/
  psas:
    output: true
    permalink: /work/psas/:slug/
  announcements:
    output: true
    permalink: /announcements/:slug/
  about:
    output: true
    permalink: /:slug
```

(Preserve original relative order of the kept entries; touch nothing else in the file.)

- [x] **Step 3: Rebuild and diff**

```bash
npm run build
BASE=/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline
diff -r "$BASE/_site" _site
```

Expected: **empty output**. Any diff → revert `_config.yml`, report.

- [x] **Step 4: Commit**

```bash
git add _config.yml
git commit -m "refactor: prune four empty collections from _config.yml"
```

---

### Task 5: Extract intake.html inline stylesheet to `assets/css/intake.scss`

`intake.html` ends with a 488-line `<style>` block (lines 556–1043, `</style>` is the last line of the file). The site already has a convention for page-scoped CSS: `extra_css: <name>` front matter loads `/assets/css/<name>.css` in `default.html:63` (see `quiz.html` + `assets/css/quiz.scss` for the pattern). Load order is preserved: the inline block sat after main.css in document order; the `extra_css` link also comes after main.css in `<head>`.

The block contains one Liquid tag — `url('{{ "/assets/images/Marble.png" | relative_url }}')` — which keeps working verbatim in a front-mattered `.scss` file (Jekyll renders Liquid in any file with front matter, and `relative_url` produces a root-absolute path, so moving the CSS to `/assets/css/` does not break resolution). It contains no `//`-comments outside quoted strings and no SCSS-hostile syntax.

**Files:**
- Create: `assets/css/intake.scss`
- Modify: `intake.html` (front matter + delete lines 556–end)

**Interfaces:**
- Consumes: `default.html:63` `extra_css` mechanism (exists; do not modify).
- Produces: `/assets/css/intake.css` in built output.

- [x] **Step 1: Confirm block boundaries**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io
grep -n '<style>\|</style>' intake.html
tail -c 20 intake.html
```

Expected: `<style>` at 556, `</style>` at 1043, and the file ends with `</style>` (nothing after it). If boundaries moved (the file may have drifted), use the actual line numbers in the following steps.

- [x] **Step 2: Create `assets/css/intake.scss`** with empty front matter followed by the block's contents (everything strictly between the `<style>` and `</style>` lines, verbatim):

```bash
printf -- '---\n---\n' > assets/css/intake.scss
awk 'f && /^<\/style>/{f=0} f{print} /^<style>$/{f=1}' intake.html >> assets/css/intake.scss
wc -l assets/css/intake.scss
```

Expected: 488 lines (2 front-matter + 486 CSS lines).

- [x] **Step 3: Truncate `intake.html`** — delete line 556 through end of file (BSD sed on macOS):

```bash
sed -i '' '556,$d' intake.html
tail -3 intake.html
```

Expected tail: the formspree comment and script line, ending with
`<script src="{{ '/assets/js/formspree-ajax.min.js' | relative_url }}" defer></script>`.

- [x] **Step 4: Add `extra_css` to intake front matter** — edit `intake.html` lines 1–5 so the front matter reads:

```yaml
---
title: Client Intake
layout: default
noindex: true
extra_css: intake
---
```

- [x] **Step 5: Rebuild and verify the exact expected diff**

```bash
npm run build
BASE=/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline
diff -rq "$BASE/_site" _site
```

Expected changes, and **only** these:
1. `Only in _site/assets/css: intake.css` — new file.
2. `_site/intake.html` differs: gains `<link rel="stylesheet" href="/assets/css/intake.css" />` in `<head>`, loses the trailing `<style>…</style>` block.
3. `_site/sitemap.xml` differs: `<lastmod>` bumps for `intake.html` only.

Then verify content equivalence — every CSS rule that left intake.html is in intake.css:

```bash
grep -c 'intake-wrapper' _site/assets/css/intake.css   # expect ≥ 1
grep -c '<style>' _site/intake.html                     # expect 0
grep -n 'Marble.png' _site/assets/css/intake.css        # expect url('/assets/images/Marble.png')
```

- [x] **Step 6: Commit**

```bash
git add intake.html assets/css/intake.scss
git commit -m "refactor: extract intake inline styles to assets/css/intake.scss via extra_css"
```

---

### Task 6: Sync stale documentation

Two docs have drifted from reality. **README.md** (site repo, 157 lines) references deleted/never-existing artifacts. **`/Users/apostolos/Claude/Code/OUROBOROS/.claude/CLAUDE.md`** (workspace-level; the parent directory is NOT a git repo — edit only, no commit there) carries a design-token table that no longer matches `_base.scss`.

**Files:**
- Modify: `README.md` (site repo)
- Modify: `/Users/apostolos/Claude/Code/OUROBOROS/.claude/CLAUDE.md` (token table only)

**Interfaces:**
- Consumes: results of Tasks 1–5 (which files were actually deleted).
- Produces: nothing — docs only.

- [x] **Step 1: Fix README.md.** Surgical line edits only:
  - Line 24 area: remove `blog.html` and `linkedin.html` from the layouts list (no such layouts exist); remove `essays.html` (deleted in Task 2).
  - Line 29 area: remove collection rows for `_essays/`, `_projects/`, `_notes/`, `_linkedin/` (pruned in Task 4); keep `_psas/` and the live ones.
  - Line 79 area: remove `_linkedin.scss` and `_timeline.scss` from the partials list (deleted/nonexistent).
  - Line 92 area: remove the `_data/timeline.yml, projects.yml` line (neither file exists).
  - Lines 107–110 area: remove list entries for `timeline.html`, `framed.html`, `campaign.html`, `substack.html` (deleted in Task 1) and `linkedinbadge.html` (never existed). Keep entries for includes that still exist: `nav.html`, `footer.html`, `hero.html`, `banner.html`, `sidebar.html`, `cta.html`, `toc.html`.
  - Before each removal, `grep -n '<name>' README.md` to confirm the line; after editing, `ls _includes/ _layouts/` and confirm every include/layout README still names exists on disk.

- [x] **Step 2: Fix the workspace CLAUDE.md token table.** Current `_base.scss` values (verify with `grep -n '^\s*--' ../ouroboros-design/scss/_base.scss` and copy actual output). Known drift as of planning: table says `--bg1: #141414`, `--gold-border: #B1935D`, `--steel: #324cde`; source says `--bg1: #0c101a`, `--gold-border: #b39f7b`, `--steel: #7B8FA1`, and adds `--bg-hero: #1e213e`, `--bright: #FFFFFF`, `--shadow: #080808`, plus `-dim`/`-ghost` rgba variants per accent. Rewrite the code block in the "Design Tokens" section of `/Users/apostolos/Claude/Code/OUROBOROS/.claude/CLAUDE.md` to match the grep output exactly (token: value, one per line, keep the existing comment style). Do not touch any other section.

- [x] **Step 3: Rebuild and confirm no output change**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io
npm run build
BASE=/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline
diff -rq "$BASE/_site" _site
```

Expected: the Task 5 diffs (intake.css, intake.html, sitemap lastmod) plus `_site/README.md` (the `exclude:` list has lowercase `readme.md`, which does not match, so README.md is copied into `_site` — its diff here is the Task 1/2/4 doc edits, which is correct). Nothing else.

- [x] **Step 4: Commit (site repo only)**

```bash
git add README.md
git commit -m "docs: sync README with current layouts, includes, partials, collections"
```

(CLAUDE.md at the workspace level has no repo — edited in place, nothing to commit.)

---

### Task 7: Final verification sweep

**Files:** none (verification only).

**Interfaces:**
- Consumes: everything above.

- [x] **Step 1: Full clean rebuild of both projects**

```bash
cd /Users/apostolos/Claude/Code/OUROBOROS/ouroboros-design && npm run build
cd ../OUROBOROS-Consulting.github.io && npm install && npm run build
```

Expected: zero build errors/warnings beyond any that existed at baseline.

- [x] **Step 2: Whole-site diff — confirm total drift is exactly the intake extraction**

```bash
BASE=/private/tmp/claude-501/-Users-apostolos-Claude-Code-OUROBOROS-OUROBOROS-Consulting-github-io/7c9f3898-3209-4700-9ee2-b2388dc9363e/scratchpad/refactor-baseline
diff -rq "$BASE/_site" _site
cmp ../ouroboros-design/dist/ouroboros.css "$BASE/ouroboros.css" && echo CSS-IDENTICAL
```

Expected: `_site` diff lists only intake.css (new), intake.html, sitemap.xml, and README.md; `CSS-IDENTICAL` prints.

- [x] **Step 3: Confirm user's pre-existing work is untouched**

```bash
git status --short
git stash list
```

Expected: the same 13 pre-existing dirty/untracked files from Task 0, still unstaged; empty stash list. Any discrepancy → report immediately, do not "fix" it.

- [x] **Step 4: Confirm nothing was pushed**

```bash
git log origin/main..HEAD --oneline
```

Expected: the 5 refactor commits (Tasks 1, 2, 4, 5, 6) listed as local-only. Same check in `../ouroboros-design` for its 1 commit.

- [x] **Step 5: Report** — list per task: what was deleted/moved, diff result, commit hash. Flag anything skipped.

---

## Considered and rejected (do NOT do these)

- **Dashboard JS dedup** (`assets/js/dashboard/*.js` share small helpers like `isStale`, `makeTag`, `leaveNow`): the shared surface is ~50 lines across four IIFE-scoped files serving safety-critical pages (survivor quick-exit). Extraction requires a global namespace and script-order coupling — regression risk outweighs the win.
- **Splitting `dashboard.scss` (2062 lines)**: well-organized BEM, single consumer, no duplication found. Splitting is churn, not simplification.
- **Deleting `.worktrees/feature/home-banner/`**: gitignored but the `feature/home-banner` branch still exists locally — may hold unmerged work. Left for the user.
- **Deleting `_design-system.scss`**: commented out of `index.scss` but explicitly kept "for documentation" per the source comment. Intentional; keep.
- **Touching `main.scss`, nav, hero**: design-frozen per user direction, and `main.scss` has uncommitted user edits.
