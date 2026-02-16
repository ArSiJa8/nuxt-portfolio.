<template>
  <section id="about" class="reveal section-container" ref="aboutSection">
    <div class="container-white">
      <div class="about-grid">

        <div class="about-image-wrapper">
          <div class="profile-frame">
            <img src="../assets/imgs/profile.png" alt="ArSiJa" class="profile-img" />
          </div>
        </div>

        <div class="markdown-content">
          <span class="badge">Wer ich bin</span>
          <h1>Über Mich</h1>

          <p>
            Ich bin ein leidenschaftlicher Entwickler mit einem Auge für Ästhetik.
            Mein Ziel ist es, Code und Design so zu verschmelzen, dass moderne,
            benutzerfreundliche Interfaces entstehen, die sich einfach "richtig" anfühlen.
          </p>

          <p>
            Abseits vom Bildschirm interessiere ich mich für neue Technologien und
            die kontinuierliche Optimierung von Workflows. Ich glaube daran, dass
            gutes Design unsichtbar ist – es funktioniert einfach.
          </p>

          <div class="skills-box">
            <h3>Expertise</h3>
            <div class="tags">
              <span class="tag">Frontend Architecture</span>
              <span class="tag">UI/UX Design</span>
              <span class="tag">Vue & Nuxt</span>
              <span class="tag">Performance Optimization</span>
              <span class="tag">Responsive Web</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const aboutSection = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      }
    })
  }, { threshold: 0.2 })

  if (aboutSection.value) {
    observer.observe(aboutSection.value)
  }
})
</script>

<style scoped>
.section-container {
  padding: 80px 20px;
}

.about-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 50px;
  align-items: center;
  width: 100%;
}

.about-image-wrapper {
  display: flex;
  justify-content: center;
}

.profile-frame {
  position: relative;
  width: 260px;
  height: 320px;
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  transition: var(--transition-smooth);
}

.profile-frame:hover {
  transform: scale(1.02);
  border-color: var(--accent);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  color: var(--accent);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 2px;
  font-weight: 700;
  display: block;
  margin-bottom: 10px;
}

.skills-box {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--glass-border);
}

.skills-box h3 {
  text-align: left;
  font-size: 1rem;
  margin-bottom: 15px;
  opacity: 0.8;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid var(--glass-border);
  transition: var(--transition-smooth);
}

.tag:hover {
  background: rgba(120, 160, 255, 0.1);
  border-color: var(--accent);
  color: var(--accent) !important;
}

@media (max-width: 850px) {
  .about-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .profile-frame {
    width: 220px;
    height: 220px;
    border-radius: 50%; /* Rundes Bild auf Mobile wirkt oft moderner */
  }

  .skills-box h3 {
    text-align: center;
  }

  .tags {
    justify-content: center;
  }
}
</style>