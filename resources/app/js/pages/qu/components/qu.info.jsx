import PropTypes from "prop-types";

const Component = ({
    controls: {
        form: {
            data: { qu },
        },
    },
}) => {
    return (
        <>
            <div className="flex flex-col gap-y-2 justify-center">
                <div className="text-center text-[5rem] font-extrabold uppercase">
                    <div>{qu.num_fulltext}</div>
                </div>
                {qu.type == "student" && (
                    <div className="text-center text-[1rem] font-extrabold uppercase">
                        <div>{qu.student_name}</div>
                    </div>
                )}

                {qu.type == "other" && (
                    <div className="text-center text-[1rem] font-extrabold uppercase">
                        <div>{qu.name}</div>
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
    qu: PropTypes.shape({
        name: PropTypes.string,
        student_name: PropTypes.string,
        student_no: PropTypes.string,
        type: PropTypes.string,
        num_fulltext: PropTypes.string,
    }),
};

export default Component;
