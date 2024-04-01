"use client";

import React from "react";
import { CameraVideo } from "react-video-stream-canvas";

function TestCameraVideo() {
  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        CameraVideo Component
      </div>
      <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500">
        <CameraVideo
          constraints={{ video: true, audio: false }}
          autoPlay
          playsInline
        />
      </div>
    </>
  );
}

export default TestCameraVideo;
