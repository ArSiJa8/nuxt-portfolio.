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

/* Hover-Effekte auf dem Wrapper steuern das Icon */
.social-link-wrapper:hover .social-icon {
  transform: scale(1.3) translateY(-5px);
}

/* Farben & Glow-Effekte */
.github:hover  { color: #78a0ff; filter: drop-shadow(0 0 15px rgba(120, 160, 255, 0.6)); }
.youtube:hover { color: #ff0000; filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.6)); }
.discord:hover { color: #5865F2; filter: drop-shadow(0 0 15px rgba(88, 101, 242, 0.6)); }
.email:hover   { color: #facc15; filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.6)); }

.update-info {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-style: italic;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.25);
}
</style>