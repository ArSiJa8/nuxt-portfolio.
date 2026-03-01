<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

// 1. SEO & Open Graph (OG) Meta-Tags
useHead({
  htmlAttrs: {
    prefix: 'og: https://ogp.me/ns#'
  }
})

useSeoMeta({
  ogTitle: 'ArSiJa | Portfolio',
  ogType: 'website',
  ogUrl: 'https://arsija.net/',
  ogImage: 'https://arsija.net/wallpaper.jpg',
  twitterCard: 'summary_large_image',
})

// Nur ausführen, wenn wir im Browser sind
if (process.client) {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Liste aller Elemente, die den "auffälligen" Wechsel triggern sollen
  const clickables = 'a, button, .hamburger, .nav-link, .btn, input, textarea';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(clickables)) {
      cursor.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(clickables)) {
      cursor.classList.remove('cursor-hover');
    }
  });
}
</script>

<template>
  <div id="scroll-anchor-top" style="position: absolute; top: 0; left: 0; height: 1px; width: 1px; z-index: 9999; pointer-events: none;"></div>
  <div class="app-root">
    <Header />

    <Transition name="fade-hero">
      <section v-if="route.path === '/'" class="hero-background" aria-label="Hero Section">
        <Hero />
      </section>
    </Transition>

    <main :class="['page-content', { 'is-home': route.path === '/' }]">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Standard-Stil für alle Seiten */
.page-content {
  position: relative;
  z-index: 10;
  background-color: var(--black);
  width: 100%;
  /* Fix für flüssige Übergänge: Mindesthöhe verhindert Springen */
  min-height: 100vh;
}

/* Spezielle Regeln NUR für die Startseite */
.is-home {
  margin-top: 100vh;
  box-shadow: 0 -50px 150px 30px rgba(0, 0, 0, 0);
  background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--black) 150px
  );
}

.hero-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  display: block; /* Ensure section behaves like a div for styling */
}

/* --- NEU: Transition Animationen --- */

/* Hero Fade Effekt */
.fade-hero-enter-active,
.fade-hero-leave-active {
  transition: opacity 0.6s ease;
}

.fade-hero-enter-from,
.fade-hero-leave-to {
  opacity: 0;
}

/* Globale Page-Transitions (Nuxt Standard-Klassen) */
/* Falls du 'page' in der nuxt.config nutzt: */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-in-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>