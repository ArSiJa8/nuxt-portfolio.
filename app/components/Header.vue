<script setup>
import { ref } from 'vue';

// --- State für das mobile Menü ---
const isMenuActive = ref(false);

// --- Menü-Struktur (Hash entfernt) ---
const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/About' },
  { name: 'Contact', path: '/Contact' },
  { name: 'Projects', path: '/Projects' },
];

// --- Funktionen ---
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
  // Body scroll sperren, wenn Menü offen ist
  document.body.style.overflow = isMenuActive.value ? 'hidden' : 'auto';
};

const closeMenu = () => {
  isMenuActive.value = false;
  document.body.style.overflow = 'auto';
};
</script>

<template>
  <header class="main-header">
    <nav class="nav-container">
      <NuxtLink to="/" class="nav-branding">ArSiJa</NuxtLink>

      <ul class="nav-menu" :class="{ 'active': isMenuActive }">
        <li v-for="item in menuItems" :key="item.path" class="nav-item">
          <NuxtLink
              :to="item.path"
              class="nav-link"
              exact-active-class="is-exact-active"
              @click="closeMenu"
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
/* Nur die aktiven Link-Styles, das Haupt-CSS kommt aus deinem globalen Stylesheet */
.nav-link.is-exact-active {
  color: #fff;
}
.nav-link.is-exact-active::after {
  width: 100%;
}
</style>