import QRCode from "react-qr-code";

export default function Component({ qu, studentInfo }) {
    return (
        <div className="flex flex-col gap-y-2 justify-center">
            <div className="text-center text-[5rem] font-extrabold uppercase mb-7">
                <div>{qu.num_fulltext}</div>
            </div>
            {qu.type == "student" && (
                <span className="text-center text-[1rem] border-b border-solid border-purple-400 p-2 px-8">
                    {qu.student_name}, {studentInfo.course_code}
                </span>
            )}

            {qu.type == "other" && (
                <span className="text-center text-[1rem] border-b border-solid border-purple-400 p-2 px-8">
                    <div>{qu.name}</div>
                </span>
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
