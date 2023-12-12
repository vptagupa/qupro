import { Switch } from "@/js/components/switch";
import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriority, setQu } from "../reducer";
import Event from "@/js/helpers/event";

export default memo(function Component({ id = 0 }) {
    const { data } = useSelector((state) => state.teller);
    const priority = data[id]?.priority ?? false;
    const dispatch = useDispatch();
    const onChange = (priority) => {
        dispatch(
            setPriority({
                id,
                priority,
            }),
        );
        dispatch(
            setQu({
                id,
                qu: null,
            }),
        );
        Event.emit(`${id}.set-priority`, priority);
    };

    return (
        <>
            <Switch
                className="bg-gradient-to-tr from-pink-400 to-rose-300 text-white"
                enabled={priority}
                setEnabled={onChange}
                colorActive="bg-gradient-to-tr from-pink-400 to-rose-300"
                colorInActive="bg-gradient-to-tr from-purple-400 to-fuchsia-400"
            />
        </>
    );
});
