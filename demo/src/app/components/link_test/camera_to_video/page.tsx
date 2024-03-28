import React from "react";
import CameraToVideo from "./CameraToVideo";
import CodeDisplay from "../../CodeDisplay";
import Toggler from "../../Toggler";

export default function page() {
  return (
    <>
      <CameraToVideo />
      <Toggler title="Source Code">
        <CodeDisplay fileName="CameraToVideo.tsx" />
      </Toggler>
    </>
  );
}
