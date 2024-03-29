import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        useLink() Demos
      </div>
      <div className="m-4">
        <div className="m-4">
          <Link href="/components/link_test/camera_to_video">Camera to video</Link>
        </div>
        <div className="m-4">
          <Link href="/components/link_test/video_to_video">Video to video</Link>
        </div>

        <div className="m-4">
          <Link href="/components/link_test/camera_to_canvas">Camera to canvas</Link>
        </div>
        <div className="m-4">
          <Link href="/components/link_test/video_to_canvas">Video to canvas</Link>
        </div>
        <div className="m-4">
          <Link href="/components/link_test/draw_on_canvas">Draw on canvas</Link>
        </div>

        <div className="m-4">
          <Link href="/components/link_test/switch_source_video">Switch video source</Link>
        </div>
        <div className="m-4">
          <Link href="/components/link_test/switch_source_canvas">Switch canvas source</Link>
        </div>
        <div className="m-4">
          <Link href="/components/link_test/link_chain">Link chain</Link>
        </div>
        <div className="m-4 font-bold">
          <Link href="/">Return to homepage</Link>
        </div>
      </div>
    </>
  );
}
