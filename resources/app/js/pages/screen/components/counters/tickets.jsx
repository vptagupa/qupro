import { debounce } from "@/js/helpers";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setData } from "./reducer";

export const useTickets = () => {
    const dispatch = useDispatch();

    const update = debounce(
        useCallback((screen_id, account_type_id, page) => {
            axios
                .get(
                    route("screen.updated", {
                        screen: screen_id,
                        accountType: account_type_id,
                    }),
                )
                .then(
                    ({
                        data: {
                            config,
                            tickets: { data, current, account_type },
                        },
                    }) => {
                        dispatch(
                            setData({
                                config,
                                tickets: data,
                                current,
                                account_type,
                            }),
                        );
                    },
                );
        }, []),
        1000,
    );

    return {
        update,
    };
};