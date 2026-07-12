export const articles = [
    {
        slug: "routing-plikowy",
        title: "Routing plikowy bez router.ts",
        description: "Jak Nuxt zamienia strukturę katalogu app/pages w gotowe trasy aplikacji.",
        icon: "i-lucide-route",
        publishedAt: "2026-07-01T09:00:00.000Z",
        readingTime: 4,
        sections: [
            {
                title: "Plik staje się adresem",
                content: "W Nuxcie nie budujesz ręcznie tablicy tras. app/pages/oferta.vue daje adres /oferta, a app/pages/blog/[slug].vue obsługuje parametr dynamiczny.",
            },
            {
                title: "Nawigacja nadal używa Vue Router",
                content: "Pod spodem nadal działa Vue Router. Korzystasz z NuxtLink, useRoute i navigateTo, ale Nuxt generuje konfigurację za Ciebie.",
            },
        ],
    },
    {
        slug: "usefetch-i-fetch",
        title: "useFetch kontra $fetch",
        description: "Dwie podobne funkcje, które rozwiązują inne problemy w aplikacji Nuxt.",
        icon: "i-lucide-database",
        publishedAt: "2026-07-03T10:30:00.000Z",
        readingTime: 5,
        sections: [
            {
                title: "useFetch przy renderowaniu strony",
                content: "useFetch integruje request z useAsyncData i payloadem SSR. Dzięki temu dane pobrane na serwerze nie muszą być pobierane drugi raz podczas hydration.",
            },
            {
                title: "$fetch po akcji użytkownika",
                content: "$fetch jest dobrym wyborem dla submitu formularza, kliknięcia przycisku, usuwania rekordu lub aktualizacji danych.",
            },
        ],
    },
    {
        slug: "stan-ssr-friendly",
        title: "Stan bezpieczny dla SSR",
        description: "Dlaczego useState jest lepszy niż globalny ref utworzony poza komponentem.",
        icon: "i-lucide-refresh-cw",
        publishedAt: "2026-07-06T12:00:00.000Z",
        readingTime: 6,
        sections: [
            {
                title: "Izolacja żądań",
                content: "Serwer obsługuje wielu użytkowników. Globalny singleton może przypadkowo współdzielić dane między żądaniami. useState wiąże stan z właściwym kontekstem aplikacji.",
            },
            {
                title: "Payload hydration",
                content: "Wartość useState utworzona podczas SSR trafia do payloadu i jest odtwarzana w przeglądarce bez rozjazdu pomiędzy HTML serwera i klienta.",
            },
        ],
    },
]
