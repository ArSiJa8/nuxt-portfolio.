<template>
  <footer>
    <div class="footer-copyright">
      &copy; {{ currentYear }} ArSiJa. All rights reserved.
    </div>

    <div class="footer-socials">
      <a
          href="https://github.com/ArSiJa8"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          class="github-link"
      >
        <Icon name="uil:github" />
      </a>

      <a
          href="https://youtube.com/@aArSiJa"
          target="_blank"
          rel="noopener"
          aria-label="Youtube"
          class="youtube-link"
      >
        <Icon name="uil:youtube" />
      </a>

      <a
          href="mailto:silvan@arsija.net"
          aria-label="Email"
          class="email-link"
      >
        <Icon name="uil:envelope" />
      </a>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Icon-Basisgröße */
.footer-socials :deep(svg) {
  width: 1em;
  height: 1em;
}

/* Individuelle Hover-Effekte */

/* GitHub: Blaues Leuchten (dein Accent) */
.github-link:hover {
  color: #78a0ff !important; /* var(--accent) */
  filter: drop-shadow(0 0 10px rgba(120, 160, 255, 0.8));
}

/* YouTube: Rotes Leuchten */
.youtube-link:hover {
  color: #ff0000 !important;
  filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.8));
}

/* Email: Gelbes/Goldenes oder Weißes Leuchten */
.email-link:hover {
  color: #facc15 !important;
  filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.8));
}

/* Gemeinsame Transition für geschmeidiges Leuchten */
.footer-socials a {
  transition: var(--transition-smooth);
}
</style>