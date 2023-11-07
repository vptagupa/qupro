import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";

export default (props) => {
    const [submitted, setSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useForm("post", route("admin.users.store"), {
        name: "",
        email: "",
        role: "",
        password: "",
        nickname: "",
        default_checked_password: true,
    });

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                setSubmit(true);
                Event.emit("reload");
                form.reset();
            },
        });
    };

    const closeForm = () => {
        if (form.processing) return;

        setOpen(false);
        form.reset();
    };

    useEffect(() => {
        if (submitted) {
            setTimeout(() => {
                setSubmit(false);
            }, 2000);
        }
    }, [submitted]);

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
                <Form form={form} roles={props.roles} submitted={submitted} />
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
