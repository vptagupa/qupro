import { Form, Input } from "@/js/components/form";
import { PrimaryButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";

const Component = ({ prev, next, form }) => {
    return (
        <>
            <Form>
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
            </Form>
        </>
    );
};

export default Component;
