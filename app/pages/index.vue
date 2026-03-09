<script setup lang="ts">
useSeoMeta({
  title: 'ArSiJa Portfolio | Home',
  description: 'About Me, my Skills and Projects.',
  ogTitle: 'ArSiJa Portfolio | Home',
  ogDescription: 'About Me, my Skills and Projects.',
  
})
import Scrolltest from "~/components/Scrolltest.vue";
</script>

<template>
   <div>
     <AboutMe />
      <ProjectsC />
      <CodeStats />
     <Scrolltest />
    </div>
</template>
