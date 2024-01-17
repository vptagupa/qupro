import { Form, Checkbox } from "@/js/components/form";
import style from "../../style";
import Input from "../../input";

export default function Component({
    nameRef,
    studentRef,
    controls,
    handleNext,
}) {
    return (
        <>
            <Form
                className={`${style.primaryFont} flex flex-col gap-y-4`}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                }}
            >
                <div>
                    <label className="flex gap-2 items-center justify-start">
                        <Checkbox
                            className="lg:p-3 focus:ring focus:border-none"
                            name="is_representative"
                            value={controls.form.data.is_representative}
                            checked={controls.form.data.is_representative}
                            onChange={(e) => {
                                controls.form.setData(
                                    "is_representative",
                                    e.target.checked,
                                );
                            }}
                        />
                        <div className="lg:text-[1.5rem]">
                            I am a representative
                        </div>
                    </label>
                </div>
                <div>
                    <Input
                        ref={studentRef}
                        type="text"
                        className={`${style.secondaryFont} ${
                            controls.form.invalid("student_no")
                                ? " ring ring-pink-500/100 focus:ring focus:ring-pink-500/100"
                                : ""
                        }`}
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
                {controls.form.data.is_representative && (
                    <div>
                        <Input
                            ref={nameRef}
                            type="text"
                            className={`${style.secondaryFont} ${
                                controls.form.invalid("name")
                                    ? " ring ring-pink-500/100 focus:ring focus:ring-pink-500/100"
                                    : ""
                            }`}
                            autoFocus
                            placeholder="Enter nickname"
                            value={controls.form.data.name}
                            onChange={(e) =>
                                controls.form.setData("name", e.target.value)
                            }
                        />
                    </div>
                )}
            </Form>
        </>
    );
}
