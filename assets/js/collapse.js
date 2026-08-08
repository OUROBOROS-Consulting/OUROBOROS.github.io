/* collapse.js — progressive enhancement for long Q&A prose.
 *
 * Opt in per page with `collapse_questions: true` in front matter; article.html
 * only emits this script when that key is set.
 *
 * Each h3 in .post-body and every sibling that follows it, up to the next h2 or
 * h3, is moved into a <details class="faq-item">. The h3 itself moves into the
 * <summary> with its id intact, which is what keeps toc.js and every #anchor on
 * the page working. With scripting off the markup is untouched and the page
 * reads exactly as it did before.
 *
 * Must run before toc.js so the TOC is built against the final DOM. Both are
 * deferred, so document order decides.
 */
(function () {
  var body = document.querySelector('.post-body');
  if (!body) return;

  var headings = [].slice.call(body.querySelectorAll(':scope > h3'));
  if (!headings.length) return;

  var items = [];

  headings.forEach(function (h3) {
    var details = document.createElement('details');
    details.className = 'faq-item';

    var summary = document.createElement('summary');
    var answer = document.createElement('div');
    answer.className = 'faq-answer';

    // Collect first, move second: walking nextSibling while reparenting nodes
    // mutates the list underneath the walk.
    var run = [];
    var node = h3.nextElementSibling;
    while (node && node.tagName !== 'H2' && node.tagName !== 'H3') {
      run.push(node);
      node = node.nextElementSibling;
    }

    h3.parentNode.insertBefore(details, h3);
    summary.appendChild(h3);
    run.forEach(function (el) { answer.appendChild(el); });
    details.appendChild(summary);
    details.appendChild(answer);

    items.push(details);
  });

  // Consecutive questions get grouped so the shared hairlines collapse into one
  // ruled list per h2 section rather than one rule per question.
  items.forEach(function (details) {
    var prev = details.previousElementSibling;
    if (prev && prev.classList.contains('faq-list')) {
      prev.appendChild(details);
      return;
    }
    var list = document.createElement('div');
    list.className = 'faq-list';
    details.parentNode.insertBefore(list, details);
    list.appendChild(details);
  });

  // ── Expand all ──────────────────────────────────────────────────────────────
  // Closed <details> are invisible to find-in-page in most browsers. Without
  // this, collapsing the page makes Cmd-F stop working on it.
  var expand = document.createElement('button');
  expand.type = 'button';
  expand.className = 'faq-expand-all';
  expand.textContent = 'Expand all';
  expand.setAttribute('aria-expanded', 'false');

  // Top of the body, not above the first list — the control governs the whole
  // page, and sitting under the first h2 would read as scoped to that section.
  body.insertBefore(expand, body.firstChild);

  function syncExpandLabel() {
    var allOpen = items.every(function (d) { return d.open; });
    expand.textContent = allOpen ? 'Collapse all' : 'Expand all';
    expand.setAttribute('aria-expanded', String(allOpen));
  }

  expand.addEventListener('click', function () {
    var open = !items.every(function (d) { return d.open; });
    items.forEach(function (d) { d.open = open; });
    syncExpandLabel();
  });

  items.forEach(function (d) {
    d.addEventListener('toggle', syncExpandLabel);
  });

  // ── Anchors ─────────────────────────────────────────────────────────────────
  // A link to a question inside a closed <details> would otherwise scroll to a
  // heading the visitor cannot read.
  //
  // `scroll` is false on the click path: opening the details before the default
  // navigation runs is enough, and scrolling ourselves as well would double-jump.
  // It is true on the hashchange and initial-load paths, where the browser has
  // already scrolled against the collapsed layout and landed short.
  function revealHash(hash, scroll) {
    if (!hash || hash.length < 2) return;
    var target;
    try {
      target = body.querySelector(hash);
    } catch (e) {
      return; // hash is not a valid selector
    }
    if (!target) return;

    var details = target.closest('details.faq-item');
    if (details && !details.open) {
      details.open = true;
      syncExpandLabel();
    }
    if (scroll) target.scrollIntoView();
  }

  window.addEventListener('hashchange', function () {
    revealHash(window.location.hash, true);
  });

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute('href');
    if (hash === '#') return;
    revealHash(hash, false);
  });

  if (window.location.hash) revealHash(window.location.hash, true);
})();
