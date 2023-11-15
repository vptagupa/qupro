import Avatar from "@/assets/images/avatar.png";
import PriorityTotals from "./badge/priority.totals";
import Copy from "./copy";

export default ({
    totalPriorities,
    data = {
        name: "John Smith",
        student_no: "00002",
        student_name: "John Smith",
        course_code: "BSIT",
        priority: false,
        num_fulltext: "00099",
        is_representative: false,
        type: "student",
    },
}) => {
    return (
        <>
            <div className="flex text-lg flex-col w-full">
                <div>
                    <PriorityTotals {...totalPriorities} />
                </div>
                <div className="mb-3 mt-3 flex flex-col gap-y-2 items-center justify-center">
                    <div className="text-6xl text-center mb-3">
                        {data?.num_fulltext ?? "-"}
                    </div>
                    <div>
                        <div>
                            <img
                                src={Avatar}
                                className="h-[10rem] border-4 border-solid border-slate-300/50 rounded-xl"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center  flex items-center text-purple-600 font-bold justify-center uppercase mb-3">
                    <div>{data?.name ?? "-"}</div>
                </div>
                <div className="flex flex-col p-2 border border-white rounded-xl">
                    <div className="text-left flex items-center justify-between uppercase">
                        <Copy text={data?.student_no ?? "-"} />
                    </div>
                    <div className="text-left flex items-center justify-between uppercase">
                        <Copy text={data?.student_name ?? "-"} />
                    </div>
                </div>
            </div>
        </>
    );
};
