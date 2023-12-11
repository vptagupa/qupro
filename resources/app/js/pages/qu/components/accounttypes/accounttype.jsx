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
        Echo.private(`${type.id}.account-type`).listen("QuCreated", (event) => {
            updateAccountTypeStat(type, event.qu.statistics);
        });

        return () => {
            Echo.leave(`${type.id}.account-type`);
        };
    }, []);
    return (
        <>
            <div className="flex flex-col text-sm mb-2">
                <div>Served: {type.statistics.served?.num_fulltext ?? "-"}</div>
                <div>Queue: {type.statistics?.queue ?? 0}</div>
            </div>
            <div>
                <PrimaryButton
                    type="button"
                    onClick={(e) => onClick(type)}
                    className={
                        "flex justify-center xs:h-[2rem] xs:w-[8rem] xs:text-[0.5rem]  lg:h-[7rem] lg:w-[10rem] lg:text-[0.9rem] text-center uppercase font-extrabold " +
                        selected(type)
                    }
                >
                    <span>{type.name}</span>
                </PrimaryButton>
            </div>
        </>
    );
});
