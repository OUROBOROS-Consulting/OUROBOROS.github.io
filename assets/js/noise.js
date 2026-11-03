const displacementMap = document.getElementById('hero-displacement-map');
const heroArtwork = document.querySelectorAll('.c-page-hero__icon, .c-page-hero__logo');
const glitchNoise = document.getElementById('hero-glitch-noise');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (displacementMap && glitchNoise && heroArtwork.length && !prefersReducedMotion.matches) {
  let glitchUntil = 0;
  let nextBurstAt = 0;
  let animationFrame = 0;
  let isGlitching = false;

  function animateGlitch(now) {
    if (now >= glitchUntil) {
      displacementMap.setAttribute('scale', '0');
      glitchNoise.setAttribute('baseFrequency', '0.02 0.55');
      animationFrame = 0;
      isGlitching = false;
      return;
    }

    if (now >= nextBurstAt) {
      const burst = Math.random() > 0.28;
      displacementMap.setAttribute('scale', burst ? String(18 + Math.round(Math.random() * 18)) : '0');
      glitchNoise.setAttribute(
        'baseFrequency',
        burst
          ? `${(0.08 + Math.random() * 0.1).toFixed(2)} ${(0.45 + Math.random() * 0.45).toFixed(2)}`
          : '0.02 0.55'
      );
      nextBurstAt = now + 18 + Math.random() * 42;
    }

    animationFrame = requestAnimationFrame(animateGlitch);
  }

  function triggerGlitch() {
    glitchUntil = performance.now() + 680;
    if (!isGlitching) {
      isGlitching = true;
      nextBurstAt = 0;
      animationFrame = requestAnimationFrame(animateGlitch);
    }
  }

  heroArtwork.forEach((artwork) => {
    artwork.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      triggerGlitch();
    });

    artwork.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      if (Math.hypot(event.movementX, event.movementY) > 1) triggerGlitch();
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
