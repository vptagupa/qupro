import { Form, Input, Checkbox } from "@/js/components/form";
import { useEffect, useRef } from "react";
import axios from "axios";

export default function Component({ next, controls }) {
    const studentRef = useRef();

    const handleNext = () => {
        if (controls.form.data.student_info.student_no == "") {
            controls.form.setError("student_no", "Student no. is required");
            studentRef.current.focus();
            return;
        }

        controls.form.clearErrors();
        controls.setLoadingNext(true);
        axios
            .get(
                route("qu.student.info", {
                    studentno: controls.form.data.student_info.student_no,
                }),
            )
            .then((response) => {
                if (response.data) {
                    controls.form.setData("student_info", response.data);
                }
                controls.setLoadingNext(false);
                next();
            })
            .catch((error) => {
                controls.setLoadingNext(false);
            });
    };

    useEffect(() => {
        controls.next(handleNext);
    }, [controls.form.data]);

    useEffect(() => {
        controls.setEnabledNext(true);
        controls.setNextLabel("Next");
    }, []);

    return (
        <>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                }}
            >
                <div className="mb-2">
                    <label className="flex gap-2 items-center justify-start">
                        <Checkbox
                            className="lg:p-3 focus:ring focus:border-none"
                            name="is_priority"
                            value={controls.form.data.is_priority ?? false}
                            onChange={(e) => {
                                controls.form.setData(
                                    "is_priority",
                                    e.target.checked,
                                );
                            }}
                        />
                        <div className="lg:text-[1.5rem]">
                            Check for priority status (PWD/SR/Pregnant)
                        </div>
                    </label>
                </div>
                <div>
                    <Input
                        ref={studentRef}
                        type="text"
                        className={
                            "xs:p-4 xs:text-[2rem] lg:p-7 lg:text-[4rem] border-2 rounded-xl focus:ring" +
                            (controls.form.invalid("student_no")
                                ? " ring ring-pink-400/100 focus:ring focus:ring-pink-400/100"
                                : "")
                        }
                        autoFocus
                        maxLength={15}
                        placeholder="Enter student no."
                        value={controls.form.data.student_info.student_no}
                        onChange={(e) => {
                            controls.form.setData("student_info", {
                                ...controls.form.data.student_info,
                                student_no: e.target.value,
                            });
                        }}
                    />
                </div>
            </Form>
        </>
    );
}
