import { PrimaryButton } from "@/js/components/buttons";
import { usePage } from "@inertiajs/react";

export default function Component({ next, controls: { form, ...controls } }) {
    const { config } = usePage().props;

    const onClick = (category) => {
        if (form.data.category?.id != category.id) {
            form.setData("category", category);
        } else {
            form.setData("category", "");
        }
    };

    const selected = (category) => {
        if (form.data?.category?.id == category.id) {
            return "!bg-teal-400";
        }

        return "";
    };

    return (
        <>
            <div className="text-lg font-extrabold uppercase">
                {form.data.account_type.name}
            </div>
            <div className="flex flex-wrap w-full justify-center gap-2">
                {(form.data.account_type?.categories ?? []).map((category) => (
                    <div key={category.id} className="flex flex-col">
                        <div className="flex flex-col text-sm mb-2">
                            {config.enabled_category_statistics && (
                                <>
                                    <div>&nbsp;</div>
                                    <div>&nbsp;</div>
                                </>
                            )}
                        </div>
                        <div>
                            <PrimaryButton
                                type="button"
                                className={
                                    "flex justify-center xs:h-[2rem] xs:w-[8rem] xs:text-[0.5rem]  lg:h-[7rem] lg:w-[10rem]  lg:text-[0.9rem] text-center uppercase font-extrabold " +
                                    selected(category)
                                }
                                onClick={(e) => onClick(category)}
                            >
                                <span>{category.name}</span>
                            </PrimaryButton>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
