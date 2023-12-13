import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/js/components/buttons";
import { useForm } from "@/js/helpers/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { setQu } from "../reducer";
import Event from "@/js/helpers/event";

export default memo(function Component({ id = 0, url }) {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.teller);
    const priority = data[id]?.priority ?? false;
    const [recentTouch, setRecentTouch] = useState(priority);
    const qu = data[id]?.qu;
    const status = data[id]?.status;

    const style = (priority) =>
        priority
            ? "enabled:bg-gradient-to-r  from-pink-500 to-rose-500"
            : "enabled:bg-gradient-to-r  from-purple-500 to-fuchsia-500";

    const label = () => {
        if (qu?.id) {
            if (priority && status.has_next_priority) {
                return "Next";
            } else if (status.has_next_regular) {
                return "Next";
            }
            return "Done";
        }

        return "Start";
    };

    const enabled = (priorityForm) => {
        if (
            (priorityForm && status?.has_next_priority) ||
            (priority && status?.has_next_priority)
        ) {
            return true;
        }
        if (!priorityForm && status?.has_next_regular) {
            return true;
        }

        if (qu?.id) {
            if (!priority) {
                if (priorityForm && status?.has_next_regular) {
                    return false;
                }
                if (!priorityForm && status?.has_next_priority) {
                    return false;
                }

                return priorityForm && recentTouch;
            }

            return true;
        }

        return false;
    };

    const { form } = useForm({
        method: "post",
        route: url,
        data: {
            priority: "regular",
            account_type_id: id,
            qu,
        },
    });

    const { form: regularForm } = useForm({
        method: "post",
        route: url,
        data: {
            priority: "regular",
            account_type_id: id,
            qu,
        },
    });

    const { form: priorityForm } = useForm({
        method: "post",
        route: url,
        data: {
            priority: "priority",
            account_type_id: id,
            qu,
        },
    });

    const xform = (formPriority) => {
        let xform = form;
        if (!priority) xform = formPriority ? priorityForm : regularForm;

        return xform;
    };

    const submit = (e, formPriority) => {
        e.preventDefault();

        setRecentTouch(formPriority);

        const submission = xform(formPriority);

        if (submission.processing) return;

        submission.submit({
            only: ["errors", "qu", "waiting", "next"],
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                dispatch(
                    setQu({
                        id,
                        qu: page.props.next.data,
                    }),
                );
            },
        });
    };

    useEffect(() => {
        form.setData("qu", qu);
        regularForm.setData("qu", qu);
        priorityForm.setData("qu", qu);
    }, [qu]);

    useEffect(() => {
        Event.on(`${id}.set-priority`, (priority) => {
            form.setData("priority", priority ? "priority" : "regular");
        });

        return () => Event.off(`${id}.set-priority`);
    }, []);

    return (
        <>
            {xform(recentTouch).hasErrors && (
                <div className="mb-2 danger text-xs p-1">
                    {JSON.stringify(xform(recentTouch).errors)}
                </div>
            )}
            <div className="flex gap-x-2 items-center justify-center">
                {priority && (
                    <Button
                        type="button"
                        className={`${style(
                            true,
                        )} flex items-center grow w-full justify-center h-[4rem] !text-[2.1rem] text-white text-center uppercase font-extrabold`}
                        onClick={(e) => submit(e, false)}
                        disabled={!enabled(true)}
                    >
                        {xform(true).processing && (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="h-6 mr-2 text-slate-500 animate-spin absolute"
                            />
                        )}

                        <span>P</span>
                    </Button>
                )}
                {!priority && (
                    <>
                        <Button
                            type="button"
                            className={`${style(
                                true,
                            )} flex items-center w-1/2 justify-center h-[4rem] !text-[2.1rem] text-white text-center uppercase font-extrabold`}
                            onClick={(e) => submit(e, true)}
                            disabled={!enabled(true)}
                        >
                            {xform(true).processing && (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="h-6 mr-2 text-slate-500 animate-spin absolute"
                                />
                            )}

                            <span>P</span>
                        </Button>
                        <Button
                            type="button"
                            className={`${style(
                                false,
                            )} flex items-center w-1/2 justify-center h-[4rem] !text-[2.1rem] text-white text-center uppercase font-extrabold`}
                            onClick={(e) => submit(e, false)}
                            disabled={!enabled(false)}
                        >
                            {xform(false).processing && (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="h-6 mr-2 text-slate-500 animate-spin absolute"
                                />
                            )}

                            <span>R</span>
                        </Button>
                    </>
                )}
            </div>
        </>
    );
});
