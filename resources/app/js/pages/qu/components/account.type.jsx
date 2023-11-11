import { PrimaryButton, Button } from "@/js/components/buttons";
import { usePage } from "@inertiajs/react";
export default ({ form, next }) => {
    const { accountTypes } = usePage().props;
    const selectedStyle = "!bg-teal-400";
    const unSelectedStyle = "!bg-gray-200";
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
                                "flex justify-center h-[7rem] w-[10rem] text-[1.2rem text-center uppercase font-extrabold " +
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
