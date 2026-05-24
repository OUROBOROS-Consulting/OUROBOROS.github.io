(function () {
  var toc = document.getElementById('page-toc');
  var nav = toc && toc.querySelector('.toc-nav');
  if (!nav) return;

  var mode = toc.dataset.tocMode;
  var targets = [];

  if (mode === 'mission') {
    targets = [].slice.call(document.querySelectorAll('section.svc-section[id]'));
  } else {
    targets = [].slice.call(
      document.querySelectorAll('.post-body h2, .post-body h3')
    ).filter(function (h) { return h.id; });
  }

  if (!targets.length) {
    toc.hidden = true;
    var wrap = toc.parentElement;
    if (wrap && wrap.classList.contains('page-toc-wrap')) {
      wrap.style.gridTemplateColumns = '1fr';
    }
    return;
  }

  targets.forEach(function (el) {
    var id, label, cls;

    if (mode === 'mission') {
      var labelEl = el.querySelector('.svc-section-label p');
      id = el.id;
      label = labelEl ? labelEl.textContent.trim() : '';
      cls = 'toc-item';
    } else {
      id = el.id;
      label = el.textContent.trim();
      cls = 'toc-item' + (el.tagName === 'H3' ? ' toc-h3' : '');
    }

    if (!id || !label) return;

    var li = document.createElement('li');
    li.className = cls;
    li.dataset.target = id;
    var a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = label;
    li.appendChild(a);
    nav.appendChild(li);
  });

  toc.removeAttribute('aria-hidden');

  var items = [].slice.call(nav.querySelectorAll('.toc-item'));

  function setActive() {
    var active = null;
    targets.forEach(function (el, i) {
      if (el.getBoundingClientRect().top <= 120) {
        active = items[i];
      }
    });
    items.forEach(function (li) { li.classList.remove('is-active'); });
    if (active) active.classList.add('is-active');
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();
