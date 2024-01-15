import Button from "../../button";
import Student from "./student";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Component({ prev, next, controls }) {
    const handleSubmit = () => {
        if (controls.form.processing) return;

        controls.submit(() => next());
    };

    return (
        <>
            <div className="min-h-[25rem]">
                <Student data={controls.form.data.student_info} />
            </div>
            <div className="flex gap-x-2">
                <Button className={`bg-slate-500`} onClick={prev}>
                    Edit
                </Button>

                <Button
                    className={`!w-[12rem] !text-[2rem]`}
                    onClick={handleSubmit}
                >
                    {controls.form.processing && (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="h-6 mr-2 text-slate-500 animate-spin absolute"
                        />
                    )}
                    Confirm
                </Button>
            </div>
        </>
    );
}
