(() => {
  'use strict';

  let appData = null;
  let tableRows = [];
  let sortCol = 'name';
  let sortDir = 1;

  function isStale(dateStr) {
    if (!dateStr) return false;
    return Date.now() - new Date(dateStr).getTime() > 365 * 24 * 60 * 60 * 1000;
  }

  function makeBadge(cls, text) {
    const span = document.createElement('span');
    span.className = 'badge-cc ' + cls;
    span.textContent = text;
    return span;
  }

  function makeStaleMark() {
    const span = document.createElement('span');
    span.className = 'badge-stale';
    span.textContent = '△ stale';
    return span;
  }

  function makePilotMark() {
    const span = document.createElement('span');
    span.className = 'badge-pilot';
    span.textContent = '⌛ pilot';
    return span;
  }

  function ccLabel(status) {
    const map = { criminal: 'Criminal', civil: 'Civil', both: 'Both', pending: 'Pending', none: 'None' };
    return map[status] || status || 'None';
  }

  function recLabel(tier) {
    const map = { 'one-party': 'One-party', 'all-party': 'All-party', 'two-party': 'Two-party' };
    return map[tier] || tier || '—';
  }

  function buildFlatRows(states, defaultVerified) {
    return states.map(s => {
      const cc = s.coercive_control || {};
      const rec = s.recording || {};
      return {
        name: s.name || '',
        abbr: s.abbr || '',
        cc_status: cc.status || cc.type || 'none',
        cc_citation: cc.citation || '',
        cc_effective: cc.effective_date || '',
        cc_verified: cc.last_verified || defaultVerified,
        cc_pilot: cc.pilot_expiry || null,
        rec_tier: rec.tier || '',
        rec_citation: rec.statute || rec.citation || '',
        rec_verified: rec.last_verified || defaultVerified,
        pending: s.pending_legislation || [],
      };
    });
  }

  function filterRows() {
    const search = document.getElementById('state-search').value.toLowerCase();
    const ccF = document.getElementById('cc-filter').value;
    const recF = document.getElementById('rec-filter').value;
    return tableRows.filter(r => {
      if (search && !r.name.toLowerCase().includes(search) && !r.abbr.toLowerCase().includes(search)) return false;
      if (ccF && r.cc_status !== ccF) return false;
      if (recF && r.rec_tier !== recF) return false;
      return true;
    });
  }

  function sortRows(rows) {
    return [...rows].sort((a, b) => {
      const av = String(a[sortCol] || '').toLowerCase();
      const bv = String(b[sortCol] || '').toLowerCase();
      return sortDir * av.localeCompare(bv);
    });
  }

  function renderTable() {
    const tbody = document.getElementById('table-body');
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    const rows = sortRows(filterRows());
    document.getElementById('row-count').textContent = rows.length + ' of ' + tableRows.length + ' jurisdictions';
    if (!rows.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 7;
      td.className = 'table-empty';
      td.textContent = 'No results match current filters.';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }
    rows.forEach(r => {
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.textContent = r.name;
      tr.appendChild(tdName);

      const tdAbbr = document.createElement('td');
      tdAbbr.className = 'mono';
      tdAbbr.textContent = r.abbr;
      tr.appendChild(tdAbbr);

      const tdStatus = document.createElement('td');
      tdStatus.appendChild(makeBadge(r.cc_status, ccLabel(r.cc_status)));
      if (isStale(r.cc_verified)) tdStatus.appendChild(makeStaleMark());
      if (r.cc_pilot) tdStatus.appendChild(makePilotMark());
      tr.appendChild(tdStatus);

      const tdCite = document.createElement('td');
      tdCite.className = 'mono';
      tdCite.textContent = r.cc_citation || '—';
      tr.appendChild(tdCite);

      const tdRec = document.createElement('td');
      const recSpan = document.createElement('span');
      recSpan.className = 'badge-rec';
      recSpan.textContent = recLabel(r.rec_tier);
      tdRec.appendChild(recSpan);
      if (isStale(r.rec_verified)) tdRec.appendChild(makeStaleMark());
      tr.appendChild(tdRec);

      const tdRecCite = document.createElement('td');
      tdRecCite.className = 'mono';
      tdRecCite.textContent = r.rec_citation || '—';
      tr.appendChild(tdRecCite);

      const tdEff = document.createElement('td');
      tdEff.className = 'mono';
      tdEff.textContent = r.cc_effective || '—';
      tr.appendChild(tdEff);

      tbody.appendChild(tr);
    });
  }

  window.sortTable = function(col) {
    if (sortCol === col) { sortDir *= -1; }
    else { sortCol = col; sortDir = 1; }
    document.querySelectorAll('table.data-table thead th').forEach(th => {
      th.classList.remove('sort-asc', 'sort-desc');
      if (th.dataset.col === col) th.classList.add(sortDir === 1 ? 'sort-asc' : 'sort-desc');
    });
    renderTable();
  };

  window.exportCSV = function() {
    const rows = sortRows(filterRows());
    const headers = ['State', 'Abbr', 'CC Status', 'CC Citation', 'Recording Tier', 'Rec Citation', 'Effective Date', 'CC Last Verified', 'Rec Last Verified'];
    const lines = [headers.join(',')];
    rows.forEach(r => {
      const cols = [
        '"' + r.name.replace(/"/g, '""') + '"',
        r.abbr,
        r.cc_status,
        '"' + (r.cc_citation || '').replace(/"/g, '""') + '"',
        r.rec_tier,
        '"' + (r.rec_citation || '').replace(/"/g, '""') + '"',
        r.cc_effective || '',
        r.cc_verified || '',
        r.rec_verified || '',
      ];
      lines.push(cols.join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'coercive-control-law-' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function renderFedTable(bodyId, items) {
    const tbody = document.getElementById(bodyId);
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    if (!items || !items.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 5;
      td.className = 'table-empty';
      td.textContent = 'No entries.';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }
    items.forEach(item => {
      const tr = document.createElement('tr');

      const tdStat = document.createElement('td');
      const nameDiv = document.createElement('div');
      nameDiv.className = 'statute-name';
      nameDiv.textContent = item.statute || '';
      tdStat.appendChild(nameDiv);
      const citeDiv = document.createElement('div');
      citeDiv.className = 'statute-citation';
      citeDiv.textContent = item.citation || '';
      tdStat.appendChild(citeDiv);
      tr.appendChild(tdStat);

      const tdCite = document.createElement('td');
      const agDiv = document.createElement('div');
      agDiv.className = 'agency-label';
      agDiv.textContent = item.agency || '';
      tdCite.appendChild(agDiv);
      tr.appendChild(tdCite);

      const tdAgency = document.createElement('td');
      tdAgency.textContent = item.scope || '';
      tr.appendChild(tdAgency);

      const tdDl = document.createElement('td');
      const dlDiv = document.createElement('div');
      dlDiv.className = 'deadline-pill';
      dlDiv.textContent = item.filing_deadline_days ? item.filing_deadline_days + ' days' : '—';
      tdDl.appendChild(dlDiv);
      tr.appendChild(tdDl);

      const tdScope = document.createElement('td');
      tdScope.textContent = item.scope || '';
      tr.appendChild(tdScope);

      tbody.appendChild(tr);
    });
  }

  function renderTracker(allStates) {
    const grid = document.getElementById('tracker-grid');
    while (grid.firstChild) grid.removeChild(grid.firstChild);

    const bills = [];
    allStates.forEach(s => {
      (s.pending_legislation || []).forEach(bill => {
        bills.push({ state_abbr: s.abbr, state_name: s.name, ...bill });
      });
    });

    if (!bills.length) {
      const empty = document.createElement('div');
      empty.className = 'tracker-empty';
      empty.textContent = 'No pending legislation tracked in current data.';
      grid.appendChild(empty);
      return;
    }

    bills.sort((a, b) => new Date(b.last_action_date || 0) - new Date(a.last_action_date || 0));
    bills.forEach(bill => {
      const row = document.createElement('div');
      row.className = 'tracker-row';

      const info = document.createElement('div');

      const billNum = document.createElement('div');
      billNum.className = 'bill-num';
      billNum.textContent = bill.bill_number || '';
      info.appendChild(billNum);

      const stateName = document.createElement('div');
      stateName.className = 'bill-state-name';
      stateName.textContent = bill.state_name + ' (' + bill.state_abbr + ')';
      info.appendChild(stateName);

      const title = document.createElement('div');
      title.className = 'bill-title';
      title.textContent = bill.title || '';
      info.appendChild(title);

      const action = document.createElement('div');
      action.className = 'bill-action';
      action.textContent = bill.last_action || '';
      info.appendChild(action);

      const datecol = document.createElement('div');
      datecol.className = 'bill-date';
      datecol.textContent = bill.last_action_date || '';

      row.appendChild(info);
      row.appendChild(datecol);
      grid.appendChild(row);
    });
  }

  function renderSurveyResults(sr) {
    const statusEl = document.getElementById('survey-status-value');
    const noteEl = document.getElementById('survey-note-text');
    if (!sr) {
      statusEl.textContent = 'Survey data unavailable.';
      noteEl.textContent = '';
      return;
    }
    if (sr.published && sr.aggregate_url) {
      statusEl.textContent = 'Results published — N = ' + sr.n;
      noteEl.textContent = 'Aggregate results are available. Individual responses are anonymised and cannot be re-identified.';
    } else {
      statusEl.textContent = 'Not yet published';
      noteEl.textContent = sr.note || 'Results will be published once minimum sample size is reached. All submissions remain anonymous.';
    }
  }

  async function init() {
    try {
      appData = await fetch('/assets/js/dashboard/data.json').then(r => r.json());
      const defaultVerified = appData.meta && appData.meta.last_verified_default;
      tableRows = buildFlatRows(appData.states || [], defaultVerified);
      renderTable();
      const fed = appData.federal || {};
      renderFedTable('fed-workplace-body', fed.workplace || []);
      renderFedTable('fed-whistleblower-body', fed.whistleblower || []);
      renderTracker(appData.states || []);
      renderSurveyResults(appData.survey_results);
    } catch (err) {
      console.error('Policy init failed:', err);
      const tbody = document.getElementById('table-body');
      while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 7;
      td.className = 'table-empty';
      td.textContent = 'Failed to load data.';
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
  }

  init();
})();

function leaveNow() { window.location.replace('https://www.google.com'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') leaveNow(); });
