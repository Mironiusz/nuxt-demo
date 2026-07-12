<script setup lang="ts">
const payloadTime = useState<string>("rendering-payload-time", () => new Date().toISOString())
const mountedTime = ref<string | null>(null)
const headers = useRequestHeaders(["user-agent"])

const { data: asyncResult } = await useAsyncData("rendering-demo", async () => {
    return {
        generatedAt: new Date().toISOString(),
        environment: import.meta.server ? "server" : "client",
    }
})

onMounted(() => {
    mountedTime.value = new Date().toISOString()
})

useSeoMeta({
    title: "SSR i hydration",
    description: "Przykład danych z serwera, payloadu, onMounted i ClientOnly.",
})
</script>

<template>
    <UContainer class="py-12 lg:py-20">
        <DemoPageIntro eyebrow="SSR + hydration + ClientOnly" title="Gdzie wykonuje się kod?" description="Nuxt najpierw może wyrenderować HTML na serwerze, a potem Vue przejmuje ten HTML w przeglądarce. Ta podstrona pokazuje różne momenty cyklu życia." icon="i-lucide-server" />

        <div class="grid gap-6 lg:grid-cols-3">
            <UCard title="useAsyncData">
                <p class="text-sm text-muted">Środowisko pierwszego wykonania</p>
                <p class="mt-2 text-2xl font-bold">{{ asyncResult?.environment }}</p>
                <p class="mt-3 text-sm text-muted">{{ asyncResult ? formatDate(asyncResult.generatedAt) : "-" }}</p>
            </UCard>

            <UCard title="useState payload">
                <p class="text-sm text-muted">Wartość utworzona podczas pierwszego renderu i przekazana do klienta</p>
                <p class="mt-3 text-sm font-semibold">{{ formatDate(payloadTime) }}</p>
            </UCard>

            <UCard title="onMounted">
                <p class="text-sm text-muted">Ta wartość pojawia się dopiero po uruchomieniu Vue w przeglądarce</p>
                <p class="mt-3 text-sm font-semibold">{{ mountedTime ? formatDate(mountedTime) : "Jeszcze nie zamontowano" }}</p>
            </UCard>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-2">
            <UCard title="Nagłówek żądania" description="useRequestHeaders może odczytać wybrane nagłówki po stronie serwera.">
                <p class="break-words font-mono text-sm text-muted">{{ headers["user-agent"] || "Brak nagłówka po stronie klienta" }}</p>
            </UCard>

            <UCard title="Bezpieczny dostęp do window">
                <DemoCodeBlock code="const mountedTime = ref(null)\n\nonMounted(() => {\n    mountedTime.value = new Date().toISOString()\n    console.log(window.innerWidth)\n})" />
            </UCard>
        </div>

        <div class="mt-8">
            <ClientOnly>
                <ClientEnvironment />

                <template #fallback>
                    <UCard>
                        <div class="flex items-center gap-3 text-muted">
                            <UIcon name="i-lucide-loader-circle" class="size-5 animate-spin" />
                            Oczekiwanie na uruchomienie kodu klienta...
                        </div>
                    </UCard>
                </template>
            </ClientOnly>
        </div>

        <UAlert class="mt-8" title="Najważniejsza zasada" description="Nie odczytuj window, document, localStorage ani navigator bezpośrednio podczas renderowania SSR. Użyj onMounted, import.meta.client albo ClientOnly." icon="i-lucide-triangle-alert" color="warning" variant="subtle" />
    </UContainer>
</template>
