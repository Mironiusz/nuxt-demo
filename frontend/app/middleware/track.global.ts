export default defineNuxtRouteMiddleware((to) => {
    if (!import.meta.client) {
        return
    }

    const history = useState<string[]>("route-history", () => [])
    history.value = [to.fullPath, ...history.value.filter((path) => path !== to.fullPath)].slice(0, 6)
})
