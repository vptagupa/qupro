import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";

export default (props) => {
    const [active, setActive] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useForm("post", route("admin.formats.store"), {
        title: "",
        affix: "",
        delimiter: "",
        format: "{series}",
        active: false,
    });

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                setSubmit(true);
                setActive(false);
                Event.emit("reload");
                form.reset();
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
        form.setData("active", active);
    }, [active]);

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
