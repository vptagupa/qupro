import Qu from "../widgets/qu";
import Waiting from "../widgets/waiting";
import PropTypes from "prop-types";
import { useForm } from "@/js/helpers/form";
import {
    useEffect,
    useState,
    useCallback,
    useMemo,
    useTransition,
} from "react";
import Event from "@/js/helpers/event";
import NextButton from "../buttons/next";
import Records from "../modal/records";
import { CardContext } from "../context/card";
import PriorityTotals from "../badge/priority.totals";
import { completed } from "../requests";
import Message from "../widgets/message";

const Component = ({ accountType, url }) => {
    const [isPending, startTransition] = useTransition();
    const [hasNextPriority, setHasNextPriority] = useState(false);
    const [hasNextRegular, setHasNextRegular] = useState(false);
    const [total, setTotal] = useState({
        priorities: 0,
        regulars: 0,
    });
    const { form } = useForm({
        method: "post",
        route: url,
        data: {
            priority: "regular",
            account_type: accountType,
            qu: null,
        },
    });

    const setQu = (qu) => form.setData("qu", qu);

    const isPriority = useMemo(
        () => () => form.data.priority == "priority",
        [form.data.priority],
    );

    const onPriorityChange = useCallback(() => {
        if (form.data.priority == "regular") {
            form.setData("priority", "priority");
        } else {
            form.setData("priority", "regular");
        }

        // if (hasQu()) {
        //     setComplete();
        //     setQu(null);
        // }
    }, [form.data]);

    const onWaitingUpdate = useMemo(
        () => ({
            setHasNextPriority,
            setHasNextRegular,
            setTotal,
        }),
        [],
    );

    const cardContextValue = useMemo(
        () => ({
            onPriorityChange,
            isPriority,
            accountType,
        }),
        [onPriorityChange, isPriority, accountType],
    );

    const hasQu = () => (form.data.qu?.id ? true : false);
    const submitLabel = () => {
        if (hasQu()) {
            if (isPriority()) {
                return hasNextPriority ? "Next" : "Done";
            } else {
                return hasNextRegular ? "Next" : "Done";
            }
        }

        return "Start";
    };

    const setComplete = () => {
        startTransition(() => {
            const request = async () => {
                await completed(Qu.id);
            };
            request();
        });
    };

    const isSubmitEnabled = useMemo(() => {
        return () => {
            if (isPriority() && hasNextPriority) {
                return true;
            }
            if (!isPriority() && hasNextRegular) {
                return true;
            }

            if (hasQu()) {
                return true;
            }

            return false;
        };
    }, [isPriority, hasQu, hasNextRegular, hasNextPriority]);

    const submit = useMemo(() => {
        return () => {
            if (isSubmitEnabled() && !form.processing) {
                form.submit({
                    only: ["errors", "qu", "waiting", "next"],
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: (page) => {
                        eventResetAllCardsQu(form.data.qu);
                        setQu(page.props.next.data);
                        Event.emit(`${accountType.id}.waiting-reload`);
                    },
                });
            }
        };
    }, [form, isSubmitEnabled]);

    const eventResetAllCardsQu = (qu) => {
        if (qu?.id) {
            Event.emit(`${qu.id}.reset`);
        }
    };

    useEffect(() => {
        if (form.data.qu?.id) {
            Event.on(`${form.data.qu.id}.reset`, (qu) => {
                setQu(null);
            });
        }

        return () => {
            Event.off(`${form.data.qu?.id}.reset`);
        };
    }, [form.data.qu]);

    useEffect(() => {
        Event.on(
            `${accountType.id}.set-qu`,
            (qu) => {
                form.setData({
                    ...form.data,
                    qu,
                    priority: qu?.priority == 1 ? "priority" : "regular",
                });
            },
            this,
        );

        return () => {
            Event.off(`${accountType.id}.set-qu`);
        };
    }, []);

    return (
        <>
            <CardContext.Provider value={cardContextValue}>
                {form.hasErrors && (
                    <div className="mb-2">
                        <Message message={form.errors} />
                    </div>
                )}
                <Records />
                <div
                    className={`${
                        isPriority()
                            ? "bg-gradient-to-tr from-pink-400 to-rose-300 text-white"
                            : "bg-gradient-to-tr from-purple-400 to-fuchsia-400 text-white"
                    } p-3 mt-1 border border-slate-300 rounded-2xl shadow-lg shadow-slate-400/30`}
                >
                    <div className="flex flex-col w-full">
                        <div>
                            <PriorityTotals total={total} />
                        </div>
                        <div>
                            <Qu data={form.data.qu} />
                        </div>
                        <div className="mt-3 xs:max-sm:hidden">
                            <Waiting onWaitingUpdate={onWaitingUpdate} />
                        </div>
                        <div className="mt-[12%] flex gap-2">
                            <div className="grow">
                                <NextButton
                                    isPriority={isPriority}
                                    label={submitLabel()}
                                    submit={submit}
                                    loading={form.processing}
                                    enabled={isSubmitEnabled()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContext.Provider>
        </>
    );
};

Component.propTypes = {
    accountType: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
};

export default Component;
