import { Form, Input, Checkbox } from "@/js/components/form";
import { PrimaryButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";

const Component = ({ final: next, prev, form }) => {
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

export default Component;
