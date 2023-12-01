import { Button } from "@/js/components/buttons";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { useDispatch, useSelector } from "react-redux";
import { setGridTicket, setGridWindow, setGridDevider } from "../reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardCheck,
    faBuilding,
    faRightLong,
} from "@fortawesome/free-solid-svg-icons";

export default memo(function Component() {
    const dispatch = useDispatch();
    const { grid } = useSelector((state) => state.themeCounter);
    const [color, setColor] = useState({
        bg: grid.bg,
        font: grid.font,
    });
    const [type, setType] = useState("ticket");
    const [style, setStyle] = useState("font");
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

    const actions = useMemo(
        () => ({
            ticket: setGridTicket,
            window: setGridWindow,
            devider: setGridDevider,
        }),
        [],
    );

    useEffect(() => {
        dispatch(
            actions[type]({
                [style]: getStyle(),
            }),
        );
    }, [type, style, getStyle]);

    return (
        <>
            <div className="flex flex-col gap-y-2">
                <div className="flex">
                    <div className="w-1/2 text-left">Current</div>
                    <div className="flex gap-x-2 justify-end items-center w-1/2">
                        <div className="">
                            <FontAwesomeIcon
                                icon={faClipboardCheck}
                                className={`h-5 cursor-pointer  ${
                                    type == "ticket"
                                        ? "text-teal-500"
                                        : "text-slate-500"
                                }`}
                                title="Ticket"
                                onClick={(e) => setType("ticket")}
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={faRightLong}
                                className={`h-5 cursor-pointer  ${
                                    type == "devider"
                                        ? "text-teal-500"
                                        : "text-slate-500"
                                }`}
                                title="Devider"
                                onClick={(e) => {
                                    setType("devider");
                                    setStyle("font");
                                }}
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={faBuilding}
                                className={`h-5 cursor-pointer  ${
                                    type == "window"
                                        ? "text-teal-500"
                                        : "text-slate-500"
                                }`}
                                title="Window"
                                onClick={(e) => setType("window")}
                            />
                        </div>
                    </div>
                </div>
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
                            onChange={onChangeColor}
                        />
                    </div>
                </div>
            </div>
        </>
    );
});
