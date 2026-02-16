import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        projects: defineCollection({
            type: 'page',
            source: 'projects/*.md'
        }),
        posts: defineCollection({
            type: 'page',
            source: 'blog/*.md'
        })
    }
})