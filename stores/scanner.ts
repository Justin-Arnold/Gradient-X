import { defineStore } from 'pinia';
import { getGradecam } from '~/components/gradecam/gradecamClient';

export default defineStore('scanner', () => {
    const showScanner = ref(false);

    watch(showScanner, async () => {
        const gradecam = await getGradecam();
        if (showScanner.value) {
            gradecam.startCamera();
        } else {
            gradecam.stopCamera();
        }
    });

    return {
        showScanner,
    }
});
