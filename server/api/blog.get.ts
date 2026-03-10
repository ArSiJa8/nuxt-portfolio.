import { parseStringPromise } from 'xml2js'

export default defineEventHandler(async () => {
  const FEED_URL = 'https://arsija.blogspot.com/feeds/posts/default'
  
  try {
    const rawFeed = await $fetch<string>(FEED_URL)
    // XML zu JS-Objekt parsen (xml2js muss via 'pnpm add xml2js' installiert werden)
    const result = await parseStringPromise(rawFeed)
    
    // Transformation in ein sauberes Format für das Frontend
    return result.feed.entry.map((entry: any) => ({
      id: entry.id[0],
      title: entry.title[0]._,
      published: entry.published[0],
      content: entry.content[0]._,
      link: entry.link.find((l: any) => l.$.rel === 'alternate')?.$.href
    }))
  } catch (e) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Could not load or parse feed' 
    })
  }
})
