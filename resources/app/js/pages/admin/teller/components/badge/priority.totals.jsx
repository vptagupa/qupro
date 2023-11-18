import { memo } from "react";

export default memo(({ total }) => {
    console.log("Rendered total priorities");
    return (
        <>
            <div className="flex items-center justify-start gap-1 text-xs">
                <div>
                    <div
                        className="flex items-center justify-center font-bold rounded-lg w-10 h-4 p-0 text-center bg-slate-200 text-slate-600"
                        title="Regular Totals"
                    >
                        {total.regulars}
                    </div>
                </div>
                <div>
                    <div
                        className="flex items-center justify-center font-bold rounded-lg w-10 h-4 p-0 text-center bg-rose-400 text-white"
                        title="Priorities Totals"
                    >
                        {total.priorities}
                    </div>
                </div>
            </div>
        </>
    );
});
