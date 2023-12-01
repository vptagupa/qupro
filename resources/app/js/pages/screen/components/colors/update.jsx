import { useCallback } from "react";
import { debounce } from "lodash";

export const useColor = ({ account_type_id }) => {
    const update = debounce(
        useCallback((field, color) => {
            axios
                .post(
                    route("screen.colors.account_type.update-color", {
                        accountType: account_type_id,
                    }),
                    {
                        field,
                        color,
                    },
                )
                .then((res) => {});
        }, []),
        1000,
    );

    return {
        update,
    };
};
