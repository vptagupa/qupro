import { Button } from "@/js/components/buttons";
import { useEffect, memo, useCallback } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { useDispatch, useSelector } from "react-redux";
import { setPopover, setPopoverOpen } from "../reducer";
import { useTheme } from "../../theme";

export default memo(function Component() {
    const dispatch = useDispatch();

    const { popover } = useSelector((state) => state.themeCounter);
    const { getStyle, onChangeStyle, setStyle, style } = useTheme(
        "set",
        "bg",
        popover,
    );

    let timeout;
    useEffect(() => {
        dispatch(
            setPopover({
                [style]: getStyle(),
            }),
        );
        dispatch(setPopoverOpen(true));
        // Auto close after a few seconds
        timeout = setTimeout(() => {
            dispatch(setPopoverOpen(false));
        }, 5000);

        return () => {
            clearTimeout(timeout);
            dispatch(setPopoverOpen(false));
        };
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
