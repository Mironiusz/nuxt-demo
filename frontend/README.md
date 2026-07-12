# Nuxt Demo Lab

Demo edukacyjne dla projektu Nuxt 4 z Nuxt UI, Tailwind CSS 4, TypeScript i endpointami Nitro.

## Uruchomienie

```powershell
pnpm install
pnpm dev
```

Aplikacja będzie dostępna pod `http://localhost:3000`.

## Kontrola jakości

```powershell
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

## Podstrony

- `/` - strona startowa i przegląd technologii
- `/landing` - przykład rozbudowanego landing page z komponentów Nuxt UI
- `/components` - galeria komponentów Nuxt UI oraz reaktywność przez v-model
- `/data` - useFetch, $fetch i endpointy Nitro
- `/state` - ref, computed, useState, useCookie i route middleware
- `/forms` - UForm, własna walidacja, POST i toast
- `/rendering` - SSR, useAsyncData, hydration, onMounted i ClientOnly
- `/articles` - lista pobierana z API i dynamiczne trasy `[slug]`
- `/guide` - strona korzystająca z osobnego layoutu `docs`

## Najważniejsze katalogi

```text
app/
    assets/css/        globalny CSS i tokeny Tailwinda
    components/        auto-importowane komponenty Vue
    composables/       auto-importowana logika współdzielona
    layouts/           ramy stron
    middleware/        logika wykonywana przy zmianie tras
    pages/             routing plikowy
    utils/             auto-importowane funkcje pomocnicze
server/api/            endpointy Nitro
public/                statyczne pliki dostępne bezpośrednio
```

## Wymiana w istniejącym projekcie

1. Zatrzymaj `pnpm dev`.
2. Usuń lub przenieś dotychczasowy katalog `app`.
3. Skopiuj katalog `app` z paczki.
4. Skopiuj pliki i katalogi z paczki `outside-app` do katalogu `frontend`, zgadzając się na zastąpienie.
5. Wykonaj `pnpm install`.
6. Uruchom `pnpm format`, `pnpm typecheck` i `pnpm dev`.

Endpoint formularza jest demonstracyjny i nie zapisuje ani nie wysyła danych.
