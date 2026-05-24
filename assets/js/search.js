(function () {
  'use strict';

  var resultsEl = document.getElementById('search-results-page');
  if (!resultsEl) return;

  var q = new URLSearchParams(location.search).get('q') || '';
  var query = q.trim();

  var queryDisplay = document.getElementById('search-query');
  if (queryDisplay) queryDisplay.textContent = query || '';

  if (!query) {
    showEmpty(resultsEl, 'Enter a search term above.');
    return;
  }

  fetch('/assets/js/search-index.json')
    .then(function (r) { return r.json(); })
    .then(function (index) {
      var lower = query.toLowerCase();
      var results = index.filter(function (item) {
        return (item.title || '').toLowerCase().indexOf(lower) !== -1 ||
               (item.description || '').toLowerCase().indexOf(lower) !== -1;
      }).slice(0, 20);
      renderResults(resultsEl, results, query);
    })
    .catch(function () {
      showEmpty(resultsEl, 'Search unavailable. Try again later.');
    });

  function renderResults(el, results, query) {
    el.replaceChildren();
    if (!results.length) {
      showEmpty(el, '“' + query + '” — no results.');
      return;
    }
    results.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'search-page-result';
      a.href = item.url;

      var interior = document.createElement('div');
      interior.className = 'search-page-result__interior';

      var type = document.createElement('span');
      type.className = 'search-result__type';
      type.textContent = item.type || 'page';

      var title = document.createElement('span');
      title.className = 'search-result__title';
      title.textContent = item.title;

      interior.appendChild(type);
      interior.appendChild(title);

      if (item.description) {
        var desc = document.createElement('p');
        desc.className = 'search-result__desc';
        desc.textContent = item.description;
        interior.appendChild(desc);
      }

      a.appendChild(interior);
      el.appendChild(a);
    });
  }

  function showEmpty(el, msg) {
    el.replaceChildren();
    var p = document.createElement('p');
    p.className = 'search-empty';
    p.textContent = msg;
    el.appendChild(p);
  }

})();
