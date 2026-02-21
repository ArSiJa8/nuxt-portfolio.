export default defineEventHandler(async (event) => {
    const username = 'ArSi'

    try {
        // Wir fügen einen Timeout hinzu, damit der Server nicht ewig wartet
        const data = await $fetch(`https://codestats.net/api/users/${username}`, {
            retry: 3,
            retryDelay: 1000
        })
        return data
    } catch (error: any) {
        console.error('CodeStats Sync Error:', error.message)
        throw createError({
            statusCode: error.response?.status || 500,
            message: 'Could not fetch data from CodeStats',
        })
    }
})