import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button, PrimaryButton } from "@/js/components/buttons";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import Event from "@/js/helpers/event";

export default ({ user, ...props }) => {
    const [submitted, setSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useForm(
        "patch",
        route("admin.users.update", { user: user.id }),
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            nickname: user.nickname ?? "",
            default_checked_password: true,
        },
    );

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                Event.emit("reload");
                setSubmit(true);
                form.reset();
                setTimeout(() => {
                    setOpen(false);
                }, 1000);
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
            <div className="cursor" onClick={(e) => setOpen(true)}>
                <PencilSquareIcon className="h-5 text-slate-500" />
            </div>
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
