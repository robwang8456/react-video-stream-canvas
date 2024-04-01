"use client";

import React from "react";
import { CameraCanvas } from "react-video-stream-canvas";

function TestCameraCanvas() {
  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        CameraCanvas Component
      </div>
      <div className="flex justify-center p-2 w-128 h-64 mt-2 border-2 bg-slate-500">
        <CameraCanvas />
      </div>
    </>
  );
}

export default TestCameraCanvas;
