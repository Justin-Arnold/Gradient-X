<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getGradecam, useVideoSize } from './gradecamClient';
import useScannerStore from '~/stores/scanner';

const { showScanner } = storeToRefs(useScannerStore());
const { videoSize } = useVideoSize();
const videoRatio = computed(() => videoSize.value.width / videoSize.value.height || 1);
const containerHeight = ref(320);
const containerWidth = computed(() => containerHeight.value * videoRatio.value);
const isFullScreen = ref(false);

const gradecamContainer = ref<HTMLElement>();
const gradecamElement = ref<HTMLElement>();

async function insertGradeCamElement() {
    const gradecam = await getGradecam();
    gradecamElement.value = gradecam.getElement({disable_camera: showScanner.value});
    gradecamContainer.value?.prepend(gradecamElement.value);
}
onMounted(() => {
    insertGradeCamElement();
});
onUpdated(insertGradeCamElement);
</script>

<template>
    <Transition name="slide-down">
        <div
            class="flex justify-center mb-4 -mt-4"
            v-show="showScanner"
        >
            <div ref="gradecamContainer" class="relative" :style="{height: containerHeight + 'px', width: containerWidth + 'px'}">
                <Icon
                    @click="isFullScreen = !isFullScreen"
                    class="absolute top-4 right-4 settings-button text-white cursor-pointer p-2 bg-black/50 rounded-md"
                    name="mdi:arrow-expand"
                    size="36px"
                />
                <Icon
                    class="absolute bottom-4 right-4 settings-button text-white cursor-pointer p-2 bg-black/50 rounded-md"
                    name="ic:settings"
                    size="36px"
                />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* The starting state of the element (collapsed) */
.slide-down-enter-from,
.slide-down-leave-to {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
}

/* The ending state of the element (expanded) */
.slide-down-enter-to,
.slide-down-leave-from {
    max-height: 100%; /* You may need to adjust this value depending on the height of your element */
    opacity: 1;
}

/* The actual transition effect */
.slide-down-enter-active,
.slide-down-leave-active {
    transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
</style>
