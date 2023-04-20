import { GCIPScan } from './GCIPScan';

export interface GradeCamAPIPublic {
    SDK_VERSION: string;
    bind(evt: Event, cb: (...args: any[]) => void, ctx?: any): void;
    clearTyperStrings(): true | void;
    enableHighRes(timeLength: number): void;
    forms: any; // TODO
    forms2: any; // TODO
    getCameraList(): string[];
    getElement(instOpts?: ReaderInstanceOptions): HTMLElement;
    getGciAsync(cb: (res: GCGetImageResult | false) => void): void;
    getJpegAsync(cb: (res: string | false) => void): void;
    getLastFormDescription(): any;
    getMode(): FormMode;
    getOption(key: keyof GradeCamOptions): any;
    getOptions(): GradeCamOptions;
    getSDK(which: 'internal'): GradeCamAPI;
    getTyperOptions(): ModuleLoader.TyperOption[];
    getVersion(): string;
    initTyper(fkey: string, delay: number, rkey: string, rkeyDelay: number): Promise<void>;
    isAtLeastVersion(desiredVersion: string): boolean;
    isInstalled(): boolean;
    registerFileHandler(extensions: string[], path: string): void;
    requireSupport(feature: string): void;
    requireVersion(version: string): void;
    scanFilesAsync(files: File[], cb: Function): Promise<false | void>;
    setActive(active: boolean): void;
    setDesiredVersion(version: string): void;
    setHotKeyCallback(cb: () => void): void;
    setLicensingInfo(info: any): void;
    setMode(newMode: Partial<FormMode>): void;
    setModuleOption(modName: string, opt: keyof ModuleLoader.ModuleOptions, value: any): void;
    setModuleOrder(list: string[]): void;
    setOptions(inOpts: Partial<GradeCamOptions>, apply?: boolean): void;
    setReturnURL(url: string): void;
    setTransparency(): void;
    setTyperStrings(scores: string[]): true | void;
    setValidateCallback(cb: ScanManager.ValidateCallback): void;
    startCamera(): void;
    stopCamera(): void;
    supports(feature: string): boolean;
    ui: any;
    unbind(evt: Event, cb: (...args: any[]) => void): void;
    _addFormToCache(form: any): void;
    _debugScanById(id: string): Promise<void>;
    _registerFileReader(name: string, module: any): void;
    _setLogLevel(level: number): void;
    _simulateScan(scanData: GCIPScan, opts?: ScanManager.ProcessOptions): void;
}
export interface GradeCamAPI extends GradeCamAPIPublic {
    controller: ScanSourceController;
}
export type Event = 'cameraVisible' | 'formcode' | 'hotkey' | 'install' | 'needsInstall' | 'needsRefresh' | 'pluginLoad' | 'scan' | 'scanIssue' | 'scanJSON' | 'upgrade' | 'videoSize';
export interface IScanIssue {
    data: any;
    message: string;
    type: string;
}
namespace ScanManager {
    interface validateOptions {
    }
    interface validatedItem {
        value: any;
        validate: boolean;
    }
    export type ValidateCallback = (opts: validateOptions, cb: (items: validatedItem[]) => void) => void;
    interface Dfd<T> {
        reject(err?: Error): void;
        resolve(val?: T | Promise<T>): void;
        promise: Promise<T>;
    }
    export interface ProcessOptions {
        returnScan?: boolean;
        successObj?: Dfd<void>;
        scansRequired?: number;
        scansMax?: number;
        scansToValidate?: number;
        dontValidate?: boolean;
    }
}

type FormTypeEnum = 'exam' | 'answerkey' | 'score' | 'credit' | 'custom';
interface MultiplicityObject {
    [version: string]: number[];
}
export interface FormMode {
    type: FormTypeEnum;
    exam_length: number;
    auto_length: boolean;
    exam_versions: number;
    exam_answer_multiplicities: number | number[] | MultiplicityObject;
    custom_form_description: any | any[];
    ignore_formcode_choices: boolean;
    output_version: number;
}
namespace ModuleLoader {
    export interface TyperOption {
        module: string;
        installed: boolean;
        url: string;
        makeUrl: (rUrl: string) => string;
        waitForInstall: () => any;
    }
    export interface ModuleOptions {
        reqFeatures: string[];
        minVersion: string;
        downloadsUrl?: string;
    }

