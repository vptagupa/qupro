import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";

export default ({ data, formats, ...props }) => {
    const [submitted, setSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useForm(
        "patch",
        route("admin.account-types.update", { type: data.id }),
        {
            id: data.id,
            name: data.name,
            format: data.format_id ?? "",
            num_start: data.num_start ?? "",
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
            <div className="cursor" onClick={(e) => setOpen(true)}>
                <PencilSquareIcon className="h-5 text-slate-500" />
            </div>
            <Modal open={open}>
                <Title>Update</Title>
                <Form form={form} submitted={submitted} formats={formats} />
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
