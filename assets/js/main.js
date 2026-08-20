/* main.js */

// ── Values card flip ──────────────────────────────────────────────────────────
// Each card's front and back are separate absolutely-positioned faces inside
// .values-card__inner, so a single nested <button> can't sit "on" both without
// its own layout rules. .values-card itself already carries role="button",
// tabindex="0" and aria-expanded (see _about/about.html) — this wires up
// click plus Enter/Space, and keeps aria-expanded in sync with the flip state.
document.querySelectorAll('.values-card').forEach(card => {
  function toggleFlip() {
    const isFlipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');
  }
  card.addEventListener('click', toggleFlip);
  card.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    e.preventDefault(); // stop Space from scrolling the page
    toggleFlip();
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
  // Set once the user hits the pause toggle below. Hover/focus leaving the
  // carousel must NOT override an explicit pause (WCAG 2.2.2).
  let userPaused = false;

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

  function stopTimer() {
    clearInterval(timer);
  }

  function startTimer() {
    if (!autoAdvance || reduced || total <= 1 || userPaused) return;
    clearInterval(timer);
    timer = setInterval(() => go(current + 1), 7000);
  }

  // ── Pause/Play toggle (WCAG 2.2.2) ───────────────────────────────────────
  // Reuses .carousel-btn for styling. Only rendered for autoplaying carousels
  // with more than one slide and no reduced-motion preference (nothing to
  // pause otherwise).
  if (autoAdvance && !reduced && total > 1) {
    const controls = section.querySelector('.carousel-controls');
    if (controls) {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'carousel-btn carousel-btn--toggle';
      controls.appendChild(toggleBtn);

      const syncToggle = () => {
        toggleBtn.innerHTML = userPaused
          ? '<i class="fas fa-play" aria-hidden="true"></i>'
          : '<i class="fas fa-pause" aria-hidden="true"></i>';
        toggleBtn.setAttribute('aria-label', userPaused ? 'Play testimonials' : 'Pause testimonials');
      };
      syncToggle();

      toggleBtn.addEventListener('click', () => {
        userPaused = !userPaused;
        if (userPaused) stopTimer(); else startTimer();
        syncToggle();
      });
    }
  }

  // Manual navigation means the user has taken over — stop rather than
  // restart, so paging back to re-read a slide doesn't get yanked forward
  // again a few seconds later.
  section.querySelector('.carousel-btn--prev')
    ?.addEventListener('click', () => { go(current - 1); stopTimer(); });
  section.querySelector('.carousel-btn--next')
    ?.addEventListener('click', () => { go(current + 1); stopTimer(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); startTimer(); }));

  if (autoAdvance) {
    section.addEventListener('mouseenter', stopTimer);
    section.addEventListener('mouseleave', startTimer);
    // Keyboard and touch users need the same pause affordance as hover
    section.addEventListener('focusin', stopTimer);
    section.addEventListener('focusout', startTimer);
    track.addEventListener('touchstart', stopTimer, { passive: true });
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

// ── Nav search — makes the icon openable without a hover ─────────────────────
// The input is width:0 until :hover or :focus-within fires. A touch screen has
// neither before the first tap, and a zero-width input has no tap target, so
// the submit button was the only reachable control: tapping it submitted an
// empty query. This intercepts that submit, opens the input and focuses it.
// Desktop hover still works on its own; .is-open just keeps it open once the
// pointer leaves.
(function initNavSearch() {
  const wrap  = document.getElementById('nav-search-wrap');
  if (!wrap) return;
  const input = wrap.querySelector('.nav-search__input');

  function open() {
    wrap.classList.add('is-open');
    input.focus();
  }

  wrap.addEventListener('submit', (e) => {
    if (input.value.trim()) return;   // real query — let the form navigate
    e.preventDefault();
    open();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      wrap.classList.remove('is-open');
      input.blur();
    }
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target) && !input.value.trim()) {
      wrap.classList.remove('is-open');
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
