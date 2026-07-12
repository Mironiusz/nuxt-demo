<script setup lang="ts">
const navigation = useDemoNavigation()
</script>

<template>
    <UHeader title="Nuxt Demo Lab" class="border-b border-default/70 bg-default/85 backdrop-blur-xl">
        <template #left>
            <NuxtLink to="/" aria-label="Przejdź na stronę główną">
                <DemoLogo />
            </NuxtLink>
        </template>

        <UNavigationMenu :items="navigation" class="hidden lg:flex" />

        <template #right>
            <UColorModeButton />

            <UTooltip text="Formularz kontaktowy">
                <UButton to="/forms" icon="i-lucide-send" label="Formularz" class="hidden sm:inline-flex" />
            </UTooltip>
        </template>

        <template #body>
            <UNavigationMenu :items="navigation" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>
