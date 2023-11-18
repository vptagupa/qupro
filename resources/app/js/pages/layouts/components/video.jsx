import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <>
            <div>
                <video
                    ref={ref}
                    controls
                    autoPlay={true}
                    onEnded={(e) => props.onEnded()}
                    src={props.url}
                    width="100%"
                    className="w-[100%] border-2 border-slate-200 border-solid rounded-lg"
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    );
});
