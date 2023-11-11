import PropTypes from "prop-types";
import Avatar from "@/assets/images/avatar.png";

const Component = ({ controls: { form } }) => {
    return (
        <>
            <div className="flex flex-col gap-y-6 justify-center">
                <div className="flex justify-center">
                    <div className="">
                        <img
                            src={Avatar}
                            className="h-[15rem] border-4 border-solid border-slate-300/50 rounded-xl"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center text-center text-xl font-extrabold uppercase">
                    <div>{form.data.student_no}</div>
                    <div className="mt-5">
                        <span className="border-2 border-solid border-purple-400 p-2 px-8 shadow-lg rounded-xl">
                            {form.data.student_name}
                        </span>
                    </div>
                </div>
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
