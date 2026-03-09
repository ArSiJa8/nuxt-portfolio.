// server/api/blog.ts
import { parseStringPromise } from 'xml2js'

export default defineEventHandler(async () => {
  const FEED_URL = 'https://arsija.blogspot.com/feeds/posts/default'
  
  try {
    const rawXml = await $fetch<string>(FEED_URL)
    const result = await parseStringPromise(rawXml)
    
    // Extraktion der Einträge aus dem Blogger-Format (Atom/RSS)
    const entries = result.feed.entry || []
    
    return entries.map((entry: any) => ({
      id: entry.id?.[0],
      title: entry.title?.[0]?._ || entry.title?.[0],
      published: entry.published?.[0],
      content: entry.content?.[0]?._ || entry.content?.[0],
      link: entry.link?.find((l: any) => l.$.rel === 'alternate')?.$.href
    })).slice(0, 6)
    
  } catch (e) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Could not load or parse feed' 
    })
  }
})
