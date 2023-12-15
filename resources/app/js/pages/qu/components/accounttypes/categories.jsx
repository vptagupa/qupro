import { PrimaryButton, InfoButton } from "@/js/components/buttons";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

export default function Component({ controls: { form, ...controls } }) {
    const { config } = usePage().props;
    const [page, setPage] = useState(0);
    const categories = form.data.account_type?.categories ?? [];

    let limiter = config.category_limit;

    if (categories.length > config.category_limit) {
        limiter = limiter - 2;
    }

    const batch = categories.slice(page, page + limiter);

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
            <div className="text-lg font-extrabold uppercase mb-4">
                {form.data.account_type.name}
            </div>
            <div className="flex flex-wrap w-full justify-center gap-2">
                {categories.length > config.category_limit && (
                    <InfoButton
                        disabled={page <= 0}
                        type="button"
                        className={`flex justify-center xs:h-[2rem] xs:w-[8rem] xs:text-[0.5rem]  lg:h-[7rem] lg:w-[10rem]  lg:text-[2rem] text-center uppercase font-extrabold `}
                        onClick={(e) => {
                            setPage(page - limiter);
                        }}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} className="h-10" />
                    </InfoButton>
                )}

                {batch.map((category) => (
                    <div key={category.id} className="flex flex-col">
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

                {categories.length > config.category_limit && (
                    <InfoButton
                        disabled={
                            page + limiter < categories.length ? false : true
                        }
                        type="button"
                        className={`flex justify-center xs:h-[2rem] xs:w-[8rem] xs:text-[0.5rem]  lg:h-[7rem] lg:w-[10rem]  lg:text-[2rem] text-center uppercase font-extrabold `}
                        onClick={(e) => {
                            setPage(page + limiter);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faAnglesRight}
                            className="h-10"
                        />
                    </InfoButton>
                )}
            </div>
        </>
    );
}
