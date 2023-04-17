<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">

interface props {
    label: string,
}
defineProps<props>()

</script>

<template>
    <div class="p-float-label mt-2 w-full">
        <PrimeInputText class="w-full" v-bind="$attrs"/>
        <label>{{label}}</label>
    </div>
</template>

<style>

.p-float-label input.p-filled ~ label,
.p-float-label input:focus ~ label {
    @apply !-ml-2;
}

</style>