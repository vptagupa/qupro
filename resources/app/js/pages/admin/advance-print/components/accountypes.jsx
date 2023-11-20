import { PrimaryButton } from "@/js/components/buttons";
import PropTypes from "prop-types";
import { usePage } from "@inertiajs/react";
import { memo } from "react";

const Component = memo(({ form }) => {
    const { accountTypes } = usePage().props;
    const selectedStyle = "!bg-teal-400";
    const selected = (type) => {
        if (form.data.account_type_id != "") {
            if (form.data.account_type_id == type.id) {
                return selectedStyle;
            }
        }

        return "";
    };

    const clickHandler = (type) => {
        if (form.data.account_type_id != type.id) {
            form.setData("account_type_id", type.id);
        } else {
            form.setData("account_type_id", "");
        }
    };
    console.log("x");
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
                                "flex justify-center h-[4rem] text-center uppercase font-extrabold " +
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
});

Component.propTypes = {
    form: PropTypes.object.isRequired,
};

export default Component;
