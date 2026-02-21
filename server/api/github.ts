// server/api/github.ts
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const username = 'ArSiJa8'

    try {
        // Einfaches Beispiel: Deine Repositories abrufen
        const repos = await $fetch(`https://api.github.com/users/${username}/repos?sort=updated`)

        // Beispiel: Dein Profil abrufen (Follower, Public Repos etc.)
        const profile = await $fetch(`https://api.github.com/users/${username}`)

        return { repos, profile }
    } catch (error) {
        return { error: 'GitHub Data could not be fetched' }
    }
})