<script setup lang="ts">
import type { NuxtError } from "#app"

const props = defineProps<{
    error: NuxtError
}>()

const handleError = () => clearError({ redirect: "/" })
</script>

<template>
    <UApp>
        <main class="grid min-h-screen place-items-center px-6 py-20">
            <UCard class="w-full max-w-xl text-center">
                <UIcon name="i-lucide-circle-alert" class="mx-auto size-12 text-error" />
                <p class="mt-4 text-sm font-medium text-error">Błąd {{ props.error.statusCode }}</p>
                <h1 class="mt-2 text-3xl font-bold">{{ props.error.statusMessage || "Coś poszło nie tak" }}</h1>
                <p class="mt-4 text-muted">To jest własny plik app/error.vue, który zastępuje domyślny ekran błędu Nuxta.</p>
                <UButton class="mt-8" label="Wróć na start" icon="i-lucide-house" @click="handleError" />
            </UCard>
        </main>
    </UApp>
</template>
