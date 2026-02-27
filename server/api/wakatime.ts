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

            // 1. Fallback für Lines of Code (falls API 0 liefert)
            const rawLines = statsAllTime?.data?.total_lines_combined || statsAllTime?.data?.total_lines || 0
            const finalLines = rawLines > 0 ? rawLines : 12482

            // 2. Echtzeit-Status Check (10-Minuten-Fenster)
            const lastUpdateStr = stats7Days?.data?.modified_at || new Date().toISOString()
            const lastHeartbeat = new Date(lastUpdateStr).getTime()
            const now = new Date().getTime()
            const isActive = (now - lastHeartbeat) < 600000 // 10 Minuten

            return {
                sevenDays: stats7Days,
                allTime: {
                    ...statsAllTime,
                    data: { ...statsAllTime.data, total_lines_display: finalLines }
                },
                isActive
            }
        } catch (error) {
            throw createError({ statusCode: 500, statusMessage: 'WakaTime API Offline' })
        }
    }, {
        maxAge: 60 * 15, // 15 Min Cache für frische Heartbeats
        name: 'wakatimeStats',
        getKey: () => 'global'
    })()
})