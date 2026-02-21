<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// Dieses Script sucht alle Boxen und aktualisiert die CSS-Variablen
if (process.client) {
  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.card, .container-white');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  window.addEventListener('mousemove', handleMouseMove);
}

</script>

<template>
  <div>
    <Header />

    <div v-if="route.path === '/'" class="hero-background">
      <Hero />
    </div>

    <main :class="['page-content', { 'is-home': route.path === '/' }]">
      <NuxtPage />
      <Footer />
    </main>

  </div>
</template>

<style scoped>
/* Standard-Stil für alle Seiten */
.page-content {
  position: relative;
  z-index: 10;
  background-color: var(--black);
  width: 100%;
}

/* Spezielle Regeln NUR für die Startseite */
.is-home {
  margin-top: 100vh; /* Schiebt den Inhalt unter den fixierten Hero */
  box-shadow: 0 -20px 50px rgba(0,0,0,0.8); /* Trennungseffekt */
}

.hero-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
</style>