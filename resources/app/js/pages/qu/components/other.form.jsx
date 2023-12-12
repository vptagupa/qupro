import { Form, Input, Checkbox } from "@/js/components/form";
import PropTypes from "prop-types";
import { useEffect, useCallback, useRef } from "react";

const Component = ({ final, next, controls: { form, ...controls } }) => {
    const nameRef = useRef();
    const studentRef = useRef();
    const finalHandler = () => {
        const errors = Object.keys(validateInputs(["name"]));
        if (errors.includes("name")) {
            nameRef.current.focus();
            return;
        }

        form.clearErrors();
        controls.submit(() => final());
    };

    const nextHandler = () => {
        const errors = Object.keys(validateInputs(["name", "student_no"]));
        if (errors.length > 0) {
            if (errors.includes("name")) {
                nameRef.current.focus();
            }
            if (!errors.includes("name") && errors.includes("student_no")) {
                studentRef.current.focus();
            }
            return;
        }

        getStudentInfo();
    };

    const getStudentInfo = () => {
        controls.setLoadingNext(true);
        axios
            .get(
                route("admin.qu.student.info", {
                    studentno: form.data.student_info.student_no,
                }),
            )
            .then((response) => {
                if (response.data) {
                    form.setData("student_info", response.data);
                }
                controls.setLoadingNext(false);
                next();
            })
            .catch((error) => {
                console.log(error);
                controls.setLoadingNext(false);
            });
    };

    const validateInputs = (fields) => {
        let errors = null;
        const studentInfo = ["student_no"];
        fields.forEach((field) => {
            let value = form.data[field];
            if (studentInfo.includes(field)) {
                value = form.data.student_info[field];
            }
            if (value == "") {
                errors = {
                    ...(errors ?? {}),
                    [field]: "Required",
                };
            }
        });

        if (errors) {
            form.setErrors(errors);
            return errors;
        }

        return true;
    };

    const setRepresentative = useCallback((form, checked) => {
        form.setData("is_representative", checked);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        controls._next.current();
    };

    useEffect(() => {
        controls.next(nextHandler);
    }, [form.data]);

    useEffect(() => {
        controls.setNextLabel(form.data.is_representative ? "Next" : "Confirm");
        if (form.data.is_representative) {
            controls.next(nextHandler);
        } else {
            controls.next(finalHandler);
        }
    }, [form]);

    return (
        <>
            <Form onSubmit={(e) => submit(e)}>
                <div className="flex flex-col gap-y-1">
                    <div>
                        <label className="flex gap-2 items-center justify-start">
                            <Checkbox
                                className="lg:p-3 focus:ring focus:border-none"
                                name="is_priority"
                                value={form.data.is_priority ?? false}
                                onChange={(e) => {
                                    form.setData(
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
                        <label className="flex gap-2 items-center justify-start">
                            <Checkbox
                                className="lg:p-3 focus:ring focus:border-none"
                                name="is_representative"
                                value={form.data.is_representative}
                                onChange={(e) => {
                                    setRepresentative(form, e.target.checked);
                                }}
                            />
                            <div className="lg:text-[1.5rem]">
                                Is student representative
                            </div>
                        </label>
                    </div>
                    <div>
                        <Input
                            ref={nameRef}
                            type="text"
                            className={
                                "xs:p-4 xs:text-[2rem] lg:p-7 lg:text-[4rem] border-2 rounded-xl focus:ring" +
                                (form.invalid("name")
                                    ? " ring ring-pink-400/100 focus:ring focus:ring-pink-400/100"
                                    : "")
                            }
                            autoFocus
                            placeholder="Enter nickname"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                        />
                    </div>

                    {form.data.is_representative && (
                        <div>
                            <Input
                                ref={studentRef}
                                type="text"
                                className={
                                    "xs:p-4 xs:text-[2rem] lg:p-7 lg:text-[4rem] border-2 rounded-xl focus:ring" +
                                    (form.invalid("student_no")
                                        ? " ring ring-pink-400/100 focus:ring focus:ring-pink-400/100"
                                        : "")
                                }
                                maxLength={15}
                                placeholder="Enter student no."
                                value={form.data.student_info.student_no}
                                onChange={(e) =>
                                    form.setData("student_info", {
                                        ...form.data.student_info,
                                        student_no: e.target.value,
                                    })
                                }
                            />
                        </div>
                    )}
                </div>
            </Form>
        </>
    );
};

Component.propTypes = {
    controls: PropTypes.shape({
        form: PropTypes.object.isRequired,
    }),
    final: PropTypes.func.isRequired,
};

export default Component;
