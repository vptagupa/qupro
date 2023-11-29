import { useState, useEffect, memo } from "react";

export default memo(({ current, account_type }) => {
    const [openPop, setPop] = useState(false);

    useEffect(() => {
        if (current.account_type?.id) {
            setPop(account_type?.id == current.account_type?.id);
        }
    }, [current]);

    let openPopTimeout;
    useEffect(() => {
        if (openPop) {
            openPopTimeout = setTimeout(() => {
                setPop(false);
            }, 3000);
        }
        return () => clearTimeout(openPopTimeout);
    }, [openPop]);

    return (
        openPop && (
            <div className="absolute h-1/2 w-screen top-[20%]">
                <div className="flex items-center justify-center text-slate-300 uppercase">
                    <div className="px-20 py-10 text-center bg-gradient-to-tl from-purple-800 to-fuchsia-800 rounded-3xl">
                        <div className="text-[8rem] leading-[8rem]">
                            <span>{current?.num_fulltext ?? "-"}</span>
                        </div>
                        <div className="text-[6rem] leading-[8rem]">
                            {(current.account_type?.name ?? "-") +
                                " " +
                                (current?.counter_name ?? "-")}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
});
