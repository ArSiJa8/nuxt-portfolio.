<script setup lang="ts">
// In Nuxt 4 liegt der Fokus auf Typensicherheit und dem app/ Verzeichnis
const { data: posts, status, error, refresh } = await useFetch('/api/blog')

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const stripHtml = (html: string) => {
  if (!html) return "Kein Inhalt verfügbar."
  const clean = html
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .trim()
  return clean.length > 150 ? clean.substring(0, 150) + "..." : clean
}
</script>

<template>
  <UContainer class="py-20">
    <div v-if="status === 'pending'" class="flex flex-col items-center justify-center p-20">
      <UIcon name="i-lucide-refresh-cw" class="animate-spin size-8 text-primary" />
      <p class="mt-4">Synchronisiere Feed...</p>
    </div>

    <div v-else-if="error" class="text-center">
      <UIcon name="i-lucide-alert-triangle" class="size-12 text-error mx-auto" />
      <p class="mt-4 text-error">Der Blog-Feed konnte nicht geladen werden.</p>
      <UButton 
        color="error" 
        variant="ghost" 
        icon="i-lucide-refresh-ccw" 
        class="mt-4" 
        @click="refresh"
      >
        Erneut versuchen
      </UButton>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <UCard v-for="post in posts" :key="post.id" class="flex flex-col">
        <template #header>
          <UBadge variant="subtle" color="primary">
            {{ formatDate(post.published) }}
          </UBadge>
        </template>
        
        <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
        <p class="text-neutral-600 dark:text-neutral-400 flex-grow">
          {{ stripHtml(post.content) }}
        </p>
        
        <template #footer>
          <UButton 
            :to="post.link" 
            target="_blank" 
            variant="link" 
            color="primary" 
            trailing-icon="i-lucide-external-link"
          >
            Weiterlesen
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
