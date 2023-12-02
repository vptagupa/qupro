import { useState, useCallback } from "react";

export const useTheme = (dtype, dstyle, theme) => {
    const [type, setType] = useState(dtype);
    const [style, setStyle] = useState(dstyle);

    const [color, setColor] = useState({
        bg: theme[type].bg,
        font: theme[type].font,
    });

    const getStyle = useCallback(() => color[style], [style, color]);

    const onChangeStyle = useCallback(
        (value) => {
            setColor({
                ...color,
                [style]: value,
            });
        },
        [style, color],
    );

    return {
        getStyle,
        onChangeStyle,
        setType,
        setStyle,
        type,
        style,
    };
};
