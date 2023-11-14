import { Modal, Title } from "@/js/components/modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Event from "@/js/helpers/event";
import { useState, useEffect } from "react";
import Tab from "../tabs";
import { usePage } from "@inertiajs/react";

export default ({ accountType }) => {
    const { user } = usePage().props;
    const [open, setOpen] = useState(false);

    const closeFormHandler = () => {
        setOpen(false);
    };

    useEffect(() => {
        Event.on(`${accountType.id}.modal.records.show`, (show) => {
            setOpen(show);
        });

        return () => {
            Event.off(`${accountType.id}.modal.records.show`);
        };
    }, []);

    return (
        <>
            <div
                onClick={(e) => setOpen(true)}
                className="uppercase font-extrabold text-center cursor-pointer hover:underline"
            >
                {accountType.name} - {user.data.teller_name}
            </div>

            <Modal open={open}>
                <div className="relative">
                    <div
                        className="absolute cursor-pointer -right-2 -top-2 p-2 rounded-full bg-rose-300 text-white hover:bg-rose-500 hover:text-white"
                        onClick={(e) => closeFormHandler()}
                    >
                        <XMarkIcon className="h-4" title="Close Form" />
                    </div>
                </div>
                <Title>{accountType.name} Records</Title>
                <div className="min-h-[480px]">
                    <Tab accountType={accountType} />
                </div>
            </Modal>
        </>
    );
};
