import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <>
            <video
                ref={ref}
                controls
                autoPlay={true}
                muted
                onEnded={(e) => props.onEnded()}
                src={props.url}
                className="rounded-lg opacity-75 w-[100%] h-[100%] absolute"
            >
                Your browser does not support the video tag.
            </video>
        </>
    );
});
