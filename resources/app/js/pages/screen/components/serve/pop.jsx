import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";

export default memo(({ current, account_type }) => {
    const [open, setOpen] = useState(false);
    const {
        popover: { set: theme, open: forceOpen },
    } = useSelector((state) => state.themeCounter);

    useEffect(() => {
        if (current?.account_type_id) {
            setOpen(account_type?.id == current?.account_type_id);
        }
    }, [current]);

    let timeout;
    useEffect(() => {
        if (open && !forceOpen) {
            timeout = setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [open, forceOpen]);

    useEffect(() => {
        setOpen(forceOpen);
    }, [forceOpen]);

    return (
        (open || forceOpen) && (
            <div className="absolute h-1/2 w-screen top-[20%] z-10">
                <div className="flex items-center justify-center text-slate-300 uppercase">
                    <div
                        style={{
                            background: theme.bg,
                            color: theme.font,
                        }}
                        className="px-20 py-10 text-center bg-gradient-to-tl from-purple-800 to-fuchsia-800 rounded-3xl"
                    >
                        <div className="text-[8rem] leading-[8rem]">
                            <span>{current?.num_fulltext ?? "-"}</span>
                        </div>
                        <div className="text-[6rem] leading-[8rem]">
                            {current?.counter ?? "-"}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
});
