import Ticket from "./ticket";
import { useEffect } from "react";
import { Button } from "@/js/components/buttons";

export default function Component({ next, controls }) {
    const finalhandler = () => {
        next();
        controls.form.clearErrors();
        controls.form.reset();
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            finalhandler();
        }, 10000);

        return () => clearTimeout(timeout);
    }, [controls.form]);

    return (
        <div className="flex flex-col items-center justify-center w-2/3">
            <Ticket
                qu={controls.form.data.qu}
                studentInfo={controls.form.data?.student_info}
            />
            <div className="mt-[5%]">
                <div className="flex gap-5 items-center justify-center">
                    <Button
                        type="button"
                        className="flex gap-x-2 justify-center h-[5rem] w-[10rem] !text-[1.2rem] text-center text-white uppercase font-extrabold bg-gradient-to-r  from-purple-400 to-fuchsia-400"
                        onClick={(e) => finalhandler()}
                    >
                        <span>Done</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
