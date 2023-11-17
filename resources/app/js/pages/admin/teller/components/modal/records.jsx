import { Modal, Title } from "@/js/components/modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Event from "@/js/helpers/event";
import { useState, useEffect, useCallback } from "react";
import Tab from "../tabs";
import { usePage } from "@inertiajs/react";
import { Switch } from "@/js/components/switch";

export default ({ accountType, form }) => {
    const { user } = usePage().props;
    const [open, setOpen] = useState(false);

    const closeFormHandler = () => {
        setOpen(false);
    };

    const cardSwitcherHandler = useCallback(() => {
        if (form.data.priority == "regular") {
            form.setData("priority", "priority");
        } else {
            form.setData("priority", "regular");
        }
    }, [form.data.priority]);

    const isPriorityCard = () => {
        return form.data.priority == "priority";
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
            <div className="flex justify-between items-center">
                <div
                    onClick={(e) => setOpen(true)}
                    className="uppercase font-bold text-sm text-center cursor-pointer hover:underline"
                >
                    {accountType.name}
                    {user.data.counter_name
                        ? " - " + user.data.counter_name
                        : ""}
                </div>
                <div>
                    <Switch
                        className="bg-gradient-to-tr from-pink-400 to-rose-300 text-white"
                        enabled={isPriorityCard()}
                        setEnabled={cardSwitcherHandler}
                        colorActive="bg-gradient-to-tr from-pink-400 to-rose-300"
                        colorInActive="bg-gradient-to-tr from-purple-400 to-fuchsia-400"
                    />
                </div>
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
                <Title>Serving Records</Title>
                <div className="min-h-[480px]">
                    <Tab accountType={accountType} />
                </div>
            </Modal>
        </>
    );
};
