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
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// ── Mobile accordion ──────────────────────────────────────────────────────────
document.querySelectorAll('.nav-accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dropdown = btn.closest('.nav-dropdown');
    const open = dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});

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

// ── Cursor spotlight ──────────────────────────────────────────────────────────
// Sets --cx/--cy on :root; body::after in _base.scss renders the glow via CSS.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cx', e.clientX + 'px');
    document.documentElement.style.setProperty('--cy', e.clientY + 'px');
  }, { passive: true });
}

// ── Generic Carousel ──────────────────────────────────────────────────────────
// autoAdvance: true = 7s auto-cycle with pause-on-hover (used for testimonials)
function initCarousel(sectionId, autoAdvance) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const track   = section.querySelector('.carousel-track');
  if (!track) return;

  const slides  = Array.from(track.children);
  const dots    = Array.from(section.querySelectorAll('.carousel-dot'));
  const countEl = section.querySelector('.carousel-count');
  const total   = slides.length;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current   = 0;
  let timer     = null;

  function go(n) {
    current = ((n % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      const isActive = i === current;
      d.classList.toggle('active', isActive);
      d.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    if (countEl) countEl.textContent = `${current + 1} / ${total}`;
  }

  function startTimer() {
    if (!autoAdvance || reduced || total <= 1) return;
    clearInterval(timer);
    timer = setInterval(() => go(current + 1), 7000);
  }

  section.querySelector('.carousel-btn--prev')
    ?.addEventListener('click', () => { go(current - 1); startTimer(); });
  section.querySelector('.carousel-btn--next')
    ?.addEventListener('click', () => { go(current + 1); startTimer(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); startTimer(); }));

  if (autoAdvance) {
    section.addEventListener('mouseenter', () => clearInterval(timer));
    section.addEventListener('mouseleave', startTimer);
  }

  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { go(current + (dx < 0 ? 1 : -1)); startTimer(); }
  });

  go(0);
  startTimer();
}

// values section is now a static grid — no carousel init needed
initCarousel('testimonials', true);  // auto-advances every 7s

// ── Safety / Quick-exit ──────────────────────────────────────────────────────
// Redirects to a neutral page and attempts to purge session/local storage plus
// history state. Double-tap Escape also triggers this.
(function initSafetyExit() {
  const NEUTRAL_URL = 'https://www.google.com/search?q=weather+today';
  const btn = document.getElementById('safety-exit');

  function performExit(event) {
    if (event) event.preventDefault();
    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch (err) { /* storage may be blocked; ignore */ }
    // Replace current entry so Back doesn't return to this site.
    window.location.replace(NEUTRAL_URL);
  }

  if (btn) btn.addEventListener('click', performExit);

  // Double-tap Escape within 500ms triggers exit.
  let lastEsc = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const now = Date.now();
    if (now - lastEsc < 500) performExit();
    lastEsc = now;
  });
})();
