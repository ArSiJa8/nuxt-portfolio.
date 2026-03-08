<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'

const quotes = [
  { text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.", author: "Patrick McKenzie" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" }
]

const currentIndex = ref(0)
const containerRef = useTemplateRef('quoteContainer')
let timer: ReturnType<typeof setInterval>

const goToQuote = (index: number) => {
  if (index === currentIndex.value) return

  const el = containerRef.value
  if (!el) return

  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    onComplete: () => {
      currentIndex.value = index

      gsap.fromTo(el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }
  })
}

// Startet den automatischen Wechsel
const startTimer = () => {
  timer = setInterval(() => {
    const next = (currentIndex.value + 1) % quotes.length
    goToQuote(next)
  }, 5000)
}

// Setzt den Timer nach einer manuellen Interaktion zurück
const resetTimer = () => {
  clearInterval(timer)
  startTimer()
}

// Kombinierter Handler für den Button-Klick
const handleUserClick = (index: number) => {
  if (index === currentIndex.value) return
  goToQuote(index)
  resetTimer()
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center px-[8%]">

    <div class="min-h-[300px] md:min-h-[200px] flex flex-col justify-center items-center w-full">
      <div ref="quoteContainer" class="text-center max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          <q>{{ quotes[currentIndex].text }}</q>
          <br><br>
          <span class="text-xl font-normal italic text-gray-500">
            – {{ quotes[currentIndex].author }}
          </span>
        </h2>
      </div>
    </div>

    <div class="flex gap-3 mt-12">
      <button
          v-for="(_, index) in quotes"
          :key="index"
          @click="handleUserClick(index)"
          class="h-3 rounded-full transition-all duration-500 ease-in-out"
          :class="currentIndex === index
          ? 'bg-primary-500 w-8 shadow-[0_0_10px_rgba(147,197,253,0.8)]'
          : 'bg-gray-300 dark:bg-gray-700 w-3 hover:bg-primary-300'"
          :aria-label="`Go to quote ${index + 1}`"
          style="top-margin: 15px;"
      />
    </div>

  </div>
</template>