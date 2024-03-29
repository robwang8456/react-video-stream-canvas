"use client";

import React, { useRef, useState } from "react";
import ReactVSC from "react-video-stream-canvas";

function SwitchSourcesPart({
  target,
  srcIndex,
}: {
  target: ReactVSC.StreamLike;
  srcIndex: number;
}) {
  const camera = ReactVSC.useCamera();
  const srcRef0 = useRef<HTMLVideoElement>(null);
  const srcRef1 = useRef<HTMLVideoElement>(null);

  const sourceRef = srcIndex ? srcRef1 : srcRef0;

  ReactVSC.useLink(srcRef1, camera);
  ReactVSC.useLink(target, sourceRef);

  return (
    <>
      <div className="grid w-1/3">
        <div className="grid justify-center content-center bg-blue-200">
          <h2>Source 0 {srcIndex === 0 ? "(*)" : ""}</h2>
          <video ref={srcRef0} playsInline controls loop autoPlay muted>
            <source src="/video/chrome.webm" type="video/webm" />
            <source src="/video/chrome.mp4" type="video/mp4" />
            <p>This browser does not support the video element.</p>
          </video>
        </div>

        <div className="grid justify-center content-center bg-green-200">
          <h2>Source 1 {srcIndex === 1 ? "(*)" : ""}</h2>
          <video ref={srcRef1} autoPlay playsInline />
        </div>
      </div>
    </>
  );
}

function SwitchSourceVideo() {
  const targetRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(1);

  function switchSource() {
    setSrcIndex(1 - srcIndex);
  }
  const sourceName = srcIndex ? "Source 1" : "Source 0";

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Switch Video Source
      </div>
      <div className="flex items-baseline gap-3 p-2">
        <button
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
          onClick={switchSource}
        >
          {" "}
          Switch Source{" "}
        </button>
      </div>
      <div className="container flex gap-2 p-2 w-128 mt-2 border-2">
        <SwitchSourcesPart target={targetRef} srcIndex={srcIndex} />
        <div className="container w-2/3 grid justify-center">
          <h1>Video ({sourceName})</h1>
          <div className="container">
            <video
              ref={targetRef}
              style={
                {
                  overflow: "hidden",
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SwitchSourceVideo;
