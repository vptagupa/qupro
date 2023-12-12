import { memo } from "react";
import { useSelector } from "react-redux";

export default memo(function Component({ id = 0 }) {
    const { data } = useSelector((state) => state.teller);
    const qu = data[id]?.qu;

    return (
        <>
            <div className="font-bold text-[2.5rem] uppercase">
                {qu?.num_fulltext ?? "-"}
            </div>
        </>
    );
});
