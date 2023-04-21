import { defineStore } from 'pinia';
import type { GradeCamOptions } from '~/components/gradecam/gcsdk.model';
import { getGradecam } from '~/components/gradecam/gradecamClient';

export default defineStore('scanner', () => {
    const options = ref<GradeCamOptions>({} as any);
    const showScanner = ref(false);
    const videoSize = ref({ width: 0, height: 0 });


    async function clientSideSetup() {
        const gradecam = await getGradecam();

        watch(showScanner, async () => {
            if (showScanner.value) {
                gradecam.startCamera();
            } else {
                gradecam.stopCamera();
            }
        });

        options.value = gradecam.getOptions();
        watch(options, async () => {
            gradecam.setOptions(options.value);
        }, { deep: true });
    }
    if (process.client) {
        clientSideSetup();
    }

    return {
        options,
        showScanner,
        videoSize,
    }
});
