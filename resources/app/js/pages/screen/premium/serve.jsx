import Serve from "../components/serve";
import Date from "../components/serve/date";
import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ticket } from "../components/counters/reducer";

export default memo(
    ({ screen_id, account_type_id: selected_account_type_id }) => {
        const dispatch = useDispatch();
        const counter = useSelector((state) => state.counter.data);
        const [data, setData] = useState({
            pending: 0,
            served: 0,
        });

        useEffect(() => {
            Echo.channel(`screen`)
                .listen("ScreenQuCreated", (event) => {
                    if (
                        counter.config.screen_account_type_ids.includes(
                            parseInt(selected_account_type_id),
                        ) ||
                        !selected_account_type_id
                    ) {
                        setData({
                            ...data,
                            pending: selected_account_type_id
                                ? selected_account_type_id ==
                                  event.qu.account_type_id
                                    ? event.data.account_type_pending_total
                                    : data.pending
                                : event.data.all_pending_total,
                        });
                    }
                })
                .listen("QuCalled", (event) => {
                    if (
                        counter.config.screen_account_type_ids.includes(
                            parseInt(selected_account_type_id),
                        ) ||
                        !selected_account_type_id
                    ) {
                        setData({
                            ...data,
                            served: selected_account_type_id
                                ? selected_account_type_id ==
                                  event.qu.account_type_id
                                    ? event.data.account_type_served_total
                                    : data.served
                                : event.data.all_served_total,
                        });
                        dispatch(ticket(event.qu.ticket));
                    }
                });

            axios
                .get(
                    route("screen.updated.totals", {
                        screen: screen_id,
                        accountType: selected_account_type_id,
                    }),
                )
                .then(({ data: { served, pending } }) => {
                    setData({
                        served,
                        pending,
                    });
                });

            return () => {
                Echo.leave(`screen`);
            };
        }, [
            counter.config?.screen_account_type_ids,
            selected_account_type_id,
            data,
        ]);

        return (
            <>
                <div className="flex gap-x-5 pr-4">
                    <div className="w-1/2">
                        <Date />
                    </div>
                    <div className="grow">
                        <Serve
                            accountType={counter.account_type?.name ?? ""}
                            served={data?.served ?? 0}
                            pending={data?.pending ?? 0}
                        />
                    </div>
                </div>
            </>
        );
    },
);
