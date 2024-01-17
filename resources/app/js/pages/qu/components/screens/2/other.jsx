import { Form, Checkbox } from "@/js/components/form";
import Input from "../../input";
import style from "../../style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Component({ final, nameRef, controls, handleNext }) {
    return (
        <>
            <Form
                className={`${style.primaryFont} flex flex-col gap-y-2`}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                }}
            >
                <div
                    className="flex items-center justify-end mb-10 cursor-pointer"
                    onClick={(e) => controls.form.setData("type", "student")}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="h-7" />
                </div>
                <div className="flex flex-col gap-2">
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
                </div>
            </Form>
        </>
    );
}
