import PropTypes from "prop-types";

const Component = ({
    controls: {
        form: {
            data: { qu, student_info },
        },
    },
}) => {
    return (
        <>
            <div className="flex flex-col gap-y-2 justify-center">
                <div className="text-center text-[5rem] font-extrabold uppercase ">
                    <div>{qu.num_fulltext}</div>
                </div>
                {qu.type == "student" && (
                    <span className="text-[1rem] border-b border-solid border-purple-400 p-2 px-8">
                        {qu.student_name}, {student_info.course_code}
                    </span>
                )}

                {qu.type == "other" && (
                    <span className="text-center text-[1rem] border-b border-solid border-purple-400 p-2 px-8">
                        <div>{qu.name}</div>
                    </span>
                )}
            </div>
        </>
    );
};

Component.propTypes = {
    controls: PropTypes.shape({
        form: PropTypes.object.isRequired,
    }),
    qu: PropTypes.shape({
        name: PropTypes.string,
        student_name: PropTypes.string,
        student_no: PropTypes.string,
        type: PropTypes.string,
        num_fulltext: PropTypes.string,
    }),
};

export default Component;
