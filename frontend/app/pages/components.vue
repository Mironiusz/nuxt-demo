<script setup lang="ts">
const selectedFramework = ref("Nuxt")
const selectedMode = ref("SSR")
const notificationsEnabled = ref(true)
const termsAccepted = ref(false)
const experience = ref(3)
const satisfaction = ref(82)
const message = ref("Nuxt UI pozwala szybko złożyć estetyczny interfejs.")

const frameworks = ["Nuxt", "Vue", "React", "Svelte"]
const renderModes = ["SSR", "SSG", "SPA"]
const tabItems = [
    { label: "Props", icon: "i-lucide-sliders-horizontal", content: "Props przekazują dane z rodzica do komponentu." },
    { label: "Sloty", icon: "i-lucide-panels-top-left", content: "Sloty pozwalają wstrzyknąć własną zawartość w przygotowane miejsca." },
    { label: "v-model", icon: "i-lucide-arrow-left-right", content: "v-model synchronizuje wartość kontrolki z reaktywną zmienną." },
]
const accordionItems = [
    { label: "Czy komponenty trzeba importować?", icon: "i-lucide-package-open", content: "Nie. Nuxt automatycznie importuje komponenty z app/components, a moduł Nuxt UI rejestruje komponenty zaczynające się od U." },
    { label: "Czy mogę dopisać własne klasy?", icon: "i-lucide-paintbrush", content: "Tak. Używasz zwykłego atrybutu class z klasami Tailwind albo propsa ui do zmiany wewnętrznych slotów komponentu." },
    { label: "Czy dark mode działa automatycznie?", icon: "i-lucide-moon", content: "Tak. UColorModeButton przełącza motyw, a semantyczne kolory Nuxt UI dostosowują się do trybu jasnego i ciemnego." },
]
const dropdownItems = [
    { label: "Komponenty", icon: "i-lucide-panels-top-left", to: "/components" },
    { label: "Formularze", icon: "i-lucide-send", to: "/forms" },
    { label: "Dane i API", icon: "i-lucide-database", to: "/data" },
]
const breadcrumbItems = [{ label: "Start", to: "/" }, { label: "Komponenty" }]
const tableData = [
    { component: "UButton", category: "Element", purpose: "Akcje i linki" },
    { component: "UForm", category: "Form", purpose: "Walidacja i submit" },
    { component: "UTable", category: "Data", purpose: "Prezentacja rekordów" },
    { component: "UModal", category: "Overlay", purpose: "Dialog nad stroną" },
]
const carouselItems = [
    { title: "Routing", icon: "i-lucide-route", description: "Pliki w app/pages stają się trasami." },
    { title: "Auto-importy", icon: "i-lucide-wand-sparkles", description: "ref, computed i własne komponenty są dostępne bez importów." },
    { title: "Nitro", icon: "i-lucide-server-cog", description: "Endpointy API działają w tym samym repozytorium." },
    { title: "SSR", icon: "i-lucide-server", description: "HTML może powstać jeszcze przed uruchomieniem JavaScriptu klienta." },
]

useSeoMeta({
    title: "Komponenty",
    description: "Galeria komponentów Nuxt UI, reaktywności Vue i stylowania Tailwind CSS.",
})
</script>

