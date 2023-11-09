import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";

export default ({ data, ...props }) => {
    const [active, setActive] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useForm(
        "patch",
        route("admin.formats.update", { format: data.id }),
        {
            id: data.id,
            title: data.title,
            affix: data.affix ?? "",
            delimiter: data.delimiter ?? "",
            format: data.format,
            active: data?.active ?? false,
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
        setActive(false);
        form.reset();
    };

    useEffect(() => {
        if (submitted) {
            setTimeout(() => {
                setSubmit(false);
            }, 2000);
        }
    }, [submitted]);

    useEffect(() => {
        setActive(form.data.active);
    }, [open]);

    useEffect(() => {
        form.setData("active", active);
    }, [active]);

    return (
        <>
            <div className="cursor" onClick={(e) => setOpen(true)}>
                <PencilSquareIcon className="h-5 text-slate-500" />
            </div>
            <Modal open={open}>
                <Title>Update</Title>
                <Form
                    form={form}
                    submitted={submitted}
                    setActive={setActive}
                    active={active}
                />
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
