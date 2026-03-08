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
            colors: {
                'blue-white': {
                    50: '#f8faff',  // Fast reines Weiß
                    100: '#f0f7ff', // Ein Hauch von Blau
                    200: '#e0efff',
                    300: '#bae0ff',
                    400: '#7cc2ff',
                    500: '#93c5fd', // Hauptfarbe (Primary-Standard)
                    600: '#60a5fa',
                    700: '#3b82f6',
                    800: '#2563eb',
                    900: '#1d4ed8',
                    950: '#172554',
                },
            },
        },
    },
    plugins: [],
}