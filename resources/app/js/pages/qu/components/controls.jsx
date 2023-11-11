import { PrimaryButton, InfoButton, Button } from "@/js/components/buttons";
import Circle from "@/assets/images/circle.svg";
import { useState, useRef } from "react";

export const useControls = ({
    enabledPrev = true,
    enabledNext = false,
    prevLabel = "Prev",
    nextLabel = "Next",
}) => {
    const [_enabledPrev, setEnabledPrev] = useState(enabledPrev);
    const [_enabledNext, setEnabledNext] = useState(enabledNext);
    const [_prevLabel, setPrevLabel] = useState(prevLabel);
    const [_nextLabel, setNextLabel] = useState(nextLabel);
    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingPrev, setLoadingPrev] = useState(false);
    const _prev = useRef(() => {});
    const _next = useRef(() => {});
    const prev = (callback) => {
        _prev.current = callback;
    };
    const next = (callback) => {
        _next.current = callback;
    };

    const Controls = () => (
        <div>
            <div className="flex gap-5 items-center justify-center">
                <Button
                    type="button"
                    disabled={!_enabledPrev}
                    onClick={(e) => _prev.current()}
                    className="flex justify-center h-[4rem] w-[8rem] text-[1.2rem] bg-slate-300 text-center text-white uppercase font-extrabold disabled:bg-slate-200 enabled:bg-gradient-to-r  from-gray-500 to-zinc-500"
                >
                    <span>{_prevLabel}</span>
                </Button>
                <Button
                    disabled={!_enabledNext}
                    type="button"
                    onClick={(e) => _next.current()}
                    className="flex justify-center h-[4rem] w-[8rem] text-[1.2rem] text-white text-center uppercase font-extrabold enabled:bg-gradient-to-r  from-purple-400 to-fuchsia-400"
                >
                    {loadingNext && (
                        <img
                            src={Circle}
                            className="animate-spin h-5 w-5 mr-1 text-opacity-10 text-slate-100"
                        />
                    )}
                    <span>{_nextLabel}</span>
                </Button>
            </div>
        </div>
    );

    return {
        prev,
        next,
        Controls,
        setPrevLabel,
        setNextLabel,
        setEnabledPrev,
        setEnabledNext,
        setLoadingNext,
        setLoadingPrev,
    };
};
