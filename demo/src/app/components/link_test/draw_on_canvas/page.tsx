import React from "react";
import DrawOnCanvas from "./DrawOnCanvas";
import CodeDisplay from "../../CodeDisplay";
import Toggler from "../../Toggler";
import Link from "next/link";

export default function page() {
  return (
    <>
      <DrawOnCanvas />
      <Toggler title="Source Code">
        <CodeDisplay fileName="CameraToCanvas.tsx" />
      </Toggler>
      <div className="m-4 font-bold">
        <Link href="/components/link_test">Back</Link>
      </div>
    </>
  );
}
