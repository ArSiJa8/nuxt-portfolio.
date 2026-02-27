<script setup>
/**
 * WakaTime Integration - Full Component
 * Features: All-Time Stats, 7-Day Trends, Editor & Language Charts
 */

const { data: stats, pending } = await useFetch('/api/wakatime')

const ActiveDate = 'Feb 21, 2026'

// Hilfsfunktion für einheitliche Zeit-Anzeige (Stunden/Minuten)
const formatTime = (timeString) => {
  if (!timeString) return '0h 0m'
  return timeString
      .replace(/\s*hrs?\s*/g, 'h ')
      .replace(/\s*mins?\s*/g, 'm')
      .replace(/\s*secs?\s*/g, 's')
      .trim()
}

// Daten-Aufbereitung
const topLanguages = computed(() => stats.value?.sevenDays?.data?.languages?.slice(0, 5) || [])
const editors = computed(() => stats.value?.sevenDays?.data?.editors || [])

const totalLines = computed(() => {
  const lines = stats.value?.allTime?.data?.total_lines_combined || stats.value?.allTime?.data?.total_lines
  return lines ? lines.toLocaleString() : '0'
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

// Farben für die Diagramme
const langColors = ['#3178c6', '#41b883', '#3d59a1', '#f7df1e', '#e34f26']
const editorColor = '#00cdfe' // WebStorm Cyan
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

        <div class="update-info-box">
          <span class="badge-update">Updates every 24 Hours</span>
          <p class="accuracy-note">From what I see now, this isn't that accurate.</p>
        </div>

        <div class="title-line"></div>
      </div>

      <div v-if="!pending && stats" class="stats-flex-container">

        <div class="stat-card">
          <h3 class="card-label">Overall Stats (All Time)</h3>
          <div class="stats-display-vertical">
            <div class="stat-block">
              <span class="stat-value-large">{{ formatTime(stats?.allTime?.data?.human_readable_total) }}</span>
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
          <h3 class="card-label">Editor Distribution</h3>
          <div class="visual-content">
            <div class="donut-container">
              <svg viewBox="0 0 36 36" class="donut">
                <path class="donut-ring" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="3"></path>
                <path class="donut-segment" :stroke="editorColor" stroke-width="3" stroke-dasharray="100, 0" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"></path>
              </svg>
              <div class="donut-center">
                <span class="editor-name-center">{{ editors[0]?.name || 'IDE' }}</span>
              </div>
            </div>
            <div class="chart-legend-vertical">
              <div v-for="editor in editors" :key="editor.name" class="legend-row">
                <span class="dot" :style="{ background: editorColor }"></span>
                <span class="legend-name">{{ editor.name }}</span>
                <span class="legend-val">{{ editor.percent }}%</span>
              </div>
            </div>
          </div>
          <div class="disclaimer-box mt-auto">
            <UIcon name="i-heroicons-clock-20-solid" class="info-icon" />
            <span>Weekly: {{ formatTime(stats?.sevenDays?.data?.human_readable_total) }}</span>
          </div>
        </div>

        <div class="stat-card">
          <h3 class="card-label">Tech Distribution</h3>
          <div class="visual-content">
            <div class="donut-container">
              <svg viewBox="0 0 36 36" class="donut">
                <path class="donut-ring" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="3"></path>
                <path v-for="(lang, i) in topLanguages" :key="i"
                      class="donut-segment" :stroke="langColors[i]" stroke-width="3"
                      :stroke-dasharray="`${lang.percent} ${100 - lang.percent}`"
                      :stroke-dashoffset="100 - topLanguages.slice(0, i).reduce((a, b) => a + b.percent, 0)"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"></path>
              </svg>
            </div>
            <div class="chart-legend-vertical">
              <div v-for="(lang, i) in topLanguages" :key="lang.name" class="legend-row">
                <span class="dot" :style="{ background: langColors[i] }"></span>
                <span class="legend-name">{{ lang.name }}</span>
                <span class="legend-val">{{ lang.percent }}%</span>
              </div>
            </div>
          </div>
          <div class="disclaimer-box mt-auto">
            <UIcon name="i-heroicons-fire-20-solid" class="info-icon" />
            <span>Avg Daily: {{ formatTime(stats?.sevenDays?.data?.human_readable_daily_average) }}</span>
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
.coding-activity-wrapper { width: 100%; padding: 60px 0 80px; display: flex; justify-content: center; }
.container-custom { max-width: 1400px; width: 100%; padding: 0 40px; }

/* HEADER & NEW ELEMENTS */
.header-unit { display: flex; flex-direction: column; align-items: center; margin-bottom: 40px; text-align: center; }
.main-title { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; color: white; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 12px; }

.update-info-box { margin-top: 1rem; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.badge-update { background: rgba(85, 135, 255, 0.1); color: var(--accent); font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 12px; border-radius: 50px; border: 1px solid rgba(85, 135, 255, 0.2); letter-spacing: 1px; }
.accuracy-note { font-size: 0.65rem; color: rgba(255, 255, 255, 0.25); font-style: italic; }

.live-badge { display: flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.03); padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(255, 255, 255, 0.08); }
.live-text { font-size: 9px; font-weight: 800; text-transform: uppercase; color: rgba(255, 255, 255, 0.5); }
.since-text { font-size: 10px; color: rgba(255, 255, 255, 0.2); }

/* STATS FLEX GRID */
.stats-flex-container { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }

.stat-card {
  flex: 1; min-width: 380px; max-width: 450px;
  background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px; padding: 35px; min-height: 500px;
  display: flex; flex-direction: column; backdrop-filter: blur(20px) saturate(180%);
  transition: all 0.4s ease;
}
.stat-card:hover { border-color: rgba(255, 255, 255, 0.2); transform: translateY(-5px); }

.card-label { color: rgba(255, 255, 255, 0.2); font-size: 10px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin-bottom: 25px; }

/* VISUALS (DONUTS) */
.visual-content { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; }
.donut-container { width: 160px; height: 160px; position: relative; }
.donut-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
.editor-name-center { font-size: 0.8rem; font-weight: 800; color: white; }

.chart-legend-vertical { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.legend-row { display: flex; align-items: center; gap: 12px; font-size: 0.85rem; }
.dot { width: 8px; height: 8px; border-radius: 2px; }
.legend-name { color: rgba(255, 255, 255, 0.6); flex-grow: 1; }
.legend-val { color: white; font-weight: 800; font-size: 0.75rem; }

/* TYPO ALL TIME */
.stats-display-vertical { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; gap: 25px; }
.stat-block { text-align: center; }
.stat-value-large { font-size: 3.8rem; font-weight: 900; color: white; display: block; line-height: 1; letter-spacing: -2px; }
.stat-value-mid { font-size: 2.8rem; font-weight: 800; color: white; display: block; letter-spacing: -1px; }
.stat-sublabel { font-size: 0.75rem; color: var(--accent); text-transform: uppercase; font-weight: bold; letter-spacing: 2px; margin-top: 8px; display: block; }

/* UTILS */
.divider-glass { height: 1px; width: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); }
.loc-info-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; padding: 4px 10px; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); }
.loc-info-icon { width: 12px; height: 12px; color: rgba(255, 255, 255, 0.2); }
.loc-info-badge span { font-size: 0.65rem; color: rgba(255, 255, 255, 0.3); }

