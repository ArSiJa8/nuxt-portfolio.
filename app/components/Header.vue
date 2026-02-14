<script setup>
import { ref, onMounted } from 'vue';

// --- State für das mobile Menü ---
const isMenuActive = ref(false);

// --- Menü-Struktur ---
const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/About' },
  { name: 'Contact', path: '/Contact' },
  { name: 'Projects', path: '/Projects' },
];

// --- Funktionen ---
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
  // Body scroll sperren, wenn Menü offen ist (wie in deinem JS)
  document.body.style.overflow = isMenuActive.value ? 'hidden' : 'auto';
};

const closeMenu = () => {
  isMenuActive.value = false;
  document.body.style.overflow = 'auto';
};

// --- Scroll Reveal Logik ---
const initScrollReveal = () => {
  const revealSelectors = [
    '.center-screen .card',
    'section',
    '.container-white',
    '.projects-grid > *'
  ].join(',');

  const elements = document.querySelectorAll(revealSelectors);
  if (elements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach((el, idx) => {
    el.classList.add('reveal');
    // Staggered Delay (0, 60, 120ms...)
    if (!el.style.transitionDelay && !el.dataset.delay) {
      const delayMs = (idx % 10) * 60;
      el.style.transitionDelay = `${delayMs}ms`;
    }
    observer.observe(el);
  });
};

onMounted(() => {
  initScrollReveal();
});
</script>

<template>
  <header class="main-header">
    <nav class="nav-container">
      <router-link to="/" class="nav-branding">ArSiJa</router-link>

      <ul class="nav-menu" :class="{ 'active': isMenuActive }">
        <li v-for="item in menuItems" :key="item.path" class="nav-item">
          <router-link 
            :to="item.path" 
            class="nav-link" 
            @click="closeMenu"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>

      <div 
        class="hamburger" 
        :class="{ 'active': isMenuActive }" 
        @click="toggleMenu"
        role="button"
        aria-label="Menü öffnen"
        :aria-expanded="isMenuActive"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Nutzt deine CSS Variablen aus der :root */

.main-header {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1200px;
  z-index: 1000;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  transition: var(--transition-smooth);
  pointer-events: none;
}

.main-header > * {
  pointer-events: auto;
}

.main-header:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.nav-container {
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  mix-blend-mode: difference;
}

.nav-branding {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #fff 0%, #a5a5a5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 40px;
  list-style: none;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  text-decoration: none;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #fff;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover { color: #fff; }
.nav-link:hover::after { width: 100%; }

/* Router Link Active State (Optional) */
.router-link-active.nav-link {
  color: #fff;
}
.router-link-active.nav-link::after {
  width: 100%;
}

/* Hamburger */
.hamburger {
  display: none;
  cursor: pointer;
  z-index: 1001;
  padding: 10px;
  border-radius: 12px;
  transition: background 0.3s ease;
}

.hamburger:hover { background: rgba(255, 255, 255, 0.1); }

.bar {
  display: block;
  width: 25px;
  height: 2px;
  margin: 6px 0;
  transition: var(--transition-smooth);
  background-color: #fff;
  border-radius: 2px;
}

.hamburger.active .bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.hamburger.active .bar:nth-child(2) { opacity: 0; transform: translateX(-10px); }
.hamburger.active .bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

@media (max-width: 768px) {
  .hamburger { display: block; }

  .nav-menu {
    position: fixed;
    left: 50%;
    top: 100px;
    transform: translateX(-50%) scale(0.95);
    flex-direction: column;
    background: rgba(10, 10, 12, 0.85);
    backdrop-filter: blur(40px) saturate(200%);
    -webkit-backdrop-filter: blur(40px) saturate(200%);
    width: calc(100% - 40px);
    max-width: 400px;
    padding: 40px 0;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
    gap: 20px;
    text-align: center;
  }

  .nav-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) scale(1);
  }

  .nav-item { width: 100%; }

  .nav-link {
    display: block;
    padding: 10px 0;
    font-size: 1.2rem;
  }
}
</style>