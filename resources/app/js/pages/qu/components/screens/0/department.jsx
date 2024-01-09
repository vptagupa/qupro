import { useEffect, useState } from "react";
import { PrimaryButton } from "@/js/components/buttons";

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

    return (
        <PrimaryButton
            type="button"
            className={`flex flex-col justify-center w-full text-[2rem] text-center uppercase font-extrabold ${
                controls.form.data.account_type.id == data.id
                    ? "!bg-teal-400"
                    : ""
            }`}
            onClick={(e) => {
                controls.form.setData("account_type", data);
                next();
            }}
        >
            <div className="grow flex items-center text-2xl  leading-8 h-20">
                {data.name}
            </div>
            <div className="w-full bg-slate-500 rounded-lg p-2 flex flex-col items-start justify-center text-xs">
                <div className="flex justify-between w-full">
                    <span>Now Serving:</span>
                    <span>{data.statistics.served?.num_fulltext ?? "-"}</span>
                </div>
                <div className="flex justify-between w-full">
                    <span>Queue:</span>
                    <span>{data.statistics?.queue ?? 0}</span>
                </div>
            </div>
        </PrimaryButton>
    );
}
