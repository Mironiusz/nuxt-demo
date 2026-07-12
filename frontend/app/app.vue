<script setup lang="ts">
useHead({
    htmlAttrs: {
        lang: "pl",
    },
    meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
})
</script>

<template>
    <UApp>
        <NuxtLoadingIndicator color="var(--ui-primary)" />
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
