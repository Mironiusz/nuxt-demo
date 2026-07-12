<script setup lang="ts">
const sections = [
    { label: "Struktura projektu", to: "#struktura", icon: "i-lucide-folders" },
    { label: "Routing", to: "#routing", icon: "i-lucide-route" },
    { label: "SSR i hydration", to: "#ssr", icon: "i-lucide-server" },
    { label: "Dane i API", to: "#dane", icon: "i-lucide-database" },
]
</script>

<template>
    <div class="min-h-screen bg-default text-default">
        <AppHeader />

        <UMain>
            <UContainer class="py-10 lg:py-16">
                <div class="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
                    <aside class="lg:sticky lg:top-24 lg:self-start">
                        <UCard>
                            <template #header>
                                <p class="font-semibold">Spis treści</p>
                            </template>

                            <nav class="space-y-1">
                                <UButton v-for="section in sections" :key="section.to" :to="section.to" :icon="section.icon" :label="section.label" color="neutral" variant="ghost" block class="justify-start" />
                            </nav>
                        </UCard>
                    </aside>

                    <div class="min-w-0">
                        <slot />
                    </div>
                </div>
            </UContainer>
        </UMain>

        <AppFooter />
    </div>
</template>
