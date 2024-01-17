import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <>
            <img
                src={props.src}
                className="w-[100%] h-[100%] absolute  rounded-lg"
            />
        </>
    );
});
