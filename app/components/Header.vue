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

