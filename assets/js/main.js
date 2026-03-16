/* main.js */

// ── Active nav link ───────────────────────────────────────────────────────────
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const path  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Mobile nav toggle ─────────────────────────────────────────────────────────
const toggle   = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── Scroll-triggered fade-in ──────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Cursor halo ───────────────────────────────────────────────────────────────
const canvas = document.getElementById('halo-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const haloEl = document.getElementById('cursor-halo');

  const cx       = 100;
  const cy       = 100;
  const r        = 76;
  const STEPS    = 360;
  const DURATION = 3;    // seconds per revolution
  const TAIL_DEG = 300;  // arc length in degrees
  const TIP_WIDTH = 6;   // max stroke width at tip
  const GLOW_BLUR = 8;   // shadowBlur at tip
  const LERP     = 0.08; // 0 = never follows, 1 = instant

  let velX = 0;
  let velY = 0;
  const FRICTION = 0.5
  
  const tailRad = (TAIL_DEG / 180) * Math.PI;

  let last   = null;
  let offset = 0;

  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;
  let haloX  = mouseX;
  let haloY  = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawHalo(ts) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000;
    last = ts;

    offset = (offset + (360 / DURATION) * dt) % 360;

    ctx.clearRect(0, 0, 200, 200);

    for (let i = 0; i < STEPS; i++) {
      const t          = i / STEPS;
      const angleBase  = offset * (Math.PI / 180);
      const startAngle = angleBase + (i / STEPS)       * tailRad;
      const endAngle   = angleBase + ((i + 1) / STEPS) * tailRad;

      const alpha     = Math.pow(t, 1.8);
      const lineWidth = 0.4 + (TIP_WIDTH - 0.4) * Math.pow(t, 1.4);

      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.strokeStyle = `rgba(201,168,76,${alpha.toFixed(3)})`;
      ctx.lineWidth   = lineWidth;
      ctx.shadowColor = `rgba(201,168,76,${(alpha * 0.8).toFixed(3)})`;
      ctx.shadowBlur  = GLOW_BLUR * alpha;
      ctx.stroke();
    }

  // Momentum-based lerp
  velX = velX * FRICTION + (mouseX - haloX) * LERP;
  velY = velY * FRICTION + (mouseY - haloY) * LERP;
  haloX += velX;
  haloY += velY;
  haloEl.style.transform = `translate(${haloX - 100}px, ${haloY - 100}px)`;  // ← missing

    requestAnimationFrame(drawHalo);
  }

  requestAnimationFrame(drawHalo);
}
