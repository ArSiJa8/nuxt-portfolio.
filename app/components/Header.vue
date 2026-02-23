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
        <li class="mobile-socials">
          <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" :class="['header-social-link', link.class]">
            <Icon :name="link.icon" />
          </a>
        </li>
      </ul>

      <div class="header-socials-desktop">
        <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" :class="['header-social-link', link.class]">
          <Icon :name="link.icon" />
        </a>
      </div>

      <div class="hamburger" :class="{ 'active': isMenuActive }" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuActive = ref(false);
const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/About' },
  { name: 'Contact', path: '/Contact' },
  { name: 'Projects', path: '/Projects' },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/ArSiJa8', icon: 'uil:github', class: 'github' },
  { name: 'YouTube', url: 'https://youtube.com/@aArSiJa', icon: 'uil:youtube', class: 'youtube' },
  { name: 'Discord', url: 'https://discord.gg/Kg7A42bPKz', icon: 'ic:baseline-discord', class: 'discord' },
  { name: 'Email', url: 'mailto:silvan@arsija.net', icon: 'uil:envelope', class: 'email' }
];

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
  document.body.style.overflow = isMenuActive.value ? 'hidden' : 'auto';
};

const closeMenu = () => {
  isMenuActive.value = false;
  document.body.style.overflow = 'auto';
};
</script>

<style scoped>
.header-socials-desktop {
  display: flex;
  gap: 12px; /* Etwas enger für 4 Icons */
  margin-left: 20px;
}

.header-social-link {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.3rem; /* Minimal kleiner für Desktop-Header Balance */
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.header-social-link:hover {
  transform: translateY(-2px) scale(1.1);
}

/* Glow-Farben (Synchron mit Footer) */
.github:hover  { color: #f3f3ff; filter: drop-shadow(0 0 8px rgba(246, 246, 255, 0.6)); }
.youtube:hover { color: #ff0000; filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.8)); }
.discord:hover { color: #5865F2; filter: drop-shadow(0 0 8px rgba(88, 101, 242, 0.8)); }
.email:hover   { color: #facc15; filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.8)); }

.mobile-socials {
  display: none;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .header-socials-desktop { display: none; }
  .mobile-socials { display: flex; }
}

.nav-link.is-exact-active { color: #fff; }
.nav-link.is-exact-active::after { width: 100%; }
</style>