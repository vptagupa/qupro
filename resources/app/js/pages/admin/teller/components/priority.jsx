import { useCallback } from "react";

export default ({ form }) => {
    const handler = useCallback(() => {
        if (form.data.priority == "regular") {
            form.setData("priority", "priority");
        } else {
            form.setData("priority", "regular");
        }
    }, [form.data.priority]);

    return (
        <div
            className="bg-slate-300 cursor-pointer text-slate-500 text-[1rem]  px-3 py-1 rounded-full uppercase font-extrabold"
            onClick={(e) => handler()}
        >
            {form.data.priority.substr(0, 1).toUpperCase()}
        </div>
    );
};
