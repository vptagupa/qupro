import Qu from "../qu";
import Waiting from "../waiting";
import PropTypes from "prop-types";
import { useForm } from "@/js/helpers/form";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Event from "@/js/helpers/event";
import NextButton from "../buttons/next";
import Records from "../modal/records";

const Component = ({ type }) => {
    const [waiting, setWaiting] = useState([]);
    const [hasNextPriority, setHasNextPriority] = useState(false);
    const [hasNextRegular, setHasNextRegular] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPriorityIncluded, setIncludePriority] = useState(true);
    const [totalPriorities, setTotalPriorities] = useState({
        priorities: 0,
        regulars: 0,
    });
    const { form } = useForm({
        method: "post",
        route: route("admin.tellers.next"),
        data: {
            priority: "regular",
            account_type: type,
            qu: null,
        },
    });
    const isPriority = () => form.data.priority == "priority";
    const hasQu = () => (form.data.qu?.id ? true : false);
    const submitLabel = () => {
        if (hasQu()) {
            if (waiting.length > 0) {
                return "Next";
            }
            return "Done";
        }

        return "Start";
    };

    const isSubmitEnabled = () => {
        if (form.data.priority == "regular" && hasNextRegular) {
            return true;
        } else if (form.data.priority == "priority" && hasNextPriority) {
            return true;
        }

        if (hasQu()) {
            return true;
        }

        return false;
    };

    const submit = () => {
        if (isSubmitEnabled() && !loading) {
            form.submit({
                only: ["errors", "qu", "waiting", "next"],
                preserveState: true,
                preserveScroll: true,
                onBefore: () => setLoading(true),
                onSuccess: (page) => {
                    eventResetAllCardsQu(form.data.qu);
                    form.setData("qu", page.props.next.data);
                    setLoading(false);
                    getWaiting();
                },
                onError: () => setLoading(false),
                onFinal: () => setLoading(false),
            });
        }
    };

    const getWaiting = () => requestWaiting(isPriorityIncluded, isPriority());
    const requestWaiting = useCallback(
        (include_priority = null, priority = null) => {
            const data = async () => {
                const response = await axios.post(
                    route("admin.qu.waiting", {
                        type: type.id,
                    }),
                    {
                        include_priority,
                        priority,
                    },
                );
                const data = response.data;

                setWaiting(data.data.waiting);
                setHasNextPriority(data.meta.has_next_priority);
                setHasNextRegular(data.meta.has_next_regular);
                setTotalPriorities({
                    priorities: data.data.total_priorities,
                    regulars: data.data.total_regulars,
                });
            };
            data();
        },
        [],
    );

    const eventResetAllCardsQu = (qu) => {
        if (qu?.id) {
            Event.emit(`${qu.id}.reset`);
        }
    };

    const eventsListener = () => {
        Event.on(
            `${type.id}.set-qu`,
            (qu) => {
                form.setData({
                    ...form.data,
                    qu,
                    priority: qu?.priority == 1 ? "priority" : "regular",
                });
            },
            this,
        );
        Event.on(`${type.id}.waiting-list`, (qu) => {
            getWaiting();
        });

        Echo.private(`${type.id}.account-type`).listen("QuCreated", (e) => {
            getWaiting();
        });
    };

    useEffect(() => {
        if (form.data.qu?.id) {
            Event.on(`${form.data.qu.id}.reset`, (qu) => {
                form.setData("qu", null);
            });
        }

        return () => {
            Event.off(`${form.data.qu?.id}.reset`);
        };
    }, [form.data.qu]);

    useEffect(() => {
        if (isPriority()) {
            requestWaiting(false, 1);
        } else {
            requestWaiting(isPriorityIncluded, isPriority());
        }
    }, [isPriorityIncluded, form.data.priority]);

    useEffect(() => {
        getWaiting();
        eventsListener();

        return () => {
            Event.off(`${type.id}.set-qu`);
            Event.off(`${type.id}.waiting-list`);
            Echo.leave(`${type.id}.account-type`);
        };
    }, []);

    return (
        <>
            <Records accountType={type} form={form} />
            <div
                className={`${
                    isPriority()
                        ? "bg-gradient-to-tr from-pink-400 to-rose-300 text-white"
                        : "bg-gradient-to-tr from-purple-400 to-fuchsia-400 text-white"
                } p-3 mt-1 border border-slate-300 rounded-2xl shadow-lg shadow-slate-400/30`}
            >
                <div className="flex flex-col w-full">
                    <div>
                        <Qu
                            data={form.data.qu}
                            is_priority={isPriority()}
                            type={type}
                            totalPriorities={totalPriorities}
                        />
                    </div>
                    <div className="mt-3">
                        <Waiting
                            data={waiting}
                            isPriority={isPriority()}
                            isPriorityIncluded={isPriorityIncluded}
                            setIncludePriority={setIncludePriority}
                        />
                    </div>
                    <div className="mt-[12%] flex gap-2">
                        <div className="grow">
                            <NextButton
                                isPriority={isPriority}
                                label={submitLabel()}
                                submit={submit}
                                loading={loading}
                                enabled={isSubmitEnabled()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Component.propTypes = {
    type: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
};

export default Component;
