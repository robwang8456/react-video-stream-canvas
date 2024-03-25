import assert from "assert";
import * as ReactCVS from "./link";
import React, { RefObject, useContext, useEffect, useRef } from "react";

type SVCContextType = { ref?: RefObject<HTMLVideoElement> | RefObject<HTMLCanvasElement>; };

const SVCContext = React.createContext<SVCContextType>({});

type SourceProps = { source: ReactCVS.StreamLike; };

function LinkUpward(props: SourceProps) {
    const context = useContext(SVCContext);

    useEffect(() => {
        assert(context.ref);

        const [target, source] = ReactCVS.link(context.ref, props.source, true);
        return () => { ReactCVS.unlink(target, source, true); };
    }, [context, props.source]);

    return <></>;
}

type StreamProps = { source: ReactCVS.StreamLike; };

function Stream(props: StreamProps) {
    const context = useContext(SVCContext);
    assert(context.ref, "No StreamObject in Context, should contain Camera!");

    return <LinkUpward source={props.source} />;
}

type CameraProps = { constraints?: MediaStreamConstraints; };

function Camera(props: CameraProps) {
    const camera = ReactCVS.useCamera(props.constraints ?? { audio: true, video: true });
    return <Stream source={camera} />;
}

type VideoProps = React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
    & { childrend?: React.ReactNode; };

function Video(props: VideoProps) {
    const ref = ReactCVS.useVideoRef();
    const context = useContext(SVCContext);

    return (
        <>
            {context.ref && <LinkUpward source={ref} />}
            <video ref={ref} {...props} >
                <SVCContext.Provider value={{ ref }}>
                    {props.children}
                </SVCContext.Provider>
            </video>
        </>
    );
}

function VideoWithSource(props: VideoProps & { source: ReactCVS.StreamLike; }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    ReactCVS.useLink(videoRef, props.source);

    return (
        <video ref={videoRef} {...props} >
            {props.children}
        </video>
    );
}

function StreamVideo(props: VideoProps & { stream: MediaStream; }) {
    return <VideoWithSource {...props} source={props.stream} />;
}

function CameraVideo(props: VideoProps & { constraints?: MediaStreamConstraints; }) {
    const camera = ReactCVS.useCamera(props.constraints);
    return <VideoWithSource {...props} source={camera} />;
}

type CanvasProps =
    React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
    & { childrend?: React.ReactNode; };

function Canvas(props: CanvasProps) {
    const ref = ReactCVS.useCanvasRef();
    const context = useContext(SVCContext);

    const canvasTag = <canvas ref={ref} {...props} >
        <SVCContext.Provider value={{ ref }}>
            {props.children}
        </SVCContext.Provider>
    </canvas>;

    return (
        <>
            {context.ref && <LinkUpward source={ref} />}
            {canvasTag}
        </>
    );
}

function CanvasWithSource(props: CanvasProps & { source: ReactCVS.StreamLike; }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    ReactCVS.useLink(canvasRef, props.source);

    return <canvas {...props} ref={canvasRef}>
        {props.children}
    </canvas>;
}

function StreamCanvas(props: CanvasProps & { stream: MediaStream; }) {
    return <CanvasWithSource {...props} source={props.stream} />;
}

function CameraCanvas(props: CanvasProps & { constraints?: MediaStreamConstraints; }) {
    const camera = ReactCVS.useCamera(props.constraints);
    return <CanvasWithSource {...props} style={{ objectFit: "contain" }} source={camera} />;
}

export {
    Camera,
    Stream,

    Video,
    VideoWithSource,
    StreamVideo,
    CameraVideo,

    Canvas,
    CanvasWithSource,
    StreamCanvas,
    CameraCanvas,
};
