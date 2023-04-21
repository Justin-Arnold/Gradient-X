<template>
    <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">
const route = useRoute();
if (route.name === 'lite') {
    navigateTo('/lite/exams');
}
</script>