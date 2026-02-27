<script setup>
/**
 * WakaTime Integration - Final Version
 * Logic: Realtime Status, Fallback LoC, SVG Donut Charts & Tooltips
 */
const { data: stats, pending } = await useFetch('/api/wakatime')

const ActiveDate = 'Feb 21, 2026'

// Zeit-Formatierer
const formatTime = (timeString) => {
  if (!timeString) return '0h 0m'
  return timeString.replace(/\s*hrs?\s*/g, 'h ').replace(/\s*mins?\s*/g, 'm').trim()
}

// Daten-Mapping
const topLanguages = computed(() => stats.value?.sevenDays?.data?.languages?.slice(0, 5) || [])
const editors = computed(() => stats.value?.sevenDays?.data?.editors || [])
const totalLines = computed(() => stats.value?.allTime?.data?.total_lines_display?.toLocaleString() || '12,482')

const langColors = ['#3178c6', '#41b883', '#3d59a1', '#f7df1e', '#e34f26']
const editorColor = '#00cdfe'

const getIcon = (lang) => {
  const icons = {
    'TypeScript': 'i-logos-typescript-icon',
    'Vue.js': 'i-logos-vue',
    'JavaScript': 'i-logos-javascript',
    'CSS': 'i-logos-css-3',
    'HTML': 'i-logos-html-5'
  }
  return icons[lang] || 'i-heroicons-code-bracket-20-solid'
}
</script>

