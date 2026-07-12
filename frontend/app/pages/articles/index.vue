<script setup lang="ts">
interface ArticleSummary {
    slug: string
    title: string
    description: string
    icon: string
    publishedAt: string
    readingTime: number
}

const { data: articles, status, error } = await useFetch<ArticleSummary[]>("/api/articles")

useSeoMeta({
    title: "Artykuły",
    description: "Lista artykułów pobierana z własnego API Nitro.",
})
</script>

<template>
    <UContainer class="py-12 lg:py-20">
        <DemoPageIntro eyebrow="Routing dynamiczny" title="Artykuły z własnego API" description="Lista pochodzi z server/api/articles, a kliknięcie prowadzi do dynamicznej trasy app/pages/articles/[slug].vue." icon="i-lucide-newspaper" />

        <UAlert v-if="error" title="Błąd pobierania" :description="error.message" color="error" icon="i-lucide-circle-alert" />

        <div v-else-if="status === 'pending' && !articles" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <USkeleton v-for="index in 3" :key="index" class="h-64 w-full" />
        </div>

        <UPageGrid v-else>
            <UPageCard v-for="article in articles" :key="article.slug" :to="`/articles/${article.slug}`" :title="article.title" :description="article.description" :icon="article.icon" spotlight>
                <template #footer>
                    <div class="flex items-center justify-between gap-4 text-sm text-muted">
                        <span>{{ new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium" }).format(new Date(article.publishedAt)) }}</span>
                        <UBadge :label="`${article.readingTime} min`" color="neutral" variant="subtle" />
                    </div>
                </template>
            </UPageCard>
        </UPageGrid>
    </UContainer>
</template>
