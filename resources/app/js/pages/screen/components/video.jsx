import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <>
            <div>
                <video
                    ref={ref}
                    controls
                    autoPlay={true}
                    muted
                    onEnded={(e) => props.onEnded()}
                    src={props.url}
                    width="100%"
                    className="!w-[100%] rounded-lg opacity-75"
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    );
});