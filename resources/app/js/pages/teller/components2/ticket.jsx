import { memo, useState } from "react";
import { useSelector } from "react-redux";

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
                    qu: qu?.id ?? 0,
                }),
            );
        } catch (e) {}

        setProcessing(false);
    };

    return (
        <>
            <div
                className="font-bold text-[2.5rem] uppercase cursor-pointer"
                onClick={(e) => ding()}
            >
                {qu?.num_fulltext ?? "-"}
            </div>
        </>
    );
});
