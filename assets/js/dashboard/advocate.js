(() => {
  'use strict';

  const STALE_MS = 365 * 24 * 60 * 60 * 1000;
  const TODAY = Date.now();

  const CC_COLORS = {
    criminal: '#52b788',
    civil:    '#d4895a',
    both:     '#e8c56a',
    pending:  '#5b9cf6',
    none:     '#2e3e52'
  };
  const REC_COLORS = {
    'one-party': '#c9a84c',
    'all-party': '#5b9cf6',
    'two-party': '#5b9cf6'
  };
  const CC_LEGEND_ITEMS = [
    { key: 'criminal', label: 'Criminal statute' },
    { key: 'civil',    label: 'Civil only' },
    { key: 'both',     label: 'Criminal + Civil' },
    { key: 'pending',  label: 'Pending legislation' },
    { key: 'none',     label: 'No statute' }
  ];
  const REC_LEGEND_ITEMS = [
    { key: 'one-party', label: 'One-party consent' },
    { key: 'all-party', label: 'All-party consent' }
  ];

  const FIPS = {
    '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT',
    '10':'DE','11':'DC','12':'FL','13':'GA','15':'HI','16':'ID','17':'IL',
    '18':'IN','19':'IA','20':'KS','21':'KY','22':'LA','23':'ME','24':'MD',
    '25':'MA','26':'MI','27':'MN','28':'MS','29':'MO','30':'MT','31':'NE',
    '32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY','37':'NC','38':'ND',
    '39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC','46':'SD',
    '47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV',
    '55':'WI','56':'WY'
  };

  const CC_STATUS_LABELS = {
    criminal: 'Criminal Statute',
    civil: 'Civil Provision Only',
    both: 'Criminal + Civil',
    pending: 'Pending Legislation',
    none: 'No Statute'
  };

  const TYPE_LABELS = {
    crisis: 'Crisis', legal: 'Legal', digital: 'Digital',
    advocacy: 'Advocacy', policy: 'Policy', whistleblower: 'Whistleblower'
  };

  let appData = null;
  let stateByAbbr = {};
  let currentLayer = 'cc';
  let allResources = [];

  function isStale(dateStr) {
    if (!dateStr) return false;
    return TODAY - new Date(dateStr).getTime() > STALE_MS;
  }

  function ccColor(state) {
    return CC_COLORS[(state.coercive_control || {}).status] || CC_COLORS.none;
  }

  function recColor(state) {
    const tier = (state.recording || {}).tier || 'one-party';
    return REC_COLORS[tier] || REC_COLORS['one-party'];
  }

  function renderLegend(layer) {
    const legendEl = document.getElementById('map-legend');
    while (legendEl.firstChild) legendEl.removeChild(legendEl.firstChild);
    const items = layer === 'cc' ? CC_LEGEND_ITEMS : REC_LEGEND_ITEMS;
    const colors = layer === 'cc' ? CC_COLORS : REC_COLORS;
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'legend-item';
      const swatch = document.createElement('span');
      swatch.className = 'legend-swatch';
      swatch.style.background = colors[item.key];
      div.appendChild(swatch);
      div.appendChild(document.createTextNode(item.label));
      legendEl.appendChild(div);
    });
  }

  window.setLayer = function(layer, btn) {
    currentLayer = layer;
    document.querySelectorAll('.toggle-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
    });
    d3.selectAll('.map-path').attr('fill', d => {
      const abbr = FIPS[String(d.id).padStart(2, '0')];
      const s = abbr && stateByAbbr[abbr];
      if (!s) return '#1a2b44';
      return layer === 'cc' ? ccColor(s) : recColor(s);
    });
    renderLegend(layer);
  };

  function buildSelect() {
    const sel = document.getElementById('state-select');
    [...appData.states]
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.abbr;
        opt.textContent = s.name;
        sel.appendChild(opt);
      });
  }

  window.selectState = function(abbr) {
    if (!abbr) return;
    d3.selectAll('.map-path').classed('selected', d => {
      return FIPS[String(d.id).padStart(2, '0')] === abbr;
    });
    showDetail(abbr);
  };

  function clearEl(id) {
    const el = document.getElementById(id);
    while (el && el.firstChild) el.removeChild(el.firstChild);
    return el;
  }

  function makeStaleBadge() {
    const span = document.createElement('span');
    span.className = 'stale-badge';
    span.textContent = '△ Data may be stale';
    return span;
  }

  function showDetail(abbr) {
    const s = stateByAbbr[abbr];
    if (!s) return;

    const panel = document.getElementById('detail-panel');
    panel.classList.add('visible');

    document.getElementById('detail-name').textContent = s.name;
    document.getElementById('detail-abbr').textContent = s.abbr;

    const rec = s.recording || {};
    const recStale = isStale(rec.last_verified || (appData.meta && appData.meta.last_verified_default));
    const recRow = clearEl('detail-rec-row');
    const tierText = (rec.tier || '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const tierSpan = document.createElement('span');
    tierSpan.className = 'detail-tier-text';
    tierSpan.textContent = tierText || '—';
    recRow.appendChild(tierSpan);
    if (recStale) recRow.appendChild(makeStaleBadge());

    document.getElementById('detail-rec-statute').textContent = rec.statute || '—';
    document.getElementById('detail-rec-practical').textContent = rec.practical || '';
    document.getElementById('detail-rec-interstate').textContent = rec.interstate_note || '';

    const cc = s.coercive_control || {};
    const ccStale = isStale(cc.last_verified || (appData.meta && appData.meta.last_verified_default));
    const ccRow = clearEl('detail-cc-row');
    const ccSpan = document.createElement('span');
    ccSpan.className = 'detail-tier-text';
    ccSpan.textContent = CC_STATUS_LABELS[cc.status] || cc.status || 'Unknown';
    ccRow.appendChild(ccSpan);
    if (ccStale) ccRow.appendChild(makeStaleBadge());

    document.getElementById('detail-cc-statute').textContent =
      cc.statute || (cc.status === 'none' ? 'Not codified' : '—');
    document.getElementById('detail-cc-scope').textContent = cc.scope_note || '';

    const pilotBlock = clearEl('detail-pilot-block');
    if (cc.pilot_expiry) {
      const div = document.createElement('div');
      div.className = 'pilot-warn-block';
      const exp = new Date(cc.pilot_expiry);
      div.textContent = '⚠ Pilot provision — expires ' +
        exp.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) +
        '. Verify renewal status.';
      pilotBlock.appendChild(div);
    }

    const pendingBlock = clearEl('detail-pending-block');
    const pending = (s.pending_legislation || [])[0];
    if (pending) {
      const div = document.createElement('div');
      div.className = 'pending-block';
      const label = document.createElement('div');
      label.className = 'pending-block-label';
      label.textContent = 'Pending Legislation';
      div.appendChild(label);
      const text = document.createElement('div');
      text.className = 'pending-block-text';
      text.textContent = pending.bill_number + (pending.title ? ' — ' + pending.title : '') +
        (pending.last_action ? '. Last action: ' + pending.last_action : '') +
        (pending.last_action_date ? ' (' + pending.last_action_date + ').' : '');
      div.appendChild(text);
      pendingBlock.appendChild(div);
    }

    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function makeTag(text, cls) {
    const span = document.createElement('span');
    span.className = 'badge' + (cls ? ' ' + cls : '');
    span.textContent = text;
    return span;
  }

  window.filterResources = function() {
    const typeVal = document.getElementById('filter-type').value;
    const popVal = document.getElementById('filter-pop').value;
    const filtered = allResources.filter(r => {
      if (typeVal && r.type !== typeVal) return false;
      if (popVal && !(r.populations || []).includes(popVal)) return false;
      return true;
    });

    const grid = document.getElementById('resource-grid');
    while (grid.firstChild) grid.removeChild(grid.firstChild);

    if (!filtered.length) {
      const msg = document.createElement('div');
      msg.className = 'resource-empty';
      msg.textContent = 'No resources match current filters.';
      grid.appendChild(msg);
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
      (r.languages || []).slice(0, 3).forEach(l => meta.appendChild(makeTag(l)));
      card.appendChild(meta);

      const contact = document.createElement('div');
      contact.className = 'resource-contact';
      if (r.phone) {
        const phone = document.createElement('div');
        phone.className = 'resource-phone';
        phone.textContent = r.phone + (r.text ? ' · ' + r.text : '');
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
      if (r.chat_url && r.chat_url !== r.url) {
        const chat = document.createElement('a');
        chat.className = 'resource-link';
        chat.href = r.chat_url;
        chat.target = '_blank';
        chat.rel = 'noopener noreferrer';
        chat.textContent = 'Online chat';
        contact.appendChild(chat);
      }
      card.appendChild(contact);
      grid.appendChild(card);
    });
  };

  function renderResources() {
    const verifiedEl = document.getElementById('resources-verified');
    const defaultDate = appData.meta && appData.meta.last_verified_default;
    if (defaultDate && verifiedEl) {
      verifiedEl.textContent = new Date(defaultDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    }
    filterResources();
  }

  async function init() {
    try {
      const [dataRes, topoRes] = await Promise.all([
        fetch('/assets/js/dashboard/data.json').then(r => r.json()),
        fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(r => r.json())
      ]);

      appData = dataRes;
      appData.states.forEach(s => { stateByAbbr[s.abbr] = s; });
      allResources = appData.resources_national || [];

      buildSelect();
      renderLegend('cc');
      renderResources();

      const tooltip = document.getElementById('map-tooltip');
      const svg = d3.select('#us-map');
      const projection = d3.geoAlbersUsa().scale(1280).translate([487.5, 305]);
      const path = d3.geoPath(projection);
      const stateFeatures = topojson.feature(topoRes, topoRes.objects.states);

      svg.selectAll('.map-path')
        .data(stateFeatures.features)
        .join('path')
        .attr('class', 'map-path')
        .attr('d', path)
        .attr('fill', d => {
          const abbr = FIPS[String(d.id).padStart(2, '0')];
          const s = abbr && stateByAbbr[abbr];
          return s ? ccColor(s) : '#1a2b44';
        })
        .on('mousemove', function(event, d) {
          const abbr = FIPS[String(d.id).padStart(2, '0')];
          const s = abbr && stateByAbbr[abbr];
          if (s) {
            const cc = s.coercive_control || {};
            const rec = s.recording || {};
            const tier = (rec.tier || '').replace(/-/g, ' ');
            tooltip.style.display = 'block';
            tooltip.style.left = (event.clientX + 12) + 'px';
            tooltip.style.top  = (event.clientY - 8) + 'px';
            tooltip.textContent = '';
            const abbrEl = document.createElement('strong');
            abbrEl.textContent = abbr;
            tooltip.appendChild(abbrEl);
            tooltip.appendChild(document.createElement('br'));
            tooltip.appendChild(document.createTextNode(tier + ' consent'));
            tooltip.appendChild(document.createElement('br'));
            tooltip.appendChild(document.createTextNode('CC: ' + (cc.status || 'none')));
          }
        })
        .on('mouseleave', () => { tooltip.style.display = 'none'; })
        .on('click', function(_event, d) {
          const abbr = FIPS[String(d.id).padStart(2, '0')];
          if (abbr) {
            document.getElementById('state-select').value = abbr;
            window.selectState(abbr);
          }
        });

      svg.append('path')
        .attr('class', 'map-borders')
        .attr('d', path(topojson.mesh(topoRes, topoRes.objects.states)));

    } catch (err) {
      console.error('Advocate init failed:', err);
    }
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.sidebar-link').forEach(l => {
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
