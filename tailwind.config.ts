// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        // Nuxt 3 scannt diese Ordner automatisch,
        // du musst sie hier nur hinzufügen, wenn du außergewöhnliche Pfade hast.
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {
            // Hier kommen deine eigenen Farben/Fonts rein
        },
    },
    plugins: [],
}