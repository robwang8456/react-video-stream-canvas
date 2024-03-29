import React from "react";
import CameraToVideo from "./CameraToVideo";
import CodeDisplay from "../../CodeDisplay";
import Toggler from "../../Toggler";
import Link from "next/link";

export default function page() {
  return (
    <>
      <CameraToVideo />
      <Toggler title="Source Code">
        <CodeDisplay fileName="CameraToVideo.tsx" />
      </Toggler>
      <div className="m-4 font-bold">
        <Link href="/components/link_test">Back</Link>
      </div>
    </>
  );
}