    export interface InstallStatus {
        installType: string;
        reason: string;
        module: ScanSourceModule;
        fallbacks: ScanSourceModule[];
    }
}
export interface ScanSourceModule {
    getName(): string;
    isSupported(): boolean;
    isInstalled(): boolean;
    makeInstallUrl(desiredVersion?: string, returnUrl?: string): string;
    instantiate(el: HTMLElement, opts: any, checkValidVersion: (ctrl: ScanSourceController) => void): Promise<ScanSourceController>;

    setDownloadsUrl?(url: string): void;
    setOption?(option: string, value: any): void;
    supports?(feature: string): boolean;

    supportsTyper(): boolean;
    isTyperInstalled(): boolean;
    doesInstallRequireRestart(): boolean;
    cancelLoad(): void;
    waitForInstall(): Promise<string | boolean>;

    loadPref: 'always' | 'prompt' | null;
}
type ObjectIdString = string;

export interface GradeCamOptions {
    choice_error_threshold: number;
    file_process_mode: 'fast' | 'normal' | 'aggressive';
    filescan_sigma_threshold: number;
    flip_image?: boolean;
    multiplicity_error_threshold_expected: number;
    multiplicity_error_threshold_not_expected: number;
    rotate: CameraRotate;
    selected_camera: string;
    sigma_threshold: number;
};

interface ScanAnswer {
    area: 'main';
    choices: string[];
    type: 'question' | 'number' | 'clip';
    value: string; // NOT an index, but the actual answer, e.g. "3+5" (num) or "AD" (mc) or "3" (rubric) or b64-encoded image data (clip)
}
export interface TabularColumnData {
    type: "clip";// | "bubble"; //TODO Add back in when we add bubbles as a type
    value?: string;
}
export interface TabularRowData {
    columns: TabularColumnData[];
    text: string;
    data?: { [key: string]: any };
}
export interface IScan {
    answers: ScanAnswer[];
    columns?: ScanAnswer[];
    rows?: TabularRowData[];
    exam_version?: string;
    gradecam_id?: string; // the first entry from `ids`
    ids?: string[];
    scan_type: FormTypeEnum;

    // only present on forms with formcodes
    data?: {
        assignmentId?: ObjectIdString;
        exam_version?: string;
        sectonId?: ObjectIdString;
        studentId?: ObjectIdString;
    };
    form_id?: number;
    page?: number;
    pageCount?: number;
    startOffset?: number;
    rowOffset?: number;
}

interface ReaderInstanceOptions {
    disable_camera?: boolean;
}

export type gcImageData = [number, number, string, string];
export enum CameraRotate {
    None = 0,
    Left90 = 1,
    Full180 = 2,
    Right90 = 3
};
export type GCGetImageResult = [number, number, string, string];
export interface ScanSourceController {

    bind(evt: string, cb: (...args: any[]) => void, ctx?: any) : void;
    unbind(evt: string, cb: (...args: any[]) => void): void;

    _shutdown(): void;
    startPolling(): void;
    pause(): void;
    unpause(): void;
    setCamera(camera: string, flip: boolean): void;
    setCamera(camera: string, rotate: CameraRotate): void;

    processImageFiles(completeCallback: Function, badFileCallback: Function): void;
    processImageFile(completeCallback: Function, badFileCallback: Function): void;
    processImageFileArray(files: File[], completeCallback: Function, badFileCallback: Function): void;
    scanFilesAsync(files: File[], cb?: Function): void;

    setActive(isActive: boolean): void;
    enableHighRes(timeInMs: number): void;

    getVersion(): string;
    isAtLeastVersion(desiredVer: string): boolean;

    stopCamera(): void;
    getCameraList(): string[];
    typeScores(scores: number[]): void;
    typeScoreStrings(scores: string[]): void;
    setTyperStrings(scores: string[]): void;
    clearTyperStrings(): void;

    supports(feature: string): boolean;

    getJPEGImage(): string | false;
    getCurrentImage(): GCGetImageResult | false;
    getJpegAsync(cb: (res: string | false) => void): void;
    getGciAsync(cb: (res: GCGetImageResult | false) => void): void;

    setTransparency(): void;

    initTyper(fkey: string, delay: number, rkey: string, rkeyDelay?: number): void;

    getSpeedHandicap(): number;
    getNeedsTransparency(): boolean;

    plugin: {
        bind?(evt: string, cb: (...args: any[]) => void, ctx?: any) : void;
        processDirectData(imageData: ImageData): Promise<string>;
        setOption?(opt: string, val: any): void;
        setDebugImage?(debugImageName: string): void;
        unbind?(event: Event, handler?: Function): void;
        [key: string]: any;
    };
}