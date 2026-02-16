export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 1. Global Head-Metadata
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
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
    '@nuxt/scripts',
    '@formkit/auto-animate',
    '@nuxt/content',
    '@nuxtjs/color-mode'
  ],

  // 2. Validator-Regeln
  htmlValidator: {
    options: {
      rules: {
        'prefer-native-element': 'warn',
      }
    }
  },

  // 3. CSS mit Alias (besser als ../)
  css: ['../assets/css/main.css'],

  // 4. Tailwind Viewer aktivieren
  tailwindcss: {
    viewer: true
  },

  // 5. Google Analytics Config
  gtag: {
    id: 'G-KMQQ7THXSG'
  }
})

 // 6. Other Analytics
 export default defineNuxtConfig({
   runtimeConfig: {
     public: {
       posthogPublicKey: 'phc_sTOIMacijF65vJNzp5keZLAhcMoQfWVhsntSKUiIkVF',
       posthogHost: 'https://eu.i.posthog.com',
       posthogDefaults: '2026-01-30'
     }
   }
 })