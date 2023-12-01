import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { replace } from "./counter/reducer";

export const useThemeUpdate = (account_type_id) => {
    const dispatch = useDispatch();
    const update = useCallback(() => {
        axios
            .get(
                route("screen.theme.account_type.getTheme", {
                    accountType: account_type_id,
                }),
            )
            .then((res) => {
                dispatch(
                    replace(
                        res.data.filter((t) => t.name == "themeCounter")[0]
                            ?.value,
                    ),
                );
            });
    }, []);

    return {
        update,
    };
};
