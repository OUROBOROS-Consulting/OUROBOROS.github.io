/* playlist-carousel.js
   Drives all .playlist-carousel elements on a page.
   Iframes use data-src for lazy loading — only the active slide gets a real src.
*/

(function () {
  document.querySelectorAll('.playlist-carousel').forEach(function (carousel) {
    const track    = carousel.querySelector('.playlist-carousel-track');
    const slides   = Array.from(track.querySelectorAll('.playlist-carousel-slide'));
    const dots     = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const countEl  = carousel.querySelector('.playlist-carousel-count');
    const prevBtn  = carousel.querySelector('.playlist-btn--prev');
    const nextBtn  = carousel.querySelector('.playlist-btn--next');
    const total    = slides.length;
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current    = 0;

    // Load the iframe src for a given slide (lazy — only when shown)
    function loadSlide(index) {
      const iframe = slides[index].querySelector('iframe[data-src]');
      if (iframe && !iframe.src) {
        iframe.src = iframe.dataset.src;
      }
    }

    function go(n) {
      current = ((n % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
      if (countEl) countEl.textContent = (current + 1) + ' / ' + total;
      loadSlide(current);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
    });

    // Initialise first slide
    go(0);
  });
}());
