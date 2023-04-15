<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">

function test() {
    console.log('test')
}

</script>

<style>
/* ... */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s;
}
.slide-up-enter-from {
    opacity: 0;
    transform: translateY(-100%);

}
.slide-up-leave-to {
    opacity: 0;
  transform: translateY(100%);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s;
}
.slide-down-enter-from {
    opacity: 0;
    transform: translateY(100%);
}
.slide-down-leave-to {
    opacity: 0;
  transform: translateY(-100%);
}
</style>
