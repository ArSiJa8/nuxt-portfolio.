<script setup>
import { ref, onMounted } from 'vue';

// --- State für das mobile Menü ---
const isMenuActive = ref(false);

// --- Menü-Struktur ---
const menuItems = [
  { name: 'Home', path: '/#top' },
  { name: 'About', path: '#about' },
  { name: 'Contact', path: '/Contact' },
  { name: 'Projects', path: '/Projects' },
];

// --- Funktionen ---
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
  // Body scroll sperren, wenn Menü offen ist
  document.body.style.overflow = isMenuActive.value ? 'hidden' : 'auto';
};

const handleNavClick = (item) => {
  isMenuActive.value = false;
  document.body.style.overflow = 'auto';

  // Sicherheitscheck
  if (!item || !item.path) return;

  // SPEZIALFALL HOME: Nutze den Ghost-Anchor oder Position 0
  if (item.path === '#top') {
    const el = document.getElementById('scroll-anchor-top');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback, falls der Anchor nicht gefunden wird
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    // URL sauber halten (entfernt das #top)
    if (window.history.pushState) {
      window.history.pushState(null, null, '/');
    }
  }
  // Anker für #about werden nativ durch das 'href' im Template behandelt
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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  elements.forEach((el, idx) => {
    el.classList.add('reveal');
    const delayMs = (idx % 10) * 60;
    el.style.transitionDelay = `${delayMs}ms`;
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
      <a href="#" class="nav-branding" @click.prevent="handleNavClick({ path: '#top' })">
        ArSiJa
      </a>

      <ul class="nav-menu" :class="{ 'active': isMenuActive }">
        <li v-for="item in menuItems" :key="item.name" class="nav-item">

          <a
              v-if="item.path === '#top'"
              href="#"
              class="nav-link"
              @click.prevent="handleNavClick(item)"
          >
            {{ item.name }}
          </a>

          <a
              v-else-if="item.path.startsWith('#')"
              :href="item.path"
              class="nav-link"
              @click="handleNavClick(item)"
          >
            {{ item.name }}
          </a>

          <NuxtLink
              v-else
              :to="item.path"
              class="nav-link"
              exact-active-class="is-exact-active"
              @click="handleNavClick(item)"
          >
            {{ item.name }}
          </NuxtLink>

        </li>
      </ul>

      <div
          class="hamburger"
          :class="{ 'active': isMenuActive }"
          @click="toggleMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Aktiver Zustand für NuxtLinks (Contact/Projects) */
.nav-link.is-exact-active {
  color: #fff;
}
.nav-link.is-exact-active::after {
  width: 100%;
}

/* Hover-Zustand für alle Links */
.nav-link:hover {
  color: #fff;
}
.nav-link:hover::after {
  width: 100%;
}
</style>