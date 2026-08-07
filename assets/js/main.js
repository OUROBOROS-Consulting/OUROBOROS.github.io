/* main.js */

// ── Values card flip (touch devices) ─────────────────────────────────────────
document.querySelectorAll('.values-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('is-flipped'));
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
    // Keyboard and touch users need the same pause affordance as hover
    section.addEventListener('focusin', () => clearInterval(timer));
    section.addEventListener('focusout', startTimer);
    track.addEventListener('touchstart', () => clearInterval(timer), { passive: true });
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

// ── Mobile hamburger — opens the page-links list beneath the bar ──────────────
// The contact/announcements rail is a permanent fixed strip, not a drawer,
// so it isn't part of this toggle.
(function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.getElementById('primary-nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.querySelector('i').className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('i').className = 'fas fa-bars';
    }
  });
})();

// ── Mobile nav accordion — chevron toggles a dropdown's children in place ─────
// Desktop reveals children on hover/focus-within (CSS only); this only fires
// via the accordion button, which the design package hides above 768px.
(function initNavAccordion() {
  document.querySelectorAll('.nav-accordion-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.closest('.nav-dropdown');
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
})();

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

// ── Theme toggle ───────────────────────────────────────────────────────────
// Persists an explicit choice in localStorage under 'ouroboros-theme'. No
// stored value = follow the OS preference, handled purely in CSS. The
// blocking inline script in <head> already applied any stored choice before
// this file loaded, so this only wires the button and keeps its icon/label
// in sync.
(function initThemeToggle() {
  const STORAGE_KEY = 'ouroboros-theme';
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const icon = btn.querySelector('i');
  const label = btn.querySelector('.rail-tx');

  function currentTheme() {
    const stored = document.documentElement.getAttribute('data-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyIcon(theme) {
    if (icon) {
      icon.classList.toggle('fa-moon', theme === 'dark');
      icon.classList.toggle('fa-sun', theme === 'light');
    }
    if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    btn.setAttribute('aria-label', theme === 'dark'
      ? 'Dark theme. Activate to switch to light theme.'
      : 'Light theme. Activate to switch to dark theme.');
  }

  applyIcon(currentTheme());

  btn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (err) { /* storage may be blocked; theme still applies for this page load */ }
    applyIcon(next);
  });
})();
