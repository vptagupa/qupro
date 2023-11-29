import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useForm } from "@/js/helpers/form";
import FooterForm from "../components/form.footer";
import Event from "@/js/helpers/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default ({ data, formats, ...props }) => {
    const { open, setOpen, form, closeForm, completed, setCompleted } = useForm(
        {
            method: "post",
            route: route("admin.account-types.update", {
                type: data.id,
            }),
            data: {
                id: data.id,
                name: data.name,
                num_format_id: data.num_format_id ?? "",
                num_start: data.num_start ?? "",
                priority_format_id: data.priority_format_id ?? "",
                file: data?.file ?? "",
            },
        },
    );

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            only: ["errors"],
            forceFormData: true,
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
                <FontAwesomeIcon
                    className="h-4 text-teal-500"
                    icon={faPenToSquare}
                />
            </div>
            <Modal open={open}>
                <Title>Update</Title>
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
};
