<template>
  <footer class="mt-16 px-8 py-24 border-t border-white/10 bg-black">
    <div class="max-w-6xl mx-auto flex flex-col items-center gap-12">

      <div class="text-sm tracking-widest text-white/60">
        &copy; {{ currentYear }} <span class="text-white font-bold tracking-normal">ArSiJa</span>. All rights reserved.
      </div>

      <nav class="flex items-center justify-center" aria-label="Social Media">
        <a v-for="link in socialLinks"
           :key="link.name"
           :href="link.url"
           target="_blank"
           rel="noopener"
           :aria-label="link.name"
           :class="['social-link-wrapper', link.class]">
          <Icon :name="link.icon" class="social-icon" />
        </a>
      </nav>

      <div v-if="lastUpdateDate" class="update-info">
        Last update: {{ lastUpdateDate }}
      </div>

    <div class="footer-last-update">
      Last update: {{ lastUpdateDate }}
    </div>
  </footer>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const lastUpdateDate = ref('');
const currentYear = computed(() => new Date().getFullYear());

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/ArSiJa8', icon: 'uil:github', class: 'github' },
  { name: 'YouTube', url: 'https://youtube.com/@aArSiJa', icon: 'uil:youtube', class: 'youtube' },
  { name: 'Discord', url: 'https://discord.gg/Kg7A42bPKz', icon: 'ic:baseline-discord', class: 'discord' },
  { name: 'Email', url: 'mailto:silvan@arsija.net', icon: 'uil:envelope', class: 'email' }
];

onMounted(() => {
  if (import.meta.client) {
    const modified = document.lastModified;
    if (modified) {
      lastUpdateDate.value = new Date(modified).toLocaleDateString('de-DE', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
    }
  }
});
</script>

<style scoped>
/* Der Wrapper ist die Hitbox */
.social-link-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2rem; /* Riesige Klickfläche: 24px hoch/runter, 32px links/rechts */
  color: rgba(255, 255, 255, 0.5); /* Helleres Grau für bessere Sichtbarkeit */
  transition: all 0.3s ease;
  text-decoration: none;
}

/* Das eigentliche Icon */
.social-icon {
  font-size: 2rem; /* Etwas größer (32px) */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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