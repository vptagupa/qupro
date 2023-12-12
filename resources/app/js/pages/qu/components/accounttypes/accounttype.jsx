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
            <div className="flex flex-col text-sm mb-2"></div>
            <div>
                <PrimaryButton
                    type="button"
                    onClick={(e) => onClick(type)}
                    className={
                        "flex justify-center xs:w-[8rem] xs:text-[0.5rem]  lg:min-h-[10rem] lg:w-[15rem] lg:text-[2rem] text-center uppercase font-extrabold " +
                        selected(type)
                    }
                >
                    <div className="flex flex-col gap-y-2">
                        <div className="leading-8">{type.name}</div>
                        <div className="flex flex-col items-start justify-center text-xs">
                            <div>
                                Current:{" "}
                                {type.statistics.served?.num_fulltext ?? "-"}
                            </div>
                            <div>Queue: {type.statistics?.queue ?? 0}</div>
                        </div>
                    </div>
                </PrimaryButton>
            </div>
        </>
    );
});
