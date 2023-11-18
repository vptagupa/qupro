import { Modal, Title } from "@/js/components/modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Event from "@/js/helpers/event";
import Tab from "../tabs";
import { usePage } from "@inertiajs/react";
import { Switch } from "@/js/components/switch";
import { CardContext } from "../context/card";
import { useState, useEffect, memo, useContext } from "react";

export default memo(() => {
    const { user } = usePage().props;
    const [open, setOpen] = useState(false);
    const cardContext = useContext(CardContext);

    /* 
        This will listen to events for closing the modal form
        References
        Re-selecting Qu
    */
    useEffect(() => {
        Event.on(`${cardContext.accountType.id}.modal.records.show`, (show) => {
            setOpen(show);
        });

        return () => {
            Event.off(`${cardContext.accountType.id}.modal.records.show`);
        };
    }, []);

    return (
        <>
            <div className="flex justify-between items-center">
                <div
                    onClick={(e) => setOpen(true)}
                    className="uppercase font-bold text-sm text-center cursor-pointer hover:underline"
                >
                    {cardContext.accountType.name}
                    {user.data.counter_name
                        ? " - " + user.data.counter_name
                        : ""}
                </div>
                <div>
                    <Switch
                        className="bg-gradient-to-tr from-pink-400 to-rose-300 text-white"
                        enabled={cardContext.isPriority()}
                        setEnabled={(e) => cardContext.onPriorityChange()}
                        colorActive="bg-gradient-to-tr from-pink-400 to-rose-300"
                        colorInActive="bg-gradient-to-tr from-purple-400 to-fuchsia-400"
                    />
                </div>
            </div>

            <Modal open={open}>
                <div className="relative">
                    <div
                        className="absolute cursor-pointer -right-2 -top-2 p-2 rounded-full bg-rose-300 text-white hover:bg-rose-500 hover:text-white"
                        onClick={(e) => setOpen(false)}
                    >
                        <XMarkIcon className="h-4" title="Close Form" />
                    </div>
                </div>
                <Title>Serving Records</Title>
                <div className="min-h-[480px]">
                    <Tab accountType={cardContext.accountType} />
                </div>
            </Modal>
        </>
    );
});
