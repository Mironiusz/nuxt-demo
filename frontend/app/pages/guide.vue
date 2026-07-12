<script setup lang="ts">
definePageMeta({
    layout: "docs",
})

useSeoMeta({
    title: "Przewodnik",
    description: "Przewodnik po strukturze demo Nuxt 4.",
})
</script>

<template>
    <article class="space-y-14">
        <DemoPageIntro
            eyebrow="Własny layout docs"
            title="Przewodnik po projekcie"
            description="Ta strona używa layoutu docs zamiast default. Lewy panel pochodzi z app/layouts/docs.vue, a treść z aktualnej strony trafia do jego slotu."
            icon="i-lucide-book-open" />

        <section id="struktura" class="scroll-mt-28">
            <h2 class="text-3xl font-bold">Struktura projektu</h2>
            <p class="mt-4 text-lg leading-8 text-muted">Nuxt skanuje katalogi o konkretnym znaczeniu. Nie konfigurujesz ręcznie routera ani listy komponentów.</p>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <UCard title="app/pages" description="Każdy plik Vue tworzy trasę." />
                <UCard title="app/components" description="Komponenty są automatycznie importowane." />
                <UCard title="app/composables" description="Współdzielona logika dostępna bez importu." />
                <UCard title="server/api" description="Endpointy GET, POST i inne obsługiwane przez Nitro." />
            </div>
        </section>

        <section id="routing" class="scroll-mt-28">
            <h2 class="text-3xl font-bold">Routing plikowy</h2>
            <p class="mt-4 text-lg leading-8 text-muted">Nazwa i położenie pliku definiują URL. Plik articles/[slug].vue obsługuje dowolny slug artykułu.</p>

            <DemoCodeBlock class="mt-6" code="app/pages/index.vue               -> /\napp/pages/components.vue          -> /components\napp/pages/articles/index.vue      -> /articles\napp/pages/articles/[slug].vue     -> /articles/:slug" />
        </section>

        <section id="ssr" class="scroll-mt-28">
            <h2 class="text-3xl font-bold">SSR i hydration</h2>
            <p class="mt-4 text-lg leading-8 text-muted">Kod setup może wykonać się na serwerze, a potem strona jest hydradowana w przeglądarce. Z tego powodu obiekty window i document powinny być używane dopiero po stronie klienta.</p>

            <div class="mt-6 flex flex-wrap gap-3">
                <UButton to="/rendering" label="Otwórz demo SSR" icon="i-lucide-server" />
                <UButton to="/state" label="Zobacz useState" color="neutral" variant="outline" />
            </div>
        </section>

        <section id="dane" class="scroll-mt-28">
            <h2 class="text-3xl font-bold">Dane i API</h2>
            <p class="mt-4 text-lg leading-8 text-muted">useFetch służy do danych potrzebnych przy renderowaniu strony. $fetch dobrze pasuje do akcji użytkownika. useAsyncData obejmuje bardziej ogólne operacje asynchroniczne.</p>

            <UTable
                class="mt-6"
                :data="[
                    { narzedzie: 'useFetch', zastosowanie: 'SSR-friendly request do API' },
                    { narzedzie: '$fetch', zastosowanie: 'Akcja po kliknięciu lub submit' },
                    { narzedzie: 'useAsyncData', zastosowanie: 'Dowolna operacja asynchroniczna' },
                ]" />
        </section>

        <UAlert
            title="Jak pracować z tym demo"
            description="Otwórz konkretną podstronę, znajdź odpowiadający jej plik w app/pages, zmień tekst lub props komponentu i zapisz. Hot reload natychmiast pokaże efekt."
            icon="i-lucide-lightbulb"
            color="info"
            variant="subtle" />
    </article>
</template>
