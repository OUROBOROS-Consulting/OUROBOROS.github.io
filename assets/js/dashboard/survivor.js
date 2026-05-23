(() => {
  'use strict';

  const TIER_LABELS = {
    'one-party': 'One-Party Consent',
    'all-party': 'All-Party Consent',
    'two-party': 'All-Party Consent (Two-Party)'
  };

  const TIER_PRACTICAL = {
    'one-party': 'You may record calls and conversations without telling the other person.',
    'all-party': 'All parties must consent before you may record. Recording without consent is illegal.',
    'two-party': 'All parties must consent before you may record. Recording without consent is illegal.'
  };

  let appData = null;
  let allResources = [];

  function buildSelect(states) {
    const sel = document.getElementById('state-select');
    [...states]
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.abbr;
        opt.textContent = s.name;
        sel.appendChild(opt);
      });
  }

  window.showLaw = function(abbr) {
    if (!abbr || !appData) return;
    const state = appData.states.find(s => s.abbr === abbr);
    if (!state) return;
    const rec = state.recording || {};
    const tier = rec.tier || 'one-party';

    document.getElementById('law-verdict').textContent = TIER_LABELS[tier] || tier;
    document.getElementById('law-citation').textContent = rec.statute || rec.citation || '—';
    document.getElementById('law-plain').textContent = TIER_PRACTICAL[tier] || '';

    const interstateBlock = document.getElementById('law-interstate-block');
    if (interstateBlock) {
      interstateBlock.style.display = rec.interstate_note ? 'block' : 'none';
      const interstateText = document.getElementById('law-interstate-text');
      if (interstateText) interstateText.textContent = rec.interstate_note || '';
    }

    document.getElementById('law-result').classList.add('visible');
  };

  window.toggleItem = function(li) {
    li.classList.toggle('checked');
    const count = document.querySelectorAll('#pattern-list .pattern-item.checked').length;
    document.getElementById('tally-num').textContent = count;
  };

  function makeTag(text) {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = text;
    return span;
  }

  function renderResources(resources) {
    const list = document.getElementById('resource-list');
    while (list.firstChild) list.removeChild(list.firstChild);

    if (!resources.length) {
      const empty = document.createElement('div');
      empty.className = 'resource-empty';
      empty.textContent = 'No resources match current filters.';
      list.appendChild(empty);
      return;
    }

    resources.forEach(r => {
      const item = document.createElement('div');
      item.className = 'resource-item';

      const nameText = document.createElement('div');
      nameText.className = 'resource-name-text';
      nameText.textContent = r.name;
      item.appendChild(nameText);

      const tags = document.createElement('div');
      tags.className = 'resource-tags';
      (r.populations || []).forEach(p => tags.appendChild(makeTag(p)));
      (r.languages || []).slice(0, 3).forEach(l => tags.appendChild(makeTag(l)));
      item.appendChild(tags);

      const scope = document.createElement('div');
      scope.className = 'resource-scope';
      scope.textContent = r.scope || '';
      item.appendChild(scope);

      const contactCol = document.createElement('div');
      contactCol.className = 'resource-contact-col';

      if (r.phone) {
        const phone = document.createElement('div');
        phone.className = 'resource-phone';
        phone.textContent = r.phone + (r.text ? ' · text: ' + r.text : '');
        contactCol.appendChild(phone);
      }

      if (r.url) {
        const link = document.createElement('a');
        link.className = 'resource-link-text';
        link.href = r.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = r.url.replace(/^https?:\/\//, '');
        contactCol.appendChild(link);
      }

      item.appendChild(contactCol);
      list.appendChild(item);
    });
  }

  window.filterResources = function() {
    const typeVal = document.getElementById('filter-type') && document.getElementById('filter-type').value;
    const popVal = document.getElementById('filter-pop') && document.getElementById('filter-pop').value;
    const filtered = allResources.filter(r => {
      if (typeVal && r.type !== typeVal) return false;
      if (popVal && !(r.populations || []).includes(popVal)) return false;
      return true;
    });
    renderResources(filtered);
  };

  async function init() {
    try {
      appData = await fetch('/assets/js/dashboard/data.json').then(r => r.json());
      allResources = appData.resources_national || [];
      buildSelect(appData.states || []);
      renderResources(allResources);
    } catch (err) {
      console.error('Survivor init failed:', err);
    }
  }

  init();
})();

function leaveNow() { window.location.replace('https://weather.com'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') leaveNow(); });
