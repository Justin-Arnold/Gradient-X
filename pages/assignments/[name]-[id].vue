<template lang="">
    <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">

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