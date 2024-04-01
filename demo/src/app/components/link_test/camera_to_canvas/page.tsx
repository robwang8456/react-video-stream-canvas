import React from "react";
import CameraToCanvas from "./CameraToCanvas";
import Link from "next/link";

export default function page() {
  return (
    <>
      <CameraToCanvas />
      <div className="m-4 font-bold">
        <a href="https://github.com/robwang8456/react-video-stream-canvas/blob/0.2/demo/src/app/components/link_test/camera_to_canvas/CameraToCanvas.tsx" target="_blank">
          See on GitHub
        </a>
      </div>
      <div className="m-4 font-bold">
        <Link href="/components/link_test">Back</Link>
      </div>
    </>
  );
}
