import StudentForm from "./student.form";
import OtherForm from "./other.form";
import PropTypes from "prop-types";

const Component = (props) => {
    return (
        <>
            {props.form.data.type === "student" && <StudentForm {...props} />}
            {props.form.data.type === "other" && <OtherForm {...props} />}
        </>
    );
};

Component.propTypes = {
    form: PropTypes.object.isRequired,
};

export default Component;
