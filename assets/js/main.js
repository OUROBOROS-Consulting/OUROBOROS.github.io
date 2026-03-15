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

(function () {
  const halo = document.createElement('div');
  halo.id = 'cursor-halo';

  halo.innerHTML = `
    <svg class="ouroboros-svg"
         viewBox="0 0 200 200"
         xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true">

      <defs>
        <!-- Head-to-tail gradient: bright gold head fades to near-invisible tail -->
        <linearGradient id="snakeGrad"
                        gradientUnits="userSpaceOnUse"
                        x1="100" y1="28"
                        x2="100" y2="172">
          <stop offset="0%"   stop-color="#c9a84c" stop-opacity="0.95"/>
          <stop offset="35%"  stop-color="#c9a84c" stop-opacity="0.45"/>
          <stop offset="75%"  stop-color="#c9a84c" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#c9a84c" stop-opacity="0.02"/>
        </linearGradient>

        <!-- Scale pattern: subtle diamond hatching along the body -->
        <pattern id="scalePattern"
                 patternUnits="userSpaceOnUse"
                 width="8" height="8"
                 patternTransform="rotate(45)">
          <rect width="4" height="4"
                fill="rgba(201,168,76,0.08)"/>
        </pattern>

        <!-- Mask so scales only appear on the snake stroke -->
        <mask id="snakeMask">
          <circle cx="100" cy="100" r="72"
                  fill="none"
                  stroke="white"
                  stroke-width="7"
                  stroke-dasharray="422 30"
                  stroke-linecap="round"/>
        </mask>
      </defs>

      <!-- Scale texture layer (masked to snake shape) -->
      <rect width="200" height="200"
            fill="url(#scalePattern)"
            mask="url(#snakeMask)"
            opacity="0.6"/>

      <!-- Main snake body -->
      <circle cx="100" cy="100" r="72"
              fill="none"
              stroke="url(#snakeGrad)"
              stroke-width="5"
              stroke-linecap="round"
              stroke-dasharray="422 30"/>

      <!-- Head dot — sits at the top of the circle (12 o'clock) -->
      <circle cx="100" cy="28"
              r="4"
              fill="#c9a84c"
              opacity="0.9"/>

      <!-- Eye — small dark dot on the head -->
      <circle cx="100" cy="26"
              r="1.2"
              fill="#0d0d0d"/>

    </svg>`;

  document.body.appendChild(halo);

  // ── Smooth lag follow ───────────────────────────────────────────────────────
  let mouseX = 0, mouseY = 0;
  let haloX  = 0, haloY  = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hide until the mouse enters the page so it doesn't sit at 0,0 on load
  halo.style.opacity = '0';
  window.addEventListener('mousemove', function show() {
    halo.style.opacity    = '1';
    halo.style.transition = 'opacity 0.4s ease';
    window.removeEventListener('mousemove', show);
  }, { once: true });

  (function animate() {
    haloX += (mouseX - haloX) * 0.07;  // 0.07 = gentle lag
    haloY += (mouseY - haloY) * 0.07;
    halo.style.transform = `translate(${haloX}px, ${haloY}px)`;
    requestAnimationFrame(animate);
  })();
})();
