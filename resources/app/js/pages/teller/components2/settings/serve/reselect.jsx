import { CursorArrowRippleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Event from "@/js/helpers/event";
import { setQu } from "../../../reducer";
import { useDispatch } from "react-redux";

export default ({ item, accountType }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleReselect = async (qu) => {
        setLoading(true);
        await axios.patch(
            route("admin.qu.recalled", {
                id: qu.id,
            }),
        );
        Event.emit(`${accountType.id}.settings.status`, false);
        dispatch(
            setQu({
                id: accountType.id,
                qu,
            }),
        );
        setLoading(false);
    };

    return (
        <>
            <div
                className={`${
                    loading ? "animate-pulse" : ""
                } flex space-x-2 justify-end`}
            >
                <CursorArrowRippleIcon
                    className="h-5 cursor-pointer hover:text-green-400"
                    title="Re-select"
                    onClick={(e) => handleReselect(item)}
                />
            </div>
        </>
    );
};
