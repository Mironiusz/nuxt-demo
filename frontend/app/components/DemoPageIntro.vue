<script setup lang="ts">
defineProps<{
    eyebrow: string
    title: string
    description: string
    icon: string
}>()
</script>

<template>
    <div class="mb-10 max-w-3xl">
        <UBadge :icon="icon" :label="eyebrow" color="primary" variant="subtle" />
        <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{{ title }}</h1>
        <p class="mt-4 text-lg leading-8 text-muted">{{ description }}</p>
    </div>
</template>
