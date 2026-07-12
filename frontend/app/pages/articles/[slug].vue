<script setup lang="ts">
interface Article {
    slug: string
    title: string
    description: string
    icon: string
    publishedAt: string
    readingTime: number
    sections: Array<{
        title: string
        content: string
    }>
}

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: article, error } = await useFetch<Article>(() => `/api/articles/${slug.value}`)

if (error.value || !article.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Nie znaleziono artykułu",
    })
}

useSeoMeta({
    title: () => article.value?.title || "Artykuł",
    description: () => article.value?.description || "",
})
</script>

<template>
    <UContainer class="py-12 lg:py-20">
        <div v-if="article" class="mx-auto max-w-3xl">
            <UButton to="/articles" label="Wróć do artykułów" icon="i-lucide-arrow-left" color="neutral" variant="ghost" />

            <article class="mt-8">
                <div class="flex flex-wrap items-center gap-3">
                    <span class="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <UIcon :name="article.icon" class="size-6" />
                    </span>
                    <UBadge :label="`${article.readingTime} min czytania`" color="neutral" variant="subtle" />
                    <span class="text-sm text-muted">{{ new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(new Date(article.publishedAt)) }}</span>
                </div>

                <h1 class="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{{ article.title }}</h1>
                <p class="mt-5 text-xl leading-8 text-muted">{{ article.description }}</p>

                <USeparator class="my-10" />

                <div class="space-y-10">
                    <section v-for="section in article.sections" :key="section.title">
                        <h2 class="text-2xl font-bold">{{ section.title }}</h2>
                        <p class="mt-4 whitespace-pre-line text-lg leading-8 text-muted">{{ section.content }}</p>
                    </section>
                </div>
            </article>

            <UPageCTA class="mt-14" title="Dynamiczna trasa działa" description="Adres tej strony pochodzi z parametru [slug], a treść została pobrana z endpointu Nitro." variant="subtle" :links="[{ label: 'Zobacz API', to: '/data', trailingIcon: 'i-lucide-arrow-right' }]" />
        </div>
    </UContainer>
</template>
