<script setup lang="ts">
const config = useRuntimeConfig()

const technologies = [
    {
        title: "Nuxt 4",
        description: "Routing plikowy, SSR, prerender, backend Nitro i auto-importy w jednym frameworku.",
        icon: "i-simple-icons-nuxtdotjs",
        to: "/guide#struktura",
    },
    {
        title: "Vue 3",
        description: "Composition API, reaktywność, komponenty SFC, propsy, eventy i sloty.",
        icon: "i-simple-icons-vuedotjs",
        to: "/state",
    },
    {
        title: "Nuxt UI",
        description: "Gotowe, dostępne komponenty, motyw kolorystyczny, dark mode i integracja z ikonami.",
        icon: "i-lucide-layout-grid",
        to: "/components",
    },
    {
        title: "Tailwind CSS 4",
        description: "Utility classes, responsywność i własne tokeny motywu bez ręcznego budowania całego CSS.",
        icon: "i-simple-icons-tailwindcss",
        to: "/components",
    },
    {
        title: "Nitro API",
        description: "Endpointy serwerowe w katalogu server/api oraz typowane pobieranie danych przez useFetch.",
        icon: "i-lucide-server-cog",
        to: "/data",
    },
    {
        title: "TypeScript",
        description: "Typy dla komponentów, composables, danych z API i automatycznie generowanych elementów Nuxta.",
        icon: "i-simple-icons-typescript",
        to: "/forms",
    },
]

const learningPath = [
    { icon: "i-lucide-route", title: "Routing", description: "Przejdź po kilku podstronach generowanych z katalogu app/pages." },
    { icon: "i-lucide-blocks", title: "Komponenty", description: "Zobacz Nuxt UI, sloty, propsy i klasy Tailwinda." },
    { icon: "i-lucide-database", title: "Dane", description: "Porównaj useFetch, $fetch i endpointy server/api." },
    { icon: "i-lucide-refresh-cw", title: "Stan", description: "Sprawdź ref, computed, useState i useCookie." },
    { icon: "i-lucide-server", title: "Renderowanie", description: "Zobacz SSR, hydration, ClientOnly i kod przeglądarkowy." },
    { icon: "i-lucide-send", title: "Formularze", description: "Przećwicz walidację, submit, toast i żądanie POST." },
]

useSeoMeta({
    title: "Start",
    description: "Interaktywne demo Nuxt 4, Vue 3, Nuxt UI, Tailwind CSS i Nitro.",
    ogTitle: "Nuxt Demo Lab",
    ogDescription: "Interaktywne demo technologii dostępnych w projekcie Nuxt 4.",
})
</script>

<template>
    <div>
        <section class="demo-grid relative overflow-hidden border-b border-default">
            <div class="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

            <UContainer class="relative py-20 sm:py-28 lg:py-36">
                <div class="mx-auto max-w-4xl text-center">
                    <UBadge icon="i-lucide-sparkles" label="Interaktywne laboratorium Nuxt 4" size="lg" variant="subtle" />

                    <h1 class="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                        Naucz się Nuxta,
                        <span class="text-primary">klikając i zmieniając kod</span>
                    </h1>

                    <p class="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                        {{ config.public.siteName }} pokazuje routing, layouty, komponenty Nuxt UI, Tailwind, reaktywność Vue, pobieranie danych, endpointy API, formularze, SSR i hydration.
                    </p>

                    <div class="mt-10 flex flex-wrap justify-center gap-3">
                        <UButton to="/components" label="Zobacz komponenty" trailing-icon="i-lucide-arrow-right" size="xl" />
                        <UButton to="/guide" label="Otwórz przewodnik" icon="i-lucide-book-open" size="xl" color="neutral" variant="subtle" />
                    </div>
                </div>

                <div class="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
                    <UCard class="demo-surface">
                        <p class="text-sm text-muted">Routing</p>
                        <p class="mt-2 text-3xl font-bold">8 podstron</p>
                    </UCard>
                    <UCard class="demo-surface">
                        <p class="text-sm text-muted">Warstwy</p>
                        <p class="mt-2 text-3xl font-bold">App + Server</p>
                    </UCard>
                    <UCard class="demo-surface">
                        <p class="text-sm text-muted">Renderowanie</p>
                        <p class="mt-2 text-3xl font-bold">SSR + SSG</p>
                    </UCard>
                </div>
            </UContainer>
        </section>

        <UPageSection title="Technologie, które już masz w projekcie" description="Każda karta prowadzi do podstrony pokazującej daną część frameworka w praktyce.">
            <UPageGrid>
                <UPageCard v-for="technology in technologies" :key="technology.title" :title="technology.title" :description="technology.description" :icon="technology.icon" :to="technology.to" spotlight />
            </UPageGrid>
        </UPageSection>

        <UPageSection title="Proponowana ścieżka zwiedzania" description="Nie musisz rozumieć wszystkiego naraz. Przechodź po kolei i zaglądaj do odpowiadających plików.">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <UCard v-for="(step, index) in learningPath" :key="step.title">
                    <div class="flex items-start gap-4">
                        <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                            <UIcon :name="step.icon" class="size-5" />
                        </span>
                        <div>
                            <p class="text-sm font-medium text-primary">Krok {{ index + 1 }}</p>
                            <h2 class="mt-1 font-semibold">{{ step.title }}</h2>
                            <p class="mt-2 text-sm leading-6 text-muted">{{ step.description }}</p>
                        </div>
                    </div>
                </UCard>
            </div>
        </UPageSection>

        <UPageSection>
            <UPageCTA title="Najlepiej uczysz się przez modyfikowanie" description="Uruchom pnpm dev, zmień tekst lub komponent, zapisz plik i obserwuj hot reload w przeglądarce." variant="subtle" :links="[{ label: 'Zacznij od przewodnika', to: '/guide', trailingIcon: 'i-lucide-arrow-right' }, { label: 'Przetestuj API', to: '/data', color: 'neutral', variant: 'outline' }]" />
        </UPageSection>
    </div>
</template>
