
import assert from "assert";
import { RefObject, useEffect, useMemo, useRef } from "react";

export type StreamLike = MediaStream
    | Promise<MediaStream>
    | HTMLVideoElement
    | HTMLCanvasElement
    | RefObject<HTMLElement>
    | RefObject<HTMLVideoElement>
    | RefObject<HTMLCanvasElement>
    ;

function isStream(obj: StreamLike) { return obj instanceof MediaStream; }
function isPromisedStream(obj: StreamLike) { return obj instanceof Promise && typeof obj.then === "function" && typeof obj.catch === "function"; }
function isVideoTag(obj: StreamLike) { return obj instanceof HTMLVideoElement; }
function isCanvasTag(obj: StreamLike) { return obj instanceof HTMLCanvasElement; }

function isVideoRef(obj: StreamLike) {
    return (obj as any)?.current instanceof HTMLVideoElement;
}

function isCanvasRef(obj: StreamLike) {
    return (obj as any)?.current instanceof HTMLCanvasElement;
}

abstract class BaseStreamLike {
    source?: BaseStreamLike;
    target?: BaseStreamLike;
    linked?: boolean;
    triggered?: boolean;

    static notImplErr = new Error("not implemented.");

    constructor() { }

    notImplErr() { return new Error("not implemented."); }

    abstract linkSource(): void;
    abstract unlinkSource(): void;

    abstract isAllSet(): boolean;
    abstract isSelfReady(): boolean;
    abstract prepareSelf(): void;

    exportStream(): MediaStream | null { return null; }
    exportVideo(): HTMLVideoElement | null { return null; }
    exportCanvas(): HTMLCanvasElement | null { return null; }

    needsToLink() {
        return !this.isLinked() && this.isSourceReady() && this.isSelfReady();
    }

    isLinked() {
        return !this.source || !!this.linked;
    }

    needsToNotifyTarget() {
        if (this.triggered || !this.target || !this.isSelfReady()) { return false; }
        if (this.isLinked()) { return true; }
        return false;
    }

    isSourceReady() {
        return this.source?.isAllSet();
    }

    setSource(source: BaseStreamLike) {
        this.source = source;
        this.linked = false;
        this.triggered = false;
        this.tryLink();
    }

    setTarget(target: BaseStreamLike) {
        this.target = target;
        this.triggered = false;
        this.triggerTargetWhenNeed();
    }

    triggerTargetWhenNeed() {
        if (this.needsToNotifyTarget()) {
            this.target!.onSourceReady();
            this.triggered = true;
        }
    }

    tryLink() {
        if (this.needsToLink()) {
            this.linkSource();
        }

        this.triggerTargetWhenNeed();
    }

    onSourceReady(): void {
        this.tryLink();
    }

    onMount() {
        this.prepareSelf();
        this.tryLink();
    }

    onUnmount() {
        this.unlinkSource();
    }
}

class Stream extends BaseStreamLike {
    stream!: MediaStream;

    constructor(stream: MediaStream) {
        super();
        this.setStream(stream);
    }

    setStream(stream: MediaStream) {
        this.stream = stream;
    }

    prepareSelf(): void { }

    linkSource(): void { }
    unlinkSource(): void { }

    isLinked() { return !!this.stream; }
    isAllSet(): boolean { return !!this.stream; }
    isSelfReady(): boolean { return true; }

    exportStream() { return this.stream; }
}

class PromisedStream extends Stream {
    promise: Promise<MediaStream>;

    constructor(promise: Promise<MediaStream>) {
        super(undefined!);
        this.promise = promise;

        this.promise.then((stream) => {
            this.setStream(stream);
            this.triggerTargetWhenNeed();
            return stream;
        });
    }
}

class Video extends BaseStreamLike {
    tag!: HTMLVideoElement;

    constructor(tag: HTMLVideoElement) {
        super();
        this.setTag(tag);
    }

