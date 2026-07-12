export default defineEventHandler((event) => {
    const slug = getRouterParam(event, "slug")
    const article = articles.find((item) => item.slug === slug)

    if (!article) {
        throw createError({
            statusCode: 404,
            statusMessage: "Nie znaleziono artykułu",
        })
    }

    return article
})
