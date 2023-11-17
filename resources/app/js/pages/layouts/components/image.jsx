import { forwardRef } from "react";

export default forwardRef((props, ref) => {
    return (
        <>
            <div>
                <img
                    src={props.url}
                    className="w-[100%] border-2 border-slate-200 border-solid rounded-lg"
                />
            </div>
        </>
    );
});
