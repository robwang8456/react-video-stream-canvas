
import Toggler from "@/components/Toggler";
import React, { useContext, useMemo, useRef, useState } from "react";
import { UIContext } from "./UISetting";
import { DemoItem } from "./Test";

// todo: delete before publish.
// import ReactVSC, { DrawInfo } from "../../../src/index";
import ReactVSC, { DrawInfo } from "react-video-stream-canvas";

function DrawOnCanvas() {

    const uiContext = useContext(UIContext);
    const videoRef = useRef<HTMLVideoElement>(null);

    function drawFG(drawInfo: DrawInfo) {
        const ctx = drawInfo.context!;
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";

        const dr = drawInfo.dstRect;
        ctx.fillRect(dr.left, dr.top, dr.width, dr.height);
    }

    function drawBG(drawInfo: DrawInfo) {
        const ctx = drawInfo.context!;
        ctx.fillStyle = "green";

        const cr = drawInfo.canvasRect;
        ctx.fillRect(cr.left, cr.top, cr.width, cr.height);
    }

    const drawCallbacks = useMemo(() => {
        return {
            drawForeground: drawFG,
            drawBackground: drawBG,
        };
    }, []);

    const canvasRef = ReactVSC.useCanvasRef(drawCallbacks);

    ReactVSC.useLink(canvasRef, videoRef);

    return (
        <>
            <div className="container flex gap-2 p-2 w-128 mt-2 border-2 bg-slate-500" >
                <div className="w-1/2 justify-center content-center">
                    <h2>Source</h2>
                    <video
                        ref={videoRef}
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

                <div className="w-1/2 justify-center content-center bg-green-200">
                    <h2>Target</h2>
                    <canvas
                        ref={canvasRef}
                        style={{
                            objectFit: uiContext.fit,
                            width: '100%',
                        } as React.CSSProperties}
                    />
                </div>
            </div>
        </>
    );
}

function LinkVideoToCanvas() {

    const uiContext = useContext(UIContext);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    ReactVSC.useLink(canvasRef, videoRef);

    return (
        <>
            <div className="container flex gap-2 p-2 w-128 mt-2 border-2 bg-slate-500" >
                <div className="w-1/2 justify-center content-center">
                    <h2>Source</h2>
                    <video
                        ref={videoRef}
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

                <div className="w-1/2 justify-center content-center bg-green-200">
                    <h2>Target</h2>
                    <canvas
                        ref={canvasRef}
                        style={{
                            objectFit: uiContext.fit,
                            width: '100%',
                        } as React.CSSProperties}
                    />
                </div>
            </div>
        </>
    );
}

function SwitchSourcesPart({ target, srcIndex }: { target: ReactVSC.StreamLike; srcIndex: number; }) {

    const camera = ReactVSC.useCamera();
    const srcRef0 = useRef<HTMLVideoElement>(null);
    const srcRef1 = useRef<HTMLVideoElement>(null);

    const sourceRef = srcIndex ? srcRef1 : srcRef0;

    ReactVSC.useLink(srcRef1, camera);
    ReactVSC.useLink(target, sourceRef);

    return (
        <>
            <div className="grid w-1/3">
                <div className="grid justify-center content-center bg-blue-200">
                    <h2>Source 0 {srcIndex === 0 ? "(*)" : ""}</h2>
                    <video
                        ref={srcRef0}
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

                <div className="grid justify-center content-center bg-green-200">
                    <h2>Source 1 {srcIndex === 1 ? "(*)" : ""}</h2>
                    <video
                        ref={srcRef1}
                        autoPlay
                        playsInline
                    />
                </div>
            </div>
        </>
    );
}

