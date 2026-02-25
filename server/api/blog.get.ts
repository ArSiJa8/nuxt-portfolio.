export default defineEventHandler(async () => {
    const FEED_URL = 'https://arsija.blogspot.com/feeds/posts/default';
    try {
        // Fetching the XML from Blogger server-side
        return await $fetch(FEED_URL, { parseResponse: (txt) => txt });
    } catch (e) {
        throw createError({ statusCode: 500, message: 'Could not load feed' });
    }
});