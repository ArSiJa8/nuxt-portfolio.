<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  }
})
</script>
<template>
  <NuxtLayout>
    <main>
      <AboutMe />
      <CodeStats />
    </main>
  </NuxtLayout>
</template>