    exportVideo() { return this.tag; }
    exportStream() { return (this.tag as any).captureStream() as MediaStream; }

    isAllSet(): boolean { return this.isLinked(); }
    isSelfReady() { return !!this.tag; }
    prepareSelf(): void { }

    setTag(tag: HTMLVideoElement) {
        this.tag = tag;
    }

    linkSource() {
        const stream = this.source!.exportStream();
        this.tag.srcObject = stream;
        this.linked = true;
        tryPlayVideo(this.tag);
    }

    unlinkSource(): void {
        this.tag.srcObject = null;
    }
}

class VideoRef extends Video {
    ref: RefObject<HTMLVideoElement>;

    constructor(ref: RefObject<HTMLVideoElement>) {
        super(ref.current!);
        this.ref = ref;
    }

    prepareSelf(): void {
        if (this.ref.current) {
            this.setTag(this.ref.current);
        }
    }
}

type Rect = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export type DrawInfo = {
    context?: CanvasRenderingContext2D;

    readyToDraw: boolean;
    drawHandle: number;

    fitMode: string;
    videoRect: Rect;
    canvasRect: Rect;

    srcRect: Rect;
    dstRect: Rect;

    fpsGoal: number;
    delay: number;
    delayValue: number;

    frameTime: number;
    lastTime: number;
};

type DrawRects = {
    videoRect: Rect,
    canvasRect: Rect,
    srcRect: Rect,
    dstRect: Rect,
};

const DrawConsts = {
    FPS_FACTOR: 0.9,
    FPS_GOAL: 30,
    SCALE_DOWN_FACTOR: 0.8,
};

type CanvasDrawCallback = {
    drawForeground?: (drawInfo: DrawInfo) => void;
    drawBackground?: (drawInfo: DrawInfo) => void;
};

class DrawCanvas {

    canvasObj: Canvas;

    canvas?: HTMLCanvasElement;
    video?: HTMLVideoElement;

    drawInfo?: DrawInfo;

    drawBackground?: (drawInfo: DrawInfo) => void;
    drawForeground?: (drawInfo: DrawInfo) => void;

    constructor(canvas: Canvas, callbacks?: CanvasDrawCallback) {
        this.canvasObj = canvas;
        this.canvas = canvas.tag;
        this.video = canvas.videoSource;

        this.drawForeground = callbacks?.drawForeground;
        this.drawBackground = callbacks?.drawBackground;
        this.startDrawing();
    }

    get_canvas_rect() {
        assert(this.canvas);
        return { left: 0, top: 0, width: this.canvas.width, height: this.canvas.height };
    }

    get_video_rect() {
        assert(this.video);
        return { left: 0, top: 0, width: this.video.videoWidth, height: this.video.videoHeight };
    }

