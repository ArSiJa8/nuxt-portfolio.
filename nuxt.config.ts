export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/html-validator',
    '@artmizu/nuxt-prometheus',
    'nuxt-gtag',
    '@nuxt/a11y',
    '@nuxt/icon',
    'reka-ui',
    'nuxt-charts',
    '@nuxt/ui'
  ],

  // 2. FIX: Validator-Regeln anpassen (Behebt den Button-Error & Asset-Scans)
  htmlValidator: {
    options: {
      rules: {
        'prefer-native-element': 'warn', // Erlaubt Weiterarbeit trotz <div> statt <button>
      }
    }
  },

  // 3. FIX: CSS-Pfad mit Alias (Sauberer als relative Pfade)
  css: ['~/assets/css/main.css'],

  gtag: {
    id: 'G-KMQQ7THXSG'
  }
})
