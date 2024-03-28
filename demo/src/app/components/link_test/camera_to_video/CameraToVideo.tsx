"use client";

import React from "react";
import ReactVSC from "react-video-stream-canvas";

function CameraToVideo() {
  const videoRef = React.useRef(null);
  const camera = ReactVSC.useCamera({ video: true, audio: false });

  ReactVSC.useLink(videoRef, camera);

  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Camera to Video
      </div>
      <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500">
        <video ref={videoRef} autoPlay playsInline />
      </div>
    </>
  );
}

export default CameraToVideo;