    get_draw_rects(): DrawRects {
        assert(this.canvas);

        const videoRect = this.get_video_rect();
        const canvasRect = this.get_canvas_rect();

        const emptyRect = (!videoRect.height || !videoRect.width || !canvasRect.height || !canvasRect.width);

        const objectFit = this.canvas.style.objectFit;
        if (emptyRect
            || !objectFit
            || objectFit === "fill") {
            return {
                videoRect: videoRect,
                canvasRect: canvasRect,
                srcRect: { ...videoRect },
                dstRect: { ...canvasRect },
            };
        }

        const videoRatio = videoRect.width / videoRect.height;
        const canvasRatio = canvasRect.width / canvasRect.height;

        if (objectFit === "contain") {
            return {
                videoRect: videoRect,
                canvasRect: canvasRect,
                srcRect: { ...videoRect },
                dstRect: (videoRatio >= canvasRatio)
                    ? {
                        left: 0,
                        top: (canvasRect.height - canvasRect.width / videoRatio) / 2,
                        width: canvasRect.width,
                        height: canvasRect.width / videoRatio,
                    }
                    : {
                        left: (canvasRect.width - canvasRect.height * videoRatio) / 2,
                        top: 0,
                        width: canvasRect.height * videoRatio,
                        height: canvasRect.height,
                    }
            };
        }

        if (objectFit === "cover") {
            return {
                videoRect: videoRect,
                canvasRect: canvasRect,
                dstRect: { ...canvasRect },
                srcRect: videoRatio >= canvasRatio
                    ? {
                        left: (videoRect.width - videoRect.height * canvasRatio) / 2,
                        top: 0,
                        width: videoRect.height * canvasRatio,
                        height: videoRect.height,
                    }
                    : {
                        left: 0,
                        top: (videoRect.height - videoRect.width / canvasRatio) / 2,
                        width: videoRect.width,
                        height: videoRect.width / canvasRatio,
                    }
            };
        }

        if (objectFit === "none" ||
            objectFit === "scale-down") {

            const new_rect = {
                left: 0,
                top: 0,
                width: canvasRect.width * DrawConsts.SCALE_DOWN_FACTOR,
                height: canvasRect.height * DrawConsts.SCALE_DOWN_FACTOR,
            };

            return {
                videoRect: videoRect,
                canvasRect: canvasRect,
                srcRect: { ...videoRect },
                dstRect: (videoRatio >= canvasRatio)
                    ? {
                        left: (canvasRect.width - new_rect.width) / 2,
                        top: (canvasRect.height - new_rect.width / videoRatio) / 2,
                        width: new_rect.width,
                        height: new_rect.width / videoRatio,
                    }
                    : {
                        left: (canvasRect.width - new_rect.height * videoRatio) / 2,
                        top: (canvasRect.height - new_rect.height) / 2,
                        width: new_rect.height * videoRatio,
                        height: new_rect.height,
                    }
            };
        }

        throw new Error("objectFit parameter wrong!");
    }

    isDpiFixed(canvas: HTMLCanvasElement) {
        return (canvas as any).dpiFixed;
    }

    setDpiFixed(canvas: HTMLCanvasElement) {
        (canvas as any).dpiFixed = true;
    }

