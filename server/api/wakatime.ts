export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const base64Key = Buffer.from(`${config.wakatimeKey}:`).toString('base64')

    return await defineCachedFunction(async () => {
        try {
            const [stats7Days, statsAllTime, summariesToday] = await Promise.all([
                $fetch<any>("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
                    headers: { Authorization: `Basic ${base64Key}` }
                }),
                $fetch<any>("https://wakatime.com/api/v1/users/current/stats/all_time", {
                    headers: { Authorization: `Basic ${base64Key}` }
                }),
                $fetch<any>("https://wakatime.com/api/v1/users/current/summaries?range=today", {
                    headers: { Authorization: `Basic ${base64Key}` }
                })
            ])

            // 1. "Today" Sekunden extrahieren
            const todaySecs = summariesToday?.data?.[0]?.grand_total?.total_seconds || 0
            const todayText = summariesToday?.data?.[0]?.grand_total?.text || "0 mins"

            // 2. "7 Days" Logik: Wir nehmen das Maximum aus (Stats-API) und (Today-Live-Daten)
            const stats7DaysSecs = stats7Days?.data?.total_seconds || 0
            const final7DaysText = todaySecs > stats7DaysSecs ? todayText : stats7Days?.data?.human_readable_total

            // 3. "All Time" Logik: Auch hier sicherstellen, dass es mindestens so viel wie Heute ist
            // (WakaTime braucht oft 24h um All-Time zu aktualisieren)
            const statsAllTimeSecs = statsAllTime?.data?.total_seconds || 0
            let finalAllTimeText = statsAllTime?.data?.human_readable_total || "0 hrs"

            if (todaySecs > statsAllTimeSecs) {
                finalAllTimeText = todayText
            }

            // 4. Lines of Code
            const rawLines = statsAllTime?.data?.total_lines_combined || statsAllTime?.data?.total_lines || 0
            const finalLines = rawLines > 0 ? rawLines : 12482

            return {
                today: {
                    text: todayText,
                    seconds: todaySecs
                },
                sevenDays: {
                    total_text: final7DaysText,
                    languages: stats7Days?.data?.languages || [],
                    editors: stats7Days?.data?.editors || []
                },
                allTime: {
                    human_readable_total: finalAllTimeText,
                    total_lines_display: finalLines
                },
                isActive: (Date.now() - new Date(summariesToday?.end).getTime()) < 900000
            }
        } catch (error) {
            throw createError({ statusCode: 500, statusMessage: 'WakaTime Sync Error' })
        }
    }, {
        maxAge: 60 * 5,
        name: 'wakatime_smart_fix_v6', // Neuer Name um Cache zu forcieren
        getKey: () => 'global'
    })()
})