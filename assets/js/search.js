(function () {
  'use strict';

  const SEARCH_INDEX_URL = '/assets/js/search-index.json';
  const MAX_RESULTS = 5;

  document.addEventListener('DOMContentLoaded', function () {
    const nav    = document.querySelector('nav.nav-menu');
    const wrap   = document.getElementById('nav-search-wrap');
    const toggle = wrap && wrap.querySelector('.nav-search__toggle');
    const input  = wrap && wrap.querySelector('.nav-search__input');
    const closeBtn = wrap && wrap.querySelector('.nav-search-close');
    const resultsEl = document.getElementById('search-results');

    if (!nav || !wrap || !toggle || !input || !closeBtn || !resultsEl) return;

    let index     = null;
    let activeIdx = -1;
    let fetching  = false;

    // ── open / close ──────────────────────────────────────────────────────────

    function isOpen() {
      return nav.classList.contains('search-open');
    }

    function open() {
      nav.classList.add('search-open');
      toggle.setAttribute('aria-expanded', 'true');
      input.focus();
    }

    function close() {
      nav.classList.remove('search-open');
      toggle.setAttribute('aria-expanded', 'false');
      input.value = '';
      clearResults();
      activeIdx = -1;
      toggle.focus();
    }

    function clearResults() {
      resultsEl.replaceChildren();
      resultsEl.classList.remove('has-results');
      activeIdx = -1;
    }

    // ── fetch + filter ─────────────────────────────────────────────────────────

    function fetchIndex() {
      if (index !== null || fetching) return Promise.resolve(index);
      fetching = true;
      return fetch(SEARCH_INDEX_URL)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          index = data;
          fetching = false;
          return index;
        })
        .catch(function () {
          fetching = false;
          return [];
        });
    }

    function filter(query) {
      if (!index) return [];
      var q = query.toLowerCase();
      var results = [];
      for (var i = 0; i < index.length && results.length < MAX_RESULTS; i++) {
        var entry = index[i];
        var inTitle = entry.title && entry.title.toLowerCase().indexOf(q) !== -1;
        var inDesc  = entry.description && entry.description.toLowerCase().indexOf(q) !== -1;
        if (inTitle || inDesc) results.push(entry);
      }
      return results;
    }

    // ── render ─────────────────────────────────────────────────────────────────

    function renderResults(results, query) {
      resultsEl.replaceChildren();
      activeIdx = -1;

      if (results.length === 0) {
        var card = document.createElement('div');
        card.className = 'nav-card search-result--empty';

        var interior = document.createElement('div');
        interior.className = 'nav-card__interior';

        var titleEl = document.createElement('span');
        titleEl.className = 'search-result__title';
        titleEl.appendChild(document.createTextNode('No results for “'));
        titleEl.appendChild(document.createTextNode(query));
        titleEl.appendChild(document.createTextNode('”'));

        interior.appendChild(titleEl);
        card.appendChild(interior);
        resultsEl.appendChild(card);
        resultsEl.classList.remove('has-results');
        return;
      }

      for (var i = 0; i < results.length; i++) {
        var result = results[i];

        var link = document.createElement('a');
        link.className = 'nav-card';
        link.href = result.url;

        var inner = document.createElement('div');
        inner.className = 'nav-card__interior';

        var typeEl = document.createElement('span');
        typeEl.className = 'search-result__type';
        typeEl.textContent = result.type;

        var title = document.createElement('span');
        title.className = 'search-result__title';
        title.textContent = result.title;

        inner.appendChild(typeEl);
        inner.appendChild(title);

        if (result.description) {
          var desc = document.createElement('span');
          desc.className = 'search-result__desc';
          desc.textContent = result.description;
          inner.appendChild(desc);
        }

        link.appendChild(inner);
        resultsEl.appendChild(link);
      }

      resultsEl.classList.add('has-results');
    }

    // ── keyboard navigation ────────────────────────────────────────────────────

    function resultCards() {
      return resultsEl.querySelectorAll('.nav-card:not(.search-result--empty)');
    }

    function updateActive(cards) {
      for (var i = 0; i < cards.length; i++) {
        if (i === activeIdx) {
          cards[i].setAttribute('aria-selected', 'true');
        } else {
          cards[i].removeAttribute('aria-selected');
        }
      }
    }

    input.addEventListener('keydown', function (e) {
      var cards = resultCards();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, cards.length - 1);
        updateActive(cards);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, -1);
        updateActive(cards);
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0 && cards[activeIdx]) {
          window.location.href = cards[activeIdx].href;
        }
      }
    });

    // ── input handler ──────────────────────────────────────────────────────────

    input.addEventListener('input', function () {
      var query = input.value.trim();
      if (!query) {
        clearResults();
        return;
      }

      if (index !== null) {
        renderResults(filter(query), query);
      } else {
        fetchIndex().then(function () {
          // Re-read value in case user typed more while fetching
          var current = input.value.trim();
          if (current) {
            renderResults(filter(current), current);
          }
        });
      }
    });

    // ── toggle / close button ──────────────────────────────────────────────────

    toggle.addEventListener('click', function () {
      if (isOpen()) {
        close();
      } else {
        open();
      }
    });

    closeBtn.addEventListener('click', function () {
      close();
    });

    // ── global keyboard shortcuts ──────────────────────────────────────────────

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === '/' && !isOpen()) {
        var el = document.activeElement;
        var tag = el && el.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable) return;
        e.preventDefault();
        open();
      }
    });

    // ── click outside ──────────────────────────────────────────────────────────

    document.addEventListener('click', function (e) {
      if (isOpen() && !wrap.contains(e.target)) {
        close();
      }
    });
  });

})();
