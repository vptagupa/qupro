import SetColor from "./set";
import { memo, useState, useEffect, useCallback, useContext } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { debounce } from "lodash";
import { ColorContext } from "./context";

export default memo(({ account_type_id, field, ...props }) => {
    const [color, setColor] = useState(null);
    const ColorContext = useContext(ColorContext);

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

    useEffect(() => {
        if (color) {
            ColorContext.set({
                [field]: color,
            });
            update(field, color);
        }
    }, [color]);

    return (
        <SetColor>
            <ColorPicker value={color} onChange={setColor} />
        </SetColor>
    );
});