    // Blurry problem reason: initial size of HTMLCanvasElement is 300x150.
    fixCanvasBlurryProblem() {
        assert(this.canvas);
        if (!this.canvas || this.isDpiFixed(this.canvas)) { return; }

        let dpi = window.devicePixelRatio;
        let styleWidth = parseInt(getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2));
        let styleHeight = parseInt(getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2));

        this.canvas.setAttribute('width', (styleWidth * dpi).toString());
        this.canvas.setAttribute('height', (styleHeight * dpi).toString());

        this.setDpiFixed(this.canvas);
    }

    makeDrawInfo() {
        assert(this.canvas && this.video);
        const context = this.canvas.getContext('2d');
        if (!context) { throw new Error("Can not get context of canvas!"); }

        const draw_rects = this.get_draw_rects();
        this.drawInfo = {
            context,
            fitMode: "contain",
            ...draw_rects,
            fpsGoal: 30,
            delay: 0,
            delayValue: 0,
            readyToDraw: false,
            drawHandle: 0,
            frameTime: 1 / DrawConsts.FPS_GOAL,
            lastTime: Date.now(),
        };
    }

    updateFps() {
        assert(this.drawInfo);

        const dt = (Date.now() - this.drawInfo.lastTime) / 1000;
        this.drawInfo.frameTime = this.drawInfo.frameTime * DrawConsts.FPS_FACTOR + dt * (1 - DrawConsts.FPS_FACTOR);

        const fps = 1 / this.drawInfo.frameTime;
        this.drawInfo.delayValue += (fps - this.drawInfo.fpsGoal) / 100;
        if (this.drawInfo.delayValue < 0) {
            this.drawInfo.delayValue = 0;
        }

        this.drawInfo.delay += this.drawInfo.delayValue;
    }

    isSizeChanged() {
        assert(this.drawInfo && this.video);
        return (this.drawInfo.videoRect.width !== this.video.videoWidth
            || this.drawInfo.videoRect.height !== this.video.videoHeight
            || this.drawInfo.fitMode !== this.video.style.objectFit);
    }

    updateArea() {
        assert(this.drawInfo);

        if (this.isSizeChanged()) {
            const rects = this.get_draw_rects();
            Object.assign(this.drawInfo, rects);
        }

        this.drawInfo.readyToDraw = this.drawInfo.videoRect.height !== 0;
    }

    updateDrawInfo() {
        if (!this.drawInfo) {
            this.makeDrawInfo();
            return;
        }

        this.updateArea();
    }

    makeNextDraw() {
        assert(this.drawInfo);
        this.drawInfo.drawHandle = window.requestAnimationFrame(() => this.draw());
    }

    cancelNextDraw() {
        if (this.drawInfo) {
            window.cancelAnimationFrame(this.drawInfo.drawHandle);
            this.drawInfo.drawHandle = -1;
        }
    }

    timeToDraw() {
        assert(this.drawInfo);
        return --this.drawInfo.delay <= 0;
    }

    readyToDraw() {
        assert(this.drawInfo);
        return this.drawInfo.readyToDraw;
    }

    draw() {
        this.makeNextDraw();
        this.updateDrawInfo();

        if (!this.timeToDraw() || !this.readyToDraw()) { return; }

        const di = this.drawInfo;
        assert(di && di.context && this.video);
        di.context.clearRect(di.canvasRect.left, di.canvasRect.top, di.canvasRect.width, di.canvasRect.height);

        this.drawBackground?.(di);
        di.context.drawImage(this.video, di.srcRect.left, di.srcRect.top, di.srcRect.width, di.srcRect.height, di.dstRect.left, di.dstRect.top, di.dstRect.width, di.dstRect.height);
        this.drawForeground?.(di);
    }

    endDrawing() {
        this.cancelNextDraw();
    }

    startDrawing() {
        assert(this.canvas && this.video);

        tryPlayVideo(this.video);
        this.fixCanvasBlurryProblem();
        this.makeDrawInfo();
        this.makeNextDraw();
    }

    clear() {
        this.endDrawing();
    }
};

class Canvas extends BaseStreamLike {
    tag: HTMLCanvasElement;
    videoSource?: HTMLVideoElement;
    drawCanvas?: DrawCanvas;

    constructor(tag: HTMLCanvasElement) {
        super();
        this.tag = tag;
    }

    setTag(tag: HTMLCanvasElement) {
        this.tag = tag;
        this.tryLink();
    }

    exportStream() { assert(this.tag); return (this.tag as any).captureStream() as MediaStream; }

    isLinked(): boolean { return !!this.videoSource; }
    isAllSet(): boolean { return !!this.tag; }
    isSelfReady(): boolean { return !!this.tag; }
    prepareSelf(): void { }

    startDrawing() {
        const callbacks = this.getDrawCallbacks();
        this.drawCanvas = new DrawCanvas(this, callbacks);
    }

    getDrawCallbacks(): CanvasDrawCallback | undefined { return undefined; }

    linkSource(): void {
        assert(this.needsToLink());

        let video = this.source?.exportVideo();
        if (!video) {
            const stream = this.source?.exportStream();
            assert(stream);
            video = newStreamVideo(stream);
        }

        this.videoSource = video;
        this.startDrawing();
        this.triggerTargetWhenNeed();
    }

    unlinkSource(): void {
        this.source = undefined;
        this.videoSource = undefined;
        this.drawCanvas?.clear();
    }
}

class CanvasRef extends Canvas {

    ref: RefObject<HTMLCanvasElement>;
    constructor(ref: RefObject<HTMLCanvasElement>) {
        super(ref.current!);
        this.ref = ref;
    }

    getDrawCallbacks(): CanvasDrawCallback | undefined {
        return (this.ref as any)?.drawCallbacks;
    }

    prepareSelf(): void {
        assert(this.ref.current);
        this.setTag(this.ref.current);
    }
}

