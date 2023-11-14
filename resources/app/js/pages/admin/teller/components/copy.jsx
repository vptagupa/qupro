import {
    DocumentDuplicateIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import { copy } from "@/js/helpers";

export default ({ text }) => {
    const elRef = useRef(null);
    const [copied, setCopy] = useState(false);
    const handler = () => {
        if (!text || text == "-") return;

        copy(text, elRef.current);
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 3000);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    value={text ?? ""}
                    onChange={() => true}
                    className="bg-transparent border-0 select-none uppercase"
                    ref={elRef}
                    readOnly
                />
            </div>
            <div>
                {copied ? (
                    <CheckCircleIcon
                        className={`text-green-300 h-4 cursor-pointer `}
                    />
                ) : (
                    <DocumentDuplicateIcon
                        className={`text-white h-4 cursor-pointer `}
                        onClick={(e) => handler()}
                    />
                )}
            </div>
        </>
    );
};
