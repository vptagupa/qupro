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
    console.log([categories, batch]);
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
            <div className="text-3xl font-extrabold uppercase mb-4">
                {form.data.account_type.name}
            </div>
            <div className="flex xs:max-sm:flex-col flex-wrap w-full justify-center gap-2">
                {batch.map((category) => (
                    <div key={category.id}>
                        <PrimaryButton
                            type="button"
                            className={
                                "flex justify-center xs:max-sm:w-full md:w-[10rem] leading-6  h-24 text-xl text-center uppercase font-extrabold " +
                                selected(category)
                            }
                            onClick={(e) => onClick(category)}
                        >
                            <span>{category.name}</span>
                        </PrimaryButton>
                    </div>
                ))}
                {categories.length > config.category_limit && (
                    <InfoButton
                        disabled={page <= 0}
                        type="button"
                        className={`flex justify-center text-center uppercase font-extrabold md:w-[10rem] text-xl`}
                        onClick={(e) => {
                            setPage(page - limiter);
                        }}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} className="h-10" />
                    </InfoButton>
                )}
                {categories.length > config.category_limit && (
                    <InfoButton
                        disabled={
                            page + limiter < categories.length ? false : true
                        }
                        type="button"
                        className={`flex justify-center text-center uppercase font-extrabold md:w-[10rem] text-xl`}
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
