<script setup>
const { data: stats, pending } = await useFetch('/api/codestats')

const XP_FACTOR = 0.1
const getLevel = (xp) => (!xp || isNaN(xp) ? 0 : Math.floor(XP_FACTOR * Math.sqrt(xp)))

const getLevelProgress = (xp) => {
  if (!xp || isNaN(xp)) return 0
  const currentLevel = getLevel(xp)
  const nextLevel = currentLevel + 1
  const currentLevelXp = Math.pow(currentLevel / XP_FACTOR, 2)
  const nextLevelXp = Math.pow(nextLevel / XP_FACTOR, 2)
  return Math.min(Math.max(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100, 5), 100)
}

const topLanguages = computed(() => {
  if (!stats.value?.languages) return []
  return Object.entries(stats.value.languages)
      .map(([name, data]) => ({ name, xps: data.xps || 0 }))
      .sort((a, b) => b.xps - a.xps)
      .slice(0, 4)
})

const getIcon = (lang) => {
  const icons = {
    'TypeScript': 'i-logos-typescript-icon',
    'Vue template': 'i-logos-vue',
    'JavaScript': 'i-logos-javascript',
    'Plain text': 'i-heroicons-document-text-20-solid',
    'CSS': 'i-logos-css-3'
  }
  return icons[lang] || 'i-heroicons-code-bracket-20-solid'
}
</script>

<template>
  <section class="coding-activity-wrapper">
    <div class="container-custom">

      <div class="header-unit">
        <div class="live-status-container">
          <div class="live-badge">
            <div class="pulse-wrapper">
              <span class="pulse-dot-fixed"></span>
              <span class="pulse-ring"></span>
            </div>
            <span class="live-text">Live Sync Active</span>
          </div>
          <span class="since-text">Tracking since Feb 21, 2026</span>
        </div>

        <div class="icon-box">
          <UIcon name="i-heroicons-chart-bar-20-solid" class="icon-main" />
        </div>
        <h2 class="main-title">Coding Activity</h2>
        <div class="title-line"></div>
      </div>

      <div v-if="!pending && stats" class="stats-flex-container">

        <div class="stat-card xp-card">
          <h3 class="card-label">Accumulated XP</h3>
          <div class="xp-display">
            <span class="xp-number">{{ stats?.total_xp?.toLocaleString() || '0' }}</span>
          </div>
          <div class="progress-unit">
            <div class="progress-labels">
              <span>LVL {{ getLevel(stats?.total_xp) }}</span>
              <span>Next Level</span>
            </div>
            <div class="bar-bg">
              <div class="bar-fill" :style="{ width: getLevelProgress(stats?.total_xp) + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="stat-card tech-card">
          <h3 class="card-label align-left">Most Used Tech</h3>
          <div class="tech-list">
            <div v-for="lang in topLanguages" :key="lang.name" class="tech-item group">
              <div class="tech-info">
                <div class="tech-name-box">
                  <UIcon :name="getIcon(lang.name)" class="tech-icon" />
                  <span class="tech-name">{{ lang.name }}</span>
                </div>
                <span class="level-badge">LVL {{ getLevel(lang.xps) }}</span>
              </div>
              <div class="bar-bg">
                <div class="bar-fill gradient" :style="{ width: getLevelProgress(lang.xps) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* SEKTION & ZENTRIERUNG */
.coding-activity-wrapper {
  width: 100%;
  padding-top: 60px; /* Von 100px auf 60px reduziert */
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
}

.container-custom {
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
}

/* LIVE STATUS & DATUM */
.live-status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  padding: 5px 14px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.since-text {
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.5px;
}

.live-text {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
}

/* KORRIGIERTER PULS */
.pulse-wrapper {
  position: relative;
  width: 8px;
  height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-dot-fixed {
  width: 7px;
  height: 7px;
  background-color: var(--accent);
  border-radius: 50%;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--accent);
  border-radius: 50%;
  animation: pulse-animation 2s infinite ease-out;
  z-index: 1;
}

@keyframes pulse-animation {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(3.5); opacity: 0; }
}

/* HEADER */
.header-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px; /* Von 60px auf 40px reduziert */
  text-align: center;
}

.main-title {
  font-size: 3.2rem;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  letter-spacing: -1px;
  margin-bottom: 12px;
}

.icon-box {
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 12px;
}

.icon-main {
  width: 28px;
  height: 28px;
  color: var(--accent);
}

.title-line {
  height: 4px;
  width: 50px;
  background: var(--accent);
  border-radius: 10px;
}

/* CARDS */
.stats-flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
}

.stat-card {
  flex: 1;
  min-width: 400px;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 40px;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.stat-card:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--accent-rgb), 0.3);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}

.card-label {
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: bold;
  margin-bottom: 30px;
}

.align-left { text-align: left; width: 100%; }

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.tech-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.tech-name-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tech-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
}

.tech-icon { width: 24px; height: 24px; }

/* BALKEN */
.bar-bg {
  height: 7px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 10px;
  transition: width 1s ease-out;
}

.bar-fill.gradient {
  background: linear-gradient(90deg, var(--accent), var(--accent-hover));
}

.xp-display {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.xp-number {
  font-size: 6.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -3px;
}

.level-badge {
  font-size: 9px;
  font-weight: 800;
  color: var(--accent);
  padding: 2px 7px;
  border-radius: 5px;
  border: 1px solid rgba(var(--accent-rgb), 0.2);
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 6px;
  font-weight: bold;
}
</style>