<template>
  <section id="projects" class="section-container">
    <div class="container-white">
      <div class="projects-header">
        <span class="badge">Placeholders</span>
        <h1>Featured Projects</h1>
        <p>A collection of my recent works, blending aesthetics with functional code.</p>
      </div>

      <div class="projects-grid">
        <div class="card reveal" v-for="(project, index) in projects" :key="index">
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
          </div>

          <div class="project-info">
            <div class="tags">
              <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>

            <div class="project-actions">
              <NuxtLink
                  :to="project.link"
                  class="btn btn-glass"
                  target="_blank"
                  rel="noopener"
              >
                View Project
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

const projects = [
  {
    title: 'Swisstiers',
    description: 'A modern design Minecraft Leaderboard for Swiss Minecaft Players.',
    image: 'https://i.ibb.co/WrPSRVf/Swisstiers2.png',
    tags: ['Python', 'Nuxt 4', 'CSS'],
    link: 'https://swisstiers.ch/'
  },
  {
    title: 'Neural Dashboard',
    description: 'Data visualization platform for AI-driven analytics and neural networks.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
    tags: ['Three.js', 'API', 'WebGL'],
    link: '#'
  }
];

onMounted(() => {
  // Reveal Logic (passend zu deinem main.css)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
</script>

<style scoped>
.section-container {
  padding: 15px 20px;
}

.projects-header {
  margin-bottom: 50px;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
}

.project-info {
  margin-top: 25px;
  text-align: left;
}

.project-info h3 {
  text-align: left;
  margin: 15px 0 10px 0;
  font-size: 1.5rem;
}

.project-info p {
  text-align: left;
  opacity: 0.8;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 12px;
  border-radius: 10px;
  font-size: 0.75rem;
  border: 1px solid var(--glass-border);
}

.project-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}



@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
/* Entfernt den hellen Schein/Verlauf am Boden des Containers */
.container-white::before,
.container-white::after {
  display: none !important;
  content: none !important;
}

/* Falls der Effekt direkt als Background-Image auf dem Container liegt */
.container-white {
  background-image: none !important;
  /* Behalte nur die Hintergrundfarbe bei */
  background-color: #0f0f0f;
}
</style>