<template>
  <footer class="footer-main">
    <div class="footer-container">

      <div class="footer-copyright">
        &copy; {{ currentYear }} <span class="white-text">ArSiJa</span>
      </div>

      <nav class="footer-socials" aria-label="Social Media">
        <a v-for="link in socialLinks"
           :key="link.name"
           :href="link.url"
           target="_blank"
           rel="noopener"
           :class="['social-link-wrapper', link.class]">
          <Icon :name="link.icon" class="social-icon" />
        </a>
      </nav>

      <div v-if="lastUpdateDate" class="update-info">
        Last update: {{ lastUpdateDate }}
      </div>

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
.footer-main {
  margin-top: 2rem;
  padding: 3rem 2rem; /* Viel kompakter als vorher */
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: #000;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Fix: war items-center */
  gap: 1.5rem; /* Weniger Abstand zwischen den Elementen */
}

.footer-socials {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-link-wrapper {
  display: inline-flex;
  padding: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.social-icon {
  font-size: 1.8rem; /* Etwas kleiner für besseres Alignment */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-link-wrapper:hover .social-icon {
  transform: scale(1.2) translateY(-3px);
}

/* Deine Wunsch-Glow Effekte */
.github:hover  { color: #f3f3ff; filter: drop-shadow(0 0 15px rgba(246, 246, 255, 0.6)); }
.youtube:hover { color: #ff0000; filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.6)); }
.discord:hover { color: #5865F2; filter: drop-shadow(0 0 15px rgba(88, 101, 242, 0.6)); }
.email:hover   { color: #facc15; filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.6)); }

.footer-copyright { color: rgba(255, 255, 255, 0.6); font-size: 0.9rem; }
.white-text { color: #fff; font-weight: 700; }

.update-info {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.38);
  text-transform: uppercase;
}
</style>