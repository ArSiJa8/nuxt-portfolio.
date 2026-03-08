import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useScrollReveal = () => {
    // Wichtig: GSAP Plugins nur auf dem Client registrieren
    if (import.meta.client) {
        gsap.registerPlugin(ScrollTrigger)
    }

    const revealText = (element: HTMLElement) => {
        if (!element) return

        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%', // Startet, wenn das Element 85% im Viewport ist
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: 'power3.out',
        })
    }

    return { revealText }
}