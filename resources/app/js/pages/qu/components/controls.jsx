import { PrimaryButton, InfoButton, Button } from "@/js/components/buttons";
import Circle from "@/assets/images/circle.svg";
import { useState, useRef, useCallback } from "react";
import { useForm } from "@/js/helpers/form";

export const useControls = ({
    enabledPrev = true,
    enabledNext = false,
    enabledCustom = false,
    prevLabel = "Prev",
    nextLabel = "Next",
    customLabel = "Next",
    url,
}) => {
    const [_enabledPrev, setEnabledPrev] = useState(enabledPrev);
    const [_enabledNext, setEnabledNext] = useState(enabledNext);
    const [_enabledCustom, setEnabledCustom] = useState(enabledCustom);
    const [_prevLabel, setPrevLabel] = useState(prevLabel);
    const [_nextLabel, setNextLabel] = useState(nextLabel);
    const [_customLabel, setCustomLabel] = useState(customLabel);
    const [loadingNext, setLoadingNext] = useState(false);
    const [loadingCustom, setLoadingCustom] = useState(false);
    const [loadingPrev, setLoadingPrev] = useState(false);

    const { form } = useForm({
        method: "post",
        route: url ?? route("qu.store"),
        data: {
            is_priority: null,
            name: "",
            type: "",
            account_type: "",
            is_representative: false,
            qu: {
                name: "",
                student_name: "",
                student_no: "",
                type: "",
                num_fulltext: "",
            },
            student_info: {
                student_no: "",
                name: "",
                course_code: "",
                course: "",
            },
        },
    });

    const _prev = useRef(() => {});
    const _next = useRef(() => {});
    const _custom = useRef(() => {});

    const prev = (callback) => {
        _prev.current = callback;
    };
    const next = (callback) => {
        _next.current = callback;
    };
    const custom = (callback) => {
        _custom.current = callback;
    };

    const submit = useCallback(
        (callback) => {
            form.submit({
                preserveState: true,
                preserveScroll: true,
                only: ["errors", "qu"],
                onBefore: () => setLoadingNext(true),
                onSuccess: (page) => {
                    form.setData("qu", page.props.qu);
                    setLoadingNext(false);
                    callback();
                },
                onError: () => setLoadingNext(false),
                onFinish: () => setLoadingNext(false),
            });
        },
        [form],
    );

    const Controls = () => (
        <div>
            <div className="flex gap-5 items-center justify-center">
                <Button
                    type="button"
                    disabled={!_enabledPrev}
                    onClick={(e) => _prev.current()}
                    className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-[8rem] text-[1.2rem] bg-slate-300 text-center text-white uppercase font-extrabold disabled:bg-slate-200 enabled:bg-gradient-to-r  from-gray-500 to-zinc-500"
                >
                    <span>{_prevLabel}</span>
                </Button>
                <Button
                    disabled={!_enabledNext}
                    type="button"
                    onClick={(e) => _next.current()}
                    className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-[8rem] text-[1.2rem] text-white text-center uppercase font-extrabold enabled:bg-gradient-to-r  from-purple-400 to-fuchsia-400"
                >
                    {loadingNext && (
                        <img
                            src={Circle}
                            className="animate-spin h-5 w-5 mr-1 text-opacity-10 text-slate-100"
                        />
                    )}

                    <span>{_nextLabel}</span>
                </Button>
                {_enabledCustom && (
                    <Button
                        type="button"
                        onClick={(e) => _custom.current()}
                        className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-[8rem] text-[1.2rem] text-white text-center uppercase font-extrabold enabled:bg-gradient-to-r  from-purple-400 to-fuchsia-400"
                    >
                        {loadingCustom && (
                            <img
                                src={Circle}
                                className="animate-spin h-5 w-5 mr-1 text-opacity-10 text-slate-100"
                            />
                        )}

                        <span>{_customLabel}</span>
                    </Button>
                )}
            </div>
        </div>
    );

    return {
        form,
        prev,
        next,
        custom,
        _next,
        _prev,
        _custom,
        enabledCustom: _enabledCustom,
        submit,
        Controls,
        setPrevLabel,
        setNextLabel,
        setCustomLabel,
        setEnabledPrev,
        setEnabledNext,
        setEnabledCustom,
        setLoadingNext,
        setLoadingPrev,
        setLoadingCustom,
    };
};
