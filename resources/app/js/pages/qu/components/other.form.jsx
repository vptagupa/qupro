import { Form, Input, Checkbox } from "@/js/components/form";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Component = ({ final, controls: { form, ...controls } }) => {
    const nextHandler = () => {
        let errors = null;
        if (form.data.name == "") {
            errors = {
                name: "Name is required",
            };
        }
        if (form.data.is_representative && form.data.student_no == "") {
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
                                className="p-3 focus:ring focus:border-none"
                                value={form.data.is_representative}
                                onChange={(e) => {
                                    form.setData(
                                        "is_representative",
                                        e.target.checked,
                                    );
                                }}
                            />
                            <div className="text-[1.5rem]">
                                Is student representative
                            </div>
                        </label>
                    </div>

                    <div>
                        <Input
                            type="text"
                            className={
                                "p-7 !text-[4rem] border-2 rounded-xl focus:ring" +
                                (form.invalid("name")
                                    ? " ring ring-pink-400/100 focus:ring focus:ring-pink-400/100"
                                    : "")
                            }
                            autoFocus
                            maxLength={20}
                            placeholder="Enter nickname"
                            value={form.data.name}
                            onChange={(e) => {
                                form.setData("name", e.target.value);
                            }}
                        />
                    </div>
                    {form.data.is_representative && (
                        <div>
                            <Input
                                type="text"
                                className={
                                    "p-7 !text-[4rem] border-2 rounded-xl focus:ring" +
                                    (form.invalid("student_no")
                                        ? " ring ring-pink-400/100 focus:ring focus:ring-pink-400/100"
                                        : "")
                                }
                                maxLength={15}
                                placeholder="Enter student no."
                                value={form.data.student_no}
                                onChange={(e) => {
                                    form.setData("student_no", e.target.value);
                                }}
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
