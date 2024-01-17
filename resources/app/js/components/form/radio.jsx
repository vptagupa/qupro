import Base from "../base";
import { forwardRef, cloneElement } from "react";

export default forwardRef((props, ref) => {
    const radio = <input type="radio" />;
    const clone = cloneElement(radio, {
        ...props,
        className: null,
    });

    return (
        <Base
            render={radio}
            ref={ref}
            {...clone.props}
            _class={props.className}
            className="p-0 w-4 h-4 appearance-none border border-solid rounded-full border-slate-400 bg-white  checked:text-slate-300 checked:bg-green-500"
        />
    );
});
