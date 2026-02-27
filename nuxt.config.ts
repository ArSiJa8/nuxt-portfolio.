// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 1. Global Head-Metadata
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s | ArSiJa',
      title: 'Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  // SEO & Site Config
  site: {
    name: 'ArSiJa | Portfolio',
    url: 'https://arsija.net/'
  },

  modules: [
    '@nuxtjs/html-validator',
    '@artmizu/nuxt-prometheus',
    'nuxt-gtag',
    '@nuxt/a11y',
    '@nuxt/icon',
    'reka-ui',
    'nuxt-charts',
    // Beinhaltet bereits Tailwind CSS!
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/fonts',
    '@nuxt/scripts',
    // Wichtig: /nuxt Suffix für das Modul
    '@formkit/auto-animate/nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/ngrok',
    '@nuxt/hints',
    'nuxt-echarts'
  ],

  // 2. CSS
  // Hinweis: Achte darauf, dass der Pfad ~/../assets tatsächlich existiert.
  // Meistens reicht ~/assets/css/main.css
  css: ['~/assets/css/main.css'],

  // 3. Modul-Konfigurationen
  htmlValidator: {
    usePrettier: true,
    options: {
      rules: { 'prefer-native-element': 'warn' }
    }
  },

  // Falls du spezifische Tailwind-Optionen brauchst, obwohl @nuxt/ui es nutzt:
  tailwindcss: {
    viewer: true,
    exposeConfig: true
  },

  gtag: { id: 'G-KMQQ7THXSG' },

  scripts: {
    registry: {
      clarity: {
        id: 'viobsvr01t'
      }
    }
  },

  vite: {
    server: {
      allowedHosts: true
    }
  },

  ngrok: {
    authtoken_from_env: true,
    production: false,
  },

  // 4. Runtime Config
  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_sTOIMacijF65vJNzp5keZLAhcMoQfWVhsntSKUiIkVF',
      posthogHost: 'https://eu.i.posthog.com',
      posthogDefaults: '2026-01-30'
    },
    wakatimeKey: process.env.WAKATIME_KEY
  }
})