function SwitchSourceVideo() {

    const targetRef = useRef<HTMLVideoElement>(null);
    const [srcIndex, setSrcIndex] = useState(1);

    function switchSource() { setSrcIndex(1 - srcIndex); }
    const sourceName = srcIndex ? "Source 1" : "Source 0";

    return (
        <>
            <div className="flex items-baseline gap-3 p-2">
                <button
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                    onClick={switchSource}
                > Switch Source </button>
            </div >
            <div className="container flex gap-2 p-2 w-128 mt-2 border-2" >
                <SwitchSourcesPart target={targetRef} srcIndex={srcIndex} />
                <div className="container w-2/3 grid justify-center">
                    <h1>Video ({sourceName})</h1>
                    <div className="container">
                        <video
                            ref={targetRef}
                            style={{
                                overflow: 'hidden',
                            } as React.CSSProperties}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function SwitchSourceCanvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [srcIndex, setSrcIndex] = useState(1);

    function switchSource() { setSrcIndex(1 - srcIndex); }
    const sourceName = srcIndex ? "Source 1" : "Source 0";

    return (
        <>
            <div className="flex items-baseline gap-3 p-2">
                <button
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                    onClick={switchSource}
                > Switch Source </button>
            </div >

            <div className="container flex gap-2 p-2 w-128 mt-2 border-2 bg-blue-300" >
                <SwitchSourcesPart target={canvasRef} srcIndex={srcIndex} />
                <div className="container grid w-2/3  bg-green-300">
                    <h1>Canvas ({sourceName})</h1>
                    <div className="container">
                        <canvas
                            ref={canvasRef}
                            style={{
                                width: '100%',
                                overflow: 'hidden',
                            } as React.CSSProperties}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function LinkVideoToVideo() {
    const uiContext = useContext(UIContext);

    const videoRef0 = useRef<HTMLVideoElement>(null);
    const videoRef1 = useRef<HTMLVideoElement>(null);

    ReactVSC.useLink(videoRef1, videoRef0);

    return (
        <div className="container flex gap-2 p-2 w-128 mt-2 border-2 bg-slate-500"
        >
            <div className="w-1/2 justify-center">
                <h2>Source</h2>
                <div>
                    <video
                        ref={videoRef0}
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
            </div>

            <div className="w-1/2 justify-center content-center bg-green-200">
                <h2>Target</h2>
                <video
                    ref={videoRef1}
                    autoPlay
                    playsInline
                    style={{
                        objectFit: uiContext.fit,
                    } as React.CSSProperties}
                />
            </div>
        </div>
    );
}

function LinkCameraCanvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const camera = ReactVSC.useCamera({ video: true, audio: false });

    const fits = ["contain", "fill", "cover", "none", "scale-down"];
    const [fitIndex, setFitIndex] = useState(0);
    function nextFit() { setFitIndex((fitIndex + 1) % fits.length); }

    ReactVSC.useLink(canvasRef, camera);

    return (
        <>
            <div className="flex items-baseline gap-3 p-2">
                <button
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                    onClick={nextFit}
                >Change-Fit <br /> Cur:{fits[fitIndex]} </button>
            </div >
            <div className="container flex justify-center p-2 mt-2 border-2 bg-slate-500">
                <canvas
                    className="w-3/4 bg-red-300"    // Color for objectFit's effect
                    ref={canvasRef}
                    style={{
                        objectFit: fits[fitIndex],
                        overflow: "hidden",
                    } as React.CSSProperties}
                />
            </div >
        </>
    );
}

function LinkCameraVideo() {

    const videoRef = React.useRef(null);
    const camera = ReactVSC.useCamera({ video: true, audio: false });

    ReactVSC.useLink(videoRef, camera);

    return (
        <div className="flex justify-center p-2 w-128 mt-2 border-2 bg-slate-500" >
            <video
                ref={videoRef}
                autoPlay
                playsInline
            />
        </div>
    );
}

function LinkChain() {

    const camera = ReactVSC.useCamera({ video: true, audio: false });
    const v0 = useRef<HTMLVideoElement>(null);
    const c0 = useRef<HTMLCanvasElement>(null);
    const v1 = useRef<HTMLVideoElement>(null);
    const c1 = useRef<HTMLCanvasElement>(null);

    ReactVSC.useLink(v0, camera);
    ReactVSC.useLink(c0, v0);
    ReactVSC.useLink(v1, c0);
    ReactVSC.useLink(c1, v1);

    return (
        <div className="flex gap-2 p-2 w-128 h-64 mt-2 border-2 bg-slate-500" >
            <div className="container w-1/4 bg-blue-300">
                <h3>camera -&gt; video0</h3>
                <video ref={v0} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="container w-1/4 bg-blue-300">
                <h3>video0 -&gt; canvas0</h3>
                <canvas ref={c0} style={{ width: '100%', height: '100%', overflow: "hidden", objectFit: "contain" }} />
            </div>
            <div className="container w-1/4 bg-blue-300">
                <h3>canvas0 -&gt; video1</h3>
                <video ref={v1} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="container w-1/4 bg-blue-300">
                <h3>vido1 -&gt; canvas1</h3>
                <canvas ref={c1} style={{ width: '100%', height: '100%', overflow: "hidden", objectFit: "contain" }} />
            </div>

        </div>
    );
}

function TestLink() {
    return (
        <div>
            <Toggler title={"Link Demos: useLink(target, source)"}>

                <DemoItem title={"Camera -> Video"} test={<LinkCameraVideo />} />
                <DemoItem title={"Video -> Video"} test={<LinkVideoToVideo />} />

                <DemoItem title={"Camera -> Canvas"} test={<LinkCameraCanvas />} />
                <DemoItem title={"Video -> Canvas"} test={<LinkVideoToCanvas />} />
                <DemoItem title={"Draw Canvas, BG:green, FG:red-0.3alpha"} test={<DrawOnCanvas />} />

                <DemoItem title={"(Source0 | Source1) -> Video"} test={<SwitchSourceVideo />} />
                <DemoItem title={"(Source0 | Source1) -> Canvas"} test={<SwitchSourceCanvas />} />

                <DemoItem title={"Linked Chain: Camera -> Video -> Canvas -> Video -> Canvas"} test={<LinkChain />} />
            </Toggler>
        </div >
    );
}

export default TestLink;
