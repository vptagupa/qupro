import { Button } from "@/js/components/buttons";
import { useState, useEffect, useCallback, memo } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCounter } from "./reducer";

export default memo(function Component() {
    const dispatch = useDispatch();
    const { counter } = useSelector((state) => state.themeCounter);
    const [color, setColor] = useState({
        bg: counter.bg,
        font: counter.font,
    });

    const [style, setStyle] = useState("bg");
    const getStyle = useCallback(
        () => (style == "bg" ? color.bg : color.font),
        [style, color],
    );

    const onChangeColor = useCallback(
        (value) => {
            setColor({
                [style]: value,
            });
        },
        [style],
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
                            onChange={onChangeColor}
                        />
                    </div>
                </div>
            </div>
        </>
    );
});
