import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";
import { useForm } from "@/js/helpers/form";

export default (props) => {
    const { open, setOpen, form, closeForm, completed, setCompleted } = useForm(
        {
            method: "post",
            route: route("admin.users.store"),
            data: {
                name: "",
                email: "",
                role: "",
                password: "",
                nickname: "",
                default_checked_password: true,
            },
        },
    );

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                setCompleted(true);
                Event.emit("reload");
                closeForm();
            },
        });
    };

    useEffect(() => {
        if (completed) {
            setTimeout(() => {
                setCompleted(false);
            }, 2000);
        }
    }, [completed]);

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
                <Form form={form} roles={props.roles} completed={completed} />
                <Footer>
                    <FooterForm
                        form={form}
                        closeForm={closeForm}
                        submit={submit}
                    />
                </Footer>
            </Modal>
        </>
    );
};
