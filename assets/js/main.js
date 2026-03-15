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
const halo = document.createElement('div');
halo.id = 'cursor-halo';
document.body.appendChild(halo);

let mouseX = 0, mouseY = 0;
let haloX  = 0, haloY  = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

(function animate() {
  haloX += (mouseX - haloX) * 0.08;
  haloY += (mouseY - haloY) * 0.08;
  halo.style.transform = `translate(${haloX}px, ${haloY}px)`;
  requestAnimationFrame(animate);
})();
