import { PrimaryButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";
import { usePage } from "@inertiajs/react";

const Component = ({ controls: { form } }) => {
    const { accountTypes } = usePage().props;
    const selectedStyle = "!bg-teal-400";
    const selected = (type) => {
        if (form.data.account_type != "") {
            if (form.data.account_type.id == type.id) {
                return selectedStyle;
            }
        }

        return "";
    };

    const clickHandler = (type) => {
        if (form.data.account_type.id != type.id) {
            form.setData("account_type", type);
        } else {
            form.setData("account_type", "");
        }
    };
    return (
        <>
            <div className="flex flex-wrap gap-5 items-center justify-center">
                {accountTypes.data.map((type) => {
                    return (
                        <PrimaryButton
                            key={type.id}
                            type="button"
                            onClick={(e) => clickHandler(type)}
                            className={
                                "flex justify-center xs:h-[2rem] xs:w-[8rem] xs:text-[0.5rem]  lg:h-[7rem] lg:w-[10rem] lg:text-[0.9rem] text-center uppercase font-extrabold " +
                                selected(type)
                            }
                        >
                            <span>{type.name}</span>
                        </PrimaryButton>
                    );
                })}
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
