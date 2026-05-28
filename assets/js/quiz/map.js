// Public API — stable interface for v1 (CSS) and v2 (D3) swap
let _abortCtrl;

export function init(topics, onSelect) {
  const container = document.getElementById('quiz-map');
  const SIZE      = 300;
  const CENTER    = SIZE / 2;
  const RADIUS    = 108;

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
  ring.setAttribute('stroke', 'var(--bg3)');
  ring.setAttribute('stroke-width', '1');
  ring.setAttribute('stroke-dasharray', '3 7');
  svg.appendChild(ring);

  // One connector line per topic
  const connectors = {};
  topics.forEach((topic, i) => {
    const angle = (i / topics.length) * 2 * Math.PI - Math.PI / 2;
    const x     = CENTER + RADIUS * Math.cos(angle);
    const y     = CENTER + RADIUS * Math.sin(angle);
    const line  = document.createElementNS(ns, 'line');
    line.setAttribute('x1', CENTER); line.setAttribute('y1', CENTER);
    line.setAttribute('x2', x);      line.setAttribute('y2', y);
    line.setAttribute('stroke', 'var(--border)');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-opacity', '0.6');
    line.dataset.id = topic.id;
    svg.appendChild(line);
    connectors[topic.id] = { line, x, y };
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
    node.setAttribute('aria-label', `Start quiz: ${topic.label}`);
    node.setAttribute('type', 'button');

    const label = document.createElement('span');
    label.className = 'map-node__label';
    label.textContent = topic.label;
    node.appendChild(label);

    node.addEventListener('click', () => onSelect(topic.id));
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
    btn.setAttribute('aria-label', `Start quiz: ${topic.label}`);
    const label = document.createElement('span');
    label.textContent = topic.label;
    btn.appendChild(label);
    btn.addEventListener('click', () => onSelect(topic.id));
    mobileGrid.appendChild(btn);
    nodeEls['mobile_' + topic.id] = btn;
  });
  container.appendChild(mobileGrid);

  // Hover: dim others, brighten connector, update hub label
  container.addEventListener('mouseover', e => {
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
        line.setAttribute('stroke', 'var(--border)');
        line.setAttribute('stroke-opacity', '0.2');
        line.setAttribute('stroke-width', '1');
      }
    });
    hubLabel.textContent = topic.label;
  }, { signal });

  container.addEventListener('mouseleave', () => {
    Object.entries(nodeEls).forEach(([tid, el]) => {
      if (tid.startsWith('mobile_')) return;
      el.classList.remove('map-node--dimmed');
    });
    Object.values(connectors).forEach(({ line }) => {
      line.setAttribute('stroke', 'var(--border)');
      line.setAttribute('stroke-opacity', '0.6');
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
    expand() {}
  };
}
