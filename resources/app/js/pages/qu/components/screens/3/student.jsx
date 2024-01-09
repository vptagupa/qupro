import Avatar from "@/assets/images/avatar.png";

export default function Component({ data }) {
    return (
        <>
            <div className="flex flex-col gap-y-6 justify-center">
                <div className="flex justify-center">
                    <div className="">
                        <img
                            src={Avatar}
                            className="h-[15rem] border-4 border-solid border-slate-300/50 rounded-xl"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center text-center text-xl font-extrabold uppercase">
                    <div>{data.student_no}</div>
                    <div className="mt-5">
                        <span className="border-2 border-solid border-purple-400 p-2 px-8 shadow-lg rounded-xl">
                            {data.name}, {data.course_code}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
