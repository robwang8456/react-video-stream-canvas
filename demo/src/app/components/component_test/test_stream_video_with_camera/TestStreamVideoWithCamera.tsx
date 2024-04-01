"use client";

import React, { useRef } from "react";
import { Camera, Video } from "react-video-stream-canvas";

function TestStreamVideoWithCamera() {
  const srcRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Video Component with Camera
      </div>
      <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500">
        <Video playsInline controls loop autoPlay muted>
          <Camera />
        </Video>
      </div>
    </>
  );
}

export default TestStreamVideoWithCamera;
