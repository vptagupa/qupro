import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";

export default memo(({ current, account_type_id }) => {
    const [open, setOpen] = useState(false);
    const [opener, setOpener] = useState(false);
    const { param } = useSelector((state) => state.counter);
    const {
        popover: { set: theme, open: forceOpen },
    } = useSelector((state) => state.themeCounter);

    useEffect(() => {
        if (
            current?.account_type_id &&
            param.account_type_id &&
            !param.category_id
        ) {
            setOpener((open) =>
                param.account_type_id == current?.account_type_id
                    ? !opener
                    : opener,
            );
        }
        if (current?.category_id && param.category_id) {
            setOpener((open) =>
                param.category_id == current?.category_id ? !opener : opener,
            );
        }
    }, [current, param]);

    var timeout;
    useEffect(() => {
        clearTimeout(timeout);

        setOpen(true);

        timeout = setTimeout(() => {
            setOpen(false);
        }, 10000);
    }, [opener]);

    useEffect(() => {
        setOpener(!opener);
    }, [forceOpen]);

    return (
        open && (
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
