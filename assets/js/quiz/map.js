// Public API — stable interface for v1 (CSS) and v2 (D3) swap
let _abortCtrl;

export function init(topics, onSelect) {
  const container = document.getElementById('quiz-map');
  const SIZE      = 300;
  const CENTER    = SIZE / 2;
  const RADIUS    = 108;
  const SUB_D     = 65;

  if (_abortCtrl) _abortCtrl.abort();
  _abortCtrl = new AbortController();
  const { signal } = _abortCtrl;

  container.innerHTML = '';
  const dial = document.createElement('div');
  dial.className = 'map-dial';

  // SVG layer: dashed ring + connector lines
  const ns  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', SIZE);
  svg.setAttribute('height', SIZE);
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('map-svg');

  // Decorative dashed outer ring
  const ring = document.createElementNS(ns, 'circle');
  ring.setAttribute('cx', CENTER);
  ring.setAttribute('cy', CENTER);
  ring.setAttribute('r', RADIUS + 16);
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', 'var(--surface-3)');
  ring.setAttribute('stroke-width', '1');
  ring.setAttribute('stroke-dasharray', '3 7');
  svg.appendChild(ring);

  // One connector line per topic — store angle for subnode positioning
  const connectors = {};
  topics.forEach((topic, i) => {
    const angle = (i / topics.length) * 2 * Math.PI - Math.PI / 2;
    const x     = CENTER + RADIUS * Math.cos(angle);
    const y     = CENTER + RADIUS * Math.sin(angle);
    const line  = document.createElementNS(ns, 'line');
    line.setAttribute('x1', CENTER); line.setAttribute('y1', CENTER);
    line.setAttribute('x2', x);      line.setAttribute('y2', y);
    line.setAttribute('stroke', 'var(--line-3)');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-opacity', '0.6');
    line.dataset.id = topic.id;
    svg.appendChild(line);
    connectors[topic.id] = { line, x, y, angle };
  });

  dial.appendChild(svg);

  // Center hub
  const hub = document.createElement('div');
  hub.className = 'map-hub';
  hub.setAttribute('aria-hidden', 'true');
  hub.style.cssText = `left:${CENTER}px;top:${CENTER}px;`;
  const hubLabel = document.createElement('span');
  hubLabel.className = 'map-hub__label';
  hubLabel.textContent = 'Know the Tactics';
  hub.appendChild(hubLabel);
  dial.appendChild(hub);

  // Subnode state
  let activeTopicId = null;
  let activeSubnodes = []; // { btn, sline }

  function deactivateTopic() {
    if (!activeTopicId) return;
    const prev = activeTopicId;
    activeTopicId = null;

    activeSubnodes.forEach(({ btn, sline }) => {
      btn.classList.remove('map-subnode--visible');
      setTimeout(() => { btn.remove(); sline.remove(); }, 300);
    });
    activeSubnodes = [];

    const prevNode = nodeEls[prev];
    if (prevNode) prevNode.classList.remove('map-node--selected');

    const subrow = mobileGrid.querySelector('.map-mobile-subrow');
    if (subrow) subrow.remove();
    const mobileNode = nodeEls['mobile_' + prev];
    if (mobileNode) mobileNode.classList.remove('map-mobile-node--active');
  }

  function activateTopic(topic) {
    deactivateTopic();
    activeTopicId = topic.id;

    const { x, y, angle } = connectors[topic.id];
    const subs = topic.submodules || [];
    const offsets = [-30, 0, 30].slice(0, subs.length).map(d => d * Math.PI / 180);

    subs.forEach((sub, idx) => {
      const theta = angle + offsets[idx];
      const sx = x + SUB_D * Math.cos(theta);
      const sy = y + SUB_D * Math.sin(theta);

      const sline = document.createElementNS(ns, 'line');
      sline.setAttribute('x1', x);  sline.setAttribute('y1', y);
      sline.setAttribute('x2', sx); sline.setAttribute('y2', sy);
      sline.setAttribute('stroke', `var(${topic.color})`);
      sline.setAttribute('stroke-width', '1');
      sline.setAttribute('stroke-opacity', '0.5');
      svg.appendChild(sline);

      const btn = document.createElement('button');
      btn.className = 'map-subnode';
      btn.dataset.topicId = topic.id;
      btn.dataset.subId   = sub.id;
      btn.style.cssText   = `left:${sx}px;top:${sy}px;--node-color:var(${topic.color});`;
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', `${sub.label}: ${topic.label}`);

      const lbl = document.createElement('span');
      lbl.className = 'map-subnode__label';
      lbl.textContent = sub.label;
      btn.appendChild(lbl);

      btn.addEventListener('click', () => onSelect(topic.id, sub.id));
      dial.appendChild(btn);
      requestAnimationFrame(() => btn.classList.add('map-subnode--visible'));

      activeSubnodes.push({ btn, sline });
    });

    nodeEls[topic.id].classList.add('map-node--selected');
  }

  function showMobileSubrow(topic) {
    const existing = mobileGrid.querySelector('.map-mobile-subrow');
    if (existing) existing.remove();

    const row = document.createElement('div');
    row.className = 'map-mobile-subrow';

    (topic.submodules || []).forEach(sub => {
      const btn = document.createElement('button');
      btn.className = 'map-mobile-subnode';
      btn.style.setProperty('--node-color', `var(${topic.color})`);
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-label', `${sub.label}: ${topic.label}`);
      const lbl = document.createElement('span');
      lbl.textContent = sub.label;
      btn.appendChild(lbl);
      btn.addEventListener('click', () => onSelect(topic.id, sub.id));
      row.appendChild(btn);
    });

    const tapNode = mobileGrid.querySelector(`[data-id="${topic.id}"]`);
    tapNode.insertAdjacentElement('afterend', row);
    nodeEls['mobile_' + topic.id].classList.add('map-mobile-node--active');
  }

  // Topic nodes
  const nodeEls = {};
  topics.forEach((topic, i) => {
    const angle = (i / topics.length) * 2 * Math.PI - Math.PI / 2;
    const x     = CENTER + RADIUS * Math.cos(angle);
    const y     = CENTER + RADIUS * Math.sin(angle);

    const node = document.createElement('button');
    node.className = 'map-node';
    node.dataset.id = topic.id;
    node.style.cssText  = `left:${x}px;top:${y}px;--node-color:var(${topic.color});`;
    node.setAttribute('aria-label', `Select topic: ${topic.label}`);
    node.setAttribute('type', 'button');

    const label = document.createElement('span');
    label.className = 'map-node__label';
    label.textContent = topic.label;
    node.appendChild(label);

    node.addEventListener('click', () => {
      if (activeTopicId === topic.id) {
        deactivateTopic();
      } else {
        activateTopic(topic);
      }
    });
    dial.appendChild(node);
    nodeEls[topic.id] = node;
  });

  container.appendChild(dial);

  // Mobile fallback: 2x3 grid in addition to radial dial
  const mobileGrid = document.createElement('div');
  mobileGrid.className = 'map-mobile-grid';
  topics.forEach(topic => {
    const btn = document.createElement('button');
    btn.className = 'map-mobile-node';
    btn.dataset.id = topic.id;
    btn.style.setProperty('--node-color', `var(${topic.color})`);
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', `Select topic: ${topic.label}`);
    const label = document.createElement('span');
    label.textContent = topic.label;
    btn.appendChild(label);
    btn.addEventListener('click', () => {
      if (activeTopicId === topic.id) {
        deactivateTopic();
      } else {
        activateTopic(topic);
        showMobileSubrow(topic);
      }
    });
    mobileGrid.appendChild(btn);
    nodeEls['mobile_' + topic.id] = btn;
  });
  container.appendChild(mobileGrid);

  // Hover: dim others, brighten connector, update hub label
  container.addEventListener('mouseover', e => {
    if (activeTopicId) return;
    const node = e.target.closest('.map-node');
    if (!node) return;
    const id    = node.dataset.id;
    const topic = topics.find(t => t.id === id);

    Object.entries(nodeEls).forEach(([tid, el]) => {
      if (tid.startsWith('mobile_')) return;
      el.classList.toggle('map-node--dimmed', tid !== id);
    });
    Object.entries(connectors).forEach(([tid, { line }]) => {
      if (tid === id) {
        line.setAttribute('stroke', `var(${topic.color})`);
        line.setAttribute('stroke-opacity', '1');
        line.setAttribute('stroke-width', '1.5');
      } else {
        line.setAttribute('stroke', 'var(--line-3)');
        line.setAttribute('stroke-opacity', '0.2');
        line.setAttribute('stroke-width', '1');
      }
    });
    hubLabel.textContent = topic.label;
  }, { signal });

  container.addEventListener('mouseleave', () => {
    if (activeTopicId) return;
    Object.entries(nodeEls).forEach(([tid, el]) => {
      if (tid.startsWith('mobile_')) return;
      el.classList.remove('map-node--dimmed');
    });
    Object.values(connectors).forEach(({ line }) => {
      if (line.classList.contains('map-connector--completed')) {
        line.setAttribute('stroke', 'var(--sage)');
        line.setAttribute('stroke-opacity', '1');
      } else {
        line.setAttribute('stroke', 'var(--line-3)');
        line.setAttribute('stroke-opacity', '0.6');
      }
      line.setAttribute('stroke-width', '1');
    });
    hubLabel.textContent = 'Know the Tactics';
  }, { signal });

  return {
    markCompleted(topicId) {
      const node = nodeEls[topicId];
      if (node) node.classList.add('map-node--completed');
      const mobileNode = nodeEls['mobile_' + topicId];
      if (mobileNode) mobileNode.classList.add('map-mobile-node--completed');
      const c = connectors[topicId];
      if (c) {
        c.line.classList.add('map-connector--completed');
        c.line.setAttribute('stroke', 'var(--sage)');
        c.line.setAttribute('stroke-opacity', '1');
      }
    },
    collapse() {},
    expand() { deactivateTopic(); }
  };
}