.bar-bg { height: 6px; width: 100%; background: rgba(255, 255, 255, 0.05); border-radius: 10px; overflow: hidden; }
.bar-fill { height: 100%; background: var(--accent); transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1); }
.bar-fill.gradient { background: linear-gradient(90deg, var(--accent), var(--accent-hover)); }

.disclaimer-box { padding-top: 20px; display: flex; align-items: center; gap: 8px; font-size: 0.7rem; color: rgba(255, 255, 255, 0.2); border-top: 1px solid rgba(255, 255, 255, 0.05); }
.progress-labels { display: flex; justify-content: space-between; font-size: 9px; color: rgba(255, 255, 255, 0.2); margin-bottom: 8px; font-weight: bold; text-transform: uppercase; }

/* PULSE ANIMATION */
.pulse-wrapper { position: relative; width: 8px; height: 8px; }
.pulse-dot-fixed { width: 7px; height: 7px; background-color: var(--accent); border-radius: 50%; z-index: 2; }
.pulse-ring { position: absolute; width: 100%; height: 100%; background-color: var(--accent); border-radius: 50%; animation: pulse-animation 2s infinite ease-out; }

@keyframes pulse-animation { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(3.5); opacity: 0; } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.loading-placeholder { text-align: center; padding: 100px 0; color: rgba(255, 255, 255, 0.3); }
.spinner { width: 30px; height: 30px; animation: spin 2s linear infinite; margin-bottom: 10px; }
.mt-auto { margin-top: auto; }
</style>