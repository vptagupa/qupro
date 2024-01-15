import { Input } from "@/js/components/form";
import { forwardRef } from "react";

export default forwardRef(({ className = "", ...props }, ref) => {
    return (
        <Input
            ref={ref}
            type="text"
            className={`xs:p-4 xs:text-[2rem] lg:p-7 lg:text-[4rem] outline-none text-slate-200 bg-[#00539C] border-none placeholder:text-blue-300  border-2 rounded-xl  ${className}`}
            {...props}
        />
    );
});
