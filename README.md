## Overview 
This package provides a tool-set for showing camera/MediaStream to Vide/Canvas html elements.

When develope WebRTC applications, we need dealling Camera/Video/Canvas/MediaStream:
- Allocate camera MediaStream
- Set MediaStream to a Video elements' srcObject
- Render stream on a Canvas element
- Clear MediaStream after usage
- Unset MediaStream of Video element
- ...  

Especially in React's strict mode, resources leakage appeares frequently even with careful coding.

## Installation
```
npm i react-video-stream-canvas
```

## Watch Demo
```
git clone https://github.com/mbcw/******.git
cd demo
npm run test
```
You can see the usages of Hooks and Components.

## Hooks
### useLink(target, source)
Link two streamed HTMLElements, pipe source's stream to target.

### useCamera(constraints?: MediaStreamConstraints): Promise<MediaStream>
return a Camera object initiated with constraints, just like:
```
const camera = useCamera(constraints);
```
**which equals**
```
const camera = navigator.mediaDevices.getUserMedia(constraints)
```

### useVideoRef/useCanvasRef
Create Video/Canvas Ref-object. 
> const canvasRef = useCanvasRef({ drawForeground, drawBackground});

You can draw foreground/background while canvas rendering other media-stream.
> const videoRef = useVideoRef()
Just like useRef<HTMLVideoElement>()

## Components
### Video/Canvas/Camera/Stream
When these components inside other stream-like component, will link to upper stream-like component automatically.

## Code Examples

### use Hook link stream objects

**Link camera to video**
```
    import { useCamera, useLink, useVideoRef } from "react-video-stream-canvas";

    const videoRef = useVideoRef();
    const camera = useCamera();
    useLink(videoRef, camera);

    return <video ref={videoRef} ... />;
```
Camera will streaming on Video element. You can handle video element as ususal.

**Link camera to canvas**
```
    import { useCamera, useLink, useCanvasRef } from "react-video-stream-canvas";

    const canvasRef = useCanvasRef();
    const camera = useCamera();
    useLink(canvasRef, camera);

    return <canvas ref={canvasRef} ... />;
```
Camera will streaming on Canvas element.

**Link video to canvas**
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
Video will play on Canvas element.

**Chain link streams: Camera -> Video -> Canvas -> Video -> Canvas.**
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

### use Components link stream objects
**Render webcamera stream in Video element:**
```
    <Video>
        <Camera />
    </Video>
```

**Render webcamera stream in Canvas element:**
```
    <Canvas>
        <Camera />
    </Canvas>
```

**Render pre-created stream on Canvas:**
```
    <Canvas>
        <Stream source={stream} />
    </Canvas>
```
In above, 'stream' is the stream precreated (ie. WebRTC remote stream).

**Render normal video stream in Canvas element.**
```
    <Canvas>
        <Video>
            <source src="/video/chrome.mp4" type="video/mp4" />
            <source src="/video/chrome.webm" type="video/webm" />
        </Video>
    </Canvas>
```

