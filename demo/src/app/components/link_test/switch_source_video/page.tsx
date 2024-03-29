import React from "react";
import SwitchSourceVideo from "./SwitchSourceVideo";
import CodeDisplay from "../../CodeDisplay";
import Toggler from "../../Toggler";
import Link from "next/link";

export default function page() {
  return (
    <>
      <SwitchSourceVideo />
      <Toggler title="Source Code">
        <CodeDisplay fileName="CameraToCanvas.tsx" />
      </Toggler>
      <div className="m-4 font-bold">
        <Link href="/components/link_test">Back</Link>
      </div>
    </>
  );
}
