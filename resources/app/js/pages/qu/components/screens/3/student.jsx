import Avatar from "@/assets/images/avatar.png";
import style from "../../style";

export default function Component({ data }) {
    return (
        <>
            <div
                className={`flex flex-col gap-y-6 justify-center ${style.primaryFont}`}
            >
                <div className="flex justify-center">
                    <div className="">
                        <img
                            src={Avatar}
                            className="h-[15rem] min-w-[10rem] border-4 border-solid border-slate-200/60 rounded-xl"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center text-center text-xl font-extrabold uppercase">
                    <div>{data.student_no}</div>
                    <div className="mt-5">
                        <span className="border-2 border-solid border-slate-400 p-2 px-8 shadow-lg rounded-xl">
                            {data.name}
                        </span>
                        <span className="block text-xs mt-2">
                            {data.course}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
