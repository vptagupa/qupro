import StudentForm from "../student.form";
import OtherForm from "../other.form";
import PropTypes from "prop-types";
import { useEffect, memo } from "react";

const Component = memo(({ prev, ...props }) => {
    const prevHandler = () => {
        prev();
        props.controls.form.setData({
            ...props.controls.form.data,
            type: "student",
            student_info: {
                student_no: "",
                student_name: "",
            },
            is_priority: false,
            is_representative: false,
            name: "",
        });
        props.controls.setEnabledCustom(false);
    };

    useEffect(() => {
        props.controls.setEnabledNext(true);
        props.controls.prev(prevHandler);
        props.controls.setEnabledPrev(true);
        props.controls.setEnabledCustom(true);
        props.controls.setCustomLabel("I'm not student");
        props.controls.form.setData("type", "student");
        props.controls.custom(() => {
            props.controls.form.setData("type", "other");
            props.controls.setEnabledCustom(false);
        });
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
                    <div>Second Screen</div>
                </div>
            )}
        </>
    );
});

Component.propTypes = {
    controls: PropTypes.shape({
        form: PropTypes.object.isRequired,
    }),
};

export default Component;
