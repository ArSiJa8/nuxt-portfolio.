export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 1. FIX: Globale Head-Metadaten (Behebt "lang" und "title" Fehler)
  app: {
    head: {
      htmlAttrs: {
        lang: 'de' // Setzt das erforderliche lang-Attribut
      },
      title: 'Mein Nuxt Projekt', // Setzt den erforderlichen <title>
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

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

  // 2. FIX: Validator-Regeln anpassen
  htmlValidator: {
    options: {
      rules: {
        'prefer-native-element': 'warn',
      }
    }
  },

  // 3. FIX: CSS-Pfad mit Alias
  css: ['~/assets/css/main.css'],

  gtag: {
    id: 'G-KMQQ7THXSG'
  }
})