"use client";

import React, { useContext, useRef } from "react";
import ReactVSC from "react-video-stream-canvas";
import { UIContext } from "../../UISetting";

function VideoToVideo() {
  const uiContext = useContext(UIContext);

  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);

  ReactVSC.useLink(videoRef1, videoRef0);

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Video to Video
      </div>
      <div className="container flex gap-2 p-2 w-128 mt-2 border-2 bg-slate-500">
        <div className="w-1/2 justify-center">
          <h2>Source</h2>
          <div>
            <video ref={videoRef0} playsInline controls loop autoPlay muted>
              <source src="/video/chrome.webm" type="video/webm" />
              <source src="/video/chrome.mp4" type="video/mp4" />
              <p>This browser does not support the video element.</p>
            </video>
          </div>
        </div>

        <div className="w-1/2 justify-center content-center bg-green-200">
          <h2>Target</h2>
          <video
            ref={videoRef1}
            autoPlay
            playsInline
            style={
              {
                objectFit: uiContext.fit,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </>
  );
}

export default VideoToVideo;
