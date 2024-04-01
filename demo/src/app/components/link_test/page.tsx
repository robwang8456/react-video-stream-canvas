import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <div className="text-black font-bold rounded text-3xl">
        useLink() Demos
      </div>
      <ol className="list-decimal m-4">
        <li className="m-4">
          <Link href="/components/link_test/camera_to_video">
            Camera to video
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/link_test/video_to_video">
            Video to video
          </Link>
        </li>

        <li className="m-4">
          <Link href="/components/link_test/camera_to_canvas">
            Camera to canvas
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/link_test/video_to_canvas">
            Video to canvas
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/link_test/draw_on_canvas">
            Draw on canvas
          </Link>
        </li>

        <li className="m-4">
          <Link href="/components/link_test/switch_source_video">
            Switch video source
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/link_test/switch_source_canvas">
            Switch canvas source
          </Link>
        </li>
        <li className="m-4">
          <Link href="/components/link_test/link_chain">Link chain</Link>
        </li>
      </ol>
      <div className="font-bold">
        <Link href="/">Return to homepage</Link>
      </div>
    </>
  );
}
