<script setup lang="ts">
const offer = [
    {
        title: "Strategia i treść",
        description: "Porządkujemy komunikat, hierarchię sekcji i główną ścieżkę konwersji.",
        icon: "i-lucide-compass",
    },
    {
        title: "Design system",
        description: "Budujemy spójne komponenty na Nuxt UI i tokenach Tailwind CSS.",
        icon: "i-lucide-palette",
    },
    {
        title: "Implementacja Nuxt",
        description: "Dostarczamy szybki landing z SSR, SEO, formularzami i analityką.",
        icon: "i-simple-icons-nuxtdotjs",
    },
]

const metrics = [
    { value: "95+", label: "Lighthouse Performance" },
    { value: "SSR", label: "Gotowy HTML dla SEO" },
    { value: "1 repo", label: "Frontend i lekkie API" },
]

useSeoMeta({
    title: "Demo landing page",
    description: "Przykład rozbudowanego landing page z komponentami strony Nuxt UI.",
})
</script>

<template>
    <div>
        <UPageHero
            headline="Demo rozbudowanego landinga"
            title="Landing page, który łączy design, szybkość i konwersję"
            description="Ta podstrona pokazuje, jak składać marketingową stronę z UPageHero, UPageSection, UPageCard i UPageCTA bez budowania wszystkiego od zera."
            orientation="horizontal"
            :links="[
                { label: 'Porozmawiajmy', to: '/forms', trailingIcon: 'i-lucide-arrow-right', size: 'xl' },
                { label: 'Zobacz komponenty', to: '/components', color: 'neutral', variant: 'subtle', size: 'xl' },
            ]">
            <div class="demo-grid rounded-3xl border border-default bg-elevated p-5 shadow-2xl shadow-primary/10">
                <div class="rounded-2xl border border-default bg-default p-6">
                    <div class="flex items-center justify-between gap-4">
                        <DemoLogo />
                        <UBadge label="Live demo" color="success" variant="subtle" />
                    </div>

                    <div class="mt-10 space-y-3">
                        <USkeleton class="h-8 w-4/5" />
                        <USkeleton class="h-8 w-3/5" />
                        <USkeleton class="h-4 w-full" />
                        <USkeleton class="h-4 w-5/6" />
                    </div>

                    <div class="mt-8 grid grid-cols-3 gap-3">
                        <div v-for="metric in metrics" :key="metric.label" class="rounded-xl border border-default p-3 text-center">
                            <p class="text-lg font-bold text-primary">{{ metric.value }}</p>
                            <p class="mt-1 text-xs text-muted">{{ metric.label }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </UPageHero>

        <UPageSection title="Kompletna ścieżka realizacji" description="Gotowe komponenty strony dają strukturę, a sloty i Tailwind pozwalają nadać jej własny charakter." :features="offer" />

        <UPageSection title="Dlaczego Nuxt pasuje do landinga" description="Możesz połączyć statycznie wygenerowany HTML z dynamicznymi formularzami i lekkim backendem w tym samym projekcie.">
            <UPageGrid>
                <UPageCard title="SEO i prerender" description="Strona główna może zostać wygenerowana podczas builda jako gotowy HTML." icon="i-lucide-search-check" spotlight />
                <UPageCard title="Formularze i API" description="Endpoint Nitro obsłuży formularz bez stawiania osobnej aplikacji backendowej." icon="i-lucide-send" spotlight />
                <UPageCard title="Responsywny UI" description="Nuxt UI i Tailwind upraszczają komponenty, dark mode i breakpointy." icon="i-lucide-smartphone" spotlight />
            </UPageGrid>
        </UPageSection>

        <UPageSection>
            <UPageCTA
                title="Ten landing jest tylko jedną z podstron demo"
                description="Wróć do laboratorium i porównaj go z bardziej technicznymi przykładami stanu, API oraz SSR."
                variant="subtle"
                :links="[
                    { label: 'Wróć na start', to: '/', icon: 'i-lucide-house' },
                    { label: 'Otwórz przewodnik', to: '/guide', color: 'neutral', variant: 'outline' },
                ]" />
        </UPageSection>
    </div>
</template>
