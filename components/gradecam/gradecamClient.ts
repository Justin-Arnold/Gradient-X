import type { FormMode, GradeCamAPIPublic, IScan } from "./gcsdk.model";

let gradecamPromise: Promise<GradeCamAPIPublic>;
const settings = {
    formsMode: 'dev',
    logLevel: 1,
    noPluginVer: 'beta',
    noPluginURL: null,
    version: 'alpha',
};

export async function getGradecam(): Promise<GradeCamAPIPublic> {
    if (!document) {
        return {} as any;
    }
    if (gradecamPromise) {
        return gradecamPromise;
    }
    window['_GCFORMSMODE'] = settings.formsMode;
    window['_GCNOPLUGINURL'] = settings.noPluginURL;
    window['_GCNOPLUGINVER'] = settings.noPluginVer;

    const useDefaultUI = true; // This will probably always be hard coded true
    const scriptName = useDefaultUI ? 'gcsdk.js' : 'gcsdk_noui.js';
    const baseUri = settings.version === 'local' ? `http://${document.location.hostname}:8080` : `https://downloads.gradecam.com/sdk/${settings.version}`;

    // add script element to get gcsdk
    const gcsdkScriptElem: HTMLElement = document.createElement('script');
    gcsdkScriptElem.setAttribute('type', 'text/javascript');
    gcsdkScriptElem.setAttribute('src', `${baseUri}/${scriptName}`);

    // add script element to get css for gcsdk if using UI
    if (useDefaultUI) {
        let gcsdkCSSLinkElem: HTMLElement = document.createElement('link');
        gcsdkCSSLinkElem.setAttribute('rel', 'stylesheet');
        gcsdkCSSLinkElem.setAttribute('href', `${baseUri}/css/gcsdk.css`);
        gcsdkCSSLinkElem.setAttribute('type', 'text/css');

        document.head.append(gcsdkCSSLinkElem);
        document.body.append(gcsdkScriptElem);
    }

    gradecamPromise = new Promise((resolve, reject) => {
        if ('gradecam' in window && window.gradecam) {
            resolve(window.gradecam as GradeCamAPIPublic);
        } else {
            (window as any)['gradeCamOnAPILoad'] = (gradecam: GradeCamAPIPublic) => {
                gradecam.setDesiredVersion('alpha');
                gradecam.setModuleOrder(['mobile-prompt', 'plugin-prompt', 'noplugin']);
                resolve(gradecam);
            };
        }
    });
    const gradecam = await gradecamPromise;
    setup();
    return gradecam;
}

function setup() {
    setLogLevel(settings.logLevel || 1);
    const defaultMode: Partial<FormMode> = {
        "scan_mode": "exam",
        "exam_length": 10,
        "auto_length": true,
        "output_version": 1,
    }
    setMode(defaultMode);
}

export const pluginReady = new Promise<GradeCamAPIPublic>(async (resolve, reject) => {
    const gcsdk = await getGradecam();
    gcsdk.bind('pluginLoad', () => {
        resolve(gcsdk);
    });
});

export async function getCameraList() {
    const gcsdk = await getGradecam();
    return gcsdk.getCameraList();
}

export async function setMode(mode: Partial<FormMode>) {
    const gcsdk = await getGradecam();
    gcsdk.setMode(mode);
}

export async function setLogLevel(level: number) {
    const gcsdk = await getGradecam();
    gcsdk._setLogLevel(level);
}

export function useScanEvents(onScan: (scan: IScan) => void) {
    (async () => {
        const gcsdk = await getGradecam();
        gcsdk.bind('scan', onScan);
        onBeforeUnmount(() => gcsdk.unbind('scan', onScan));
    })();
}

export function useVideoSize() {
    const videoSize = ref({ width: 0, height: 0 });
    (async () => {
        const gcsdk = await getGradecam();
        const handler = (width: number, height: number) => videoSize.value = { width, height };
        onBeforeUnmount(() => gcsdk.unbind('videoSize', handler));
        gcsdk.bind('videoSize', handler);
    })();
    return { videoSize };
}