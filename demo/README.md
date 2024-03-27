## Overview

This demo showcases the different functionalities of the react-video-stream-canvas package, expecially the useLink hook.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Camera and Microphone Permission

Please allow permission to access your camera and microphone on your browser.

## useLink Demo
**Camera -> Video**
```
    import { useCamera, useLink, useVideoRef } from "react-video-stream-canvas";

    const videoRef = useVideoRef();
    const camera = useCamera();
    useLink(videoRef, camera);

    return <video ref={videoRef} ... />;
```
useLink will translate your camera feed into a video element, which can be handled as a normal HTML video element.

**Video -> Video**
```
    import { useLink, useVideoRef} from "react-video-stream-canvas";

    const videoRef1 = useRef<HTMLVideoElement>(null);
    const videoRef2 = useVideoRef();
    useLink(videoRef1, videoRef2);

    return <>
        <video ref={videoRef1}>
            <source src="/video/chrome.mp4" type="video/mp4" />
            <source src="/video/chrome.mp4" type="video/webm" />
        </video>
        <video ref={videoRef2} />
    </>
```
useLink will transfer the video from the first video element to a second video element.

**Camera -> Canvas**
```
    import { useCamera, useLink, useCanvasRef } from "react-video-stream-canvas";

    const canvasRef = useCanvasRef();
    const camera = useCamera();
    useLink(canvasRef, camera);

    return <canvas ref={canvasRef} ... />;
```
useLink will cast the camera feed to a canvas element, similar to the Camera -> Video example.

**Video -> Canvas**
```
    import { useLink, useCanvasRef } from "react-video-stream-canvas";

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useCanvasRef();
    useLink(canvasRef, videoRef);

    return <>
        <video ref={videoRef}>
            <source src="/video/chrome.mp4" type="video/mp4" />
            <source src="/video/chrome.webm" type="video/webm" />
        </video>
        <canvas ref={canvasRef} />;
    </>;
```
The video will be transfered to play on a canvas element.

**Linking a chain of streams**
```
    import { useLink } from "react-video-stream-canvas";

    const camera = ReactVSC.useCamera({ video: true, audio: false });
    const v0 = useRef<HTMLVideoElement>(null);
    const c0 = useRef<HTMLCanvasElement>(null);
    const v1 = useRef<HTMLVideoElement>(null);
    const c1 = useRef<HTMLCanvasElement>(null);

    ReactVSC.useLink(v0, camera);
    ReactVSC.useLink(c0, v0);
    ReactVSC.useLink(v1, c0);
    ReactVSC.useLink(c1, v1);

    return  (<>
        <video ref={v0} autoPlay playsInline />
        <canvas ref={c0} style={{ objectFit: "contain" }} />
        <video ref={v1} autoPlay playsInline />
        <canvas ref={c1} style={{ overflow: "hidden", objectFit: "contain" }} />
    </>);
```

In this example, we linked the camera feed to a video element, then a canvas element, then back to a video element, then finally to a canvas element.