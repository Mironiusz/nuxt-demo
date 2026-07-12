interface ContactBody {
    name?: string
    email?: string
    topic?: string
    message?: string
    consent?: boolean
}

export default defineEventHandler(async (event) => {
    const body = await readBody<ContactBody>(event)

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim() || !body.consent) {
        throw createError({
            statusCode: 400,
            statusMessage: "Niekompletne dane formularza",
        })
    }

    if (!body.email.includes("@")) {
        throw createError({
            statusCode: 422,
            statusMessage: "Niepoprawny adres e-mail",
        })
    }

    return {
        message: `Dziękujemy ${body.name}. Otrzymaliśmy temat: ${body.topic || "brak tematu"}.`,
        receivedAt: new Date().toISOString(),
    }
})
