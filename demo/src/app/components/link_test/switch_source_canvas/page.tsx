import React from "react";
import SwitchSourceCanvas from "./SwitchSourceCanvas";
import CodeDisplay from "../../CodeDisplay";
import Toggler from "../../Toggler";
import Link from "next/link";

export default function page() {
  return (
    <>
      <SwitchSourceCanvas />
      <Toggler title="Source Code">
        <CodeDisplay fileName="CameraToCanvas.tsx" />
      </Toggler>
      <div className="m-4 font-bold">
        <Link href="/components/link_test">Back</Link>
      </div>
    </>
  );
}
