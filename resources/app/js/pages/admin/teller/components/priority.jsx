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
            className="bg-slate-300 cursor-pointer text-white text-[1.3rem]  px-4 py-2 rounded-full uppercase font-extrabold"
            onClick={(e) => handler()}
        >
            {form.data.priority.substr(0, 1).toUpperCase()}
        </div>
    );
};
