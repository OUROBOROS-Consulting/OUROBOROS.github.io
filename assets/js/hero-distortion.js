// ── Hero Image Distortion Effect ─────────────────────────────────────────────
// Mouse-tracking distortion applied to hero images for subtle visual interest

document.addEventListener('DOMContentLoaded', function() {
  const heroImages = document.querySelectorAll('.c-hero__image img:not([src*="data:"])');
  
  heroImages.forEach(img => {
    // Store original transform
    let originalTransform = '';
    let distortionAmount = 0.03;
    let mouseX = 0;
    let mouseY = 0;
    
    // Mouse tracking
    img.closest('.c-hero__image').addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalize position (0-1)
      mouseX = x / rect.width;
      mouseY = y / rect.height;
    });
    
    // Animation loop
    function animate() {
      if (!img.isConnected) return;
      
      // Calculate distortion based on mouse position
      const distX = (mouseX - 0.5) * distortionAmount * 50;
      const distY = (mouseY - 0.5) * distortionAmount * 50;
      
      // Apply transform with scale for distortion
      const scale = 1.05 + (Math.abs(mouseX - 0.5) * 0.03);
      
      img.style.transform = `scale(${scale}) translate(${distX}px, ${distY}px)`;
      
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Reset on mouse leave
    img.closest('.c-hero__image').addEventListener('mouseleave', () => {
      img.style.transform = 'none';
    });
  });
});
