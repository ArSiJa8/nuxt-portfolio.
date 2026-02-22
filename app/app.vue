<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div id="scroll-anchor-top" style="position: absolute; top: 0; left: 0; height: 1px; width: 1px; z-index: 9999; pointer-events: none;"></div>
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
  margin-top: 100vh;

  /* Starker Schatten nach oben, um die Kante zu kaschieren */
  box-shadow: 0 -50px 150px 30px rgba(0, 0, 0, 0);

  /* Der Gradient sorgt dafür, dass der Content oben weich anfängt */
  background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--black) 150px
  );
}

/* Das ::before Element (schwarzer Schleier) wurde hier entfernt */

.hero-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
</style>