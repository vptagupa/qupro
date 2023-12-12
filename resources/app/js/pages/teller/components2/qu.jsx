import { memo } from "react";
import { useSelector } from "react-redux";
import Avatar from "@/assets/images/avatar.png";

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
                <div className="text-center uppercase p-1">
                    {qu?.is_representative && <div>{getVal(qu?.name)}</div>}
                    {!qu?.is_representative && (
                        <div>{getVal(qu?.student_name)}</div>
                    )}
                </div>
            </div>
        </>
    );
});
