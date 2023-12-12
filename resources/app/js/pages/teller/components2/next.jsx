import { memo, useEffect } from "react";
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
    const qu = data[id]?.qu;
    const status = data[id]?.status;

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

    const enabled = () => {
        if (
            (priority && status?.has_next_priority) ||
            status?.has_next_regular
        ) {
            return true;
        }
        if (qu?.id) {
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

    const submit = (e) => {
        e.preventDefault();

        if (form.processing) return;

        form.submit({
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
    }, [qu]);

    useEffect(() => {
        Event.on(`${id}.set-priority`, (priority) => {
            form.setData("priority", priority ? "priority" : "regular");
        });

        return () => Event.off(`${id}.set-priority`);
    }, []);

    return (
        <>
            {form.hasErrors && (
                <div className="mb-2 danger text-xs p-1">
                    {JSON.stringify(form.errors)}
                </div>
            )}
            <Button
                type="button"
                className={`${
                    priority
                        ? "enabled:bg-gradient-to-r  from-pink-500 to-rose-500"
                        : "enabled:bg-gradient-to-r  from-purple-500 to-fuchsia-500"
                } flex items-center w-full justify-center h-[4rem] !text-[2.1rem] text-white text-center uppercase font-extrabold`}
                onClick={(e) => submit(e)}
                disabled={!enabled()}
            >
                {form.processing && (
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="h-6 mr-2 text-slate-500 animate-spin absolute"
                    />
                )}

                <span>{label()}</span>
            </Button>
        </>
    );
});
