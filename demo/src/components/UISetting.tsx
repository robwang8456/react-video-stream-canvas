import React, { ReactNode, createContext, useEffect, useState } from "react";

export type UISetting = {
    wide?: boolean;
    fit: string;
    srcIndex: number;
};

export const UIContext = createContext<UISetting>({ fit: "contain", srcIndex: 0 });

function UIButtons({ changeFit, swapSource, children }: { changeFit?: boolean, swapSource?: boolean, children: ReactNode; }) {
    const [srcIndex, setSrcIndex] = useState(1);

    const fits = ["fill", "contain", "cover", "none", "scale-down"];
    const [fitIndex, setFitIndex] = useState(0);
    function nextFit() { setFitIndex((fitIndex + 1) % fits.length); }

    function switchSource() { setSrcIndex(1 - srcIndex); }

    const btnClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

    return (
        <UIContext.Provider value={{ fit: fits[fitIndex], srcIndex }}>
            {
                changeFit || swapSource
                    ? <>
                        <div className="flex items-baseline gap-3 p-2">
                            {
                                changeFit && <button
                                    className={btnClass}
                                    onClick={nextFit}
                                > Fit: {fits[fitIndex]} </button>
                            }
                            {
                                swapSource && <button
                                    className={btnClass}
                                    onClick={switchSource}
                                > Switch Source </button>
                            }
                        </div>
                        {children}
                    </>
                    : <></>
            }
        </UIContext.Provider >
    );
}

export default UIButtons;
