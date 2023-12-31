import { Checkbox } from "@/js/components/form";

export default ({
    isPriorityIncluded,
    data,
    isPriority,
    setIncludePriority,
}) => {
    const getVal = (is_advance, value) => {
        return is_advance ? "Advance" : value ?? "-";
    };

    return (
        <>
            <div className="flex items-center justify-start gap-2 p-2">
                <div className="grow pb-1 border-b border-slate-300">
                    <label className="flex items-center gap-1">
                        {!isPriority ? (
                            <>
                                <Checkbox
                                    className="h-3 w-3 border-white"
                                    value={isPriorityIncluded}
                                    checked={isPriorityIncluded}
                                    onChange={(e) =>
                                        setIncludePriority(e.target.checked)
                                    }
                                />
                                <div className="text-sm">Show priority</div>
                            </>
                        ) : (
                            <div className="text-sm">Priorities</div>
                        )}
                    </label>
                </div>
            </div>

            <div className="text-xs p-2">
                {data.map((qu, idx) => {
                    return (
                        <div
                            key={idx}
                            className="flex  pb-1 pt-1 justify-between items-center uppercase border-b border-slate-300"
                        >
                            {!qu?.is_student && (
                                <div className="grow ">
                                    {getVal(qu.is_advance, qu?.name)}
                                </div>
                            )}
                            {qu?.is_student && (
                                <div className="grow">
                                    {getVal(qu.is_advance, qu.student_name)}
                                </div>
                            )}
                            <div className="grow-0 w-[50px]">
                                {qu?.num_fulltext}
                            </div>
                            <div className="grow-none w-[30px] text-right">
                                {qu ? qu.priority ? "P" : "R" : <>&nbsp;</>}
                            </div>
                        </div>
                    );
                })}
                {Array(2 - data.length)
                    .fill(0)
                    .map((k, id) => {
                        return (
                            <div
                                key={id}
                                className="flex pb-1 pt-1 justify-between items-center uppercase border-b border-slate-300"
                            >
                                <div className="grow">&nbsp;</div>

                                <div className="grow-0 w-[50px]">&nbsp;</div>
                                <div className="grow-none w-[30px] text-right">
                                    &nbsp;
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
