import Avatar from "@/assets/images/avatar.png";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import Copy from "./copy";

export default ({
    isPriority,
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
                <div className="flex items-center justify-start gap-1 text-xs">
                    <div>
                        <div className="flex items-center justify-center font-bold rounded-lg w-10 h-4 p-0 text-center bg-slate-200 text-slate-800 text-xxs">
                            10
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-center font-bold rounded-lg w-10 h-4 p-0 text-center bg-rose-400 text-white text-xxs">
                            10
                        </div>
                    </div>
                </div>
                <div className="mb-3 flex flex-col gap-y-2 items-center justify-center">
                    <div className="text-6xl text-center mb-2">
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
