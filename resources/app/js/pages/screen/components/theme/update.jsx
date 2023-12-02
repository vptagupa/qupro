import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { replace as CounterReplacer } from "./counter/reducer";
import { replace as MediaReplacer } from "./media/reducer";

export const useThemeUpdate = (account_type_id) => {
    const dispatch = useDispatch();
    const update = useCallback(() => {
        axios
            .get(
                route("screen.theme.account_type.getTheme", {
                    accountType: account_type_id ?? 0,
                }),
            )
            .then((res) => {
                dispatch(
                    CounterReplacer(
                        res.data.filter((t) => t.name == "themeCounter")[0]
                            ?.value,
                    ),
                );
                dispatch(
                    MediaReplacer(
                        res.data.filter((t) => t.name == "themeMedia")[0]
                            ?.value,
                    ),
                );
            });
    }, [account_type_id]);

    return {
        update,
    };
};
