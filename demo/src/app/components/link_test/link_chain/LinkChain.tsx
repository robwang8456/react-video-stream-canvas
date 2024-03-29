"use client";

import React, { useRef } from "react";
import ReactVSC from "react-video-stream-canvas";

function LinkChain() {
  const camera = ReactVSC.useCamera({ video: true, audio: false });
  const v0 = useRef<HTMLVideoElement>(null);
  const c0 = useRef<HTMLCanvasElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const c1 = useRef<HTMLCanvasElement>(null);

  ReactVSC.useLink(v0, camera);
  ReactVSC.useLink(c0, v0);
  ReactVSC.useLink(v1, c0);
  ReactVSC.useLink(c1, v1);

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Link Chain
      </div>
      <div className="flex gap-2 p-2 w-128 h-64 mt-2 border-2 bg-slate-500">
        <div className="container w-1/4 bg-blue-300">
          <h3>camera -&gt; video0</h3>
          <video
            ref={v0}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="container w-1/4 bg-blue-300">
          <h3>video0 -&gt; canvas0</h3>
          <canvas
            ref={c0}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="container w-1/4 bg-blue-300">
          <h3>canvas0 -&gt; video1</h3>
          <video
            ref={v1}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="container w-1/4 bg-blue-300">
          <h3>vido1 -&gt; canvas1</h3>
          <canvas
            ref={c1}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default LinkChain;
