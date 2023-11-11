import StudentForm from "../student.form";
import OtherForm from "../other.form";
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";

const Component = ({ prev, next, final, controls, ...props }) => {
    const studentNextHandler = async () => {
        if (props.form.data.student_no == "") {
            props.form.setError("student_no", "Studet no. is required");
            return;
        }

        controls.setLoadingNext(true);
        const student = await axios.get(
            route("admin.qu.student.info", {
                studentno: props.form.data.student_no,
            }),
        );

        if (student.data) {
            props.form.setData("student_info", student.data);
        }
        controls.setLoadingNext(false);
        next();
    };

    const otherNextHandler = () => {
        if (props.form.data.name == "") {
            props.form.setError("name", "Name is required");
            return;
        }
        if (
            props.form.data.is_representative &&
            props.form.data.student_no == ""
        ) {
            props.form.setError("student_no", "Studet no. is required");
            return;
        }

        final();
    };

    const prevHandler = () => {
        props.form.setData("student_no", "");
        props.form.setData("student_name", "");
        props.form.setData("name", "xxxxx");
        props.form.setData("is_representative", false);
        prev();
    };

    const isStudent = () => props.form.data.type == "student";

    useEffect(() => {
        controls.next(isStudent() ? studentNextHandler : otherNextHandler);
        controls.setNextLabel(isStudent() ? "Next" : "Confirm");
        controls.setEnabledPrev(true);
    }, [props.form.data]);

    return (
        <>
            <div>
                {props.form.data.type === "student" && (
                    <div>
                        <StudentForm {...props} />
                    </div>
                )}
                {props.form.data.type === "other" && (
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
    form: PropTypes.object.isRequired,
};

export default Component;
