import { Button } from "@/js/components/buttons";
import { useEffect, useMemo } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTicket, setCurrentWindow } from "../reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardCheck,
    faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../theme";

export default function Component() {
    const dispatch = useDispatch();
    const { current } = useSelector((state) => state.themeCounter);
    const { getStyle, onChangeStyle, setType, setStyle, type, style } =
        useTheme("ticket", "bg", current);

    const actions = useMemo(
        () => ({
            ticket: setCurrentTicket,
            window: setCurrentWindow,
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
                            onChange={onChangeStyle}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
