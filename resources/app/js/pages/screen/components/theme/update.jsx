import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { replace as CounterReplacer } from "./counter/reducer";
import { replace as MediaReplacer } from "./media/reducer";

export const useThemeUpdate = (type, type_value) => {
    const dispatch = useDispatch();
    const update = useCallback(
        (type, type_value) => {
            axios
                .post(route("screen.theme.get"), {
                    type,
                    type_value,
                })
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
        },
        [type, type_value],
    );

    return {
        update,
    };
};