<template>
    <UContainer class="py-12 lg:py-20">
        <DemoPageIntro eyebrow="Nuxt UI + Tailwind" title="Galeria komponentów" description="Ta strona pokazuje typowe elementy interfejsu, v-model, sloty, propsy, semantyczne kolory, overlaye i komponenty do prezentacji danych." icon="i-lucide-panels-top-left" />

        <UBreadcrumb :items="breadcrumbItems" class="mb-8" />

        <div class="space-y-10">
            <section>
                <h2 class="mb-4 text-2xl font-bold">Elementy podstawowe</h2>

                <UCard>
                    <div class="flex flex-wrap items-center gap-3">
                        <UButton label="Primary" icon="i-lucide-sparkles" />
                        <UButton label="Neutral" color="neutral" variant="subtle" />
                        <UButton label="Outline" color="neutral" variant="outline" />
                        <UButton icon="i-lucide-heart" color="error" variant="soft" aria-label="Polub" />

                        <UTooltip text="Tooltip pojawia się po najechaniu">
                            <UButton label="Najedź na mnie" color="neutral" variant="ghost" />
                        </UTooltip>

                        <UDropdownMenu :items="dropdownItems">
                            <UButton label="Dropdown" trailing-icon="i-lucide-chevron-down" color="neutral" variant="outline" />
                        </UDropdownMenu>

                        <UModal title="Przykładowy modal" description="Modal korzysta ze slotu body.">
                            <UButton label="Otwórz modal" icon="i-lucide-maximize-2" color="neutral" variant="subtle" />

                            <template #body>
                                <p class="text-muted">To jest zawartość renderowana ponad aktualną stroną. Nie potrzebujesz osobnego stanu open, jeśli trigger znajduje się w domyślnym slocie.</p>
                            </template>
                        </UModal>

                        <UPopover>
                            <UButton label="Popover" icon="i-lucide-message-square" color="neutral" variant="ghost" />

                            <template #content>
                                <div class="max-w-xs p-4 text-sm">Popover nadaje się do małych paneli, filtrów i dodatkowych informacji.</div>
                            </template>
                        </UPopover>
                    </div>

                    <USeparator class="my-6" />

                    <div class="flex flex-wrap items-center gap-4">
                        <UBadge label="Primary" icon="i-lucide-tag" />
                        <UBadge label="Sukces" color="success" variant="subtle" />
                        <UBadge label="Ostrzeżenie" color="warning" variant="outline" />
                        <UChip text="3" size="3xl">
                            <UButton icon="i-lucide-bell" color="neutral" variant="outline" aria-label="Powiadomienia" />
                        </UChip>
                        <UKbd value="Ctrl" />
                        <span class="text-muted">+</span>
                        <UKbd value="K" />
                        <UAvatarGroup>
                            <UAvatar alt="Rafał" />
                            <UAvatar alt="Nuxt" />
                            <UAvatar alt="Vue" />
                        </UAvatarGroup>
                    </div>
                </UCard>
            </section>

            <section class="grid gap-6 lg:grid-cols-2">
                <UCard title="Form controls" description="Każda kontrolka jest powiązana ze stanem przez v-model.">
                    <div class="space-y-5">
                        <UFormField label="Framework">
                            <USelect v-model="selectedFramework" :items="frameworks" class="w-full" />
                        </UFormField>

                        <UFormField label="Tryb renderowania">
                            <URadioGroup v-model="selectedMode" :items="renderModes" orientation="horizontal" />
                        </UFormField>

                        <div class="grid gap-4 sm:grid-cols-2">
                            <UFormField label="Lata doświadczenia">
                                <UInputNumber v-model="experience" :min="0" :max="20" class="w-full" />
                            </UFormField>

                            <UFormField label="Szybkie wyszukiwanie">
                                <UInput icon="i-lucide-search" placeholder="Wpisz frazę..." />
                            </UFormField>
                        </div>

                        <UFormField label="Wiadomość">
                            <UTextarea v-model="message" autoresize class="w-full" />
                        </UFormField>

                        <div class="space-y-3">
                            <USwitch v-model="notificationsEnabled" label="Włącz powiadomienia" />
                            <UCheckbox v-model="termsAccepted" label="Akceptuję warunki demonstracji" />
                        </div>

                        <UFormField :label="`Satysfakcja: ${satisfaction}%`">
                            <USlider v-model="satisfaction" :min="0" :max="100" />
                        </UFormField>
                    </div>
                </UCard>

                <UCard title="Aktualny stan Vue" description="Wartości poniżej aktualizują się reaktywnie bez ręcznej manipulacji DOM.">
                    <dl class="space-y-4">
                        <div class="flex justify-between gap-4 border-b border-default pb-3">
                            <dt class="text-muted">Framework</dt>
                            <dd class="font-semibold">{{ selectedFramework }}</dd>
                        </div>
                        <div class="flex justify-between gap-4 border-b border-default pb-3">
                            <dt class="text-muted">Renderowanie</dt>
                            <dd class="font-semibold">{{ selectedMode }}</dd>
                        </div>
                        <div class="flex justify-between gap-4 border-b border-default pb-3">
                            <dt class="text-muted">Doświadczenie</dt>
                            <dd class="font-semibold">{{ experience }} lat</dd>
                        </div>
                        <div class="flex justify-between gap-4 border-b border-default pb-3">
                            <dt class="text-muted">Powiadomienia</dt>
                            <dd><UBadge :label="notificationsEnabled ? 'Włączone' : 'Wyłączone'" :color="notificationsEnabled ? 'success' : 'neutral'" /></dd>
                        </div>
                        <div class="flex justify-between gap-4">
                            <dt class="text-muted">Warunki</dt>
                            <dd><UBadge :label="termsAccepted ? 'Zaakceptowane' : 'Brak zgody'" :color="termsAccepted ? 'success' : 'warning'" /></dd>
                        </div>
                    </dl>

                    <UProgress v-model="satisfaction" class="mt-8" />
                </UCard>
            </section>

            <section class="grid gap-6 lg:grid-cols-2">
                <UCard title="Tabs">
                    <UTabs :items="tabItems" />
                </UCard>

                <UCard title="Accordion">
                    <UAccordion :items="accordionItems" />
                </UCard>
            </section>

            <section>
                <h2 class="mb-4 text-2xl font-bold">Komunikaty i stany</h2>

                <div class="grid gap-4 lg:grid-cols-3">
                    <UAlert title="Informacja" description="UAlert nadaje się do komunikatów kontekstowych." icon="i-lucide-info" color="info" variant="subtle" />
                    <UAlert title="Sukces" description="Semantyczny kolor nie zależy od głównego koloru marki." icon="i-lucide-circle-check" color="success" variant="subtle" />
                    <UAlert title="Uwaga" description="Wariant outline daje spokojniejszy wygląd." icon="i-lucide-triangle-alert" color="warning" variant="outline" />
                </div>

                <UCard class="mt-6">
                    <div class="grid gap-6 sm:grid-cols-3">
                        <div>
                            <p class="mb-3 text-sm font-medium">Skeleton</p>
                            <div class="space-y-2">
                                <USkeleton class="h-4 w-4/5" />
                                <USkeleton class="h-4 w-3/5" />
                                <USkeleton class="h-20 w-full" />
                            </div>
                        </div>
                        <div>
                            <p class="mb-3 text-sm font-medium">Progress</p>
                            <UProgress :model-value="64" />
                            <p class="mt-2 text-sm text-muted">64% ukończenia</p>
                        </div>
                        <div>
                            <p class="mb-3 text-sm font-medium">User</p>
                            <UUser name="Rafał" description="Fullstack developer" :avatar="{ alt: 'Rafał' }" />
                        </div>
                    </div>
                </UCard>
            </section>

            <section>
                <h2 class="mb-4 text-2xl font-bold">Dane</h2>

                <UCard>
                    <UTable :data="tableData" />
                </UCard>
            </section>

            <section>
                <h2 class="mb-4 text-2xl font-bold">Carousel i slot domyślny</h2>

                <UCarousel v-slot="{ item }" :items="carouselItems" arrows dots :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }" class="mx-auto max-w-6xl">
                    <UCard class="h-full">
                        <UIcon :name="item.icon" class="size-7 text-primary" />
                        <h3 class="mt-4 text-lg font-semibold">{{ item.title }}</h3>
                        <p class="mt-2 text-sm leading-6 text-muted">{{ item.description }}</p>
                    </UCard>
                </UCarousel>
            </section>
        </div>
    </UContainer>
</template>
