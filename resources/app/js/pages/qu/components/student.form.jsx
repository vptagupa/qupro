import { Form, Input } from "@/js/components/form";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import axios from "axios";

const Component = ({ next, controls: { form, ...controls } }) => {
    const studentRef = useRef();
    const nextHandler = () => {
        if (form.data.student_info.student_no == "") {
            form.setError("student_no", "Studet no. is required");
            studentRef.current.focus();
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

    const submit = (e) => {
        e.preventDefault();
        nextHandler();
    };

    useEffect(() => {
        controls.next(nextHandler);
    }, [form.data]);

    useEffect(() => {
        controls.setNextLabel("Next");
    }, []);

    return (
        <>
            <Form onSubmit={(e) => submit(e)}>
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
                        autoFocus
                        maxLength={15}
                        placeholder="Enter student no."
                        value={form.data.student_info.student_no}
                        onChange={(e) => {
                            form.setData("student_info", {
                                ...form.data.student_info,
                                student_no: e.target.value,
                            });
                        }}
                    />
                </div>
            </Form>
        </>
    );
};

Component.propTypes = {
    controls: PropTypes.shape({
        form: PropTypes.object.isRequired,
    }),
    next: PropTypes.func.isRequired,
};

export default Component;
