import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <div className="text-black font-bold py-1 px-4 rounded text-3xl">
        Component Demos
      </div>
      <div className="m-4">
        <div className="m-4">
          <Link href="/components/component_test/test_video">
            Video component
          </Link>
        </div>
        <div className="m-4">
          <Link href="/components/component_test/test_canvas">
            Canvas component
          </Link>
        </div>
        <div className="m-4">
          <Link href="/components/component_test/test_camera_video">
            CameraVideo component
          </Link>
        </div>
        <div className="m-4">
          <Link href="/components/component_test/test_camera_canvas">
            CameraCanvas component
          </Link>
        </div>
        <div className="m-4">
          <Link href="/components/component_test/test_stream_video">
            Video component with stream
          </Link>
        </div>
        <div className="m-4">
          <Link href="/components/component_test/test_stream_canvas">
            Canvas component with stream
          </Link>
        </div>
        <div className="m-4">
          <Link href="/components/component_test/test_stream_video_with_camera">
            Video component with camera
          </Link>
        </div>
        <div className="m-4">
          <Link href="/components/component_test/test_stream_canvas_with_camera">
            Canvas component with camera
          </Link>
        </div>
        <div className="m-4 font-bold">
          <Link href="/">Return to homepage</Link>
        </div>
      </div>
    </>
  );
}
