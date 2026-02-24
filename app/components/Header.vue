<template>
  <header class="main-header">
    <nav class="nav-container" aria-label="main-header">
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
        <li class="mobile-socials" aria-label="Social Links">
          <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" :class="['header-social-link', link.class]" aria-label="social link">
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
/* --- Social Links Styling --- */
.header-socials-desktop {
  display: flex;
  gap: 12px;
  margin-left: 20px;
}

.header-social-link {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.3rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.header-social-link:hover {
  transform: translateY(-2px) scale(1.1);
}

/* Glow-Farben für Social Icons */
.github:hover  { color: #f3f3ff; filter: drop-shadow(0 0 8px rgba(246, 246, 255, 0.6)); }
.youtube:hover { color: #ff0000; filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.8)); }
.discord:hover { color: #5865F2; filter: drop-shadow(0 0 8px rgba(88, 101, 242, 0.8)); }
.email:hover   { color: #facc15; filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.8)); }

/* --- Nav Link Glow + Line Effekt --- */
.nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent); /* Oder #fff für cleanen Look */
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 0 8px rgba(85, 135, 255, 0.5);
}

/* Hover-Zustand */
.nav-link:hover {
  color: #fff;
  text-shadow: 0 0 10px rgba(85, 135, 255, 0.8);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* --- Aktiv-Zustand (Nuxt) --- */
.nav-link.is-exact-active {
  color: #fff;
  text-shadow: 0 0 10px rgba(85, 135, 255, 0.5);
}

.nav-link.is-exact-active::after {
  transform: scaleX(1); /* Linie bleibt beim aktiven Link dauerhaft da */
  background-color: #fff; /* Aktiver Link bekommt weiße Linie für Fokus */
}

/* --- Mobile Anpassungen --- */
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

  /* Im Mobile-Menü zentrieren wir den Glow-Effekt */
  .nav-link {
    font-size: 1.5rem;
    display: inline-block;
  }
}
</style>