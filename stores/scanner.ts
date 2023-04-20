import { defineStore } from 'pinia';
import type { GradeCamOptions } from '~/components/gradecam/gcsdk.model';
import { getGradecam } from '~/components/gradecam/gradecamClient';

export default defineStore('scanner', () => {
    const options = ref<GradeCamOptions>({} as any);
    const showScanner = ref(false);
    const videoSize = ref({ width: 0, height: 0 });

    watch(showScanner, async () => {
        const gradecam = await getGradecam();
        if (showScanner.value) {
            gradecam.startCamera();
        } else {
            gradecam.stopCamera();
        }
    });

    watch(options, async () => {
        const gradecam = await getGradecam();
        gradecam.setOptions(options.value);
    }, { deep: true });

    (async () => {
        const gradecam = await getGradecam();
        options.value = gradecam.getOptions();
    })();
    return {
        options,
        showScanner,
        videoSize,
    }
});
