import Ticket from "./ticket";
import { useEffect } from "react";
import Button from "../../button";

export default function Component({ next, controls }) {
    const handleFinal = () => {
        next();
        controls.form.clearErrors();
        controls.form.reset();
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleFinal();
        }, 10000);

        return () => clearTimeout(timeout);
    }, [controls.form]);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <Ticket
                    qu={controls.form.data.qu}
                    studentInfo={controls.form.data?.student_info}
                />
            </div>
            <div className="mt-[5rem]">
                <div className="flex gap-5 items-center justify-center">
                    <Button
                        type="button"
                        className={`flex justify-center xs:h-[3rem] lg:h-[4rem] w-[10rem] !text-[2rem] text-white text-center uppercase font-extrabold bg-indigo-800 shadow-sm shadow-indigo-700`}
                        onClick={(e) => handleFinal()}
                    >
                        <span>Done</span>
                    </Button>
                </div>
            </div>
        </>
    );
}
