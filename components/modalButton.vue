<template>

    <div
      class="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-2 rounded cursor-pointer h-full aspect-square"
      @click="toggle"
      ref="button"
      :class="{ 'animate-expand': isModalOpen, 'fixed z-[9999]': isModalOpen }"
    >
        <div v-show="!isModalOpen" class="h-full">
            <slot></slot>
        </div>
      <div v-if="isModalOpen" @click.stop class="h-full p-4 text-black w-full overflow-hidden hover:cursor-default">
          <slot  name="body"></slot>
      </div>
    </div>
    <div v-if="isModalOpen" class="h-full aspect-square bg-neutral-200 shadow-inner shadow-neutral-600 rounded">.</div>
    <div v-if="isModalOpen" class="fixed bg-neutral-800/70 h-screen w-screen overflow-hidden top-0 left-0 z-[9998]"></div>
  </template>

  <script setup>

    const isModalOpen = ref(false)
    const animate = ref(false)
    const button = ref(null)
    const topAnchor = ref(0)
    const leftAnchor = ref(0)

    const toggle = () => {
    //get current position in viewport of button
    if(!isModalOpen.value) {
        const { top, left } = button.value.getBoundingClientRect()
        topAnchor.value = top
        leftAnchor.value = left
    }

    nextTick(() => {
        isModalOpen.value = !isModalOpen.value
    })

  }
  </script>

  <style scoped>

  .animate-expand {
    animation: modal-expand .2s ease-in-out both;
  }

  @keyframes modal-expand {
    from {
        background: rgb(84, 140, 230);
        height: 100px;
        transform: translate(-0%, -0%);
        width: 100px;
        top: v-bind(topAnchor + 'px');
        left: v-bind(leftAnchor + 'px');
    }
    100% {
        height: 400px;
        transform: translate(-50%, -50%);
        width: 400px;
        top: 50%;
        left: 50%;
        background: white;
    }
}
</style>