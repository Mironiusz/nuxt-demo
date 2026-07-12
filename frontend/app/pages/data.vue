<script setup lang="ts">
interface DemoItem {
    id: number
    name: string
    status: "ready" | "pending" | "error"
    progress: number
}

interface DemoResponse {
    generatedAt: string
    requestId: string
    source: string
    serverConfigLoaded: boolean
    items: DemoItem[]
}

const limit = ref(4)
const actionName = ref("Rafał")
const actionResult = ref<string | null>(null)
const actionPending = ref(false)

const { data, status, error, refresh } = await useFetch<DemoResponse>("/api/demo", {
    query: {
        limit,
    },
    watch: [limit],
})

const runAction = async () => {
    actionPending.value = true
    actionResult.value = null

    try {
        const response = await $fetch<{ message: string }>("/api/demo/action", {
            method: "POST",
            body: {
                name: actionName.value,
            },
        })
        actionResult.value = response.message
    } finally {
        actionPending.value = false
    }
}

const statusColor = (value: DemoItem["status"]) => {
    if (value === "ready") {
        return "success"
    }

    if (value === "error") {
        return "error"
    }

    return "warning"
}

useSeoMeta({
    title: "Dane i API",
    description: "Przykłady useFetch, $fetch, reaktywnych query i endpointów Nitro.",
})
</script>

<template>
    <UContainer class="py-12 lg:py-20">
        <DemoPageIntro eyebrow="useFetch + $fetch + Nitro" title="Dane i własne API" description="Nuxt może pobierać dane podczas SSR, przekazać wynik do klienta i obsługiwać endpointy backendowe z katalogu server/api." icon="i-lucide-database" />

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.6fr)]">
            <UCard title="SSR-friendly useFetch" description="Zmiana limitu automatycznie wykonuje ponowne pobranie danych, bo query korzysta z reaktywnego ref.">
                <template #header>
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 class="font-semibold">SSR-friendly useFetch</h2>
                            <p class="mt-1 text-sm text-muted">Dane strony są pobierane bez podwójnego requestu podczas hydration.</p>
                        </div>

                        <div class="flex items-center gap-3">
                            <USelect v-model="limit" :items="[2, 4, 6, 8]" class="w-24" />
                            <UButton icon="i-lucide-refresh-cw" label="Odśwież" color="neutral" variant="outline" :loading="status === 'pending'" @click="refresh()" />
                        </div>
                    </div>
                </template>

                <UAlert v-if="error" title="Nie udało się pobrać danych" :description="error.message" color="error" icon="i-lucide-circle-alert" />

                <div v-else-if="status === 'pending' && !data" class="space-y-3">
                    <USkeleton v-for="index in limit" :key="index" class="h-20 w-full" />
                </div>

                <div v-else class="space-y-4">
                    <div class="grid gap-3 sm:grid-cols-3">
                        <div class="rounded-xl border border-default p-4">
                            <p class="text-xs uppercase tracking-wide text-muted">Źródło</p>
                            <p class="mt-2 font-semibold">{{ data?.source }}</p>
                        </div>
                        <div class="rounded-xl border border-default p-4">
                            <p class="text-xs uppercase tracking-wide text-muted">Runtime config</p>
                            <p class="mt-2 font-semibold">{{ data?.serverConfigLoaded ? "Sekret dostępny na serwerze" : "Brak sekretu" }}</p>
                        </div>
                        <div class="rounded-xl border border-default p-4 sm:col-span-3">
                            <p class="text-xs uppercase tracking-wide text-muted">Request ID</p>
                            <p class="mt-2 truncate font-mono text-sm">{{ data?.requestId }}</p>
                        </div>
                        <div class="rounded-xl border border-default p-4">
                            <p class="text-xs uppercase tracking-wide text-muted">Wygenerowano</p>
                            <p class="mt-2 text-sm font-semibold">{{ data ? formatDate(data.generatedAt) : "-" }}</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div v-for="item in data?.items" :key="item.id" class="rounded-xl border border-default p-4">
                            <div class="flex items-center justify-between gap-4">
                                <div>
                                    <p class="font-semibold">{{ item.name }}</p>
                                    <p class="text-sm text-muted">Rekord #{{ item.id }}</p>
                                </div>
                                <UBadge :label="item.status" :color="statusColor(item.status)" variant="subtle" />
                            </div>
                            <UProgress :model-value="item.progress" class="mt-4" />
                        </div>
                    </div>
                </div>
            </UCard>

            <div class="space-y-6">
                <UCard title="$fetch po akcji użytkownika" description="Kliknięcie wykonuje POST dopiero wtedy, gdy użytkownik tego chce.">
                    <div class="space-y-4">
                        <UFormField label="Imię przekazywane do API">
                            <UInput v-model="actionName" icon="i-lucide-user" class="w-full" />
                        </UFormField>

                        <UButton label="Wyślij POST" icon="i-lucide-send" block :loading="actionPending" @click="runAction" />

                        <UAlert v-if="actionResult" title="Odpowiedź API" :description="actionResult" color="success" variant="subtle" />
                    </div>
                </UCard>

                <UCard title="Co znajduje się poza app?">
                    <ul class="space-y-3 text-sm text-muted">
                        <li class="flex gap-3"><UIcon name="i-lucide-file-code-2" class="mt-0.5 size-4 shrink-0 text-primary" /><span><code>server/api/demo.get.ts</code> obsługuje GET.</span></li>
                        <li class="flex gap-3"><UIcon name="i-lucide-file-code-2" class="mt-0.5 size-4 shrink-0 text-primary" /><span><code>server/api/demo/action.post.ts</code> obsługuje POST.</span></li>
                        <li class="flex gap-3"><UIcon name="i-lucide-settings" class="mt-0.5 size-4 shrink-0 text-primary" /><span><code>runtimeConfig</code> rozdziela konfigurację publiczną i serwerową.</span></li>
                    </ul>
                </UCard>
            </div>
        </div>

        <UCard class="mt-8" title="Fragment strony">
            <DemoCodeBlock code="const { data, status, error, refresh } = await useFetch('/api/demo', {\n    query: { limit },\n    watch: [limit],\n})\n\nconst result = await $fetch('/api/demo/action', {\n    method: 'POST',\n    body: { name },\n})" />
        </UCard>
    </UContainer>
</template>
