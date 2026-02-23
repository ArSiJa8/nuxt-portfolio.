<template>
  <section id="about" class="reveal section-container" ref="aboutSection">
    <div class="container-white mouse-tracking" @mousemove="handleMouseMove">

      <div class="swiss-grid"></div>

      <div class="about-grid">
        <div class="about-image-wrapper">
          <div class="profile-frame">
            <img src="~/../assets/imgs/profile.png" alt="ArSiJa" class="profile-img" />
          </div>
        </div>

        <div class="about-text-content">
          <span class="badge">Who i am</span>
          <h1>About Me</h1>

          <p class="about-p">
            I'm a passionate developer with an eye for aesthetics.
            My goal is to seamlessly blend code and design to create modern,
            user-friendly interfaces that simply feel "right".
          </p>

          <p class="about-p">
            Away from the screen, I'm interested in new technologies and
            the continuous optimization of workflows.
          </p>

          <div class="skills-box">
            <h2 class="expertise-label">Expertise</h2>
            <div class="tags">
              <span class="tag" v-for="skill in ['Frontend Architecture', 'UI/UX Design', 'Vue & Nuxt', 'Web Development']" :key="skill">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="tools-section">
        <div class="divider"></div>
        <h2 class="tools-title">🛠️ Languages & Tools</h2>

        <div class="tools-grid-horizontal">
          <div v-for="(category, catName) in toolGroups" :key="catName" class="tool-category">
            <h3 class="category-name">{{ catName }}</h3>
            <div class="icon-row">
              <div
                  v-for="tool in category"
                  :key="tool.name"
                  class="icon-wrapper"
                  :style="{ '--hover-color': tool.color }"
              >
                <img :src="tool.src" :alt="tool.name" class="tool-icon" />
                <span class="tool-tooltip">{{ tool.name }}</span>
              </div>
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

const handleMouseMove = (e) => {
  const { currentTarget: target, clientX, clientY } = e;
  const rect = target.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

const toolGroups = {
  "Programming": [
    { name: "JavaScript", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", color: "#f7df1e" },
    { name: "TypeScript", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", color: "#3178c6" },
    { name: "Python", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", color: "#3776ab" },
    { name: "Java", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg", color: "#ec2024" }
  ],
  "Web Stack": [
    { name: "Vue.js", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg", color: "#42b883" },
    { name: "Node.js", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", color: "#68a063" },
    { name: "HTML5", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", color: "#e34f26" },
    { name: "CSS3", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", color: "#1572b6" }
  ],
  "Design & Dev": [
    { name: "Git", src: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg", color: "#f05032" },
    { name: "Figma", src: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg", color: "#f24e1e" },
    { name: "Docker", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", color: "#2496ed" },
    { name: "Vite", src: "https://www.vectorlogo.zone/logos/vitejsdev/vitejsdev-icon.svg", color: "#646cff" }
  ]
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view')
    })
  }, { threshold: 0.1 })
  if (aboutSection.value) observer.observe(aboutSection.value)
})
</script>

<style scoped>
.section-container { padding: 40px 20px; }

.swiss-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.12;
  background-image: radial-gradient(circle, var(--white) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.container-white {
  position: relative;
  overflow: hidden;
  background-color: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.container-white::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
      600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 255, 255, 0.1),
      transparent 40%
  );
  z-index: 1;
  transition: background 0.2s ease-out;
  pointer-events: none;
}

/* --- 1. PROFILE STYLING --- */
.about-image-wrapper {
  position: relative;
  z-index: 10;
  padding: 40px;
  margin: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.profile-frame {
  width: 260px;
  height: 320px;
  background: #2a2a2a;
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: visible;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
}

.about-image-wrapper:hover .profile-frame {
  transform: scale(1.05) translateY(-5px);
  border-color: #ffcc33;
  z-index: 20;
}

.about-image-wrapper:hover .profile-img {
  filter: drop-shadow(0 0 15px rgba(255, 204, 51, 0.6));
  transform: scale(1.1);
}

/* --- 2. EXPERTISE DESIGN --- */
.skills-box {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.expertise-label {
  text-align: center;
  font-size: 1.4rem !important;
  font-weight: 600 !important;
  color: var(--white) !important;
  margin-bottom: 25px !important;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.tag {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 18px;
  border-radius: 12px;
  font-size: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.tag:hover {
  background: rgba(120, 160, 255, 0.15);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-3px);
}

/* --- 3. LANGUAGES & TOOLS (Fixed Tooltips) --- */
.tools-grid-horizontal {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
}

.icon-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.icon-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tool-icon {
  width: 44px;
  height: 44px;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-wrapper:hover .tool-icon {
  filter: grayscale(0%)
  drop-shadow(0 0 8px var(--hover-color))
  drop-shadow(0 0 15px var(--hover-color));
  transform: translateY(-8px) scale(1.1);
  opacity: 1;
}

.tool-tooltip {
  position: absolute;
  top: 0;
  background: #000;
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  opacity: 0;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 100;
  pointer-events: none; /* Keine eigene Hitbox */
}

.icon-wrapper:hover .tool-tooltip {
  opacity: 1;
  transform: translateY(-45px); /* Perfekte Position über dem Icon */
}

/* Layout */
.about-grid { display: grid; grid-template-columns: 300px 1fr; gap: 40px; margin-bottom: 60px; position: relative; z-index: 5; }
.about-p { margin-bottom: 25px !important; line-height: 1.8; }

@media (max-width: 900px) {
  .tools-grid-horizontal { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 850px) {
  .about-grid { grid-template-columns: 1fr; justify-items: center; }
  .about-text-content { text-align: center; }
  .profile-frame { width: 220px; height: 220px; border-radius: 50%; overflow: hidden; }
}
</style>