import { PrimaryButton } from "@/js/components/buttons";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function Component({
    prev: controlPrev,
    next: controlNext,
    controls: { form, ...controls },
}) {
    const { config } = usePage().props;
    const [page, setPage] = useState(0);
    const categories = form.data.account_type?.categories ?? [];
    let limiter = config.category_limit;
    const batch = categories.slice(page, page + limiter);

    const isLastPage = () => page + limiter > categories.length;

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

    const prev = () => {
        if (categories.length > limiter) {
            setPage(page - limiter);
        }
    };
    const next = () => {
        if (categories.length > limiter) {
            setPage(page + limiter);
        }
    };

    useEffect(() => {
        if (form.data.category?.id) {
            controls.prev(controlPrev);
            controls.next(controlNext);
            controls.setEnabledNext(true);
        } else {
            controls.prev(prev);
            controls.next(next);
            if (isLastPage()) {
                controls.setEnabledNext(false);
            }
        }
    }, [form.data.category?.id]);

    useEffect(() => {
        controls.setEnabledPrev(true);
        controls.setEnabledNext(false);

        controls.prev(prev);
        controls.next(next);

        if (page <= 0) {
            controls.prev(controlPrev);
        }
        if (!isLastPage()) {
            controls.setEnabledNext(true);
        }
    }, [page]);

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
            </div>
        </>
    );
}
