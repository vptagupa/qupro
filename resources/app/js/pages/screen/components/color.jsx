import ColorPicker from "react-best-gradient-color-picker";
import { useState, memo, useCallback } from "react";

export const useColor = () => {
    const [color, setColor] = useState("rgba(255,255,255,1)");

    return {
        color,
        Render: memo(() => <ColorPicker value={color} onChange={setColor} />),
    };
};
