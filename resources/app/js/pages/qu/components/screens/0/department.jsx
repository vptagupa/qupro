import { useEffect, useState } from "react";
import { Button } from "@/js/components/buttons";
import style from "../../style";

export default function Component({ next, value, controls }) {
    const [data, setData] = useState(value);

    useEffect(() => {
        Echo.channel(`${data.id}.account-type`)
            .listen("QuCreated", (event) => {
                setData({
                    ...data,
                    statistics: event.statistics,
                });
            })
            .listen("QuCalled", (event) => {
                setData({
                    ...data,
                    statistics: event.statistics,
                });
            });

        return () => {
            Echo.leave(`${data.id}.account-type`);
        };
    }, []);

    useEffect(() => {
        setData({
            ...value,
            statistics: value.statistics,
        });
    }, [value]);

    return (
        <Button
            type="button"
            className={`flex flex-col justify-center !shadow-sm transition duration-700 ease-in-out w-full text-[2rem] text-center uppercase font-extrabold ${
                controls.form.data.account_type.id == data.id
                    ? "!bg-amber-500"
                    : ""
            } hover:bg-amber-500 hover:text-black/80 bg-slate-300 text-black/80`}
            onClick={(e) => {
                controls.form.setData("account_type", data);
                next();
            }}
        >
            <div className="grow flex items-center text-2xl  leading-8 h-20">
                {data.name}
            </div>
            <div
                className={`w-full bg-[#00539C] text-slate-100 rounded-lg p-2 flex flex-col items-start justify-center text-xs`}
            >
                <div className="flex justify-between w-full">
                    <span>Now Serving:</span>
                    <span>{data.statistics.served?.num_fulltext ?? "-"}</span>
                </div>
                <div className="flex justify-between w-full">
                    <span>Queue:</span>
                    <span>{data.statistics?.queue ?? 0}</span>
                </div>
            </div>
        </Button>
    );
}
