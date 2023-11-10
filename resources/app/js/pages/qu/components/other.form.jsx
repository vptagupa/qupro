import { Form, Input, Checkbox } from "@/js/components/form";
import { PrimaryButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";

const Component = ({ firstScreenHandler, finalScreenHandler, form }) => {
    return (
        <>
            <Form>
                <div className="flex flex-col gap-5">
                    <div>
                        <Input
                            type="text"
                            className="p-7 text-[4rem] border-2 rounded-xl focus:ring focus:border"
                            placeholder="Enter Nick Name"
                            value={form.data.name}
                            onChange={(e) => {
                                form.setData("name", e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label className="flex gap-2 items-center">
                            <Checkbox
                                className="p-3 focus:ring focus:border-none"
                                checked={form.data.is_representative}
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
                        </div>
                    )}

                    <div className="mt-[10%]">
                        <div className="flex gap-5 items-center justify-center">
                            <Button
                                onClick={(e) => firstScreenHandler()}
                                className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] bg-slate-300 text-center uppercase font-extrabold"
                            >
                                <span>Back</span>
                            </Button>
                            <PrimaryButton
                                onClick={(e) => finalScreenHandler()}
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
