import { PrimaryButton } from "@/js/components/buttons";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Component({ prev, next, controls }) {
    const {
        config: { category_limit: limiter },
    } = usePage().props;

    const [page, setPage] = useState(0);
    const categories = controls.form.data.account_type?.categories ?? [];
    const batch = categories.slice(page, page + limiter);

    const isLastPage = () => page + limiter > categories.length;

    useEffect(() => {
        controls.setEnabledNext(controls.form.data.category?.id ? true : false);
    }, [controls.form.data.category]);

    useEffect(() => {
        controls.prev(prev);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-2/3">
            <div className="w-full mb-10 flex items-start gap-x-5 justify-center">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className={`h-6 cursor-pointer text-slate-${
                        page <= 0 ? "400" : "800"
                    }`}
                    onClick={(e) => {
                        if (page > 0) {
                            setPage(page - limiter);
                        }
                    }}
                />
                <FontAwesomeIcon
                    icon={faArrowRight}
                    className={`h-6 cursor-pointer text-slate-${
                        isLastPage() ? "400" : "800"
                    }`}
                    onClick={(e) => {
                        if (!isLastPage()) {
                            setPage(page + limiter);
                        }
                    }}
                />
            </div>
            <div className="flex min-h-[25rem] items-center justify-center flex-wrap gap-2 w-2/3">
                {batch.map((category) => (
                    <div key={category.id} className="w-[15rem]">
                        <PrimaryButton
                            type="button"
                            className={`flex justify-center w-full leading-6  h-20 text-xl text-center uppercase font-extrabold ${
                                controls.form.data?.category?.id == category.id
                                    ? "!bg-teal-400"
                                    : ""
                            }`}
                            onClick={(e) => {
                                controls.form.setData("category", category);
                                next();
                            }}
                        >
                            <span>{category.name}</span>
                        </PrimaryButton>
                    </div>
                ))}
            </div>
            <div className="w-full mt-10 flex items-start justify-center">
                <controls.PrevButton />
            </div>
        </div>
    );
}
