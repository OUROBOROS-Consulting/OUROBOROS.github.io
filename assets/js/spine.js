/*
 * Golden thread — the gold sinusoid running down the left rail and the right
 * TOC panel.
 *
 * A [data-spine] host gets one SVG wave threaded through the vertical centre of
 * every [data-spine-node] inside it, drawn as a single hairline whose gradient
 * is brightest at the panel's middle and fades out toward both ends (see TIERS
 * below). The wave crests once per node, so its
 * wavelength IS the entry spacing and nothing needs re-tuning when a row height
 * changes. Above the first node and below the last it keeps going at the same
 * period until it reaches the panel's edges, which is what makes it read as one
 * continuous thread down the side of the page rather than a bracket around a
 * list. The panels centre their node stack vertically, so those extrapolated
 * runs are roughly equal at top and bottom.
 *
 * Geometry comes from CSS custom properties on the host (--spine-cx, --spine-amp,
 * --spine-dir). They must be declared in PIXELS: getComputedStyle returns an
 * unregistered custom property as its specified token, not a resolved length,
 * so "0.7rem" would arrive here as the number 0.7.
 *
 * THE HOST MUST BE A POSITIONED ELEMENT. Both panels are position: fixed, which
 * makes them the offsetParent for their own rows and for the SVG. _spine.scss
 * deliberately does not set position: relative on [data-spine] — that would
 * clobber the fixed positioning.
 *
 * Load this with defer from <head>, ahead of toc.js: it must define
 * window.OuroSpine before toc.js finishes building the outline and calls
 * OuroSpine.draw(). It also listens for DOMContentLoaded unconditionally, so a
 * host that is still empty at first pass gets picked up on the second.
 */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  // Keeps the stroke's outer half inside the viewBox. Must stay above half the
  // widest .spine-wave stroke-width in _spine.scss.
  var STROKE_PAD = 4;
  var FALLBACK_STEP = 44; // period to use when a host has only one node
  var SEQ = 0; // gradient ids must be unique across the two panels on a page

  // ONE path. This was three stacked tiers (halo / core / base) back when
  // _spine.scss gave each its own width and opacity; that partial has since
  // collapsed to a single .spine-wave rule, at which point the three tiers
  // became three identical strokes painted on top of each other — triple weight
  // and compounded opacity, which is what made the thread read as a gold bar.
  // The one remaining tier keeps spread 0.5 so the gradient still falls off
  // toward both ends of the panel. Adding a tier back means giving it its own
  // stroke rule in _spine.scss first, or you are just re-tracing this line.
  var TIERS = [
    { cls: 'spine-wave', spread: 0.5 }
  ];

  // Five stops rather than three: a bare 0 → 1 → 0 ramp reads as a cone with a
  // visible kink at the peak, and the extra pair rounds it into a bell.
  var RAMP = [[-1, 0], [-0.55, 0.45], [0, 1], [0.55, 0.45], [1, 0]];

  function gradient(id, h, spread) {
    var g = document.createElementNS(NS, 'linearGradient');
    g.setAttribute('id', id);
    // userSpaceOnUse, not the default bounding box: the path runs past both ends
    // of the panel, so a bbox-relative ramp would centre on the path rather than
    // on the panel and the bright point would drift.
    g.setAttribute('gradientUnits', 'userSpaceOnUse');
    g.setAttribute('x1', '0');
    g.setAttribute('y1', '0');
    g.setAttribute('x2', '0');
    g.setAttribute('y2', h);

    RAMP.forEach(function (s) {
      var stop = document.createElementNS(NS, 'stop');
      stop.setAttribute('offset', Math.min(1, Math.max(0, 0.5 + s[0] * spread)));
      stop.setAttribute('stop-opacity', s[1]);
      g.appendChild(stop);
    });

    return g;
  }

  function num(value, fallback) {
    var n = parseFloat(value);
    return isNaN(n) ? fallback : n;
  }

  function draw(el) {
    var host = el && (el.hasAttribute('data-spine') ? el : el.closest('[data-spine]'));
    if (!host) return;

    var nodes = [].slice.call(host.querySelectorAll('[data-spine-node]'));
    var svg = host.querySelector('.spine');

    if (!nodes.length) {
      if (svg) svg.parentNode.removeChild(svg);
      return;
    }

    var style = window.getComputedStyle(host);
    var cx = num(style.getPropertyValue('--spine-cx'), 11);
    var amp = num(style.getPropertyValue('--spine-amp'), 6);
    var pointsRight = style.getPropertyValue('--spine-dir').trim() !== 'left';

    var w = cx + amp + STROKE_PAD;
    var axis = pointsRight ? cx : w - cx;
    var crestX = pointsRight ? axis + amp : axis - amp;
    var troughX = pointsRight ? axis - amp : axis + amp;

    // The thread spans the panel, not the list. scrollHeight rather than
    // clientHeight so a TOC long enough to scroll keeps its thread the whole way
    // down instead of stopping at the fold.
    var h = Math.max(host.scrollHeight, host.clientHeight);
    if (h <= 0) return;

    // Crest positions: one per node, then extrapolated outward at the local
    // period until the panel's top and bottom edges are covered.
    var crests = nodes.map(function (node) {
      return node.offsetTop + node.offsetHeight / 2;
    });

    var headStep = crests.length > 1 ? crests[1] - crests[0] : FALLBACK_STEP;
    var tailStep = crests.length > 1 ? crests[crests.length - 1] - crests[crests.length - 2] : FALLBACK_STEP;
    if (headStep <= 0) headStep = FALLBACK_STEP;
    if (tailStep <= 0) tailStep = FALLBACK_STEP;

    // One crest beyond each edge, so the half-wave that carries the thread off
    // the panel is complete and the clip happens mid-stroke, not at an endpoint.
    for (var y = crests[0] - headStep; y > -headStep; y -= headStep) crests.unshift(y);
    for (var z = crests[crests.length - 1] + tailStep; z < h + tailStep; z += tailStep) crests.push(z);

    // Alternate crest / trough. Troughs sit at the midpoint between neighbouring
    // crests, so an uneven run of rows stretches the wave rather than breaking it.
    var pts = [[troughX, crests[0] - headStep / 2]];
    crests.forEach(function (c, i) {
      pts.push([crestX, c]);
      var next = crests[i + 1];
      pts.push([troughX, next === undefined ? c + tailStep / 2 : (c + next) / 2]);
    });

    // Cubic handles halfway along each segment → vertical tangent at every crest
    // and trough, which is what makes it read as a sine and not a zigzag.
    var d = 'M ' + pts[0][0] + ' ' + pts[0][1];
    for (var k = 1; k < pts.length; k++) {
      var p0 = pts[k - 1];
      var p1 = pts[k];
      var half = (p1[1] - p0[1]) / 2;
      d += ' C ' + p0[0] + ' ' + (p0[1] + half) +
           ', ' + p1[0] + ' ' + (p1[1] - half) +
           ', ' + p1[0] + ' ' + p1[1];
    }

    if (!svg) {
      svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('class', 'spine');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      svg.appendChild(document.createElementNS(NS, 'defs'));
      TIERS.forEach(function (tier) {
        var p = document.createElementNS(NS, 'path');
        p.setAttribute('class', tier.cls);
        p.setAttribute('pathLength', '1'); // resolution-independent draw-in dash
        svg.appendChild(p);
      });
      host.insertBefore(svg, host.firstChild);
    }

    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.width = w + 'px';
    svg.style.height = h + 'px';

    // The ramps are keyed to the panel height, so they are rebuilt on every
    // draw — a resize or a re-rendered outline changes h and would otherwise
    // leave the bright point stranded where the panel used to end.
    var uid = host.dataset.spineId || (host.dataset.spineId = 'spine-g' + (++SEQ));
    var defs = svg.firstChild;
    var paths = svg.querySelectorAll('path');

    while (defs.firstChild) defs.removeChild(defs.firstChild);

    TIERS.forEach(function (tier, i) {
      var id = uid + '-' + i;
      defs.appendChild(gradient(id, h, tier.spread));
      paths[i].setAttribute('stroke', 'url(#' + id + ')');
      paths[i].setAttribute('d', d);
    });

    if (!host.dataset.spineDrawn) {
      host.dataset.spineDrawn = '1';
      svg.classList.add('is-drawing');
    }
  }

  function drawAll() {
    [].slice.call(document.querySelectorAll('[data-spine]')).forEach(draw);
  }

  window.OuroSpine = { draw: draw, drawAll: drawAll };

  // Unconditional. A deferred script runs at readyState "interactive", so a
  // branch that only listens while "loading" never registers at all — which is
  // exactly how the TOC thread went missing the first time.
  document.addEventListener('DOMContentLoaded', drawAll);
  if (document.readyState !== 'loading') drawAll();

  var pending;
  window.addEventListener('resize', function () {
    clearTimeout(pending);
    pending = setTimeout(drawAll, 150);
  }, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(drawAll);
  }
})();
