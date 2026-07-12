<script setup lang="ts">
const viewport = ref({ width: 0, height: 0 })
const online = ref(false)
const userAgent = ref("")

const readEnvironment = () => {
    viewport.value = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    online.value = navigator.onLine
    userAgent.value = navigator.userAgent
}

onMounted(() => {
    readEnvironment()
    window.addEventListener("resize", readEnvironment)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", readEnvironment)
})
</script>

<template>
    <UCard title="Środowisko przeglądarki" description="Ten komponent działa dopiero po zamontowaniu po stronie klienta.">
        <div class="grid gap-4 sm:grid-cols-3">
            <div>
                <p class="text-sm text-muted">Viewport</p>
                <p class="font-semibold">{{ viewport.width }} × {{ viewport.height }}</p>
            </div>
            <div>
                <p class="text-sm text-muted">Połączenie</p>
                <UBadge :color="online ? 'success' : 'error'" :label="online ? 'Online' : 'Offline'" />
            </div>
            <div>
                <p class="text-sm text-muted">Renderowanie</p>
                <p class="font-semibold">Client-only</p>
            </div>
        </div>

        <p class="mt-4 truncate text-xs text-muted">{{ userAgent }}</p>
    </UCard>
</template>
