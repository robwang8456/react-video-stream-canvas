"use client";

import React, { useRef } from "react";
import { Canvas, Stream } from "react-video-stream-canvas";

function TestStreamCanvas() {
  const srcRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Canvas Component with Stream
      </div>
      <video ref={srcRef} hidden playsInline controls loop autoPlay muted>
        <source src="/video/chrome.webm" type="video/webm" />
        <source src="/video/chrome.mp4" type="video/mp4" />
        <p>This browser does not support the video element.</p>
      </video>

      <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500">
        <Canvas>
          <Stream source={srcRef} />
        </Canvas>
      </div>
    </>
  );
}

export default TestStreamCanvas;
