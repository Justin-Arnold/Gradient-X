<script setup lang="ts">

interface props {
    label: string,
    id: string,
}
defineProps<props>()

</script>

<template>
    <div class="w-full text-neutral-900 dark:text-neutral-50 flex flex-col p-float-label">
        <PrimeInputText class="w-full !p-2" />
        <label>{{label}}</label>
    </div>
</template>

<style>
.p-inputtext {
    @apply !p-2;
}
</style>