import PropTypes from "prop-types";
import QRCode from "react-qr-code";

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
                <div className="text-center text-[5rem] font-extrabold uppercase mb-7">
                    <div>{qu.num_fulltext}</div>
                </div>
                {qu.type == "student" && (
                    <span className="text-center text-[1rem] border-b border-solid border-purple-400 p-2 px-8">
                        {qu.student_name}, {student_info.course_code}
                    </span>
                )}

                {qu.type == "other" && (
                    <span className="text-center text-[1rem] border-b border-solid border-purple-400 p-2 px-8">
                        <div>{qu.name}</div>
                    </span>
                )}
                <div className="flex items-center justify-center mt-5">
                    <QRCode
                        className="w-[100px] h-[100px]"
                        value={qu.num_fulltext}
                        viewBox={`0 0 256 256`}
                    />
                </div>
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
