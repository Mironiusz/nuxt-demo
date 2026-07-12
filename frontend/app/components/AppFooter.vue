<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
        <template #left>
            <div>
                <p class="font-medium">Nuxt Demo Lab</p>
                <p class="text-sm text-muted">Demo edukacyjne · {{ year }}</p>
            </div>
        </template>

        <template #right>
            <UButton to="/guide" label="Przewodnik" color="neutral" variant="ghost" />
            <UButton to="https://nuxt.com" target="_blank" icon="i-simple-icons-nuxtdotjs" aria-label="Dokumentacja Nuxt" color="neutral" variant="ghost" />
            <UButton to="https://ui.nuxt.com" target="_blank" icon="i-lucide-layout-grid" aria-label="Dokumentacja Nuxt UI" color="neutral" variant="ghost" />
        </template>
    </UFooter>
</template>
