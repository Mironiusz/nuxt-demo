export const useDemoNavigation = () => [
    { label: "Start", to: "/", icon: "i-lucide-house" },
    { label: "Landing", to: "/landing", icon: "i-lucide-rocket" },
    { label: "Komponenty", to: "/components", icon: "i-lucide-panels-top-left" },
    { label: "Dane i API", to: "/data", icon: "i-lucide-database" },
    { label: "Stan", to: "/state", icon: "i-lucide-refresh-cw" },
    {
        label: "Więcej",
        icon: "i-lucide-ellipsis",
        children: [
            { label: "SSR i hydration", to: "/rendering", icon: "i-lucide-server", description: "Kod serwera i klienta" },
            { label: "Formularze", to: "/forms", icon: "i-lucide-send", description: "Walidacja i POST" },
            { label: "Artykuły", to: "/articles", icon: "i-lucide-newspaper", description: "Dynamiczny routing" },
            { label: "Przewodnik", to: "/guide", icon: "i-lucide-book-open", description: "Struktura projektu" },
        ],
    },
]
