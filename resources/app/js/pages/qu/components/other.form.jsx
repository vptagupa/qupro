import { Form, Input, Checkbox } from "@/js/components/form";
import { PrimaryButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";

const Component = ({ firstScreenHandler, finalScreenHandler, form }) => {
    const nextHandler = () => {
        if (form.data.is_representative && form.data.student_no == "") {
            form.setError("student_no", "Studet no. is required");
            return;
        }
        if (form.data.name == "") {
            form.setError("name", "Name is required");
            return;
        }
        finalScreenHandler();
    };
    return (
        <>
            <Form>
                <div className="flex flex-col gap-5">
                    <div>
                        <Input
                            type="text"
                            className="p-7 text-[4rem] border-2 rounded-xl focus:ring focus:border"
                            placeholder="Enter nickname"
                            value={form.data.name}
                            onChange={(e) => {
                                form.setData("name", e.target.value);
                            }}
                        />
                        {form.invalid("name") && (
                            <span className="text-danger text-[2rem]">
                                {form.errors.name}
                            </span>
                        )}
                    </div>
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
                                Is representative
                            </div>
                        </label>
                    </div>
                    {form.data.is_representative && (
                        <div>
                            <Input
                                type="text"
                                className="p-7 text-[4rem] border-2 rounded-xl focus:ring focus:border"
                                placeholder="Enter studet no."
                                value={form.data.student_no}
                                onChange={(e) => {
                                    form.setData("student_no", e.target.value);
                                }}
                            />
                            {form.invalid("student_no") && (
                                <span className="text-danger text-[2rem]">
                                    {form.errors.student_no}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="mt-[10%]">
                        <div className="flex gap-5 items-center justify-center">
                            <Button
                                type="button"
                                onClick={(e) => firstScreenHandler()}
                                className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] bg-slate-300 text-center uppercase font-extrabold"
                            >
                                <span>Back</span>
                            </Button>
                            <PrimaryButton
                                type="button"
                                onClick={(e) => nextHandler()}
                                className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] text-center uppercase font-extrabold"
                            >
                                <span>Confirm</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Component;
