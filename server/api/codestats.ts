export default defineEventHandler(async (event) => {

    const username = 'ArSi'

    try {

        const data = await $fetch(`https://codestats.net/api/users/${username}`)
        return data
    } catch (error) {
        return { error: 'Error while fetching Data' }
    }
})