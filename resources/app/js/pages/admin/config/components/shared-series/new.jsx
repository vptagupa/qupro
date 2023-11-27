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

    const { open, setOpen, form, closeForm, completed, setCompleted } = useForm(
        {
            method: "post",
            route: route("admin.configurations.shared-series.store"),
            data: {
                format: "",
                account_types: [],
                num_start: "",
                priority: false,
            },
        },
    );

    const submit = () => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            only: ["errors"],
            onSuccess: () => {
                setCompleted(true);
                closeFormHandler();
                Event.emit("shared-series.reload");
            },
        });
    };

    const closeFormHandler = () => {
        closeForm();
    };

    useEffect(() => {
        if (completed) {
            setTimeout(() => {
                setCompleted(false);
            }, 2000);
        }
    }, [completed]);

    useEffect(() => {
        form.setData(
            "account_types",
            accountTypes.filter((type) => type.checked),
        );
    }, [accountTypes]);

    useEffect(() => {
        accountTypeReset();
    }, [open]);

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
                    completed={completed}
                    accountTypes={accountTypes}
                    setAccountTypesHandler={accountTypeHandler}
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
