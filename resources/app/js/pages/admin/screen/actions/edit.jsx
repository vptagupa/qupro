import Form from "../components/form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import Event from "@/js/helpers/event";
import FooterForm from "../components/form.footer";
import { useForm } from "@/js/helpers/form";
import { useAccountTypes } from "@/js/helpers/accounttypes";

export default ({ data }) => {
    const {
        data: accountTypes,
        checkArray: accountTypesCheck,
        setData: setAccountTypes,
    } = useAccountTypes();
    const { open, setOpen, form, closeForm } = useForm({
        method: "patch",
        route: route("admin.setup.screen.update", {
            screen: data.id,
        }),
        data: {
            id: data.id,
            screen: data.screen,
            account_types: data.account_types,
            name: data.name,
        },
    });

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                Event.emit("screen.reload");
                form.clearErrors();
                setTimeout(() => {
                    setOpen(false);
                }, 1000);
            },
        });
    };

    useEffect(() => {
        setAccountTypes(
            accountTypes.map((type) => {
                type.checked = false;
                if (data.account_type_ids.includes(type.id)) {
                    type.checked = true;
                }

                return type;
            }),
        );
    }, [open]);

    useEffect(() => {
        form.setData(
            "account_types",
            accountTypes.filter((type) => type.checked),
        );
    }, [accountTypes]);

    return (
        <>
            <div className="cursor" onClick={(e) => setOpen(true)}>
                <PencilSquareIcon className="h-5 text-slate-500" />
            </div>
            <Modal open={open}>
                <Title>Update</Title>
                <Form
                    form={form}
                    accountTypes={accountTypes}
                    accountTypesCheck={accountTypesCheck}
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
