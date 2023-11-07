import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button, PrimaryButton } from "@/js/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm } from "laravel-precognition-react-inertia";

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
            onSuccess: () => {
                setSubmit(true);
                form.reset();
            },
        });
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
                <Title>Add New User</Title>
                <Form form={form} roles={props.roles} submitted={submitted} />
                <Footer>
                    <div className="flex space-x-2 justify-end">
                        <Button onClick={(e) => setOpen(false)}>Cancel</Button>
                        <PrimaryButton onClick={(e) => submit()}>
                            Submit
                        </PrimaryButton>
                    </div>
                </Footer>
            </Modal>
        </>
    );
};
