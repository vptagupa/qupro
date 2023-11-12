import { Form, Input, Checkbox } from "@/js/components/form";
import PropTypes from "prop-types";
import { useEffect, useCallback, memo } from "react";

const Component = ({ final, controls: { form, ...controls } }) => {
    const nextHandler = () => {
        let errors = null;
        if (form.data.name == "") {
            errors = {
                name: "Name is required",
            };
        }
        if (
            form.data.is_representative &&
            form.data.student_info.student_no == ""
        ) {
            errors = {
                ...errors,
                student_no: "Studet no. is required",
            };
        }

        if (errors) {
            form.setErrors(errors);
            return;
        }

        form.clearErrors();
        controls.submit(() => final());
    };

    const setRepresentative = useCallback((form, checked) => {
        console.log(checked);
        form.setData("is_representative", checked);
        console.log(form.data.is_representative);
    }, []);

    useEffect(() => {
        controls.next(nextHandler);
    }, [form.data]);

    useEffect(() => {
        controls.setNextLabel("Confirm");
    }, []);

    return (
        <>
            <Form>
                <div className="flex flex-col gap-5">
                    <div>
                        <label className="flex gap-2 items-center justify-end">
                            <Checkbox
                                className="lg:p-3 focus:ring focus:border-none"
                                name="is_representative"
                                checked={form.data.is_representative}
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
