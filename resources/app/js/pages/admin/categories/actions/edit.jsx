import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { useForm } from "@/js/helpers/form";
import FooterForm from "../components/form.footer";
import Event from "@/js/helpers/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default ({ data, ...props }) => {
    const { open, setOpen, form, closeForm } = useForm({
        method: "post",
        route: route("admin.categories.update", {
            category: data.id,
        }),
        data: {
            id: data.id,
            name: data.name,
            description: data.description ?? "",
        },
    });

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            only: ["errors"],
            onSuccess: () => {
                Event.emit("reload");
                form.clearErrors();
                setTimeout(() => {
                    setOpen(false);
                }, 1000);
            },
        });
    };

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
};
