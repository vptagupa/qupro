import { Form, Input } from "@/js/components/form";
import { PrimaryButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";

const Component = ({ firstScreenHandler, thirdScreenHandler, form }) => {
    return (
        <>
            <Form>
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
                <div className="mt-[10%]">
                    <div className="flex gap-5 items-center justify-center">
                        <Button
                            onClick={(e) => firstScreenHandler()}
                            className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] bg-slate-300 text-center uppercase font-extrabold"
                        >
                            <span>Back</span>
                        </Button>
                        <PrimaryButton
                            onClick={(e) => thirdScreenHandler()}
                            className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] text-center uppercase font-extrabold"
                        >
                            <span>Next</span>
                        </PrimaryButton>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Component;
