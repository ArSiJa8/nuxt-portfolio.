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
          <span class="badge">Who I Am</span>
          <h1>About Me</h1>

          <p class="about-p">
            Based in Switzerland, I’ve been navigating the evolving world of code
            for over <strong>9 years</strong>. What started as a fascination with
            Minecraft Mods has grown into a specialized focus on <strong>Vue</strong> and <strong>Nuxt</strong>,
            where I bridge the gap between complex architecture and smooth design.
          </p>

          <p class="about-p">
            Specializing in <strong>Vue and Nuxt</strong>, I architect applications where performance
            meets aesthetics. I’m the developer who obsesses over the small details—ensuring
            every micro-interaction feels as fluid and responsive as it looks.
          </p>
          <p class="about-p" style="margin-bottom: 1rem;">
            One of my main goals is to ensure that
            the code looks as clean as the website itself.
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
                <span class="tool-tooltip">
                  {{ tool.name }} • {{ calculateExperience(tool.since) }}
                </span>
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

const calculateExperience = (sinceYear) => {
  const currentYear = new Date().getFullYear();
  const diff = currentYear - sinceYear;
  if (diff <= 0) return "Learning";
  return `${diff} ${diff === 1 ? 'Year' : 'Years'}`;
};

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
    { name: "JavaScript", since: 2021, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", color: "#f7df1e" },
    { name: "TypeScript", since: 2021, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", color: "#3178c6" },
    { name: "Python", since: 2017, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", color: "#3776ab" },
    { name: "Java", since: 2017, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg", color: "#ec2024" }
  ],
  "Web Stack": [
    { name: "Vue.js", since: 2023, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg", color: "#42b883" },
    { name: "Nuxt", since: 2023, src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxt/nuxt-original.svg", color: "#2fcc5b" },
    { name: "Node.js", since: 2022, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", color: "#68a063" },
    { name: "HTML5", since: 2020, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", color: "#e34f26" },
    { name: "CSS3", since: 2020, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", color: "#1572b6" }
  ],
  "Design & Dev": [
    { name: "Git", since: 2017, src: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg", color: "#f05032" },
    { name: "Figma", since: 2024, src: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg", color: "#f24e1e" },
    { name: "Docker", since: 2023, src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", color: "#2496ed" },
    { name: "Vite", since: 2022, src: "https://www.vectorlogo.zone/logos/vitejsdev/vitejsdev-icon.svg", color: "#646cff" }
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
/* --- BASIC LAYOUT --- */
.section-container { padding: 40px 20px; position: relative; }
.container-white { position: relative; overflow: visible; background-color: #0f0f0f; border: 1px solid rgba(255, 255, 255, 0.1); padding: 60px; border-radius: 24px; z-index: 1; }

.about-grid { display: grid; grid-template-columns: 300px 1fr; gap: 60px; margin-bottom: 80px; align-items: center; }

/* --- TOOLS GRID FIX --- */
.tools-grid-horizontal {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;
  margin-top: 30px;
}

.icon-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Zentriert die Icons unter dem Kategorienamen */
}

/* --- ICON & TOOLTIP LOGIC --- */
.icon-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tool-icon {
  width: 44px;
  height: 44px;
  opacity: 0.5;
  filter: grayscale(0%);
  transition: all 0.3s ease;
}

.icon-wrapper:hover .tool-icon {
  filter: grayscale(0%) drop-shadow(0 0 10px var(--hover-color));
  opacity: 1;
  transform: translateY(-5px);
}

.tool-tooltip {
  position: absolute;
  bottom: 140%; /* Höher platziert damit es nicht überlappt */
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  z-index: 999;
}

.icon-wrapper:hover .tool-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* --- REST STYLING --- */
.category-name { font-size: 0.9rem; opacity: 0.5; margin-bottom: 20px; text-align: center; text-transform: uppercase; letter-spacing: 2px; }
.profile-frame { width: 260px; height: 320px; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1); }
.profile-img { width: 100%; height: 100%; object-fit: cover; }
.tag { background: rgba(255, 255, 255, 0.05); padding: 8px 18px; border-radius: 12px; font-size: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.1); cursor: default; }
.tags { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 15px; }

@media (max-width: 1024px) { .tools-grid-horizontal { grid-template-columns: 1fr; gap: 50px; } }
@media (max-width: 850px) { .about-grid { grid-template-columns: 1fr; text-align: center; } .tags { justify-content: center; } }
</style>