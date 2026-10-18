# Site copy fix plan

2026-10-18. Outline and recommendations only. No rewritten copy. Rules: `docs/brand-guidelines.md`.

Hit counts below come from a grep for survivor, senior, veteran, trauma, betrayal, abuse, coercive, advocacy. Counts show scale, not severity.

## P0. Contradicts the pivot or states false claims

| Page or file | Hits | Problem | Recommendation |
| --- | --- | --- | --- |
| `llms.txt` | 6 | Describes survivors and advocacy as clients. Claims "no third-party requests", contradicted by `/privacy/`. | Regenerate from the three offers. Match the privacy page. |
| `legal/intake.html` (survivor track) | 11 | Intake routes survivors first. | One track: small business. Fields: business, problem, timeline, budget range. Keep 72-hour promise. |
| `_about/framework.md` | 10 | Nine commitments framed for institutionally betrayed groups. Meta says nine, `about.md` says seven. | Collapse to the method (Understand, Choose, Hand off) plus the working commitments. One count everywhere. |
| `_about/mission.md` | 11 | Mission is advocacy. | Rewrite around the homepage promise. Keep one candid limits paragraph. |
| `legal/faq.md` | 4 | Survivor questions. | Replace with buyer questions: price, scope, timeline, ownership, AI use, what you will not do. |
| `legal/accessibility.md` | 0 | Claims skip link built and fonts self-hosted. Both false today. | Fix the page or fix the code. Decide with section 5 of the guidelines. |
| `_data/testimonials.yml`, `_data/values.yml` | 1 each | Residual survivor framing. | Keep verbatim quotes. Add the federal-not-like-for-like note beside each. Recast values as working commitments. |

## P1. Off-brand pages still live

| Page or file | Hits | Recommendation |
| --- | --- | --- |
| `_about/survival.md`, `_resources/survival.md`, `_data/survival*.yml`, `_data/resources/survival_*.yml` | 5, 5, about 60 combined | Remove from nav. Set `noindex: true`. Decide: archive, move to a separate surface, or delete. |
| `_resources/tutorials/tutorial-trauma-responses.md`, `tutorial-safety-plan.md`, `tutorial-documenting-interactions.md` | 15, 2 | Same decision as above. Not client-facing for the new audience. |
| `_resources/scholarly.md`, `_data/news.yml`, `_data/news_sources.yml` | 23, 22, 10 | Curate to business-relevant: AI, privacy, security, small-business tech. Cut the rest. |
| `_resources/glossary.md` | 10 | Trim to terms a business owner meets (automation, SSO, backup, MFA, API). |
| `_services/advocacy.md`, `_services/education.md` | n/a | Retire advocacy. Reframe education as workshops or training for teams, or drop. |
| `_about/case-studies.md`, `_case_studies/cassandra.md`, `claudius.md`, `sanctuary.md` | 2 | Keep Problematic by Design. Review the rest for fit. Name pseudonyms only with consent. |
| `pages/design-system.html` | 8 | Update to the real tokens or remove. |

## P2. Consistency and polish

1. Person convention: "I" for the consultant, "we" for joint work. Audit `_about/about.md`, `team.md`, `_services/*`.
2. Em dashes: `index.md` `tagline_2`, `_data/offers.yml` Technical Review. Replace with a period or comma.
3. "Explore" CTAs: `index.md`, three links in `offers.yml`. Decide per guidelines section 8.
4. Page titles: under 60 characters, buyer terms, "Twin Cities" for local disambiguation.
5. Schema (`_includes/schema.html`): confirm services list matches the three offers. Remove advocacy and education if retired.
6. Claims register (guidelines section 7): resolve "5 HHS Divisions Served" and the MS credential wording.
7. Update `_data/nav.yml` so removed pages leave nav, sitemap, and search.

## Method per page

1. Read the page against the review checklist (guidelines section 2).
2. Decide: keep, rewrite, merge, noindex, or delete.
3. You set the agenda for each rewrite. I return an outline with recommendations. You approve before drafting.
4. Run veritas on any claim. Run deslop on any draft.
5. Add 301-style handling for deleted URLs (GitHub Pages: a redirect page via `jekyll-redirect-from`, or a stub with meta refresh).

## Suggested order

1. `llms.txt`, intake, FAQ (fastest signal to buyers and crawlers).
2. Framework and mission (merge candidates).
3. Services cleanup and schema.
4. Survival and trauma content decision.
5. Resources and news curation.
6. Accessibility and privacy alignment.

## Decisions needed from you

1. Archive vs delete survival and trauma content. Separate surface for memoir and advocacy?
2. Keep `/work/sanctuary/`?
3. Retire the education service or reframe it?
4. Fix accessibility claims by code or by wording?
