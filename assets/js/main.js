/* main.js */

// ── Active nav link ──────────────────────────────────────
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

// ── Mobile nav toggle ────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Scroll-triggered fade-in ─────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── HALO ─────────────────────────────
// ── Ouroboros cursor halo ─────────────────────────────────────────────────────
// Circumference of the snake ring: 2π × 72 ≈ 452px.
// stroke-dasharray="422 30" draws 422px of snake with a 30px mouth gap.
// The linearGradient fades from a bright head (top) to a dim tail (bottom),
// which combines with the conic-gradient ::after for the travelling glow.

const canvas  = document.getElementById('halo-canvas');
const ctx     = canvas.getContext('2d');
const cx = 100, cy = 100, r = 76;
const STEPS   = 360;
const DURATION = 3;     // seconds per revolution — adjust to taste
const TAIL_DEG = 300;   // arc length in degrees
const TIP_WIDTH = 6;    // max stroke width at the bright tip
const GLOW_BLUR = 8;    // canvas shadowBlur at tip

const tailRad = (TAIL_DEG / 180) * Math.PI;
let last = null;
let offset = 0;

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

  requestAnimationFrame(drawHalo);
}

// Cursor tracking (keep your existing logic)
document.addEventListener('mousemove', (e) => {
  const halo = document.getElementById('cursor-halo');
  halo.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

requestAnimationFrame(drawHalo);
