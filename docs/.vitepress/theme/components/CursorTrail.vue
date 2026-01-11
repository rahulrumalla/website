<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isTouchDevice = ref(false);
const isEnabled = ref(true);

onMounted(() => {
  // Check if device is touch-enabled or mobile
  isTouchDevice.value = ('ontouchstart' in window) ||
                        (navigator.maxTouchPoints > 0) ||
                        window.innerWidth <= 960;

  if (isTouchDevice.value) {
    return; // Don't initialize cursor effect on touch devices
  }

  // Load initial preference from localStorage
  const saved = localStorage.getItem('cursor-trail-enabled');
  if (saved !== null) {
    isEnabled.value = saved === 'true';
  }

  const canvas = document.getElementById('cursor-trail');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 15;
  const colors = ['#d97a52', '#e48f5c', '#c46843', '#f4a261'];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 2;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.life = 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 0.02;
      this.size *= 0.97;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  let mouseX = 0;
  let mouseY = 0;
  let animationId = null;

  const handleMouseMove = (e) => {
    if (!isEnabled.value) return;

    mouseX = e.clientX;
    mouseY = e.clientY;

    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(mouseX, mouseY));
    }

    if (particles.length > particleCount * 10) {
      particles.splice(0, particleCount);
    }
  };

  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isEnabled.value) {
      // Draw particles (trail)
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Draw custom cursor dot at mouse position
      if (mouseX > 0 || mouseY > 0) {
        ctx.save();
        ctx.fillStyle = '#d97a52';
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Add a subtle glow
        ctx.strokeStyle = 'rgba(217, 122, 82, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    animationId = requestAnimationFrame(animate);
  };

  // Listen for toggle events
  const handleToggle = (event) => {
    isEnabled.value = event.detail.enabled;

    // Update cursor style
    if (isEnabled.value) {
      document.documentElement.style.setProperty('--cursor-display', 'none');
    } else {
      document.documentElement.style.setProperty('--cursor-display', 'auto');
      // Clear particles and canvas when disabled
      particles.length = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  window.addEventListener('cursor-trail-toggle', handleToggle);

  // Set initial cursor style
  if (isEnabled.value) {
    document.documentElement.style.setProperty('--cursor-display', 'none');
  } else {
    document.documentElement.style.setProperty('--cursor-display', 'auto');
  }

  animate();

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('cursor-trail-toggle', handleToggle);
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    // Restore default cursor
    document.documentElement.style.setProperty('--cursor-display', 'auto');
  });
});
</script>

<template>
  <canvas id="cursor-trail"></canvas>
</template>

<style>
/* Hide default cursor globally on desktop only when effect is enabled */
@media (min-width: 961px) and (hover: hover) and (pointer: fine) {
  * {
    cursor: var(--cursor-display, none) !important;
  }

  a, button, input, textarea, select {
    cursor: var(--cursor-display, none) !important;
  }
}
</style>

<style scoped>
#cursor-trail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

/* Hide canvas on mobile/tablet */
@media (max-width: 960px) {
  #cursor-trail {
    display: none;
  }
}
</style>
