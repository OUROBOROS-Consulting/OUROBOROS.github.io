const displacementMap = document.getElementById('hero-displacement-map');
const heroArtwork = document.querySelectorAll('.c-page-hero__art');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (displacementMap && heroArtwork.length && !prefersReducedMotion.matches) {
  const maxDisplacement = 48;
  let targetScale = 0;
  let currentScale = 0;
  let animationFrame = 0;

  function animateDisplacement() {
    targetScale *= 0.95;
    currentScale += (targetScale - currentScale) * 0.42;
    displacementMap.setAttribute('scale', currentScale.toFixed(1));

    if (targetScale > 0.1 || currentScale > 0.1) {
      animationFrame = requestAnimationFrame(animateDisplacement);
    } else {
      displacementMap.setAttribute('scale', '0');
      animationFrame = 0;
    }
  }

  function scheduleDisplacement() {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animateDisplacement);
    }
  }

  heroArtwork.forEach((artwork) => {
    artwork.addEventListener('pointerenter', () => {
      targetScale = maxDisplacement;
      scheduleDisplacement();
    });

    artwork.addEventListener('pointermove', (event) => {
      const movement = Math.hypot(event.movementX, event.movementY);
      targetScale = Math.min(maxDisplacement, targetScale + movement * 2);
      scheduleDisplacement();
    });
  });
}
