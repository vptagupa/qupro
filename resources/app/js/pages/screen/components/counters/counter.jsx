import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Component({ ticket, isActive = false }) {
    const { current, grid } = useSelector((state) => state.themeCounter);
    return (
        <div
            className={`flex gap-0 items-center justify-start w-full ${
                isActive ? "bg-slate-300 text-slate-800 h-[120px]" : ""
            }`}
            style={{
                background: isActive ? current.ticket.bg : grid.ticket.bg,
            }}
        >
            <div
                style={{
                    textWrap: "balance",
                    color: isActive ? current.ticket.font : grid.ticket.font,
                }}
                className={`text-center w-[35%] leading-8 pl-2 ${
                    isActive ? "text-4xl" : "text-3xl"
                }`}
            >
                {ticket?.num_fulltext}
            </div>
            <div
                className={`flex items-center justify-center text-center w-[15%]  ${
                    isActive ? "" : ""
                }`}
            >
                {isActive && (
                    <>
                        <span
                            className={`leading-4 ${
                                isActive ? "text-[1rem]" : "text-xs"
                            }`}
                            style={{
                                color: isActive
                                    ? current.ticket.font
                                    : grid.ticket.font,
                            }}
                        >
                            NOW
                            <br />
                            SERVING
                        </span>
                    </>
                )}
                {!isActive && (
                    <FontAwesomeIcon
                        icon={faRightLong}
                        className={`h-7 ${
                            isActive ? "text-slate-800" : "text-slate-300"
                        }`}
                        style={{
                            textWrap: "balance",
                            color: isActive ? null : grid.devider.font,
                        }}
                    />
                )}
            </div>
            <div
                style={{
                    textWrap: "balance",
                    color: isActive ? current.window.font : grid.window.font,
                    background: isActive ? current.window.bg : grid.window.bg,
                }}
                className={`w-1/2 text-center font-bold p-4 rounded-tl-[2rem] rounded-bl-[2rem] 
                                     ${
                                         isActive
                                             ? "bg-teal-400 text-4xl h-[100%] flex items-center justify-center"
                                             : "bg-purple-900 text-2xl"
                                     }
                                    `}
            >
                {ticket?.counter}
            </div>
        </div>
    );
}
