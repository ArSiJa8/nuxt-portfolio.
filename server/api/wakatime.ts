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

            // LOGIK FÜR LINES OF CODE FALLBACK
            // Wir prüfen verschiedene Felder, da WakaTime das Feld oft umbenennt
            const rawLines = statsAllTime?.data?.total_lines_combined || statsAllTime?.data?.total_lines || 0

            // Wenn die API 0 liefert, nehmen wir deinen letzten bekannten Stand (z.B. 12482)
            const finalLines = rawLines > 0 ? rawLines : 12482

            return {
                sevenDays: stats7Days,
                allTime: {
                    ...statsAllTime,
                    data: {
                        ...statsAllTime.data,
                        total_lines_display: finalLines // Wir speichern den sicheren Wert hier
                    }
                }
            }
        } catch (error) {
            throw createError({ statusCode: 500, statusMessage: 'WakaTime Offline' })
        }
    }, {
        maxAge: 60 * 60,
        name: 'wakatimeStats',
        getKey: () => 'global'
    })()
})