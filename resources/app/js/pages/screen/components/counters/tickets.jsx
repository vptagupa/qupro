import { debounce } from "@/js/helpers";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setData } from "./reducer";

export const useTickets = () => {
    const dispatch = useDispatch();

    const updateTotals = debounce(
        useCallback((screen_id, account_type_id) => {
            axios
                .get(
                    route("screen.updated.totals", {
                        screen: screen_id,
                        accountType: account_type_id,
                    }),
                )
                .then(({ data: { config, served, total } }) => {
                    dispatch(
                        setData({
                            config,
                            served,
                            total,
                        }),
                    );
                });
        }, []),
        500,
    );

    const update = debounce(
        useCallback((screen_id, account_type_id, page) => {
            axios
                .get(
                    route("screen.updated", {
                        screen: screen_id,
                        accountType: account_type_id,
                        page,
                    }),
                )
                .then(
                    ({
                        data: {
                            config,
                            tickets: {
                                data,
                                current,
                                account_type,
                                served,
                                total,
                            },
                        },
                    }) => {
                        dispatch(
                            setData({
                                config,
                                tickets: data,
                                current,
                                account_type,
                                served,
                                total,
                            }),
                        );
                    },
                );
        }, []),
        1000,
    );

    return {
        update,
        updateTotals,
    };
};
