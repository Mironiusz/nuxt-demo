<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui"

interface ContactForm {
    name: string
    email: string
    topic: string
    budget: string
    message: string
    newsletter: boolean
    consent: boolean
}

const form = reactive<ContactForm>({
    name: "",
    email: "",
    topic: "Landing page",
    budget: "5-15 tys. zł",
    message: "",
    newsletter: true,
    consent: false,
})
const submitting = ref(false)
const toast = useToast()

const topics = ["Landing page", "Aplikacja webowa", "Integracja API", "Konsultacja"]
const budgets = ["Do 5 tys. zł", "5-15 tys. zł", "15-30 tys. zł", "Powyżej 30 tys. zł"]

const validate = (state: Partial<ContactForm>): FormError[] => {
    const errors: FormError[] = []

    if (!state.name?.trim()) {
        errors.push({ name: "name", message: "Podaj imię" })
    }

    if (!state.email?.trim()) {
        errors.push({ name: "email", message: "Podaj adres e-mail" })
    } else if (!state.email.includes("@")) {
        errors.push({ name: "email", message: "Adres e-mail wygląda niepoprawnie" })
    }

    if (!state.message?.trim() || state.message.trim().length < 20) {
        errors.push({ name: "message", message: "Wiadomość powinna mieć co najmniej 20 znaków" })
    }

    if (!state.consent) {
        errors.push({ name: "consent", message: "Zgoda jest wymagana" })
    }

    return errors
}

const onSubmit = async (event: FormSubmitEvent<ContactForm>) => {
    submitting.value = true

    try {
        const response = await $fetch<{ message: string; receivedAt: string }>("/api/contact", {
            method: "POST",
            body: event.data,
        })

        toast.add({
            title: "Formularz wysłany",
            description: `${response.message} (${formatDate(response.receivedAt)})`,
            color: "success",
            icon: "i-lucide-circle-check",
        })
    } catch (error) {
        toast.add({
            title: "Nie udało się wysłać formularza",
            description: error instanceof Error ? error.message : "Nieznany błąd",
            color: "error",
            icon: "i-lucide-circle-alert",
        })
    } finally {
        submitting.value = false
    }
}

useSeoMeta({
    title: "Formularze",
    description: "Walidacja UForm, FormField, submit przez $fetch i powiadomienia toast.",
})
</script>

<template>
    <UContainer class="py-12 lg:py-20">
        <DemoPageIntro eyebrow="UForm + validation + toast" title="Formularz z własną walidacją" description="Przykład łączy reaktywny obiekt, komponenty formularza Nuxt UI, walidację bez dodatkowej biblioteki, żądanie POST do Nitro i komunikat toast." icon="i-lucide-send" />

        <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <UCard title="Zapytanie projektowe" description="Spróbuj wysłać pusty formularz, żeby zobaczyć błędy powiązane z polami.">
                <UForm :state="form" :validate="validate" class="space-y-5" @submit="onSubmit">
                    <div class="grid gap-5 md:grid-cols-2">
                        <UFormField label="Imię" name="name" required>
                            <UInput v-model="form.name" icon="i-lucide-user" placeholder="Rafał" class="w-full" />
                        </UFormField>

                        <UFormField label="E-mail" name="email" required>
                            <UInput v-model="form.email" type="email" icon="i-lucide-mail" placeholder="rafal@example.com" class="w-full" />
                        </UFormField>
                    </div>

                    <div class="grid gap-5 md:grid-cols-2">
                        <UFormField label="Temat" name="topic">
                            <USelect v-model="form.topic" :items="topics" class="w-full" />
                        </UFormField>

                        <UFormField label="Budżet" name="budget">
                            <USelect v-model="form.budget" :items="budgets" class="w-full" />
                        </UFormField>
                    </div>

                    <UFormField label="Wiadomość" name="message" hint="Minimum 20 znaków" required>
                        <UTextarea v-model="form.message" :rows="6" autoresize placeholder="Opisz krótko projekt, cel strony i najważniejsze sekcje..." class="w-full" />
                    </UFormField>

                    <UFormField name="newsletter">
                        <USwitch v-model="form.newsletter" label="Chcę otrzymywać materiały edukacyjne o Nuxcie" />
                    </UFormField>

                    <UFormField name="consent">
                        <UCheckbox v-model="form.consent" label="Zgadzam się na demonstracyjne przetworzenie formularza" />
                    </UFormField>

                    <div class="flex flex-wrap items-center justify-between gap-4 border-t border-default pt-5">
                        <p class="text-sm text-muted">Endpoint nie zapisuje danych. Zwraca tylko przykładową odpowiedź.</p>
                        <UButton type="submit" label="Wyślij formularz" icon="i-lucide-send" size="lg" :loading="submitting" />
                    </div>
                </UForm>
            </UCard>

            <div class="space-y-6">
                <UCard title="Co tu ćwiczysz?">
                    <ul class="space-y-4 text-sm text-muted">
                        <li class="flex gap-3"><UIcon name="i-lucide-braces" class="mt-0.5 size-4 shrink-0 text-primary" /><span><code>reactive&lt;ContactForm&gt;</code> jako stan formularza.</span></li>
                        <li class="flex gap-3"><UIcon name="i-lucide-shield-check" class="mt-0.5 size-4 shrink-0 text-primary" /><span><code>FormError[]</code> kierujące błędy do konkretnych pól.</span></li>
                        <li class="flex gap-3"><UIcon name="i-lucide-send" class="mt-0.5 size-4 shrink-0 text-primary" /><span><code>$fetch</code> dla akcji wykonanej przez użytkownika.</span></li>
                        <li class="flex gap-3"><UIcon name="i-lucide-message-circle" class="mt-0.5 size-4 shrink-0 text-primary" /><span><code>useToast</code> dostępny dzięki nadrzędnemu <code>UApp</code>.</span></li>
                    </ul>
                </UCard>

                <UAlert title="Następny krok" description="W realnym projekcie do walidacji możesz dołożyć Zod lub Valibot, a endpoint połączyć z CRM albo dostawcą poczty." icon="i-lucide-lightbulb" color="info" variant="subtle" />
            </div>
        </div>
    </UContainer>
</template>
