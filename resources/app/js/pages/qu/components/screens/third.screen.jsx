import StudentForm from "../student.form";
import OtherForm from "../other.form";
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";

const Component = ({ prev, next, final, ...props }) => {
    const studentNextHandler = async () => {
        if (props.controls.form.data.student_no == "") {
            props.controls.form.setError(
                "student_no",
                "Studet no. is required",
            );
            return;
        }

        props.controls.setLoadingNext(true);
        const student = await axios.get(
            route("admin.qu.student.info", {
                studentno: props.controls.form.data.student_no,
            }),
        );

        if (student.data) {
            props.controls.form.setData("student_info", student.data);
        }
        props.controls.setLoadingNext(false);
        next();
    };

    const otherNextHandler = async () => {
        if (props.controls.form.data.name == "") {
            props.controls.form.setError("name", "Name is required");
            return;
        }
        if (
            props.controls.form.data.is_representative &&
            props.controls.form.data.student_no == ""
        ) {
            props.controls.form.setError(
                "student_no",
                "Studet no. is required",
            );
            return;
        }

        props.controls.setLoadingNext(true);
        const student = await axios.get(route("admin.qu.store"));

        if (student.data) {
            props.controls.form.setData("student_info", student.data);
        }
        props.controls.setLoadingNext(false);

        final();
    };

    const prevHandler = () => {
        props.controls.form.setData("student_no", "");
        props.controls.form.setData("student_name", "");
        props.controls.form.setData("name", "xxxxx");
        props.controls.form.setData("is_representative", false);
        prev();
    };

    const isStudent = () => props.controls.form.data.type == "student";

    useEffect(() => {
        props.controls.prev(prevHandler);
        props.controls.next(
            isStudent() ? studentNextHandler : otherNextHandler,
        );
        props.controls.setNextLabel(isStudent() ? "Next" : "Confirm");
        props.controls.setEnabledPrev(true);
    }, [props.controls.form.data]);

    return (
        <>
            <div>
                {props.controls.form.data.type === "student" && (
                    <div>
                        <StudentForm {...props} />
                    </div>
                )}
                {props.controls.form.data.type === "other" && (
                    <div>
                        <OtherForm {...props} />
                    </div>
                )}
            </div>
            {process.env.NODE_ENV == "development" && (
                <div className="mt-10">
                    <div>Third Screen</div>
                </div>
            )}
        </>
    );
};

Component.propTypes = {
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    final: PropTypes.func.isRequired,
};

export default Component;
