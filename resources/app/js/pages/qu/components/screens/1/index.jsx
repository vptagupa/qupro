import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import style from "../../style";

export default function Component({ prev, next, controls }) {
    const {
        config: { category_limit: limiter },
    } = usePage().props;

    const [page, setPage] = useState(0);
    const categories = controls.form.data.account_type?.categories ?? [];
    const batch = categories.slice(page, page + limiter);

    const isLastPage = () => page + limiter > categories.length;
    return (
        <div className="flex flex-col items-center justify-center text-slate-200">
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 gap-2">
                    {batch.map((category) => (
                        <div
                            key={category.id}
                            className={`w-full cursor-pointer ${
                                style.secondaryBg
                            } ${style.secondaryFont} hover:${
                                style.activeBg
                            } rounded-lg hover:scale-110 delay-100 transition ease-in-out duration-700 border border-indigo-400 p-4 ${
                                controls.form.data?.category?.id == category.id
                                    ? style.activeBg + " !text-black/80"
                                    : ""
                            }`}
                        >
                            <div
                                type="button"
                                className={`flex justify-start text-xl uppercase font-extrabold`}
                                onClick={(e) => {
                                    controls.form.setData("category", category);
                                    next();
                                }}
                            >
                                <span>{category.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full mt-10 flex items-start gap-x-5 justify-center">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className={`h-6 cursor-pointer ${
                        page <= 0 ? "text-[#01257D]" : " text-indigo-200"
                    }`}
                    onClick={(e) => {
                        if (page > 0) {
                            setPage(page - limiter);
                        }
                    }}
                />
                <FontAwesomeIcon
                    icon={faArrowRight}
                    className={`h-6 cursor-pointer ${
                        isLastPage() ? " text-[#01257D]" : "text-indigo-200"
                    }`}
                    onClick={(e) => {
                        if (!isLastPage()) {
                            setPage(page + limiter);
                        }
                    }}
                />
            </div>
        </div>
    );
}
