import StudentForm from "../student.form";
import OtherForm from "../other.form";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Component = ({ prev, next, final, controls, ...props }) => {
    const studentNextHandler = () => {
        if (props.form.data.student_no == "") {
            props.form.setError("student_no", "Studet no. is required");
            return;
        }
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
        </>
    );
};

Component.propTypes = {
    form: PropTypes.object.isRequired,
};

export default Component;
