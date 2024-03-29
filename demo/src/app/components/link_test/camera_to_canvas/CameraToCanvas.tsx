"use client";

import React, { useRef, useState } from "react";
import ReactVSC from "react-video-stream-canvas";

function CameraToCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const camera = ReactVSC.useCamera({ video: true, audio: false });

  const fits = ["contain", "fill", "cover", "none", "scale-down"];
  const [fitIndex, setFitIndex] = useState(0);
  function nextFit() {
    setFitIndex((fitIndex + 1) % fits.length);
  }

  ReactVSC.useLink(canvasRef, camera);

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Camera to Canvas
      </div>
      <div className="flex items-baseline gap-3 p-2">
        <button
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
          onClick={nextFit}
        >
          Change-Fit <br /> Current:{fits[fitIndex]}{" "}
        </button>
      </div>
      <div className="container flex justify-center p-2 mt-2 border-2 bg-slate-500">
        <canvas
          className="w-3/4 bg-red-300" // Color for objectFit's effect
          ref={canvasRef}
          style={
            {
              objectFit: fits[fitIndex],
              overflow: "hidden",
            } as React.CSSProperties
          }
        />
      </div>
    </>
  );
}

export default CameraToCanvas;
