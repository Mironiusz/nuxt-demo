<script setup lang="ts">
defineProps<{
    code: string
}>()
</script>

<template>
    <pre class="demo-code"><code>{{ code }}</code></pre>
</template>
