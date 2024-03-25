"use client";

import React, { useState } from "react";

type TogglerProp = {
    title?: string;
    children: React.ReactNode;
};

function Toggler({ title, children }: TogglerProp) {

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

export default Toggler;
