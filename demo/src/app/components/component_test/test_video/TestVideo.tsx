"use client";

import React from "react";
import { Video } from "react-video-stream-canvas";

function TestVideo() {
  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Video Component
      </div>
      <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500">
        <Video playsInline controls loop autoPlay muted>
          <source src="/video/chrome.webm" type="video/webm" />
          <source src="/video/chrome.mp4" type="video/mp4" />
          <p>This browser does not support the video element.</p>
        </Video>
      </div>
    </>
  );
}

export default TestVideo;
