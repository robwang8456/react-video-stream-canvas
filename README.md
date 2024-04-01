## Overview 
This package provides a toolset to simplify casting camera/MediaStream to HTML video/canvas elements.

When developing WebRTC applications, we need to deal with camera feeds and media streams. The traditional way to translate these streams to a HTML video element can be very complicated:
- Allocate camera MediaStream
- Set MediaStream to a Video elements' srcObject
- Render stream on a Canvas element
- Clear MediaStream after usage
- Unset MediaStream of Video element
- ...  

Especially in React's strict mode, resources leakage happens frequently. Therefore, we have to be very careful when dealing with these streams.

This package simplifies the process of casting camera and media streams to HTML elements, as well as the cleanup after using the streams.

## Installation
```
npm i react-video-stream-canvas
```

## Watch Demo
```
git clone https://github.com/robwang8456/react-video-stream-canvas.git
cd demo
npm i
npm run dev
```
You can see the usages of Hooks and Components.

## Hooks
### useLink(target, source)
Link two streamed HTMLElements, pipe source's stream to target.

**Refer to [README.md](https://github.com/robwang8456/react-video-stream-canvas/blob/0.1/demo/README.md) in demo folder for refence of useLink**

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

## Components Demo
**Render camera stream in a Video element:**
```
    <Video>
        <Camera />
    </Video>
```

**Render camera stream in a Canvas component:**
```
    <Canvas>
        <Camera />
    </Canvas>
```

**Render Stream in a Canvas component:**
```
    <Canvas>
        <Stream source={stream} />
    </Canvas>
```
One example of the stream here can be a WebRTC remote stream.

**Render normal video stream in a Canvas component**
```
    <Canvas>
        <Video>
            <source src="/video/chrome.mp4" type="video/mp4" />
            <source src="/video/chrome.webm" type="video/webm" />
        </Video>
    </Canvas>
```