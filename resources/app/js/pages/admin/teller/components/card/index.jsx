import NextButton from "../buttons/next";
import SkipButton from "../buttons/skip";
import Qu from "../qu";
import Priority from "../priority";
import Waiting from "../waiting";
import PropTypes from "prop-types";
import { useForm } from "@/js/helpers/form";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const Component = ({ type }) => {
    const [qu, setQu] = useState(null);
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
            qu,
        },
    });

    const submit = () => {
        if (waiting.length > 0) {
            form.submit({
                only: ["errors", "qu", "waiting", "next"],
                preserveState: true,
                preserveScroll: true,
                onBefore: () => setLoading(true),
                onSuccess: (page) => {
                    setQu(page.props.next.data);
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

    const enableSubmit = () => {
        if (form.data.priority == "regular" && hasNextRegular) {
            return true;
        } else if (form.data.priority == "priority" && hasNextPriority) {
            return true;
        }

        return false;
    };

    useEffect(() => {
        getWaiting();
    }, []);

    return (
        <>
            <div className="p-5 border border-slate-300 rounded-2xl shadow-lg shadow-slate-400/30">
                <div className="relative">
                    <div className="absolute -mt-8 -right-8 ">
                        <Priority form={form} />
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div>
                        <Qu data={qu} />
                    </div>
                    <div className="mt-3">
                        <Waiting data={waiting} />
                    </div>
                    <div className="mt-[12%] flex gap-2">
                        <div>
                            <SkipButton />
                        </div>
                        <div className="grow">
                            <NextButton
                                label={!qu ? "Start" : "Next"}
                                setQu={setQu}
                                submit={submit}
                                loading={loading}
                                enabled={enableSubmit()}
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
