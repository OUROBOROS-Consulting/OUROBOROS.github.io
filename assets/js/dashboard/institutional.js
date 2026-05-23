(() => {
  'use strict';

  const STALE_MS = 365 * 24 * 60 * 60 * 1000;
  const TODAY = Date.now();

  const TYPE_LABELS = {
    crisis: 'Crisis', legal: 'Legal', digital: 'Digital',
    advocacy: 'Advocacy', policy: 'Policy', whistleblower: 'Whistleblower'
  };

  const CC_STATUS_LABELS = {
    criminal: 'Criminal Statute',
    civil: 'Civil Provision Only',
    both: 'Criminal + Civil',
    pending: 'Pending Legislation',
    none: 'No Statute'
  };

  const REPORTING_PATHS = {
    eeoc: {
      title: 'EEOC Charge',
      agency: 'Equal Employment Opportunity Commission',
      deadlineDays: 180,
      deadlineExtended: 300,
      urgency: 'normal',
      steps: [
        'Document all incidents with dates, witnesses, and evidence.',
        'Attempt internal HR reporting first; retain written records.',
        'File a charge at eeoc.gov or in person — 180 days (300 in deferral states).',
        'EEOC will investigate or issue a right-to-sue letter.'
      ],
      deadlineNote: 'Deadline extends to 300 days if a state or local agency has jurisdiction over the claim.'
    },
    fmla: {
      title: 'FMLA / Medical Leave',
      agency: 'U.S. Department of Labor',
      deadlineDays: null,
      urgency: 'normal',
      steps: [
        'Notify your employer of the need for leave as soon as practicable.',
        'Provide medical certification from a healthcare provider.',
        'Leave can be intermittent or a block of time — negotiate with HR.',
        'Retaliation for taking FMLA leave is illegal; document any adverse actions.'
      ],
      deadlineNote: 'No rigid complaint deadline, but notify employer promptly. FMLA retaliation claims follow the FLSA 2-year statute of limitations.'
    },
    nlrb: {
      title: 'NLRB Unfair Labor Practice',
      agency: 'National Labor Relations Board',
      deadlineDays: 180,
      urgency: 'normal',
      steps: [
        'Identify whether your employer\'s conduct interfered with protected concerted activity.',
        'File an unfair labor practice charge at nlrb.gov within 6 months of the violation.',
        'NLRB regional office will investigate and may issue a complaint.',
        'Remedies include reinstatement, back pay, and posting of notices.'
      ]
    },
    osha: {
      title: 'OSHA Whistleblower Complaint',
      agency: 'Occupational Safety and Health Administration',
      deadlineDays: 30,
      urgency: 'urgent',
      steps: [
        'Identify the specific statute that protects your activity (OSHA has 25+ programs).',
        'File within 30 days of the adverse action — this deadline is absolute.',
        'Submit online at osha.gov/whistleblower or call 1-800-321-OSHA.',
        'OSHA will screen, investigate, and may seek reinstatement and back pay.'
      ],
      deadlineNote: 'Strict 30-day window — no exceptions'
    }
  };

  let stateByAbbr = {};

  function isStale(dateStr) {
    if (!dateStr) return false;
    return TODAY - new Date(dateStr).getTime() > STALE_MS;
  }

  function makeTag(text, cls) {
    const span = document.createElement('span');
    span.className = 'badge' + (cls ? ' ' + cls : '');
    span.textContent = text;
    return span;
  }

  function buildFedTable(statutes, tbodyId) {
    const tbody = document.getElementById(tbodyId);
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

    if (!statutes || !statutes.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 4;
      td.className = 'table-empty';
      td.textContent = 'No entries.';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    statutes.forEach(item => {
      const tr = document.createElement('tr');
      const isCritical = item.filing_deadline_days === 30;
      if (isCritical) tr.className = 'row-critical';

      const tdStat = document.createElement('td');
      const nameDiv = document.createElement('div');
      nameDiv.className = 'statute-name';
      nameDiv.textContent = item.statute || '';
      tdStat.appendChild(nameDiv);
      if (item.citation) {
        const citeDiv = document.createElement('div');
        citeDiv.className = 'statute-citation';
        citeDiv.textContent = item.citation;
        tdStat.appendChild(citeDiv);
      }
      if (item.url) {
        const link = document.createElement('a');
        link.className = 'statute-link';
        link.href = item.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'View statute';
        tdStat.appendChild(link);
      }
      tr.appendChild(tdStat);

      const tdAgency = document.createElement('td');
      const agDiv = document.createElement('div');
      agDiv.className = 'agency-label';
      agDiv.textContent = item.agency || '';
      tdAgency.appendChild(agDiv);
      if (isStale(item.last_verified)) {
        const staleWarn = document.createElement('div');
        staleWarn.className = 'stale-warning';
        staleWarn.textContent = '△ Data may be stale';
        tdAgency.appendChild(staleWarn);
      }
      tr.appendChild(tdAgency);

      const tdDl = document.createElement('td');
      const dlDiv = document.createElement('div');
      dlDiv.className = 'deadline-pill' + (isCritical ? ' deadline-critical' : '');
      dlDiv.textContent = item.filing_deadline_days ? item.filing_deadline_days + ' days' : '—';
      tdDl.appendChild(dlDiv);
      if (isCritical) {
        const warn = document.createElement('div');
        warn.className = 'deadline-strict-note';
        warn.textContent = 'STRICT — no extensions';
        tdDl.appendChild(warn);
      }
      tr.appendChild(tdDl);

      const tdScope = document.createElement('td');
      tdScope.textContent = item.scope || '';
      tr.appendChild(tdScope);

      tbody.appendChild(tr);
    });
  }

  window.selectPath = function(key) {
    const path = REPORTING_PATHS[key];
    if (!path) return;

    document.querySelectorAll('.tree-card').forEach(c => c.classList.remove('selected'));
    const cards = document.querySelectorAll('.tree-card');
    const keys = Object.keys(REPORTING_PATHS);
    const idx = keys.indexOf(key);
    if (idx >= 0 && cards[idx]) cards[idx].classList.add('selected');

    const result = document.getElementById('tree-result');
    while (result.firstChild) result.removeChild(result.firstChild);

    const header = document.createElement('div');
    header.className = 'tree-result-header';

    const title = document.createElement('div');
    title.className = 'tree-result-title';
    title.textContent = path.title;
    header.appendChild(title);

    const agency = document.createElement('div');
    agency.className = 'tree-result-agency';
    agency.textContent = path.agency;
    header.appendChild(agency);

    result.appendChild(header);

    const stepsGrid = document.createElement('div');
    stepsGrid.className = 'tree-steps-grid';
    path.steps.forEach((step, i) => {
      const row = document.createElement('div');
      row.className = 'tree-step';

      const num = document.createElement('div');
      num.className = 'tree-step-num';
      num.textContent = i + 1;
      row.appendChild(num);

      const text = document.createElement('div');
      text.className = 'tree-step-text';
      text.textContent = step;
      row.appendChild(text);

      stepsGrid.appendChild(row);
    });
    result.appendChild(stepsGrid);

    if (path.deadlineDays || path.deadlineNote) {
      const dlBar = document.createElement('div');
      dlBar.className = 'deadline-bar' + (path.urgency === 'urgent' ? ' deadline-bar--urgent' : '');

      if (path.deadlineDays) {
        const dlNum = document.createElement('span');
        dlNum.className = 'deadline-bar-num';
        dlNum.textContent = path.deadlineDays + '-day deadline';
        dlBar.appendChild(dlNum);
      }

      if (path.deadlineNote) {
        const dlNote = document.createElement('span');
        dlNote.className = 'deadline-bar-note';
        dlNote.textContent = path.deadlineNote;
        dlBar.appendChild(dlNote);
      }

      result.appendChild(dlBar);
    }

    result.classList.add('visible');
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  function buildStateSelect(states) {
    const sel = document.getElementById('state-lookup-select');
    [...states]
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.abbr;
        opt.textContent = s.name;
        sel.appendChild(opt);
      });
  }

  window.lookupState = function(abbr) {
    const result = document.getElementById('state-result');
    if (!abbr) { result.classList.remove('visible'); return; }
    const s = stateByAbbr[abbr];
    if (!s) return;

    while (result.firstChild) result.removeChild(result.firstChild);

    const nameEl = document.createElement('div');
    nameEl.className = 'state-result-name';
    nameEl.textContent = s.name;
    result.appendChild(nameEl);

    const grid = document.createElement('div');
    grid.className = 'state-result-grid';

    const cc = s.coercive_control || {};
    const ccCell = document.createElement('div');
    ccCell.className = 'state-result-cell';

    const ccLabel = document.createElement('div');
    ccLabel.className = 'state-cell-label';
    ccLabel.textContent = 'Coercive Control';
    ccCell.appendChild(ccLabel);

    const ccStatus = document.createElement('div');
    ccStatus.className = 'state-cell-value';
    ccStatus.textContent = CC_STATUS_LABELS[cc.status] || cc.status || 'Unknown';
    ccCell.appendChild(ccStatus);

    if (cc.statute) {
      const ccStatute = document.createElement('div');
      ccStatute.className = 'state-cell-statute';
      ccStatute.textContent = cc.statute;
      ccCell.appendChild(ccStatute);
    }

    if (cc.scope_note) {
      const ccScope = document.createElement('div');
      ccScope.className = 'state-cell-note';
      ccScope.textContent = cc.scope_note;
      ccCell.appendChild(ccScope);
    }

    if (cc.status === 'none' || cc.status === 'pending') {
      const advisory = document.createElement('div');
      advisory.className = 'state-cell-advisory';
      advisory.textContent = 'No coercive control statute in this state. Document all incidents and consult a local DV attorney about civil remedies.';
      ccCell.appendChild(advisory);
    }

    grid.appendChild(ccCell);

    const rec = s.recording || {};
    const recCell = document.createElement('div');
    recCell.className = 'state-result-cell';

    const recLabel = document.createElement('div');
    recLabel.className = 'state-cell-label';
    recLabel.textContent = 'Recording Law';
    recCell.appendChild(recLabel);

    const recTier = document.createElement('div');
    recTier.className = 'state-cell-value';
    recTier.textContent = (rec.tier || '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '—';
    recCell.appendChild(recTier);

    if (rec.statute) {
      const recStatute = document.createElement('div');
      recStatute.className = 'state-cell-statute';
      recStatute.textContent = rec.statute;
      recCell.appendChild(recStatute);
    }

    if (rec.practical) {
      const recPractical = document.createElement('div');
      recPractical.className = 'state-cell-note';
      recPractical.textContent = rec.practical;
      recCell.appendChild(recPractical);
    }

    if (rec.tier === 'all-party' || rec.tier === 'two-party') {
      const allPartyWarn = document.createElement('div');
      allPartyWarn.className = 'state-cell-advisory state-cell-advisory--warn';
      allPartyWarn.textContent = 'All-party consent state — you must inform the other party before recording.';
      recCell.appendChild(allPartyWarn);
    }

    grid.appendChild(recCell);
    result.appendChild(grid);
    result.classList.add('visible');
  };

  function buildResources(resources) {
    const container = document.getElementById('resource-cards');
    while (container.firstChild) container.removeChild(container.firstChild);

    const filtered = (resources || []).filter(r =>
      (r.populations || []).includes('workplace') || r.type === 'whistleblower'
    );

    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'resource-empty';
      empty.textContent = 'No workplace or whistleblower resources in current dataset.';
      container.appendChild(empty);
      return;
    }

    filtered.forEach(r => {
      const card = document.createElement('div');
      card.className = 'resource-card';

      const name = document.createElement('div');
      name.className = 'resource-name';
      name.textContent = r.name;
      card.appendChild(name);

      const meta = document.createElement('div');
      meta.className = 'resource-meta';
      if (r.type) meta.appendChild(makeTag(TYPE_LABELS[r.type] || r.type, 'badge--pend'));
      (r.populations || []).forEach(p => meta.appendChild(makeTag(p)));
      card.appendChild(meta);

      const contact = document.createElement('div');
      contact.className = 'resource-contact';
      if (r.phone) {
        const phone = document.createElement('div');
        phone.className = 'resource-phone';
        phone.textContent = r.phone;
        contact.appendChild(phone);
      }
      if (r.url) {
        const link = document.createElement('a');
        link.className = 'resource-link';
        link.href = r.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = r.url.replace(/^https?:\/\//, '');
        contact.appendChild(link);
      }
      card.appendChild(contact);
      container.appendChild(card);
    });
  }

  async function init() {
    try {
      const data = await fetch('/assets/js/dashboard/data.json').then(r => r.json());
      const fed = data.federal || {};
      buildFedTable(fed.workplace || [], 'workplace-tbody');
      buildFedTable(fed.whistleblower || [], 'whistleblower-tbody');

      (data.states || []).forEach(s => { stateByAbbr[s.abbr] = s; });
      buildStateSelect(data.states || []);
      buildResources(data.resources_national || []);
    } catch (err) {
      console.error('Institutional init failed:', err);
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.sidebar-nav a').forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

  init();
})();

function leaveNow() { window.location.replace('https://www.google.com'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') leaveNow(); });
