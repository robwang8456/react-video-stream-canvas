"use client";

import { useEffect, useState } from "react";
import TestComponents from "./TestComponents";
import TestLink from "./TestLink";

type TogglerProp = {
    title?: string;
    children: React.ReactNode;
};

export function Toggler({ title, children }: TogglerProp) {

    const [show, setShow] = useState(false);

    return <>
        <div className="flex me-2">
            <div
                className="flex-1 me-2 cursor-pointer"
                onClick={() => setShow(!show)}
            >
                <h3 className="text-black font-bold py-2 px-4 rounded text-base" >
                    {title}
                </h3>
            </div>
            <button
                className="me-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShow(!show)}
            >
                {show ? "Hide" : "Show"}
            </button>
        </div>

        {
            show &&
            <div className="m-0 mt-2" >
                {children}
            </div>
        }
    </>;
}

export function DemoItem({ title, test }: { title: string; test: React.ReactNode; }) {
    return (
        <div className="ms-4 m-2 pe-0 p-2 w-128 border-2" >
            <Toggler title={title}>
                {test}
            </Toggler>
        </div>
    );
}

function Test() {

    const [cameraCount, setCameraCount] = useState(0);

    useEffect(() => {
        navigator
            .mediaDevices
            .enumerateDevices()
            .then(devices => {
                devices.forEach(device => {
                    if (device.kind === "videoinput") {
                        setCameraCount(prev => prev + 1);
                    }
                });
            });
    }, []);

    return (
        <>
            <div className="text-black font-bold py-1 px-4 rounded text-3xl">
                ReactSVC: React-Canvas-Video-Stream
            </div>
            <div className="ms-4 text-blue-500 font-bold py-1 px-4 rounded text-md">
            </div>
            <div className="ms-4 text-red-500 font-bold py-1 px-4 rounded text-md">
                {cameraCount == 0 && "**Camera is need for most of demos."}
                {cameraCount > 1 && "**There are 2|2+ cameras, we will use the default one."}
            </div>

            <div className="m-4">
                <TestLink />
            </div>

            <div className="m-4">
                <TestComponents />
            </div>

        </>
    );
}

export default Test;
