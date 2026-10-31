const hero = document.getElementById('hero');
const displacementMap = document.getElementById('displacement-map');

let targetX = 0.5;
let targetY = 0.5;
let currentX = 0.5;
let currentY = 0.5;
const easeFactor = 0.06;

window.addEventListener('mousemove', (e) => {
  targetX = e.clientX / window.innerWidth;
  targetY = e.clientY / window.innerHeight;
});

function updateParallaxLoop() {
  currentX += (targetX - currentX) * easeFactor;
  currentY += (targetY - currentY) * easeFactor;

  // Update the background positions only
  document.documentElement.style.setProperty('--mouse-x', currentX);
  document.documentElement.style.setProperty('--mouse-y', currentY);

  // Mutate the underlayer texture grid coordinates smoothly
  const velocityX = Math.abs(targetX - currentX);
  const velocityY = Math.abs(targetY - currentY);
  const dynamicScale = 110 + (velocityX + velocityY) * 150;
  displacementMap.setAttribute('scale', dynamicScale);

  requestAnimationFrame(updateParallaxLoop);
}

requestAnimationFrame(updateParallaxLoop);
