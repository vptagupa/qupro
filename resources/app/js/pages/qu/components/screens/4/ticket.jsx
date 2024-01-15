import QRCode from "react-qr-code";
import style from "../../style";

export default function Component({ qu, studentInfo }) {
    return (
        <div
            className={`flex flex-col justify-center uppercase gap-y-2 ${style.primaryFont}`}
        >
            <div className="grow flex items-center justify-center text-center h-[6rem] text-[5rem] font-extrabold uppercase">
                {qu.num_fulltext}
            </div>
            {qu.type == "student" && (
                <div className="text-center text-[1rem] border-b border-solid border-slate-400">
                    {qu.student_name}, {studentInfo.course_code}
                </div>
            )}

            {(qu.type == "other" || qu.is_representative) && (
                <div className="text-center text-[1rem] border-b border-solid border-slate-400">
                    <div>{qu.name}</div>
                </div>
            )}
            <div className="flex items-center justify-center mt-5">
                <QRCode
                    className="w-[100px] h-[100px]"
                    value={qu.num_fulltext}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </div>
    );
}
