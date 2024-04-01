import React from "react";
import VideoToCanvas from "./VideoToCanvas";
import Link from "next/link";

export default function page() {
  return (
    <>
      <VideoToCanvas />
      <div className="m-4 font-bold">
        <a href="https://github.com/robwang8456/react-video-stream-canvas/blob/0.2/demo/src/app/components/link_test/video_to_canvas/VideoToCanvas.tsx" target="_blank">
          See on GitHub
        </a>
      </div>
      <div className="m-4 font-bold">
        <Link href="/components/link_test">Back</Link>
      </div>
    </>
  );
}
