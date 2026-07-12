<script setup lang="ts">
const localCount = ref(0)
const doubledLocalCount = computed(() => localCount.value * 2)
const { count, increment, decrement, reset } = useDemoCounter()
const preferredName = useCookie<string>("demo-preferred-name", {
    default: () => "Rafał",
    maxAge: 60 * 60 * 24 * 30,
})
const routeHistory = useState<string[]>("route-history", () => [])
const colorMode = useColorMode()

const resetHistory = () => {
    routeHistory.value = []
}

useSeoMeta({
    title: "Stan",
    description: "Porównanie ref, computed, useState, useCookie i globalnego middleware.",
})
</script>

<template>
    <UContainer class="py-12 lg:py-20">
        <DemoPageIntro eyebrow="Vue reactivity + Nuxt state" title="Stan lokalny i współdzielony" description="Porównaj stan należący do jednego komponentu ze stanem SSR-friendly współdzielonym między stronami oraz wartością zapisywaną w cookie." icon="i-lucide-refresh-cw" />

        <div class="grid gap-6 lg:grid-cols-2">
            <UCard title="ref i computed" description="Stan lokalny znika po odmontowaniu komponentu strony.">
                <div class="flex items-end justify-between gap-6">
                    <div>
                        <p class="text-sm text-muted">Licznik lokalny</p>
                        <p class="mt-2 text-5xl font-bold">{{ localCount }}</p>
                        <p class="mt-2 text-sm text-muted">computed × 2 = {{ doubledLocalCount }}</p>
                    </div>

                    <div class="flex gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" aria-label="Odejmij" @click="localCount--" />
                        <UButton icon="i-lucide-plus" aria-label="Dodaj" @click="localCount++" />
                    </div>
                </div>
            </UCard>

            <UCard title="useState" description="Ten licznik jest współdzielony i zachowuje wartość podczas nawigacji po aplikacji.">
                <div class="flex items-end justify-between gap-6">
                    <div>
                        <p class="text-sm text-muted">Licznik globalny</p>
                        <p class="mt-2 text-5xl font-bold text-primary">{{ count }}</p>
                        <p class="mt-2 text-sm text-muted">Klucz: demo-counter</p>
                    </div>

                    <div class="flex gap-2">
                        <UButton icon="i-lucide-minus" color="neutral" variant="outline" aria-label="Odejmij" @click="decrement" />
                        <UButton icon="i-lucide-rotate-ccw" color="neutral" variant="ghost" aria-label="Resetuj" @click="reset" />
                        <UButton icon="i-lucide-plus" aria-label="Dodaj" @click="increment" />
                    </div>
                </div>
            </UCard>

            <UCard title="useCookie" description="Zmień nazwę, odśwież stronę i sprawdź, że wartość została w przeglądarce.">
                <UFormField label="Preferowana nazwa">
                    <UInput v-model="preferredName" icon="i-lucide-cookie" class="w-full" />
                </UFormField>

                <p class="mt-4 text-sm text-muted">Witaj, <strong class="text-default">{{ preferredName || "gościu" }}</strong>.</p>
            </UCard>

            <UCard title="useColorMode" description="Nuxt UI przechowuje preferencję jasnego lub ciemnego motywu.">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-sm text-muted">Aktualna preferencja</p>
                        <p class="mt-1 text-xl font-semibold">{{ colorMode.preference }}</p>
                    </div>
                    <UColorModeSelect class="w-40" />
                </div>
            </UCard>
        </div>

        <UCard class="mt-6" title="Globalne route middleware" description="Plik app/middleware/track.global.ts zapisuje ostatnio odwiedzone ścieżki po stronie klienta.">
            <div class="flex flex-wrap gap-2">
                <UBadge v-for="path in routeHistory" :key="path" :label="path" color="neutral" variant="subtle" />
                <span v-if="routeHistory.length === 0" class="text-sm text-muted">Przejdź na kilka podstron i wróć tutaj.</span>
            </div>

            <template #footer>
                <UButton label="Wyczyść historię" icon="i-lucide-trash-2" color="neutral" variant="ghost" :disabled="routeHistory.length === 0" @click="resetHistory" />
            </template>
        </UCard>
    </UContainer>
</template>
