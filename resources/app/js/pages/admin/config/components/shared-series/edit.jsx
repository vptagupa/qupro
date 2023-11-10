import Form from "./form";
import { Modal, Title, Footer } from "@/js/components/modal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import Event from "@/js/helpers/event";
import FooterForm from "./form.footer";
import { useForm } from "@/js/helpers/form";
import { useAccountTypes } from "./shared/account.types";

export default ({ data, ...props }) => {
    const {
        data: accountTypes,
        check: accountTypeHandler,
        reset: accountTypeReset,
        setData: setAccountTypes,
    } = useAccountTypes();
    const { open, setOpen, form, closeForm, submitted, setSubmit } = useForm({
        method: "patch",
        route: route("admin.configurations.shared-series.update", {
            shared: data.id,
        }),
        data: {
            id: data.id,
            format: data.format.id,
            account_types: data.account_types,
            num_start: data.num_start,
        },
    });

    const submit = (e) => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            onSuccess: () => {
                Event.emit("reload");
                setSubmit(true);
                form.reset();
                setTimeout(() => {
                    setOpen(false);
                }, 1000);
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
        setAccountTypes(
            accountTypes.map((type) => {
                if (data.account_type_ids.includes(type.id)) {
                    type.checked = true;
                }

                return type;
            }),
        );
    }, []);

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
