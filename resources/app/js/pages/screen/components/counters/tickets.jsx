import { debounce } from "@/js/helpers";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setData } from "./reducer";

export const useTickets = (screen_id, account_type_id) => {
    const dispatch = useDispatch();

    const update = debounce(
        useCallback(() => {
            const controller = new AbortController();
            axios
                .get(
                    route("screen.updated", {
                        screen: screen_id,
                        accountType: account_type_id,
                    }),
                    {
                        signal: controller.signal,
                    },
                )
                .then(
                    ({
                        data: {
                            config,
                            tickets: { data, current },
                        },
                    }) => {
                        dispatch(
                            setData({
                                config,
                                tickets: data,
                                current,
                            }),
                        );
                    },
                );

            return () => {
                controller.abort();
            };
        }, [screen_id, account_type_id]),
        1000,
    );

    return {
        update,
    };
};
