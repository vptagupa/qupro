import Count from "./counts";
import Switch from "./switch";
import Qu from "./qu";
import Ticket from "./ticket";
import Next from "./next";
import Ding from "./ding";
import Settings from "./settings";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initial, setPageId } from "../reducer";

export default function Component({ url, accountType, page_id }) {
    const dispatch = useDispatch();
    const id = accountType.id;
    const { data } = useSelector((state) => state.teller);
    const priority = data[id]?.priority ?? false;
    const qu = data[id]?.qu;

    useEffect(() => {
        dispatch(initial(id));
        dispatch(setPageId(page_id));
    }, []);

    return (
        <div
            className={`p-2 transition-all ease-in-out delay-150 flex flex-col gap-2  text-white ${
                qu?.priority == true || priority
                    ? "bg-gradient-to-br from-amber-800 to-amber-400 text-white"
                    : "bg-gradient-to-br from-[#01257D] to-[#00539C] text-white"
            }`}
        >
            <div className="flex items-center">
                <div className="grow flex gap-x-1">
                    <Count id={id} />
                    <Ding id={id} />
                </div>
                <div className="w-[60%] text-center font-bold uppercase non-draggable">
                    <Settings accountType={accountType} />
                </div>
                <div className="w-[20%] flex gap-1 items-center justify-end text-end">
                    <div>
                        <Switch id={id} />
                    </div>
                </div>
            </div>
            <div className="flex gap-x-2 items-center justify-between">
                <div className="w-1/2 text-center">
                    <Qu id={id} />
                </div>
                <div className="w-1/2 flex flex-col gap-y-2 items-start justify-center">
                    <div className="grow flex items-center justify-center w-full text-center h-12">
                        <Ticket id={id} />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center text-center">
                        <Next id={id} url={url} />
                    </div>
                </div>
            </div>
        </div>
    );
}
