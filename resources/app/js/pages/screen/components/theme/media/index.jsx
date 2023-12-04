import { Button } from "@/js/components/buttons";
import { useState, useEffect, useCallback, memo } from "react";
import ColorPicker from "../color";
import { useDispatch, useSelector } from "react-redux";
import { set } from "./reducer";
import { useTheme } from "../theme";

export default memo(function Component() {
    const dispatch = useDispatch();
    const { media } = useSelector((state) => state.themeMedia);

    const { getStyle, onChangeStyle, setStyle, style } = useTheme(
        "set",
        "bg",
        media,
    );

    useEffect(() => {
        dispatch(
            set({
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
                        <Button
                            type="button"
                            className={`${
                                style == "font" ? "bg-teal-500  text-white" : ""
                            }`}
                            onClick={(e) => setStyle("font")}
                        >
                            Font Color
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
