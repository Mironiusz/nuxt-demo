export default defineEventHandler(async (event) => {
    const body = await readBody<{ name?: string }>(event)
    const name = body.name?.trim()

    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Imię jest wymagane",
        })
    }

    return {
        message: `Cześć ${name}. Endpoint Nitro odebrał żądanie POST.`,
        receivedAt: new Date().toISOString(),
    }
})
