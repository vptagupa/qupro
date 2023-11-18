import Body from "./body";
import { useEffect, useState, useCallback, memo, useContext } from "react";
import { CardContext } from "../../context/card";
import Event from "@/js/helpers/event";

export default memo(({ onWaitingUpdate }) => {
    const cardContext = useContext(CardContext);
    const [data, setData] = useState([]);
    const [isPriorityIncluded, setIncludePriority] = useState(true);

    const get = () => waiting(isPriorityIncluded, cardContext.isPriority());

    const waiting = useCallback((include_priority = null, priority = null) => {
        const data = async () => {
            const response = await axios.post(
                route("admin.qu.waiting", {
                    type: cardContext.accountType.id,
                }),
                {
                    include_priority,
                    priority,
                },
            );

            const data = response.data;

            setData(data.data.waiting);
            onWaitingUpdate.setHasNextPriority(data.meta.has_next_priority);
            onWaitingUpdate.setHasNextRegular(data.meta.has_next_regular);
            onWaitingUpdate.setTotal({
                priorities: data.data.total_priorities,
                regulars: data.data.total_regulars,
            });
        };
        data();
    }, []);

    useEffect(() => {
        get();

        Event.on(`${cardContext.accountType.id}.waiting-reload`, () => {
            get();
        });

        Echo.private(`${cardContext.accountType.id}.account-type`).listen(
            "QuCreated",
            (e) => {
                get();
            },
        );

        return () => {
            Event.off(`${cardContext.accountType.id}.waiting-reload`);
            Echo.leave(`${cardContext.accountType.id}.account-type`);
        };
    }, [isPriorityIncluded, cardContext.isPriority()]);

    console.log("Rendered waiting.");

    return (
        <Body
            isPriorityIncluded={isPriorityIncluded}
            data={data}
            isPriority={cardContext.isPriority()}
            setIncludePriority={setIncludePriority}
        />
    );
});
