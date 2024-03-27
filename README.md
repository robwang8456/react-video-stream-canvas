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
