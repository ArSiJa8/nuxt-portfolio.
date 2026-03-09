<script setup lang="ts">
// In Nuxt 4 nutzen wir das neue Verzeichnis-Schema (app/)
// useFetch profitiert nun von den vorverarbeiteten Daten des Servers
const { data: posts, pending, error, refresh } = await useFetch('/api/blog')

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const stripHtml = (html: string) => {
  if (!html) return "No content available."
  const clean = html
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .trim()
  return clean.length > 150 ? clean.substring(0, 150) + "..." : clean
}
</script>

<template>
  <section id="blog" class="py-20 relative overflow-hidden">
    <div class="container-white">
      <div v-if="pending" class="flex flex-col items-center justify-center p-20">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
        <p>Syncing Feed...</p>
      </div>

      <div v-else-if="error" class="text-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-red-400" />
        <p>Failed to load the blog feed.</p>
        <UButton @click="refresh" class="mt-4">Retry</UButton>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article v-for="post in posts" :key="post.id" class="card">
          <div class="badge">
            {{ formatDate(post.published) }}
          </div>
          <h3>{{ post.title }}</h3>
          <p>{{ stripHtml(post.content) }}</p>
          <a :href="post.link" target="_blank">Read More</a>
        </article>
      </div>
    </div>
  </section>
</template>
