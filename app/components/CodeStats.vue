<script setup>
/**
 * WakaTime Integration - Portfolio Component
 * Left: Global Stats (All Time)
 * Right: Recent Activity (Last 7 Days)
 */

// Wir holen die Daten von unserem Server-Endpoint
const { data: stats, pending } = await useFetch('/api/wakatime')

const ActiveDate = 'Feb 21, 2026'

// Filtert die Top 4 Sprachen aus den 7-Tage-Stats
const topLanguages = computed(() => {
  if (!stats.value?.sevenDays?.data?.languages) return []
  return stats.value.sevenDays.data.languages
      .slice(0, 4)
      .map(lang => ({
        name: lang.name,
        percent: lang.percent,
        text: lang.text
      }))
})

// Formatiert die Gesamt-Zeilen (All Time)
const totalLines = computed(() => {
  const lines = stats.value?.allTime?.data?.total_lines_combined || stats.value?.allTime?.data?.total_lines
  return lines ? lines.toLocaleString() : '12,482'
})

const getIcon = (lang) => {
  const icons = {
    'TypeScript': 'i-logos-typescript-icon',
    'Vue.js': 'i-logos-vue',
    'JavaScript': 'i-logos-javascript',
    'CSS': 'i-logos-css-3',
    'HTML': 'i-logos-html-5',
    'Markdown': 'i-heroicons-document-text-20-solid'
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
            <span class="live-text">Live WakaTime Sync</span>
          </div>
          <span class="since-text">Global metrics since {{ ActiveDate }}</span>
        </div>

        <div class="icon-box">
          <UIcon name="i-heroicons-code-bracket-square-20-solid" class="icon-main" />
        </div>
        <h2 class="main-title">Development Activity</h2>
        <p>Real-time insights into my coding journey and tech stack</p>
        <div class="title-line"></div>
      </div>

      <div v-if="!pending && stats" class="stats-flex-container">

        <div class="stat-card">
          <h3 class="card-label">Overall Stats (All Time)</h3>

          <div class="stats-display-vertical">
            <div class="stat-block">
              <span class="stat-value-large">{{ stats?.allTime?.data?.human_readable_total || '0h' }}</span>
              <span class="stat-sublabel">Total Time Invested</span>
            </div>

            <div class="divider-glass"></div>

            <div class="stat-block">
              <span class="stat-value-mid">{{ totalLines }}</span>
              <span class="stat-sublabel">Lines of Code Written</span>

              <div class="loc-info-badge">
                <UIcon name="i-heroicons-information-circle" class="loc-info-icon" />
                <span>Aggregated data from tracked projects</span>
              </div>
            </div>
          </div>

          <div class="progress-unit mt-auto">
            <div class="progress-labels">
              <span>Status: Active</span>
              <span>All Projects</span>
            </div>
            <div class="bar-bg"><div class="bar-fill" style="width: 100%"></div></div>
          </div>
        </div>

        <div class="stat-card">
          <h3 class="card-label align-left">Tech Distribution (7-Day Trend)</h3>

          <div class="weekly-highlight">
            <span class="weekly-value">{{ stats?.sevenDays?.data?.human_readable_total || '0h' }}</span>
            <span class="weekly-label">Time spent this week</span>
          </div>

          <div class="tech-list">
            <div v-for="lang in topLanguages" :key="lang.name" class="tech-item group">
              <div class="tech-info">
                <div class="tech-name-box">
                  <UIcon :name="getIcon(lang.name)" class="tech-icon" />
                  <span class="tech-name">{{ lang.name }}</span>
                </div>
                <span class="level-badge">{{ lang.text }}</span>
              </div>
              <div class="bar-bg">
                <div class="bar-fill gradient" :style="{ width: lang.percent + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="disclaimer-box">
            <UIcon name="i-heroicons-clock-20-solid" class="info-icon" />
            <span>Avg. Daily: {{ stats?.sevenDays?.data?.human_readable_daily_average || '0h' }}</span>
          </div>
        </div>

      </div>

      <div v-else class="loading-placeholder">
        <UIcon name="i-heroicons-arrow-path" class="spinner" />
        <p>Syncing with WakaTime cloud...</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.coding-activity-wrapper {
  width: 100%;
  padding-top: 60px;
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
}

.container-custom {
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
}

/* HEADER */
.header-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  text-align: center;
}

.main-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  letter-spacing: -1px;
  margin-bottom: 12px;
}

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

.live-text {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
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
  min-height: 520px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px) saturate(180%);
  transition: all 0.4s ease;
}

.stat-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.card-label {
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: bold;
  margin-bottom: 30px;
}

/* LEFT CARD CONTENT */
.stats-display-vertical {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
}

.stat-block { text-align: center; }

.stat-value-large {
  font-size: 4.5rem;
  font-weight: 900;
  color: white;
  display: block;
  line-height: 1;
  letter-spacing: -3px;
}

.stat-value-mid {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  display: block;
  letter-spacing: -1px;
}

.stat-sublabel {
  font-size: 0.8rem;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 10px;
  display: block;
}

/* NEU: LOC Info Badge */
.loc-info-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.loc-info-icon {
  width: 12px;
  height: 12px;
  color: rgba(255, 255, 255, 0.2);
}

.loc-info-badge span {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 500;
}

.divider-glass {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
}

/* RIGHT CARD CONTENT */
.weekly-highlight {
  background: rgba(255, 255, 255, 0.03);
  padding: 15px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 30px;
  text-align: center;
}

.weekly-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
}

.weekly-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.tech-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.tech-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
}

.tech-icon { width: 22px; height: 22px; }

/* UTILS */
.bar-bg {
  height: 6px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--accent);
  transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.bar-fill.gradient {
  background: linear-gradient(90deg, var(--accent), var(--accent-hover));
}

.level-badge {
  font-size: 9px;
  font-weight: 800;
  color: var(--accent);
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(85, 135, 255, 0.1);
  border: 1px solid rgba(85, 135, 255, 0.2);
}

.disclaimer-box {
  margin-top: auto;
  padding-top: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 8px;
  font-weight: bold;
  text-transform: uppercase;
}

/* ANIMATIONS */
.pulse-wrapper { position: relative; width: 8px; height: 8px; }
.pulse-dot-fixed { width: 7px; height: 7px; background-color: var(--accent); border-radius: 50%; z-index: 2; }
.pulse-ring { position: absolute; width: 100%; height: 100%; background-color: var(--accent); border-radius: 50%; animation: pulse-animation 2s infinite ease-out; }

@keyframes pulse-animation {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(3.5); opacity: 0; }
}

.spinner {
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.mt-auto { margin-top: auto; }
</style>