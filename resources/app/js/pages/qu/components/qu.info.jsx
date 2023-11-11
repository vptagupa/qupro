import PropTypes from "prop-types";

const Component = ({ form, ...props }) => {
    return (
        <>
            <div className="flex flex-col gap-y-2 justify-center">
                <div className="text-center text-[5rem] font-extrabold uppercase">
                    <div>PRIO-123</div>
                </div>
                {form.data.type == "student" && (
                    <div className="text-center text-[1rem] font-extrabold uppercase">
                        <div>{form.data.student_name}</div>
                    </div>
                )}

                {form.data.type == "other" && (
                    <div className="text-center text-[1rem] font-extrabold uppercase">
                        <div>{form.data.name}</div>
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
