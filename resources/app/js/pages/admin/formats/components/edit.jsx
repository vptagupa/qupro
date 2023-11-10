import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm } from "@/js/helpers/form";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";

export default ({ data, ...props }) => {
    const [active, setActive] = useState(false);
    const { open, setOpen, form, closeForm, completed, setCompleted } = useForm(
        {
            method: "patch",
            route: route("admin.formats.update", {
                format: data.id,
            }),
            data: {
                id: data.id,
                title: data.title,
                affix: data.affix ?? "",
                delimiter: data.delimiter ?? "",
                format: data.format,
                active: data?.active ?? false,
            },
        },
    );

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            only: ["errors"],
            onSuccess: () => {
                Event.emit("reload");
                setCompleted(true);
                form.clearErrors();
                setTimeout(() => {
                    setOpen(false);
                }, 1000);
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
