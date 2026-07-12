export default defineEventHandler(() => {
    return articles.map(({ sections, ...article }) => article)
})
