import { useForm } from "@/js/helpers/form";
import { Input, Textarea } from "@/js/components/form";
import { PrimarySwitch } from "@/js/components/switch";
import { memo, useState, useMemo } from "react";
import Event from "@/js/helpers/event";
import {
    PencilSquareIcon,
    XMarkIcon,
    CheckIcon,
} from "@heroicons/react/24/solid";

export default ({ data }) => {
    const [active, setActive] = useState(data.value == 1);
    const { open, setOpen, closeForm, form } = useForm({
        method: "patch",
        route: route("admin.configurations.global.update", {
            config: data.id,
        }),
        data: {
            id: data.id,
            name: data.name,
            value: data.value,
        },
    });

    const isTypeText = (type) => ["text", "number"].includes(type);
    const isTypeTextArea = (type) => ["textarea"].includes(type);
    const isTypeBoolean = (type) => ["boolean"].includes(type);

    const submit = () => {
        form.submit({
            preseverScroll: true,
            preserveState: true,
            only: ["user", "permissions", "errors"],
            onSuccess: () => {
                setOpen(false);
                form.clearErrors();
                Event.emit("config.reload");
            },
        });
    };

    const outputSelector = useMemo(() => {
        if (isTypeText(data.type) || isTypeTextArea(data.type)) {
            return data.value;
        } else if (isTypeBoolean(data.type)) {
            return data.value == true ? "Enabled" : "Disabled";
        }
    }, [data]);

    return (
        <>
            {!open && (
                <div>
                    <div className="flex space-x-3 items-center">
                        <span className="underline">{outputSelector}</span>
                        <PencilSquareIcon
                            onClick={(e) => setOpen(true)}
                            className="h-4 text-slate-500 cursor"
                        />
                    </div>
                </div>
            )}
            {open && (
                <div className="flex items-center grow">
                    <div className="flex items-center grow">
                        <div className="flex flex-col grow">
                            {isTypeText(data.type) && (
                                <Input
                                    type="text"
                                    name="value"
                                    value={form.data.value}
                                    className={
                                        "border-0 border-b rounded-none text-center" +
                                        (form.invalid("value")
                                            ? "has-danger"
                                            : "")
                                    }
                                    onChange={(e) =>
                                        form.setData("value", e.target.value)
                                    }
                                />
                            )}
                            {isTypeBoolean(data.type) && (
                                <div className="text-right">
                                    <PrimarySwitch
                                        enabled={active}
                                        setEnabled={(e) => {
                                            const value = !active;
                                            form.setData("value", value);
                                            setActive(value);
                                        }}
                                    />
                                </div>
                            )}
                            {isTypeTextArea(data.type) && (
                                <Textarea
                                    value={form.data.value}
                                    onChange={(e) =>
                                        form.setData("value", e.target.value)
                                    }
                                />
                            )}
                            {form.invalid("value") && (
                                <span className="text-danger text-xs">
                                    {form.errors.value}
                                </span>
                            )}
                        </div>
                        <div>
                            <div
                                onClick={(e) => submit()}
                                className="font-bold shadow-none hover:bg-none border-slate-300 cursor-pointer p-1"
                            >
                                <CheckIcon
                                    className="h-4 text-green-800"
                                    title="Save"
                                />
                            </div>
                            <div
                                onClick={(e) => closeForm()}
                                className="font-bold shadow-none hover:bg-none border-slate-300 cursor-pointer p-1"
                            >
                                <XMarkIcon
                                    className="h-4 text-pink-800"
                                    title="Cancel"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
