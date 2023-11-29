import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

export default ({ ticket, isActive = false }) => {
    return (
        <div
            className={`flex gap-0 items-center justify-start w-full ${
                isActive ? "bg-slate-300 text-slate-800" : ""
            }`}
        >
            <div
                style={{
                    textWrap: "balance",
                }}
                className={`grow text-center leading-9 text-3xl p-2 ${
                    isActive ? "p-3" : ""
                }`}
            >
                {ticket?.num_fulltext}
            </div>
            <div className="flex items-center justify-center text-center w-[4.5rem] p-2">
                {isActive && (
                    <>
                        <span className="text-xs leading-3">NOW SERVING</span>
                    </>
                )}
                {!isActive && (
                    <FontAwesomeIcon
                        icon={faRightLong}
                        className={`h-7 ${
                            isActive ? "text-slate-800" : "text-slate-300"
                        }`}
                    />
                )}
            </div>
            <div
                style={{
                    textWrap: "balance",
                }}
                className={`w-1/2 text-center text-2xl font-bold p-4 rounded-tl-[2rem] rounded-bl-[2rem] 
                                     ${
                                         isActive
                                             ? "bg-teal-400 text-3xl"
                                             : "bg-purple-900"
                                     }
                                    `}
            >
                {ticket?.counter}
            </div>
        </div>
    );
};
