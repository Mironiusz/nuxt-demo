const statuses = ["ready", "pending", "error"] as const

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const config = useRuntimeConfig(event)
    const requestedLimit = Number(query.limit ?? 4)
    const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 8) : 4

    return {
        generatedAt: new Date().toISOString(),
        requestId: crypto.randomUUID(),
        source: "server/api/demo.get.ts",
        serverConfigLoaded: Boolean(config.demoSecret),
        items: Array.from({ length: limit }, (_, index) => ({
            id: index + 1,
            name: `Proces demonstracyjny ${index + 1}`,
            status: statuses[index % statuses.length],
            progress: 22 + ((index * 17) % 76),
        })),
    }
})
