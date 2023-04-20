<template>
    <NuxtLayout name="staff-portal">
        <div class="grid place-items-center gap-2 h-full items-center">
            <div class="w-80 grid place-items-center" :class="{ 'animate-expand': isModalOpen, 'fixed z-[9999]': isModalOpen }">
                <div class="bg-gradient-to-r from-slate-800 to-slate-500 rounded aspect-video w-full"></div>
            </div>
            <Button @click="isModalOpen = !isModalOpen">Full Screen</Button>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">


const isModalOpen = ref(false)

</script>

<style scoped>
  .animate-expand {
    animation: modal-expand .2s ease-in-out both;
  }

  @keyframes modal-expand {
    from {
        @apply w-80 bg-transparent
    }
    100% {
        @apply w-screen bg-black/80 h-full -ml-16
    }
}

</style>
