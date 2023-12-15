import { useEffect, memo } from "react";
import { PrimaryButton } from "@/js/components/buttons";

export default memo(function Component({ form, type, updateAccountTypeStat }) {
    const onClick = (type) => {
        if (form.data.account_type.id != type.id) {
            form.setData("account_type", type);
        } else {
            form.setData("account_type", "");
        }
    };

    const selected = (type) => {
        if (form.data.account_type != "") {
            if (form.data.account_type.id == type.id) {
                return "!bg-teal-400";
            }
        }

        return "";
    };

    useEffect(() => {
        Echo.channel(`${type.id}.account-type`)
            .listen("QuCreated", (event) => {
                updateAccountTypeStat(type, event.qu.statistics);
            })
            .listen("QuCalled", (event) => {
                updateAccountTypeStat(type, event.qu.statistics);
            });

        return () => {
            Echo.leave(`${type.id}.account-type`);
        };
    }, []);
    return (
        <>
            <PrimaryButton
                type="button"
                onClick={(e) => onClick(type)}
                className={
                    "flex flex-col justify-center w-full text-[2rem] text-center uppercase font-extrabold " +
                    selected(type)
                }
            >
                <div className="grow flex items-center text-2xl leading-8 h-20">
                    {type.name}
                </div>
                <div className="w-full bg-slate-500 rounded-lg p-2 flex flex-col items-start justify-center text-xs">
                    <div className="flex justify-between w-full">
                        <span>Now Serving:</span>
                        <span>
                            {type.statistics.served?.num_fulltext ?? "-"}
                        </span>
                    </div>
                    <div className="flex justify-between w-full">
                        <span>Queue:</span>
                        <span>{type.statistics?.queue ?? 0}</span>
                    </div>
                </div>
            </PrimaryButton>
        </>
    );
});
