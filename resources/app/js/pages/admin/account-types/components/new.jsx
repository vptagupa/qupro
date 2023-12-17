import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useCallback, memo } from "react";
import { useForm } from "@/js/helpers/form";
import FooterForm from "./form.footer";
import Event from "@/js/helpers/event";

export default memo(({ formats, ...props }) => {
    const {
        open,
        setOpen,
        form,
        closeForm,
        clearForm,
        completed,
        setCompleted,
    } = useForm({
        method: "post",
        route: route("admin.setup.account-types.store"),
        data: {
            name: "",
            num_format_id: "",
            num_start: "",
            priority_format_id: "",
            file: "",
            categories: [],
        },
    });

    const submit = () => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            only: ["errors"],
            onSuccess: () => {
                clearForm();
                Event.emit("reload");
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

                <Form form={form} formats={formats} />

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
});
