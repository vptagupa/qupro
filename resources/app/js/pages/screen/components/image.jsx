import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <>
            <div>
                <img src={props.src} className="w-[100%]  rounded-lg" />
            </div>
        </>
    );
});
