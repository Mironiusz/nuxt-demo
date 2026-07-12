export default defineNuxtConfig({
    modules: ["@nuxt/eslint", "@nuxt/ui"],

    devtools: {
        enabled: true,
    },

    app: {
        head: {
            titleTemplate: "%s · Nuxt Demo",
            link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
            meta: [{ name: "theme-color", content: "#2563eb" }],
        },
    },

    css: ["~/assets/css/main.css"],

    runtimeConfig: {
        demoSecret: "server-only-demo-value",
        public: {
            siteName: "Nuxt Demo Lab",
        },
    },

    routeRules: {
        "/": { prerender: true },
        "/articles": { prerender: true },
        "/api/articles": { cache: { maxAge: 300 } },
    },

    compatibilityDate: "2026-06-30",
})
