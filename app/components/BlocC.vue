<template>
  <section id="blog" class="py-20 relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -z-10"></div>

    <div class="container-white">
      <div class="mb-16">
        <h5>Latest Insights</h5>
        <h2 class="text-4xl md:text-5xl mb-4">ArSi's Blog</h2>
        <div class="w-20 h-1 bg-accent mx-auto rounded-full mb-6"></div>
        <p class="max-w-2xl mx-auto opacity-90">
          Exploring code, design, and technical experiments. Stay updated with my latest thoughts and discoveries.
        </p>
      </div>

      <div v-if="pending" class="flex flex-col items-center justify-center p-20 gap-6">
        <div class="relative flex items-center justify-center">
          <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 animate-spin text-accent" />
          <div class="absolute inset-0 blur-lg bg-accent/30 animate-pulse"></div>
        </div>
        <p class="text-sm tracking-[0.2em] uppercase opacity-60 font-semibold">Syncing Feed...</p>
      </div>

      <div v-else-if="error" class="card border-red-500/30 max-w-lg mx-auto">
        <div class="flex flex-col items-center text-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-10 h-10 text-red-400 mb-4" />
          <p class="text-red-400 font-medium">Failed to load the blog feed.</p>
          <p class="text-xs opacity-60 mt-2">The Blogger API might be temporarily unavailable.</p>
          <button @click="refresh" class="btn btn-glass mt-6 !py-2 !px-6 text-sm">Retry</button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <article
            v-for="post in posts"
            :key="post.id"
            class="card group hover:-translate-y-3 transition-all duration-500 flex flex-col h-full"
        >
          <div class="flex items-center gap-2 mb-6">
            <span class="badge flex items-center gap-1.5">
              <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
              {{ formatDate(post.published) }}
            </span>
          </div>

          <h3 class="text-left text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300 leading-snug">
            {{ post.title }}
          </h3>

          <p class="text-left text-sm opacity-70 line-clamp-4 mb-8 flex-grow leading-relaxed">
            {{ stripHtml(post.content) }}
          </p>

          <div class="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
            <a :href="post.link" target="_blank" class="nav-link !text-sm flex items-center gap-2 group/link">
              Read More
              <UIcon name="i-heroicons-arrow-right-20-solid" class="transition-transform group-hover/link:translate-x-1" />
            </a>
          </div>
        </article>
      </div>
      
    </div>
  </section>
</template>

<script setup>
/**
 * Using our internal API proxy to bypass CORS
 */
const { data: posts, pending, error, refresh } = await useFetch('/api/blog', {
  transform: (data) => {
    if (!data) return [];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const entries = xmlDoc.getElementsByTagName("entry");

    return Array.from(entries).map(entry => ({
      id: entry.getElementsByTagName("id")[0]?.textContent,
      title: entry.getElementsByTagName("title")[0]?.textContent,
      published: entry.getElementsByTagName("published")[0]?.textContent,
      content: entry.getElementsByTagName("content")[0]?.textContent,
      link: Array.from(entry.getElementsByTagName("link"))
          .find(l => l.getAttribute("rel") === "alternate")
          ?.getAttribute("href")
    })).slice(0, 6); // Limiting to the 6 latest posts for a cleaner grid
  }
});

/**
 * Formats date to a clean English format
 */
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Cleans HTML for the text preview
 */
const stripHtml = (html) => {
  if (!html) return "No content available.";
  const clean = html
      .replace(/<[^>]*>?/gm, '') // Remove tags
      .replace(/&nbsp;/g, ' ')   // Clean spaces
      .replace(/&amp;/g, '&')
      .trim();
  return clean.length > 150 ? clean.substring(0, 150) + "..." : clean;
};
</script>

<style scoped>
/* Specific Card tweaks to ensure the Liquid Glass look works with the grid */
.card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
}

/* Custom Line Clamp (Ensures browser support) */
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Overriding global p/h text alignment if needed for the grid */
.card h3, .card p {
  text-align: left !important;
}

/* Accent Glow Badge */
.badge {
  background: rgba(85, 135, 255, 0.1);
  color: #a3c0ff;
  border: 1px solid rgba(85, 135, 255, 0.2);
  box-shadow: 0 0 15px rgba(85, 135, 255, 0.05);
}
</style>