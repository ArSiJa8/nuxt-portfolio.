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
      <ProjectsC />
      <CodeStats />
    </main>
  </NuxtLayout>
</template>