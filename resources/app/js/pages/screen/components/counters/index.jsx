import { memo } from "react";
import Counter from "./counter";
import { router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useTickets } from "./tickets";
import { useSelector } from "react-redux";

export default memo(({ screen_id, account_type_id }) => {
    const {
        data: { tickets, current, config },
    } = useSelector((state) => state.counter);
    const { update } = useTickets(screen_id, account_type_id);
    const [page, setPage] = useState(0);

    const [defferPage, setDefferPage] = useState(page);
    const isActive = useCallback(
        (ticket) =>
            ticket?.counter == current?.counter &&
            ticket?.num_fulltext == current?.num_fulltext,
        [current],
    );
    const active = useMemo(
        () => tickets.filter((ticket) => isActive(ticket))[0],
        [tickets, isActive],
    );

    const chunks = useMemo(() => {
        let data = [];
        const limiter = parseInt(config.screen_tickets_limit);
        const lists = tickets.filter((ticket) => !isActive(ticket));
        for (var i = 0; i < lists.length; i += limiter) {
            data.push(lists.slice(i, i + limiter));
        }

        return data;
    }, [tickets, config.screen_tickets_limit, isActive]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPage(page >= chunks.length - 1 ? 0 : page + 1);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [page, chunks]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDefferPage(page);
        }, 100);

        return () => {
            clearTimeout(timeout);
        };
    }, [page]);

    useEffect(() => {
        update();
        Echo.channel(`${screen_id}.screen`)
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
    }, [screen_id, account_type_id]);

    return (
        <>
            <div className="w-full text-3xl uppercase ">
                <div className="mb-4">
                    <Counter ticket={active} isActive={true} />
                </div>
                {chunks.map((tickets, idx) => {
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
