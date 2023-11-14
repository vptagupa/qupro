import NextButton from "../buttons/next";
import Qu from "../qu";
import Priority from "../priority";
import Waiting from "../waiting";
import PropTypes from "prop-types";
import { useForm } from "@/js/helpers/form";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Event from "@/js/helpers/event";

const Component = ({ type }) => {
    const [waiting, setWaiting] = useState([]);
    const [hasNextPriority, setHasNextPriority] = useState(false);
    const [hasNextRegular, setHasNextRegular] = useState(false);
    const [loading, setLoading] = useState(false);
    const { form } = useForm({
        method: "post",
        route: route("admin.tellers.next"),
        data: {
            priority: "regular",
            account_type: type,
            qu: null,
        },
    });

    const hasQu = () => (form.data.qu?.id ? true : false);

    const submit = () => {
        if (isSubmitEnabled()) {
            form.submit({
                only: ["errors", "qu", "waiting", "next"],
                preserveState: true,
                preserveScroll: true,
                onBefore: () => setLoading(true),
                onSuccess: (page) => {
                    eventResetAllCardsQu(form.data.qu);
                    form.setData("qu", page.props.next.data);
                    setWaiting(
                        page.props.next.data?.account_type?.waiting ?? [],
                    );
                    setHasNextPriority(page.props.next.meta.has_next_priority);
                    setHasNextRegular(page.props.next.meta.has_next_regular);
                    setLoading(false);
                },
                onError: () => setLoading(false),
                onFinal: () => setLoading(false),
            });
        }
    };

    const getWaiting = useCallback(() => {
        const qus = async () => {
            const response = await axios.get(
                route("admin.qu.waiting", {
                    type: type.id,
                }),
            );

            setWaiting(response.data.data);
            setHasNextPriority(response.data.meta.has_next_priority);
            setHasNextRegular(response.data.meta.has_next_regular);
        };
        qus();
    }, []);

    const isSubmitEnabled = () => {
        if (form.data.priority == "regular" && hasNextRegular) {
            return true;
        } else if (form.data.priority == "priority" && hasNextPriority) {
            return true;
        }

        if (hasQu()) return true;

        return false;
    };

    const eventResetAllCardsQu = (qu) => {
        Event.emit(`${qu.id}.reset`);
    };

    const events = useCallback(() => {
        Event.on(`${type.id}.set-qu`, (qu) => {
            form.setData("qu", qu);
        });
        Event.on(`${type.id}.waiting-list`, (qu) => {
            getWaiting();
        });
    }, []);

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

    const isPriority = useCallback(() => {
        return form.data.priority == "priority";
    }, [form.data.priority]);

    useEffect(() => {
        getWaiting();
        events();

        return () => {
            Event.off(`${type.id}.set-qu`);
            Event.off(`${type.id}.waiting-list`);
        };
    }, []);

    return (
        <>
            <div
                className={`${
                    isPriority()
                        ? "bg-gradient-to-tr from-pink-400 to-rose-300 text-white"
                        : "bg-gradient-to-tr from-purple-400 to-fuchsia-400 text-white"
                } p-5 border border-slate-300 rounded-2xl shadow-lg shadow-slate-400/30`}
            >
                <div className="relative">
                    <div className="absolute -mt-8 -right-8 ">
                        <Priority form={form} />
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div>
                        <Qu data={form.data.qu} isPriority={isPriority} />
                    </div>
                    <div className="mt-3">
                        <Waiting data={waiting} />
                    </div>
                    <div className="mt-[12%] flex gap-2">
                        <div className="grow">
                            <NextButton
                                isPriority={isPriority}
                                label={!hasQu() ? "Start" : "Next"}
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
