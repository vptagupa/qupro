import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { useForm } from "@/js/helpers/form";
import FooterForm from "../components/form.footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default ({ data, formats, ...props }) => {
    const { open, setOpen, form, closeForm } = useForm({
        method: "post",
        route: route("admin.setup.account-types.update", {
            type: data.id,
        }),
        data: {
            id: data.id,
            name: data.name,
            num_format_id: data.num_format_id ?? "",
            num_start: data.num_start ?? "",
            priority_format_id: data.priority_format_id ?? "",
            file: data?.file ?? "",
            categories: data?.categories ?? [],
        },
    });

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: false,
            only: ["errors"],
            forceFormData: true,
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
