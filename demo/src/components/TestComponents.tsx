"use client";

import { useRef, useState } from "react";
import { Camera, Stream, CameraCanvas, CameraVideo, Canvas, Video } from "react-video-stream-component";
import Toggler from "./Toggler";
import React from "react";
import { DemoItem } from "./Test";

export function TestStreamVideo() {
    const srcRef = useRef<HTMLVideoElement>(null);

    return (
        <>
            <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
                <video
                    ref={srcRef}
                    playsInline
                    controls
                    loop
                    autoPlay
                    muted
                >
                    <source src="/video/chrome.webm" type="video/webm" />
                    <source src="/video/chrome.mp4" type="video/mp4" />
                    <p>This browser does not support the video element.</p>
                </video>
            </div>

            <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
                <Video
                    playsInline
                    controls
                    loop
                    autoPlay
                    muted
                >
                    <Stream source={srcRef} />
                </Video>
            </div>
        </>
    );
}

export function TestStreamCanvas() {
    const srcRef = useRef<HTMLVideoElement>(null);

    return (
        <>
            <video
                ref={srcRef}
                hidden
                playsInline
                controls
                loop
                autoPlay
                muted
            >
                <source src="/video/chrome.webm" type="video/webm" />
                <source src="/video/chrome.mp4" type="video/mp4" />
                <p>This browser does not support the video element.</p>
            </video>

            <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
                <Canvas>
                    <Stream source={srcRef} />
                </Canvas>
            </div>
        </>
    );
}

export function TestStreamVideoWithCamera() {
    return (
        <>
            <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
                <Video
                    playsInline
                    controls
                    loop
                    autoPlay
                    muted
                >
                    <Camera />
                </Video>
            </div>
        </>
    );
}

export function TestStreamCanvasWithCamera() {

    const fits = ["contain", "fill", "cover", "none", "scale-down"];
    const [fitIndex, setFitIndex] = useState(0);
    function nextFit() { setFitIndex((fitIndex + 1) % fits.length); }

    return (
        <>
            <div className="flex items-baseline gap-3 p-2">
                <button
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                    onClick={nextFit}
                >Change-Fit <br /> Cur:{fits[fitIndex]} </button>
            </div >
            <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
                <Canvas
                    className="h-64 bg-red-300"
                    style={{
                        objectFit: fits[fitIndex],
                    } as React.CSSProperties}
                >
                    <Camera />
                </Canvas>
            </div>
        </>
    );
}

export function TestVideo() {
    return (
        <>
            <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
                <Video
                    playsInline
                    controls
                    loop
                    autoPlay
                    muted
                >
                    <source src="/video/chrome.webm" type="video/webm" />
                    <source src="/video/chrome.mp4" type="video/mp4" />
                    <p>This browser does not support the video element.</p>
                </Video>
            </div>
        </>
    );
}

export function TestCanvas() {
    return (
        <>
            <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
                <Canvas>
                    <Video
                        playsInline
                        controls
                        loop
                        autoPlay
                        muted
                    >
                        <source src="/video/chrome.webm" type="video/webm" />
                        <source src="/video/chrome.mp4" type="video/mp4" />
                        <p>This browser does not support the video element.</p>
                    </Video>
                </Canvas>
            </div>
        </>
    );
}

export function TestCameraVideo() {
    return (
        <>
            <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
                <CameraVideo
                    constraints={{ video: true, audio: false }}
                    autoPlay
                    playsInline
                />
            </div>
        </>
    );
}

export function TestCameraCanvas() {
    return (
        <div className="flex justify-center p-2 w-128 h-64 mt-2 border-2 bg-slate-500" >
            <CameraCanvas />
        </div>
    );
}

function TestComponents() {
    return (
        <div>
            <Toggler title={"Comps Demo: Video / Canvas / CameraVideo / CameraCanvas..."}>
                <DemoItem title={"<Video>, normal <video>"} test={<TestVideo />} />
                <DemoItem title={"<Canvas>, with <video> inside"} test={<TestCanvas />} />

                <DemoItem title={"<CameraVideo>, Video with Camera stream"} test={<TestCameraVideo />} />
                <DemoItem title={"<CameraCanvas>, Canvas with Camera stream"} test={<TestCameraCanvas />} />

                <DemoItem title={"<Video> <Stream/> </Video>"} test={<TestStreamVideo />} />
                <DemoItem title={"<Canvas> <Stream/> </Canvas>"} test={<TestStreamCanvas />} />

                <DemoItem title={"<Video> <Camera/> </Video>"} test={<TestStreamVideoWithCamera />} />
                <DemoItem title={"<Canvas> <Camera/> </Canvas>"} test={<TestStreamCanvasWithCamera />} />

            </Toggler>
        </div >
    );
}

export default TestComponents;
