import Count from "./counts";
import Switch from "./switch";
import Qu from "./qu";
import Ticket from "./ticket";
import Next from "./next";
import Settings from "./settings";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initial } from "../reducer";
import { router, usePage } from "@inertiajs/react";

export default function Component({ url, accountType }) {
    const { user } = usePage().props;
    const dispatch = useDispatch();
    const id = accountType.id;
    const { data } = useSelector((state) => state.teller);
    const priority = data[id]?.priority ?? false;

    useEffect(() => {
        dispatch(initial(id));
    }, []);

    return (
        <div
            className={`p-2 flex flex-col gap-2  text-white ${
                priority
                    ? "bg-gradient-to-tr from-pink-400 to-rose-300 text-white"
                    : "bg-gradient-to-tr from-purple-400 to-fuchsia-400 text-white"
            }`}
        >
            <div className="flex items-center">
                <div className="w-[20%]">
                    <Count id={id} />
                </div>
                <div className="w-[60%] text-center font-bold uppercase">
                    {accountType.name} - {user.data.counter_name}
                </div>
                <div className="w-[20%] flex gap-1 items-center justify-end text-end">
                    <div>
                        <Switch id={id} />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="w-1/2 text-center">
                    <Qu id={id} />
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="w-full text-center">
                        <Ticket id={id} />
                    </div>
                    <div className="w-full flex justify-center items-center text-center">
                        <Next id={id} url={url} />
                    </div>
                </div>
            </div>
        </div>
    );
}
