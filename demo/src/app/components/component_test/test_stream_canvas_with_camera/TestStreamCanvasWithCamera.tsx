"use client";

import React, { useState } from "react";
import { Camera, Canvas } from "react-video-stream-canvas";

function TestStreamCanvasWithCamera() {
  const fits = ["contain", "fill", "cover", "none", "scale-down"];
  const [fitIndex, setFitIndex] = useState(0);
  function nextFit() {
    setFitIndex((fitIndex + 1) % fits.length);
  }

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Canvas Component with Camera
      </div>
      <div className="flex items-baseline gap-3 p-2">
        <button
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
          onClick={nextFit}
        >
          Change-Fit <br /> Cur:{fits[fitIndex]}{" "}
        </button>
      </div>
      <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500">
        <Canvas
          className="h-64 bg-red-300"
          style={
            {
              objectFit: fits[fitIndex],
            } as React.CSSProperties
          }
        >
          <Camera />
        </Canvas>
      </div>
    </>
  );
}

export default TestStreamCanvasWithCamera;
