import { memo } from "react";
import Counter from "./counter";
import { Transition } from "@headlessui/react";
import { useState, useEffect, useCallback, useDeferredValue } from "react";

export default memo(({ tickets, current }) => {
    const [page, setPage] = useState(0);
    const [defferPage, setDefferPage] = useState(page);

    const isActive = (ticket) => ticket?.num_fulltext == current?.num_fulltext;
    const active = tickets.filter((ticket) => isActive(ticket))[0];

    const groups = useCallback(
        (perPage = 8) => {
            let data = [];
            const lists = tickets.filter((ticket) => !isActive(ticket));
            for (var i = 0; i < lists.length; i += perPage) {
                data.push(lists.slice(i, i + perPage));
            }

            return data;
        },
        [tickets],
    );

    let interval;
    useEffect(() => {
        interval = setInterval(() => {
            setPage(page >= groups().length - 1 ? 0 : page + 1);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [page, groups]);

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
            <div className="w-full text-3xl uppercase ">
                <div className="mb-4">
                    <Counter ticket={active} isActive={isActive(active)} />
                </div>
                {groups().map((group, idx) => {
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
                        >
                            <div
                                className={`flex flex-col gap-y-4 items-center ${
                                    idx != page ? "hidden" : ""
                                }`}
                            >
                                {group.map((ticket, idx) => {
                                    return (
                                        <Counter key={idx} ticket={ticket} />
                                    );
                                })}
                            </div>
                        </Transition>
                    );
                })}
            </div>
        </>
    );
});
