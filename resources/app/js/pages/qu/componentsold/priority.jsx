import { PrimaryButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";

const Component = ({ controls: { form } }) => {
    const selectedStyle = "!bg-teal-400";
    const selected = (type) => {
        if (form.data.priority != null) {
            if (type === "priority" && form.data.priority === true) {
                return selectedStyle;
            } else if (type === "regular" && form.data.priority === false) {
                return selectedStyle;
            }
        }

        return "";
    };

    const clickHandler = (type) => {
        form.setData("priority", type);
    };

    return (
        <>
            <div className="flex flex-wrap gap-5 items-center justify-center">
                <PrimaryButton
                    type="button"
                    onClick={(e) => clickHandler(false)}
                    className={
                        "flex justify-center xs:h-[2rem] xs:w-[8rem] xs:text-[0.5rem]  lg:h-[7rem] lg:w-[10rem] lg:text-[0.9rem] text-center uppercase font-extrabold " +
                        selected("regular")
                    }
                >
                    <span>Regular</span>
                </PrimaryButton>
                <PrimaryButton
                    type="button"
                    onClick={(e) => clickHandler(true)}
                    className={
                        "flex justify-center xs:h-[2rem] xs:w-[8rem] xs:text-[0.5rem]  lg:h-[7rem] lg:w-[10rem] lg:text-[0.9rem] text-center uppercase font-extrabold " +
                        selected("priority")
                    }
                >
                    <span>Priority</span>
                </PrimaryButton>
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
