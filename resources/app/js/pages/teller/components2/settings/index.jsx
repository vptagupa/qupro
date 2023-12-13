import { Modal, Title } from "@/js/components/modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { usePage } from "@inertiajs/react";
import { useState, memo, useEffect } from "react";
import Tabs from "./tabs";
import Event from "@/js/helpers/event";

export default memo(({ accountType }) => {
    const { user } = usePage().props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        Event.on(`${accountType.id}.settings.status`, (status) => {
            setOpen(status);
        });

        return () => Event.off(`${accountType.id}.settings.status`);
    }, []);

    return (
        <>
            <div className="flex justify-center items-center">
                <div
                    onClick={(e) => setOpen(true)}
                    className="uppercase font-bold text-sm text-center cursor-pointer hover:underline"
                >
                    {accountType?.name + " - " + user.data.counter_name}
                </div>
            </div>

            <Modal open={open} className="!p-0 xs:w-[90%] xs:max-w-lg bg-white">
                <div className="relative">
                    <div
                        className="absolute cursor-pointer -right-3 -top-3 p-2 rounded-full bg-rose-300 text-white hover:bg-rose-500 hover:text-white"
                        onClick={(e) => setOpen(false)}
                    >
                        <XMarkIcon className="h-4" title="Close Form" />
                    </div>
                </div>
                <div>
                    <Tabs accountType={accountType} />
                </div>
            </Modal>
        </>
    );
});
