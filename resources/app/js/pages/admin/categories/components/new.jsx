import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useCallback, memo } from "react";
import { useForm } from "@/js/helpers/form";
import FooterForm from "./form.footer";
import Event from "@/js/helpers/event";

export default memo((props) => {
    const { open, setOpen, form, closeForm, clearForm } = useForm({
        method: "post",
        route: route("admin.setup.categories.store"),
        data: {
            name: "",
            description: "",
            file: "",
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

                <Form form={form} />

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
