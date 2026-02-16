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

    <div class="footer-last-update">
      Last update: {{ lastUpdateDate }}
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

// Berechnet das aktuelle Jahr für das Copyright
const currentYear = computed(() => new Date().getFullYear());

// Holt das Datum der letzten Dateiänderung
const lastUpdateDate = computed(() => {
  return new Date(document.lastModified).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
});
</script>

<style scoped>
/* Grundlayout für den Footer (zentriert alles) */
footer {
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

/* Icon-Basisgröße */
.footer-socials :deep(svg) {
  width: 1.5em;
  height: 1.5em;
}

.footer-socials {
  display: flex;
  gap: 1.5rem;
}

/* Gemeinsame Transition für geschmeidiges Leuchten */
.footer-socials a {
  transition: var(--transition-smooth, all 0.3s ease);
  color: inherit;
  text-decoration: none;
}

/* Individuelle Hover-Effekte */

/* GitHub: Blaues Leuchten */
.github-link:hover {
  color: #78a0ff !important;
  filter: drop-shadow(0 0 10px rgba(120, 160, 255, 0.8));
}

/* YouTube: Rotes Leuchten */
.youtube-link:hover {
  color: #ff0000 !important;
  filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.8));
}

/* Email: Gelbes Leuchten */
.email-link:hover {
  color: #facc15 !important;
  filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.8));
}

/* Styling für die Update-Anzeige */
.footer-last-update {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  opacity: 0.5;
  font-style: italic;
}
</style>