<template>
    <NuxtPage></NuxtPage>
</template>

<script lang="ts" setup>

definePageMeta({
    tabs: [
        {
            label: 'Key',
            to: `/key`
        },
        {
            label: 'Responses',
            to: `/responses`
        },
    ]
})

</script>