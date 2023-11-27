import AccountTypes from "./accountypes";
import { useForm } from "@/js/helpers/form";
import { Form, Input } from "@/js/components/form";
import { SecondaryButton } from "@/js/components/buttons";
import { AlertSuccess } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";
import { PrinterIcon } from "@heroicons/react/24/solid";
import Circle from "@/assets/images/circle.svg";
import { print } from "@/js/helpers";

const Component = (props) => {
    const { form } = useForm({
        method: "post",
        route: route("admin.advance-print.store"),
        data: {
            account_type_id: "",
            count: 0,
        },
    });

    const submit = (e) => {
        e.preventDefault();
        form.submit({
            preserveState: true,
            preserveScroll: true,
            only: ["errors", "accountTypes", "data"],
            onSuccess: (page) => {
                form.reset();
                form.clearErrors();
                print(page.props.data)
                    .then((res) => {})
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {});
            },
        });
    };

    return (
        <>
            <div>
                <div className="mb-2">
                    <Transition
                        show={form.recentlySuccessful && !form.hasErrors}
                    >
                        <AlertSuccess>Successfully Generated.</AlertSuccess>
                    </Transition>
                </div>
                <Form onSubmit={submit}>
                    <div className="flex flex-col items-center mb-10">
                        <div>
                            <AccountTypes form={form} />
                        </div>
                        <div>
                            {form.invalid("account_type_id") && (
                                <span className="text-danger text-sm">
                                    {form.errors.account_type_id}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mb-20">
                        <div>
                            <Input
                                type="text"
                                className="h-[15rem] !w-[25rem] !text-[10rem] p-5 text-center 
                                        border-t-0 border-l-0 border-r-0 !border-b-1 !border-b-slate-300
                                        rounded-none bg-transparent disabled:bg-slate-200/50"
                                disabled={form.data.account_type == ""}
                                value={form.data.count}
                                onChange={(e) =>
                                    form.setData("count", e.target.value)
                                }
                            />
                        </div>

                        <div>
                            {form.invalid("count") && (
                                <span className="text-danger text-sm">
                                    {form.errors.count}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <SecondaryButton className="h-[7rem] w-[15rem] !text-[3rem] font-bold uppercase flex items-center justify-center">
                            {form.processing ? (
                                <img
                                    src={Circle}
                                    className="animate-spin h-10 mr-2 text-opacity-10 text-slate-100"
                                />
                            ) : (
                                <PrinterIcon className="h-10 mr-2" />
                            )}
                            Print
                        </SecondaryButton>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Component;
