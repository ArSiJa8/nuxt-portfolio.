export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 1. Global Head-Metadata
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'ArSiJa | Portfolio',
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
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/fonts',
    '@nuxt/scripts', // Modul ist bereits vorhanden
    '@formkit/auto-animate',
    '@nuxt/content',
    '@nuxtjs/color-mode'
  ],

  // 2. CSS
  css: ['~/../assets/css/main.css'],

  // 3. Modul-Konfigurationen
  htmlValidator: {
    options: {
      rules: { 'prefer-native-element': 'warn' }
    }
  },

  tailwindcss: { viewer: true },

  gtag: { id: 'G-KMQQ7THXSG' },

  // Konfiguration für Microsoft Clarity via Nuxt Scripts
  scripts: {
    registry: {
      clarity: {
        id: 'viobsvr01t'
      }
    }
  },

  // 4. Runtime Config
  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_sTOIMacijF65vJNzp5keZLAhcMoQfWVhsntSKUiIkVF',
      posthogHost: 'https://eu.i.posthog.com',
      posthogDefaults: '2026-01-30'
    }
  }
})