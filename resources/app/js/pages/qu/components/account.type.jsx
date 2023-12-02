import { PrimaryButton, Button } from "@/js/components/buttons";
import PropTypes from "prop-types";
import { usePage } from "@inertiajs/react";
import { useState, useMemo, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Component = ({ controls: { form } }) => {
    const [page, setPage] = useState(0);
    const [defferPage, setDefferPage] = useState(page);
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

    const chunk = useMemo(() => {
        return (perPage = 10) => {
            let data = [];
            for (var i = 0; i < accountTypes.data.length; i += perPage) {
                data.push(accountTypes.data.slice(i, i + perPage));
            }

            return data;
        };
    }, [accountTypes]);

    const clickHandler = (type) => {
        if (form.data.account_type.id != type.id) {
            form.setData("account_type", type);
        } else {
            form.setData("account_type", "");
        }
    };

    let timeout;
    useEffect(() => {
        timeout = setTimeout(() => {
            setDefferPage(page);
        }, 200);

        return () => {
            clearTimeout(timeout);
        };
    }, [page]);

    return (
        <>
            <div className="w-full flex gap-x-5 items-center justify-center mb-5">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className={`h-5 cursor-pointer font-bold ${
                        page == 0 ? "text-slate-400" : "text-teal-800"
                    }`}
                    title="Page departments back"
                    onClick={(e) => setPage(page > 0 ? page - 1 : page)}
                />
                <FontAwesomeIcon
                    icon={faArrowRight}
                    className={`h-5 cursor-pointer font-bold ${
                        page >= chunk().length - 1
                            ? "text-slate-400"
                            : "text-teal-800"
                    }`}
                    title="Page departments next"
                    onClick={(e) =>
                        setPage(page < chunk().length - 1 ? page + 1 : page)
                    }
                />
            </div>
            <div>
                {chunk().map((types, idx) => {
                    return (
                        <Transition
                            show={defferPage == idx}
                            key={idx}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="w-full"
                        >
                            <div
                                className={`flex flex-wrap justify-center  gap-y-4 gap-x-2 items-center ${
                                    idx != page ? "hidden" : ""
                                }`}
                            >
                                {types.map((type) => {
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
                        </Transition>
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
