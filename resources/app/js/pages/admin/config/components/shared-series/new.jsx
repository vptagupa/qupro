import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { Button } from "@/js/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";
import { useAccountTypes } from "./shared/account.types";
import { useForm } from "@/js/helpers/form";

export default () => {
    const {
        data: accountTypes,
        check: accountTypeHandler,
        reset: accountTypeReset,
    } = useAccountTypes();

    const { open, setOpen, form, closeForm, submitted, setSubmit } = useForm({
        method: "post",
        route: route("admin.configurations.shared-series.store"),
        data: {
            format: "",
            account_types: [],
            num_start: "",
        },
    });

    const submit = () => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                setSubmit(true);
                accountTypeReset();
                Event.emit("reload");
                form.reset();
            },
        });
    };

    useEffect(() => {
        if (submitted) {
            setTimeout(() => {
                setSubmit(false);
            }, 2000);
        }
    }, [submitted]);

    useEffect(() => {
        form.setData(
            "account_types",
            accountTypes.filter((type) => type.checked),
        );
    }, [accountTypes]);

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
                    accountTypes={accountTypes}
                    setAccountTypesHandler={accountTypeHandler}
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
