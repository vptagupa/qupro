import Base from "./base";
import { forwardRef } from "react";
import Circle from "@/assets/images/circle.svg";

export default forwardRef(({ loading, ...props }, ref) => {
    return (
        <Base
            _class="rounded-lg shadow-md shadow-slate-400/50 hover:bg-slate-200 px-5 py-2 text-sm"
            ref={ref}
            {...props}
        >
            {loading && (
                <img
                    src={Circle}
                    className="animate-spin h-5 w-5 mr-1 text-opacity-10 text-slate-100"
                />
            )}

            {props.children}
        </Base>
    );
});
