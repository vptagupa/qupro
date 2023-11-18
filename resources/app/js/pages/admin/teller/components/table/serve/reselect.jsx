import { CursorArrowRippleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Event from "@/js/helpers/event";
import { useContext } from "react";
import { AccountTypeContext } from "../../context/card";

export default ({ item }) => {
    const accountType = useContext(AccountTypeContext);
    const [loading, setLoading] = useState(false);
    const handleReselect = (qu) => {
        setLoading(true);

        axios
            .patch(
                route("admin.qu.recalled", {
                    id: qu.id,
                }),
            )
            .then((response) => {
                Event.emit(`${accountType.id}.set-qu`, qu);
                Event.emit(`${accountType.id}.modal.records.show`, false);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
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