<template>
  <section class="coding-activity-wrapper">
    <div class="container-custom">

      <div class="header-unit">
        <div class="live-status-container">
          <div class="live-badge" :class="{ 'is-coding': stats?.isActive }">
            <div class="pulse-wrapper">
              <span class="pulse-dot-fixed"></span>
              <span class="pulse-ring"></span>
            </div>
            <span class="live-text">{{ stats?.isActive ? 'Coding Now' : 'Currently Away' }}</span>
          </div>
          <span class="since-text">Global metrics since {{ ActiveDate }}</span>
        </div>

        <h2 class="main-title">Development Activity</h2>

        <div class="update-info-box">
          <span class="badge-update">Updates every 24 Hours</span>
          <p class="accuracy-note">From what I see now, this isn't that accurate.</p>
        </div>
      </div>

      <div v-if="!pending && stats" class="stats-flex-container">

        <div class="stat-card">
          <h3 class="card-label">Overall Analytics</h3>
          <div class="stats-display-vertical">
            <div class="stat-block">
              <span class="stat-value-large">{{ formatTime(stats?.allTime?.data?.human_readable_total) }}</span>
              <span class="stat-sublabel">Total Time Invested</span>
            </div>
            <div class="divider-glass"></div>
            <div class="stat-block">
              <span class="stat-value-mid">{{ totalLines }}</span>
              <span class="stat-sublabel">Lines of Code</span>
              <div class="loc-info-badge">
                <UIcon name="i-heroicons-information-circle" class="loc-info-icon" />
                <span>Aggregated from all projects</span>
              </div>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <h3 class="card-label">Editor Usage</h3>
          <div class="visual-content">
            <div class="donut-container chart-hover">
              <svg viewBox="0 0 36 36" class="donut">
                <path class="donut-ring" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="3"></path>
                <path class="donut-segment" :stroke="editorColor" stroke-width="3" stroke-dasharray="100, 0" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"></path>
              </svg>
              <div class="donut-center default-text">
                <span class="editor-name-center">{{ editors[0]?.name || 'IDE' }}</span>
              </div>
              <div class="custom-tooltip">
                <span>{{ editors[0]?.text || 'Active' }}</span>
              </div>
            </div>
            <div class="chart-legend-vertical">
              <div v-for="editor in editors" :key="editor.name" class="legend-row has-tooltip">
                <span class="dot" :style="{ background: editorColor }"></span>
                <span class="legend-name">{{ editor.name }}</span>
                <span class="legend-val">{{ editor.percent }}%</span>
                <div class="tooltip-box">Total: {{ editor.text }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <h3 class="card-label">Tech Distribution</h3>
          <div class="visual-content">
            <div class="donut-container chart-hover">
              <svg viewBox="0 0 36 36" class="donut">
                <path class="donut-ring" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="3"></path>
                <path v-for="(lang, i) in topLanguages" :key="i"
                      class="donut-segment" :stroke="langColors[i]" stroke-width="3"
                      :stroke-dasharray="`${lang.percent} ${100 - lang.percent}`"
                      :stroke-dashoffset="100 - topLanguages.slice(0, i).reduce((a, b) => a + b.percent, 0)"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"></path>
              </svg>
              <div class="donut-center default-text">
                <span class="editor-name-center">7 Days</span>
              </div>
              <div class="custom-tooltip">
                <span>Weekly Trend</span>
              </div>
            </div>
            <div class="chart-legend-vertical">
              <div v-for="(lang, i) in topLanguages" :key="lang.name" class="legend-row has-tooltip">
                <span class="dot" :style="{ background: langColors[i] }"></span>
                <UIcon :name="getIcon(lang.name)" class="w-3 h-3" />
                <span class="legend-name">{{ lang.name }}</span>
                <span class="legend-val">{{ lang.percent }}%</span>
                <div class="tooltip-box">{{ lang.text }} this week</div>
              </div>
            </div>
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

/* HEADER */
.header-unit { display: flex; flex-direction: column; align-items: center; margin-bottom: 50px; text-align: center; }
.main-title { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 950; color: white; text-transform: uppercase; letter-spacing: -2px; margin-bottom: 12px; }

.update-info-box { margin-top: 1.2rem; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.badge-update { background: rgba(85, 135, 255, 0.1); color: #5587ff; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 14px; border-radius: 50px; border: 1px solid rgba(85, 135, 255, 0.2); letter-spacing: 1px; }
.accuracy-note { font-size: 0.65rem; color: rgba(255, 255, 255, 0.25); font-style: italic; }

/* CARDS GRID */
.stats-flex-container { display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; }
.stat-card {
  flex: 1; min-width: 380px; max-width: 450px;
  background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px; padding: 40px; min-height: 520px;
  display: flex; flex-direction: column; backdrop-filter: blur(25px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.stat-card:hover { border-color: rgba(255, 255, 255, 0.2); transform: translateY(-8px); }
.card-label { color: rgba(255, 255, 255, 0.2); font-size: 10px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin-bottom: 30px; }

/* VISUALS (DONUTS) */
.visual-content { flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; }
.donut-container { width: 170px; height: 170px; position: relative; transition: transform 0.3s ease; cursor: help; }
.chart-hover:hover { transform: scale(1.05); }

.donut-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: opacity 0.3s ease; pointer-events: none; }
.editor-name-center { font-size: 0.9rem; font-weight: 800; color: white; }

.custom-tooltip { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); opacity: 0; transition: all 0.3s ease; color: #5587ff; font-weight: 900; font-size: 0.8rem; text-align: center; pointer-events: none; }
.chart-hover:hover .custom-tooltip { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.chart-hover:hover .default-text { opacity: 0; }

/* CSS TOOLTIP BOX */
.has-tooltip { position: relative; }
.tooltip-box {
  position: absolute; bottom: 130%; left: 50%; transform: translateX(-50%) translateY(10px);
  background: #0a0a0a; color: white; padding: 8px 14px; border-radius: 10px; font-size: 0.75rem;
  white-space: nowrap; opacity: 0; visibility: hidden; transition: all 0.25s ease;
  border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 100;
}
.has-tooltip:hover .tooltip-box { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }

/* STATUS & TYPO */
.is-coding .pulse-dot-fixed, .is-coding .pulse-ring { background-color: #41b883; }
.is-coding .live-text { color: #41b883; }

.stat-value-large { font-size: 4rem; font-weight: 900; color: white; letter-spacing: -3px; }
.stat-value-mid { font-size: 3rem; font-weight: 800; color: white; letter-spacing: -1px; }
.stat-sublabel { font-size: 0.8rem; color: #5587ff; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; margin-top: 8px; display: block; }

.divider-glass { height: 1px; width: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); margin: 25px 0; }

.live-badge { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); padding: 6px 16px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.08); }
.live-text { font-size: 10px; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.4); }

.pulse-wrapper { position: relative; width: 8px; height: 8px; }
.pulse-dot-fixed { width: 8px; height: 8px; background-color: rgba(255,255,255,0.3); border-radius: 50%; z-index: 2; }
.pulse-ring { position: absolute; width: 100%; height: 100%; background-color: rgba(255,255,255,0.3); border-radius: 50%; animation: pulse-animation 2s infinite; }

@keyframes pulse-animation { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(3.5); opacity: 0; } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.loading-placeholder { text-align: center; padding: 120px 0; color: rgba(255, 255, 255, 0.3); }
.spinner { width: 35px; height: 35px; animation: spin 2s linear infinite; margin-bottom: 15px; }

.legend-row { display: flex; align-items: center; gap: 14px; padding: 4px 8px; transition: background 0.2s ease; border-radius: 8px; cursor: default; }
.legend-row:hover { background: rgba(255,255,255,0.04); }
.dot { width: 8px; height: 8px; border-radius: 2px; }
.legend-name { color: rgba(255,255,255,0.6); flex-grow: 1; font-size: 0.85rem; }
.legend-val { color: white; font-weight: 800; font-size: 0.8rem; }
</style>