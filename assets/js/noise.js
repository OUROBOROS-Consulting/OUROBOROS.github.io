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

const backgroundMorph = document.querySelector('.c-background-morph');
const backgroundDisplacementMap = document.getElementById('background-displacement-map');

if (backgroundMorph && backgroundDisplacementMap && !prefersReducedMotion.matches) {
  const restingDisplacement = 34;
  let targetX = 0.5;
  let targetY = 0.5;
  let currentX = targetX;
  let currentY = targetY;
  let trailX = targetX;
  let trailY = targetY;
  let targetDisplacement = restingDisplacement;
  let currentDisplacement = restingDisplacement;
  let animationFrame = 0;

  function animateBackgroundMorph() {
    currentX += (targetX - currentX) * 0.012;
    currentY += (targetY - currentY) * 0.012;
    trailX += (targetX - trailX) * 0.004;
    trailY += (targetY - trailY) * 0.004;
    targetDisplacement += (restingDisplacement - targetDisplacement) * 0.025;
    currentDisplacement += (targetDisplacement - currentDisplacement) * 0.035;

    backgroundMorph.style.setProperty('--background-pointer-x', `${(currentX * 100).toFixed(2)}%`);
    backgroundMorph.style.setProperty('--background-pointer-y', `${(currentY * 100).toFixed(2)}%`);
    backgroundMorph.style.setProperty('--background-trail-x', `${(trailX * 100).toFixed(2)}%`);
    backgroundMorph.style.setProperty('--background-trail-y', `${(trailY * 100).toFixed(2)}%`);
    backgroundDisplacementMap.setAttribute('scale', currentDisplacement.toFixed(1));

    if (
      Math.abs(targetX - currentX) > 0.001 ||
      Math.abs(targetY - currentY) > 0.001 ||
      Math.abs(targetX - trailX) > 0.001 ||
      Math.abs(targetY - trailY) > 0.001 ||
      Math.abs(targetDisplacement - currentDisplacement) > 0.1
    ) {
      animationFrame = requestAnimationFrame(animateBackgroundMorph);
    } else {
      animationFrame = 0;
    }
  }

  function scheduleBackgroundMorph() {
    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animateBackgroundMorph);
    }
  }

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    targetX = event.clientX / window.innerWidth;
    targetY = event.clientY / window.innerHeight;
    const movement = Math.hypot(event.movementX, event.movementY);
    targetDisplacement = Math.min(restingDisplacement + 12, restingDisplacement + movement * 0.06);
    scheduleBackgroundMorph();
  });

  window.addEventListener('pointerleave', () => {
    targetX = 0.5;
    targetY = 0.5;
    targetDisplacement = restingDisplacement;
    scheduleBackgroundMorph();
  });
}
