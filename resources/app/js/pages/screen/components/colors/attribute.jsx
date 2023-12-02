import { useState, useEffect, useCallback } from "react";

export const useColorAttributes = ({ x = 1 }) => {
    const [colors, set] = useState({
        counter_bg_color: null,
    });

    const setColor = useCallback((colors) => {
        set(colors);
    }, []);

    return {
        colors,
        setColor,
    };
};
