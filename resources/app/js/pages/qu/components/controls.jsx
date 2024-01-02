import { Button } from "@/js/components/buttons";
import Circle from "@/assets/images/circle.svg";
import { useState, useRef, useCallback } from "react";
import { useForm } from "@/js/helpers/form";

export const useControls = ({
    enabledPrev = true,
    enabledNext = false,
    enabledCustom = false,
    prevLabel = "Back",
    nextLabel = "Next",
    customLabel = "",
    url,
}) => {
    const [props, setProps] = useState({
        prev: {
            enabled: enabledPrev,
            hidden: false,
            label: prevLabel,
            loading: false,
        },
        next: {
            enabled: enabledNext,
            hidden: false,
            label: nextLabel,
            loading: false,
        },
        custom: {
            enabled: enabledCustom,
            hidden: false,
            label: customLabel,
            loading: false,
        },
    });

    const { form } = useForm({
        method: "post",
        route: url ?? route("qu.store"),
        data: {
            is_priority: null,
            name: "",
            type: "student",
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
    const setPrevLabel = (label) => {
        setProps({
            ...props,
            prev: {
                ...props.prev,
                label,
            },
        });
    };
    const setNextLabel = (label) => {
        setProps({
            ...props,
            next: {
                ...props.next,
                label,
            },
        });
    };
    const setCustomLabel = (label) => {
        setProps({
            ...props,
            custom: {
                ...props.custom,
                label,
            },
        });
    };
    const setEnabledPrev = (enabled) => {
        setProps({
            ...props,
            prev: {
                ...props.prev,
                enabled,
            },
        });
    };
    const setEnabledNext = (enabled) => {
        setProps({
            ...props,
            next: {
                ...props.next,
                enabled,
            },
        });
    };
    const setEnabledCustom = (enabled) => {
        setProps({
            ...props,
            custom: {
                ...props.custom,
                enabled,
            },
        });
    };
    const setLoadingNext = (loading) => {
        setProps({
            ...props,
            next: {
                ...props.next,
                loading,
            },
        });
    };
    const setLoadingPrev = (loading) => {
        setProps({
            ...props,
            prev: {
                ...props.prev,
                loading,
            },
        });
    };
    const setLoadingCustom = (loading) => {
        setProps({
            ...props,
            custom: {
                ...props.custom,
                loading,
            },
        });
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

    const PrevButton = () => (
        <Button
            type="button"
            disabled={!props.prev.enabled}
            onClick={(e) => _prev.current()}
            className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-[8rem] text-[1.2rem] bg-slate-300 text-center text-white uppercase font-extrabold disabled:bg-slate-200 enabled:bg-gradient-to-r  from-gray-500 to-zinc-500"
        >
            <span>{props.prev.label}</span>
        </Button>
    );

    const NextButton = () => (
        <Button
            disabled={!props.next.enabled}
            type="button"
            onClick={(e) => _next.current()}
            className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-[8rem] text-[1.2rem] text-white text-center uppercase font-extrabold enabled:bg-gradient-to-r  from-purple-400 to-fuchsia-400"
        >
            {props.next.loading && (
                <img
                    src={Circle}
                    className="animate-spin h-5 w-5 mr-1 text-opacity-10 text-slate-100"
                />
            )}

            <span>{props.next.label}</span>
        </Button>
    );

    const CustomButton = () =>
        props.custom.enabled && (
            <Button
                type="button"
                onClick={(e) => _custom.current()}
                className="flex justify-center xs:h-[3rem] lg:h-[4rem] w-[8rem] text-[1.2rem] text-white text-center uppercase font-extrabold enabled:bg-gradient-to-r  from-purple-400 to-fuchsia-400"
            >
                {props.custom.loading && (
                    <img
                        src={Circle}
                        className="animate-spin h-5 w-5 mr-1 text-opacity-10 text-slate-100"
                    />
                )}

                <span>{props.custom.label}</span>
            </Button>
        );

    const Buttons = () => (
        <div className="flex gap-5 items-center justify-center">
            <PrevButton />
            <NextButton />
            <CustomButton />
        </div>
    );

    return {
        form,
        prev,
        next,
        custom,
        submit,
        Buttons,
        PrevButton,
        NextButton,
        CustomButton,
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
