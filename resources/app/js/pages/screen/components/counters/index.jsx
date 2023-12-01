import { memo } from "react";
import Counter from "./counter";
import { router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState, useEffect, useCallback } from "react";
import { useTickets } from "./tickets";
import { useSelector } from "react-redux";

export default memo(({ screen_id, account_type_id }) => {
    const {
        data: { tickets, current, config },
    } = useSelector((state) => state.counter);

    const { update } = useTickets(screen_id, account_type_id);
    const [page, setPage] = useState(0);
    const [defferPage, setDefferPage] = useState(page);
    const isActive = (ticket) => ticket?.num_fulltext == current?.num_fulltext;
    const active = tickets.filter((ticket) => isActive(ticket))[0];
    const chunks = useCallback(
        (perPage = 7) => {
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
            setPage(page >= chunks().length - 1 ? 0 : page + 1);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [page, chunks]);

    let timeout;
    useEffect(() => {
        timeout = setTimeout(() => {
            setDefferPage(page);
        }, 200);

        return () => {
            clearTimeout(timeout);
        };
    }, [page]);

    useEffect(() => {
        (config?.account_type_ids ?? []).forEach((id) => {
            Echo.private(`${id}.account-type`).listen("QuCalled", (qu) => {
                update();
            });
        });

        return () => {
            (config?.account_type_ids ?? []).forEach((id) => {
                Echo.leave(`${id}.account-type`);
            });
        };
    }, [config?.account_type_ids]);

    useEffect(() => {
        update();

        Echo.private(`${screen_id}.screen`)
            .listen("CounterRefresh", (e) => {
                update();
            })
            .listen("ScreenRefresh", (e) => {
                update();
                router.reload();
            });

        return () => {
            Echo.leave(`${screen_id}.screen`);
        };
    }, []);

    return (
        <>
            <div className="w-full text-3xl uppercase ">
                <div className="mb-4">
                    <Counter ticket={active} isActive={true} />
                </div>
                {chunks().map((tickets, idx) => {
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
                                {tickets.map((ticket, idx) => {
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
