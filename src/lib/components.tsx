import assert from "assert";
import * as ReactVSC from "./link";
import React, { RefObject, useContext, useEffect, useRef } from "react";

type VSCContextType = { ref?: RefObject<HTMLVideoElement> | RefObject<HTMLCanvasElement>; };

const VSCContext = React.createContext<VSCContextType>({});

type SourceProps = { source: ReactVSC.StreamLike; };

function LinkUpward(props: SourceProps) {
    const context = useContext(VSCContext);

    useEffect(() => {
        assert(context.ref);

        const [target, source] = ReactVSC.link(context.ref, props.source, true);
        return () => { ReactVSC.unlink(target, source, true); };
    }, [context, props.source]);

    return <></>;
}

type StreamProps = { source: ReactVSC.StreamLike; };

function Stream(props: StreamProps) {
    const context = useContext(VSCContext);
    assert(context.ref, "No StreamObject in Context, should contain Camera!");

    return <LinkUpward source={props.source} />;
}

type CameraProps = { constraints?: MediaStreamConstraints; };

function Camera(props: CameraProps) {
    const camera = ReactVSC.useCamera(props.constraints ?? { audio: true, video: true });
    return <Stream source={camera} />;
}

type VideoProps = React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
    & { childrend?: React.ReactNode; };

function Video(props: VideoProps) {
    const ref = ReactVSC.useVideoRef();
    const context = useContext(VSCContext);

    return (
        <>
            {context.ref && <LinkUpward source={ref} />}
            <video ref={ref} {...props} >
                <VSCContext.Provider value={{ ref }}>
                    {props.children}
                </VSCContext.Provider>
            </video>
        </>
    );
}

function VideoWithSource(props: VideoProps & { source: ReactVSC.StreamLike; }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    ReactVSC.useLink(videoRef, props.source);

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
    const camera = ReactVSC.useCamera(props.constraints);
    return <VideoWithSource {...props} source={camera} />;
}

type CanvasProps =
    React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
    & { childrend?: React.ReactNode; };

function Canvas(props: CanvasProps) {
    const ref = ReactVSC.useCanvasRef();
    const context = useContext(VSCContext);

    const canvasTag = <canvas ref={ref} {...props} >
        <VSCContext.Provider value={{ ref }}>
            {props.children}
        </VSCContext.Provider>
    </canvas>;

    return (
        <>
            {context.ref && <LinkUpward source={ref} />}
            {canvasTag}
        </>
    );
}

function CanvasWithSource(props: CanvasProps & { source: ReactVSC.StreamLike; }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    ReactVSC.useLink(canvasRef, props.source);

    return <canvas {...props} ref={canvasRef}>
        {props.children}
    </canvas>;
}

function StreamCanvas(props: CanvasProps & { stream: MediaStream; }) {
    return <CanvasWithSource {...props} source={props.stream} />;
}

function CameraCanvas(props: CanvasProps & { constraints?: MediaStreamConstraints; }) {
    const camera = ReactVSC.useCamera(props.constraints);
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
