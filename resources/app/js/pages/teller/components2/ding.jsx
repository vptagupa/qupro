import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default memo(function Component({ id = 0 }) {
    const [processing, setProcessing] = useState(false);
    const { data } = useSelector((state) => state.teller);
    const qu = data[id]?.qu;

    const ding = async () => {
        if (processing) return false;

        setProcessing(true);
        try {
            await axios.get(
                route("tellers.ding", {
                    accountTypeId: id,
                }),
            );
        } catch (e) {}

        setProcessing(false);
    };

    return (
        <>
            <FontAwesomeIcon
                title="On Demand Ring"
                onClick={(e) => ding()}
                icon={faBell}
                className={`h-6 text-yellow-400 hover:text-yellow-200 cursor-pointer non-draggable ${
                    processing ? "animate-bounce" : ""
                }`}
            />
        </>
    );
});
