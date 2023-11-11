import PropTypes from "prop-types";

const Component = ({ controls: { form } }) => {
    return (
        <>
            <div className="flex flex-col gap-y-2 justify-center">
                <div className="text-center text-[5rem] font-extrabold uppercase">
                    <div>{form.data.qu}</div>
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
    controls: PropTypes.shape({
        form: PropTypes.object.isRequired,
    }),
};

export default Component;
