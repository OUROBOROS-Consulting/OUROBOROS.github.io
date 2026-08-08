/*
 * Page outline for the right-hand collapsible panel.
 *
 * Builds one row per heading (article/announcement) or per section
 * (sections layout), gives each a tick that spine.js will thread the wave
 * through, and tracks the active entry on scroll.
 *
 * The two selectors below are hardcoded contracts with the layouts:
 * `section.page-section[id]` and `.page-section-label p`. Both have broken
 * silently on past renames — grep this file before touching either class.
 */
(function () {
  var toc = document.getElementById('page-toc');
  var nav = toc && toc.querySelector('.toc-nav');
  if (!nav) return;

  var mode = toc.dataset.tocMode;
  var candidates = [];

  if (mode === 'sections') {
    candidates = [].slice.call(document.querySelectorAll('section.page-section[id]'));
  } else {
    candidates = [].slice.call(
      document.querySelectorAll('.post-body h2, .post-body h3')
    ).filter(function (h) { return h.id; });
  }

  function describe(el) {
    if (mode === 'sections') {
      var labelEl = el.querySelector('.page-section-label p');
      return {
        id: el.id,
        label: labelEl ? labelEl.textContent.trim() : '',
        sub: false
      };
    }
    return {
      id: el.id,
      label: el.textContent.trim(),
      sub: el.tagName === 'H3'
    };
  }

  // targets and items are built in lockstep and stay index-aligned. The
  // previous version filtered rows out while still indexing items[] by the
  // unfiltered target position, so a single section missing its label silently
  // shifted every highlight below it onto the wrong entry.
  var targets = [];
  var items = [];

  candidates.forEach(function (el) {
    var info = describe(el);
    if (!info.id || !info.label) return;

    var li = document.createElement('li');
    li.className = 'toc-item' + (info.sub ? ' toc-h3' : '');
    li.dataset.target = info.id;
    li.dataset.spineNode = '';
    li.style.setProperty('--i', items.length); // staggers the label reveal

    var tick = document.createElement('span');
    tick.className = 'spine-tick';
    tick.setAttribute('aria-hidden', 'true');

    var a = document.createElement('a');
    a.href = '#' + info.id;

    var tx = document.createElement('span');
    tx.className = 'toc-tx';
    tx.textContent = info.label;
    // Two-line clamp means a long heading is visually truncated; keep the full
    // text reachable on hover for anyone who needs it.
    tx.title = info.label;

    a.appendChild(tx);
    li.appendChild(tick);
    li.appendChild(a);
    nav.appendChild(li);

    targets.push(el);
    items.push(li);
  });

  if (!items.length) {
    toc.hidden = true;
    var wrap = toc.parentElement;
    if (wrap && wrap.classList.contains('page-toc-wrap')) {
      wrap.style.gridTemplateColumns = '1fr';
    }
    return;
  }

  toc.removeAttribute('aria-hidden');

  if (window.OuroSpine) window.OuroSpine.draw(nav);

  var current = null;

  function setActive() {
    var active = null;
    targets.forEach(function (el, i) {
      if (el.getBoundingClientRect().top <= 120) { active = items[i]; }
    });
    if (active === current) return;
    if (current) current.classList.remove('is-active');
    if (active) active.classList.add('is-active');
    current = active;
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();
