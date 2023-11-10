import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";
import { useForm } from "@/js/helpers/form";

export default (props) => {
    const [active, setActive] = useState(false);
    const { open, setOpen, form, closeForm, completed, setCompleted } = useForm(
        {
            method: "post",
            route: route("admin.formats.store"),
            data: {
                title: "",
                affix: "",
                delimiter: "",
                format: "{series}",
                active: false,
            },
        },
    );

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            only: ["errors"],
            onSuccess: () => {
                setCompleted(true);
                setActive(false);
                Event.emit("reload");
                form.reset();
            },
        });
    };

    const closeFormHandler = () => {
        closeForm();
        setActive(false);
    };

    useEffect(() => {
        if (completed) {
            setTimeout(() => {
                setCompleted(false);
            }, 2000);
        }
    }, [completed]);

    useEffect(() => {
        form.setData("active", active);
    }, [active]);

    return (
        <>
            <Button
                onClick={(e) => setOpen(true)}
                className="space-x-1 bg-none shadow-none text-purple-500 font-bold btn-sm"
            >
                <PlusIcon className="h-4" />
                <span>Add New</span>
            </Button>
            <Modal open={open}>
                <Title>Add New</Title>
                <Form
                    form={form}
                    completed={completed}
                    setActive={setActive}
                    active={active}
                />
                <Footer>
                    <FooterForm
                        form={form}
                        closeForm={closeFormHandler}
                        submit={submit}
                    />
                </Footer>
            </Modal>
        </>
    );
};
