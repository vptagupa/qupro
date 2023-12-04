import { Button } from "@/js/components/buttons";
import { useState, useEffect, useCallback, memo } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "./reducer";
import { useTheme } from "../theme";

export default memo(function Component() {
    const dispatch = useDispatch();
    const { counter } = useSelector((state) => state.themeCounter);
    const { getStyle, onChangeStyle, setStyle, style } = useTheme(
        "set",
        "bg",
        counter,
    );

    useEffect(() => {
        dispatch(
            setCounter({
                [style]: getStyle(),
            }),
        );
    }, [style, getStyle]);

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-3 items-center justify-center">
                    <div className="flex gap-x-2">
                        <Button
                            type="button"
                            className={`${
                                style == "bg" ? "bg-teal-500 text-white" : ""
                            }`}
                            onClick={(e) => setStyle("bg")}
                        >
                            Background Color
                        </Button>
                    </div>
                    <div>
                        <ColorPicker
                            value={getStyle()}
                            onChange={onChangeStyle}
                        />
                    </div>
                </div>
            </div>
        </>
    );
});