function newStreamVideo(stream: MediaStream) {
    const video = document.createElement("video",);
    video.autoplay = true;
    video.playsInline = true;
    video.srcObject = stream;

    return video;
}

function clearStream(stream: MediaStream) {
    stream
        .getTracks()
        .forEach((track) => {
            track.stop();
        });
}

function tryPlayVideo(video: HTMLVideoElement) {
    video
        .play()
        .catch((err) => {
            console.warn("play() interrupted.");
        });
}

function newObject(obj: StreamLike): BaseStreamLike {
    if (isStream(obj)) return new Stream(obj as MediaStream);
    if (isPromisedStream(obj)) return new PromisedStream(obj as Promise<MediaStream>);
    if (isVideoTag(obj)) return new Video(obj as HTMLVideoElement);
    if (isCanvasTag(obj)) return new Canvas(obj as HTMLCanvasElement);
    if (isVideoRef(obj)) return new VideoRef((obj as unknown) as RefObject<HTMLVideoElement>);
    if (isCanvasRef(obj)) return new CanvasRef((obj as unknown) as RefObject<HTMLCanvasElement>);

    throw new Error("illegal arugment.");
}

function link(target: StreamLike, source: StreamLike, callMount: boolean = false): [BaseStreamLike, BaseStreamLike] {
    const srcObj = newObject(source);
    const tgtObj = newObject(target);

    tgtObj.setSource(srcObj);
    srcObj.setTarget(tgtObj);

    if (callMount) {
        srcObj.onMount();
        tgtObj.onMount();
    }

    return [tgtObj, srcObj];
}

function unlink(targetObj: BaseStreamLike, sourceObj: BaseStreamLike, callUnmount: boolean = false) {
    if (callUnmount) {
        targetObj.onUnmount();
    }
}

function useLink(target: StreamLike, source: StreamLike) {
    useEffect(() => {
        if (!target || !source) { return; }

        const [targetObj, sourceObj] = link(target, source, true);
        return () => { unlink(targetObj, sourceObj, true); };

    }, [target, source]);
}

function useVideoRef() {
    let ref = useRef<HTMLVideoElement>(null);
    return ref;
}

function useCanvasRef(drawCallbacks?: CanvasDrawCallback) {
    let ref = useRef<HTMLCanvasElement>(null);
    useMemo(() => { (ref as any).drawCallbacks = drawCallbacks; }, Object.values(drawCallbacks ?? {}));
    return ref;
}

function enumCameras() {
    const devices = navigator.mediaDevices;
    if (!devices) { throw new Error("No media devices"); }

    devices.enumerateDevices()
        .then(devices => {
            devices.forEach(device => {
                console.log(`${device.kind}: ${device.label} id=${device.deviceId}`);
            });
        });

}

function useCamera(constraints?: MediaStreamConstraints) {

    function initCamera() {
        const devices = navigator.mediaDevices;
        if (!devices) { throw new Error("No media devices"); }

        const promise =
            devices.getUserMedia(constraints ?? { video: true, audio: false })
                .then((stream) => {
                    if ((promise as any).discard) {
                        clearStream(stream);
                    }

                    return stream;
                })
                .catch((err: Error) => {
                    const msg = "Camera Error! This demo needs camera.";
                    window.alert(msg);
                    throw new Error(msg);
                });

        (promise as any).discard = true;
        return promise;
    }

    const promise = useMemo(initCamera, Object.values(constraints ?? {}));

    useEffect(() => {
        let newStream: MediaStream;
        (promise as any).discard = false;

        promise.then((stream) => {
            newStream = stream;
            return stream;
        });

        return () => {
            (promise as any).discard = true;
            if (newStream) {
                clearStream(newStream);
            }
        };

    }, [promise]);

    return promise;
}

export {
    link,
    unlink,
    useLink,
    useCamera,
    useVideoRef,
    useCanvasRef,
};
