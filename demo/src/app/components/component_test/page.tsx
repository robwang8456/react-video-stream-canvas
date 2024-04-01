import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <div className="text-black font-bold rounded text-3xl">
        Component Demos
      </div>
      <ol className="list-decimal m-4">
        <li className="m-4">
          <Link href="/components/component_test/test_video">
            Video component
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/component_test/test_canvas">
            Canvas component
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/component_test/test_camera_video">
            CameraVideo component
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/component_test/test_camera_canvas">
            CameraCanvas component
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/component_test/test_stream_video">
            Video component with stream
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/component_test/test_stream_canvas">
            Canvas component with stream
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/component_test/test_stream_video_with_camera">
            Video component with camera
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/component_test/test_stream_canvas_with_camera">
            Canvas component with camera
          </Link>
        </li>
      </ol>
      <div className="font-bold">
        <Link href="/">Return to homepage</Link>
      </div>
    </>
  );
}
