import React from "react";
import Link from "next/link";
import TestStreamVideoWithCamera from "./TestStreamVideoWithCamera";

export default function page() {
  return (
    <>
      <TestStreamVideoWithCamera />
      <div className="m-4 font-bold">
        <a href="https://github.com/robwang8456/react-video-stream-canvas/blob/0.2/demo/src/app/components/component_test/test_stream_video_with_camera/TestStreamVideoWithCamera.tsx" target="_blank">
          See on GitHub
        </a>
      </div>
      <div className="m-4 font-bold">
        <Link href="/components/component_test">Back</Link>
      </div>
    </>
  );
}
