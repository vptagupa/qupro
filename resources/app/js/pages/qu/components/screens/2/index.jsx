import Student from "./student";
import Other from "./other";
import Button from "../../button";
import { validStudent, validOther } from "./actions";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Component({ pager, prev, final, next, controls }) {
    const studentRef = useRef();
    const nameRef = useRef();
    const [progressing, setProgess] = useState(false);

    const handleOther = () => {
        controls.form.setData("type", "other");
    };
    const handleNext = async () => {
        setProgess(true);
        if (await validStudent(controls, studentRef, nameRef)) {
            next();
        }
        setProgess(false);
    };

    const handleOtherConfirm = () => {
        if (validOther(controls, nameRef)) {
            if (controls.form.processing) return;

            controls.submit(() => final());
        }
    };

    return (
        <div className="grow flex flex-col items-center justify-center">
            <div className="grow flex items-center">
                {controls.form.data.type === "student" && (
                    <Student
                        studentRef={studentRef}
                        nameRef={nameRef}
                        controls={controls}
                    />
                )}
                {controls.form.data.type === "other" && (
                    <Other
                        final={final}
                        nameRef={nameRef}
                        controls={controls}
                    />
                )}
            </div>
            <div className="h-[6rem] mt-4 flex items-center justify-center gap-x-2">
                {controls.form.data.type == "student" && (
                    <Button
                        className={`!w-[12rem] !text-[2rem]`}
                        onClick={handleNext}
                    >
                        {progressing && (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="h-6 mr-2 text-slate-500 animate-spin absolute"
                            />
                        )}
                        Next
                    </Button>
                )}
                {controls.form.data.type == "other" && (
                    <Button
                        className={`!w-[12rem] !text-[2rem]`}
                        onClick={handleOtherConfirm}
                    >
                        {controls.form.processing && (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="h-6 mr-2 text-slate-500 animate-spin absolute"
                            />
                        )}
                        Confirm
                    </Button>
                )}
                {controls.form.data.type != "other" && (
                    <Button
                        className={`!w-1/2 !text-[1.1rem]`}
                        onClick={handleOther}
                    >
                        I don't have Student No.
                    </Button>
                )}
            </div>
        </div>
    );
}
