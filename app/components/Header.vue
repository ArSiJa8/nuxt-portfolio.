<script setup>
import { ref, onMounted } from 'vue';

// --- State für das mobile Menü ---
const isMenuActive = ref(false);

// --- Menü-Struktur ---
const menuItems = [
  { name: 'Home', path: '/#top' },
  { name: 'About', path: '/#about' },
  { name: 'Contact', path: '/Contact' },
  { name: 'Projects', path: '/Projects' },
];

// --- Funktionen ---
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
  // Body scroll sperren, wenn Menü offen ist
  document.body.style.overflow = isMenuActive.value ? 'hidden' : 'auto';
};

const closeMenu = (item) => {
  isMenuActive.value = false;
  document.body.style.overflow = 'auto';

  // Manueller Scroll-Fix für Hash-Links auf der gleichen Seite
  if (item && item.path.includes('#')) {
    const hash = item.path.split('#')[1];
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50); // Kleiner Timeout, damit Nuxt Zeit für den Page-Check hat
  }
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
      <NuxtLink to="/#top" class="nav-branding">ArSiJa</NuxtLink>

      <ul class="nav-menu" :class="{ 'active': isMenuActive }">
        <li v-for="item in menuItems" :key="item.path" class="nav-item">
          <NuxtLink
              :to="item.path"
              class="nav-link"
              exact-active-class="is-exact-active"
              @click="closeMenu(item)"
          >
            {{ item.name }}
          </NuxtLink>
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
/* WICHTIG: Nutze die exact-active Klasse für den Unterstrich */
.nav-link.is-exact-active {
  color: #fff;
}
.nav-link.is-exact-active::after {
  width: 100%;
}

/* Dein restliches CSS bleibt gleich, stelle aber sicher, dass ID #about existiert */
</style>