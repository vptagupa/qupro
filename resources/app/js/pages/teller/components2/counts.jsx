import { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNextStatus } from "../reducer";
import { getWaitingList } from "../components/requests";

export default memo(function Component({ id = 0 }) {
    const dispatch = useDispatch();
    const includePriority = true;
    const [counts, setCounts] = useState({
        regular: 0,
        priority: 0,
    });
    const { data } = useSelector((state) => state.teller);
    const priority = data[id]?.priority ?? false;

    const waiting = async () => {
        const response = await getWaitingList(id, includePriority, priority);
        const data = response.data;

        setCounts({
            priority: data.data.total_priorities,
            regular: data.data.total_regulars,
        });

        dispatch(
            setNextStatus({
                id,
                has_next_priority: data.meta.has_next_priority,
                has_next_regular: data.meta.has_next_regular,
            }),
        );
    };

    useEffect(() => {
        Echo.private(`${id}.account-type`)
            .listen("QuCreated", (e) => {
                waiting();
            })
            .listen("QuCalled", (e) => {
                waiting();
            });

        return () => {
            Echo.leave(`${id}.account-type`);
        };
    }, [id, priority]);

    useEffect(() => {
        waiting();
    }, []);

    return (
        <>
            <div className="flex items-center justify-start gap-1 text-xs">
                <div>
                    <div
                        className="flex items-center justify-center font-bold rounded-lg w-10 h-4 p-0 text-center bg-slate-200 text-slate-600"
                        title="Regular Totals"
                    >
                        {counts?.regular ?? 0}
                    </div>
                </div>
                <div>
                    <div
                        className="flex items-center justify-center font-bold rounded-lg w-10 h-4 p-0 text-center bg-rose-400 text-white"
                        title="Priority Totals"
                    >
                        {counts?.priority ?? 0}
                    </div>
                </div>
            </div>
        </>
    );
});
