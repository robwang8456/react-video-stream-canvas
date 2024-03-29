"use client";

import React, { useContext, useMemo, useRef } from "react";
import ReactVSC, { DrawInfo } from "react-video-stream-canvas";
import { UIContext } from "../../UISetting";

function DrawOnCanvas() {
  const uiContext = useContext(UIContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  function drawFG(drawInfo: DrawInfo) {
    const ctx = drawInfo.context!;
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";

    const dr = drawInfo.dstRect;
    ctx.fillRect(dr.left, dr.top, dr.width, dr.height);
  }

  function drawBG(drawInfo: DrawInfo) {
    const ctx = drawInfo.context!;
    ctx.fillStyle = "green";

    const cr = drawInfo.canvasRect;
    ctx.fillRect(cr.left, cr.top, cr.width, cr.height);
  }

  const drawCallbacks = useMemo(() => {
    return {
      drawForeground: drawFG,
      drawBackground: drawBG,
    };
  }, []);

  const canvasRef = ReactVSC.useCanvasRef(drawCallbacks);

  ReactVSC.useLink(canvasRef, videoRef);

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Drawing on Canvas
      </div>
      <div className="container flex gap-2 p-2 w-128 mt-2 border-2 bg-slate-500">
        <div className="w-1/2 justify-center content-center">
          <h2>Source</h2>
          <video ref={videoRef} playsInline controls loop autoPlay muted>
            <source src="/video/chrome.webm" type="video/webm" />
            <source src="/video/chrome.mp4" type="video/mp4" />
            <p>This browser does not support the video element.</p>
          </video>
        </div>

        <div className="w-1/2 justify-center content-center bg-green-200">
          <h2>Target</h2>
          <canvas
            ref={canvasRef}
            style={
              {
                objectFit: uiContext.fit,
                width: "100%",
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </>
  );
}

export default DrawOnCanvas;
