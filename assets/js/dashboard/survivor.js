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

  // Higher rank = stricter; all-party and two-party are equivalent
  const TIER_RANK = { 'one-party': 0, 'two-party': 1, 'all-party': 1 };

  let appData = null;
  let allResources = [];

  // ── State dropdowns ─────────────────────────────────────────────────────
  function buildSelect(states, id) {
    const sel = document.getElementById(id);
    if (!sel) return;
    [...states]
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.abbr;
        opt.textContent = s.name;
        sel.appendChild(opt);
      });
  }

  // ── Recording law lookup ────────────────────────────────────────────────
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

  // ── Interstate calculator ───────────────────────────────────────────────
  window.calcInterstate = function() {
    if (!appData) return;
    const myAbbr = document.getElementById('interstate-my-state').value;
    const theirAbbr = document.getElementById('interstate-their-state').value;
    if (!myAbbr || !theirAbbr) return;

    const myState = appData.states.find(s => s.abbr === myAbbr);
    const theirState = appData.states.find(s => s.abbr === theirAbbr);
    if (!myState || !theirState) return;

    const myTier = myState.recording?.tier || 'one-party';
    const theirTier = theirState.recording?.tier || 'one-party';
    const myRank = TIER_RANK[myTier] ?? 0;
    const theirRank = TIER_RANK[theirTier] ?? 0;
    const bothOneParty = myRank === 0 && theirRank === 0;

    const verdict = document.getElementById('interstate-verdict');
    while (verdict.firstChild) verdict.removeChild(verdict.firstChild);

    let ruling, note, modifier, rule;

    if (bothOneParty) {
      modifier = 'interstate-verdict--safe';
      ruling = 'You may record without notifying the other party.';
      note = `${myState.name} and ${theirState.name} are both one-party consent states. Federal one-party baseline applies to interstate calls.`;
      rule = 'Governing rule: one-party consent';
    } else {
      const stricterIsYours = myRank >= theirRank;
      const stricterState = stricterIsYours ? myState : theirState;
      const stricterTier = stricterIsYours ? myTier : theirTier;
      modifier = myRank > 0 ? 'interstate-verdict--strict' : 'interstate-verdict--warn';
      ruling = 'All-party consent required — obtain consent before recording.';
      note = `${stricterState.name} (${TIER_LABELS[stricterTier]}) applies. When states differ, use the stricter rule to stay legal in both jurisdictions.`;
      rule = `Statute: ${stricterState.recording?.statute || '—'}`;
    }

    verdict.className = `interstate-verdict visible ${modifier}`;

    const r = document.createElement('div');
    r.className = 'interstate-verdict__ruling';
    r.textContent = ruling;
    verdict.appendChild(r);

    const n = document.createElement('p');
    n.className = 'interstate-verdict__note';
    n.textContent = note;
    verdict.appendChild(n);

    const rl = document.createElement('div');
    rl.className = 'interstate-verdict__rule';
    rl.textContent = rule;
    verdict.appendChild(rl);
  };

  // ── Pattern checklist (rendered from data.json dimensions) ──────────────
  function renderChecklist(dimensions) {
    const root = document.getElementById('checklist-root');
    if (!root) return;

    dimensions.forEach(dim => {
      const group = document.createElement('div');
      group.className = 'checklist-dim';

      const label = document.createElement('div');
      label.className = 'checklist-dim__label';
      label.textContent = dim.label;
      group.appendChild(label);

      const ul = document.createElement('ul');
      ul.className = 'pattern-list';

      (dim.items || []).forEach(item => {
        const text = typeof item === 'string' ? item : item.text;
        const li = document.createElement('li');
        li.className = 'pattern-item';
        li.setAttribute('role', 'checkbox');
        li.setAttribute('aria-checked', 'false');
        li.setAttribute('tabindex', '0');
        li.textContent = text;
        li.onclick = () => toggleItem(li);
        li.onkeydown = e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleItem(li); } };
        ul.appendChild(li);
      });

      group.appendChild(ul);
      root.appendChild(group);
    });
  }

  window.toggleItem = function(li) {
    const checked = li.classList.toggle('checked');
    li.setAttribute('aria-checked', checked ? 'true' : 'false');
    const count = document.querySelectorAll('#checklist-root .pattern-item.checked').length;
    const tallyEl = document.getElementById('tally-num');
    if (tallyEl) tallyEl.textContent = count;
    checkEscalation(count);
  };

  function checkEscalation(count) {
    const banner = document.getElementById('escalation-banner');
    if (!banner) return;

    if (count < 3) {
      banner.classList.remove('visible');
      return;
    }

    banner.classList.add('visible');
    const title = banner.querySelector('.escalation-banner__title');
    const text = banner.querySelector('.escalation-banner__text');

    if (count >= 9) {
      if (title) title.textContent = 'Multiple patterns of coercive control identified.';
      if (text) text.textContent = 'What you have described reflects serious coercive control. You are not alone, and support is available now.';
    } else {
      if (title) title.textContent = 'These patterns may indicate coercive control.';
      if (text) text.textContent = 'Even without physical violence, what you have described may be abuse. Confidential support resources are listed below.';
    }
  }

  // ── Device safety audit ─────────────────────────────────────────────────
  window.toggleDeviceItem = function(li) {
    li.classList.toggle('checked');
    const checkEl = li.querySelector('.device-item__check');
    if (checkEl) checkEl.textContent = li.classList.contains('checked') ? '✓' : '';
    const count = document.querySelectorAll('#device-list .device-item.checked').length;
    const tallyEl = document.getElementById('device-tally-num');
    if (tallyEl) tallyEl.textContent = count;
    const alertEl = document.getElementById('device-alert');
    if (alertEl) alertEl.classList.toggle('visible', count >= 2);
  };

  // ── Resources ───────────────────────────────────────────────────────────
  function makeTag(text) {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = text;
    return span;
  }

  function renderResources(resources) {
    const list = document.getElementById('resource-list');
    if (!list) return;
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

      const url = r.chat_url || r.url;
      if (url) {
        const link = document.createElement('a');
        link.className = 'resource-link-text';
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = url.replace(/^https?:\/\//, '');
        contactCol.appendChild(link);
      }

      item.appendChild(contactCol);
      list.appendChild(item);
    });
  }

  window.filterResources = function() {
    const typeVal = document.getElementById('filter-type')?.value;
    const popVal = document.getElementById('filter-pop')?.value;
    const filtered = allResources.filter(r => {
      if (typeVal && r.type !== typeVal) return false;
      if (popVal && !(r.populations || []).includes(popVal)) return false;
      return true;
    });
    renderResources(filtered);
  };

  // ── Init ────────────────────────────────────────────────────────────────
  async function init() {
    try {
      appData = await fetch('/assets/js/dashboard/data.json').then(r => r.json());
      allResources = appData.resources_national || [];

      buildSelect(appData.states || [], 'state-select');
      buildSelect(appData.states || [], 'interstate-my-state');
      buildSelect(appData.states || [], 'interstate-their-state');

      renderChecklist(appData.checklist?.dimensions || []);
      renderResources(allResources);
    } catch (err) {
      console.error('Survivor init failed:', err);
    }
  }

  init();
})();

function leaveNow() { window.location.replace('https://weather.com'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') leaveNow(); });
