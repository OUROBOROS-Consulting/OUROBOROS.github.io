(function () {
  const topBar = document.getElementById('progress-bar-top');
  const bottomBar = document.getElementById('progress-bar-bottom');
  const leftBar = document.getElementById('progress-bar-left');
  const rightBar = document.getElementById('progress-bar-right');
  if (!topBar || !bottomBar || !leftBar || !rightBar) return;

  const updateProgress = () => {
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0
      ? Math.min(Math.max((scrolled / totalHeight) * 100, 0), 100)
      : 0;

    const progressScale = String(progress / 100);
    topBar.style.setProperty('--progress-scale', progressScale);
    bottomBar.style.setProperty('--progress-scale', progressScale);
    leftBar.style.setProperty('--progress-scale', progressScale);
    rightBar.style.setProperty('--progress-scale', progressScale);
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
