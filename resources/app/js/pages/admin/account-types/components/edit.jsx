import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useForm } from "@/js/helpers/form";
import FooterForm from "./form.footer";
import Event from "@/js/helpers/event";

export default ({ data, formats, ...props }) => {
    const { open, setOpen, form, closeForm, completed, setCompleted } = useForm(
        {
            method: "patch",
            route: route("admin.account-types.update", {
                type: data.id,
            }),
            data: {
                id: data.id,
                name: data.name,
                format: data.num_format_id ?? "",
                num_start: data.num_start ?? "",
                priority_format: data.priority_format_id ?? "",
            },
        },
    );

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
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

    useEffect(() => {
        if (completed) {
            setTimeout(() => {
                setCompleted(false);
            }, 2000);
        }
    }, [completed]);

    return (
        <>
            <div className="cursor" onClick={(e) => setOpen(true)}>
                <PencilSquareIcon className="h-5 text-slate-500" />
            </div>
            <Modal open={open}>
                <Title>Update</Title>
                <Form form={form} completed={completed} formats={formats} />
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
