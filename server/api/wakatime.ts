export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const base64Key = Buffer.from(config.wakatimeKey).toString('base64')

    return await defineCachedFunction(async () => {
        try {
            const [stats7Days, statsAllTime] = await Promise.all([
                $fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
                    headers: { Authorization: `Basic ${base64Key}` }
                }),
                $fetch("https://wakatime.com/api/v1/users/current/stats/all_time", {
                    headers: { Authorization: `Basic ${base64Key}` }
                })
            ])

            return {
                sevenDays: stats7Days,
                allTime: statsAllTime
            }
        } catch (error) {
            throw createError({ statusCode: 500, statusMessage: 'WakaTime Error' })
        }
    }, {
        maxAge: 60 * 60,
        name: 'wakatimeStats',
        getKey: () => 'global'
    })()
})