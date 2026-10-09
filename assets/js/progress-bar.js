(function () {
  const topBar = document.getElementById('progress-bar-top');
  const bottomBar = document.getElementById('progress-bar-bottom');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;

    topBar.style.width = progress + '%';
    bottomBar.style.width = progress + '%';
  });
})();
