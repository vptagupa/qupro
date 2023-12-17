import { memo } from "react";
import { useSelector } from "react-redux";
import Avatar from "@/assets/images/avatar.png";
import Copy from "../components/widgets/copy";

export default memo(function Component({ id = 0 }) {
    const { data } = useSelector((state) => state.teller);
    const qu = data[id]?.qu;
    const getVal = (value) => {
        return qu?.is_advance ? "Advance" : value ?? "-";
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex justify-center items-center text-center w-full">
                    <img
                        src={Avatar}
                        className="h-[6rem] border-4 border-solid border-slate-300/50 rounded-xl"
                    />
                </div>
                <div className="text-left uppercase p-1 text-xs">
                    <div className="border-b">
                        {((qu?.type == "other" && qu?.is_representative) ||
                            qu?.type == "student") && (
                            <div>{getVal(qu?.student_name)}</div>
                        )}
                        {qu?.type == "other" && !qu?.is_representative && (
                            <div>{getVal(qu?.name)}</div>
                        )}
                    </div>
                    <div className="text-center flex items-center justify-center uppercase">
                        <Copy text={qu?.student_no ?? "-"} />
                    </div>
                </div>
            </div>
        </>
    );
});
