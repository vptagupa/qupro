import StudentForm from "../student.form";
import OtherForm from "../other.form";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Component = ({ prev, ...props }) => {
    useEffect(() => {
        props.controls.prev(prev);
        props.controls.setEnabledPrev(true);
    }, []);

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
    controls: PropTypes.shape({
        form: PropTypes.object.isRequired,
    }),
};

export default Component;
