import React from "react";
import Link from "next/link";
import TestCameraCanvas from "./TestCameraCanvas";

export default function page() {
  return (
    <>
      <TestCameraCanvas />
      <div className="m-4 font-bold">
        <a href="https://github.com/robwang8456/react-video-stream-canvas/blob/0.2/demo/src/app/components/component_test/test_camera_canvas/TestCameraCanvas.tsx" target="_blank">
          See on GitHub
        </a>
      </div>
      <div className="m-4 font-bold">
        <Link href="/components/component_test">Back</Link>
      </div>
    </>
  );
}
