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
import { Button } from "@/js/components/buttons";

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
        if (!data?.attrib) {
            return data.value;
        } else if (data.attrib.data_type === "boolean") {
            return data.value == true ? "Enabled" : "Disabled";
        } else if (data.attrib.data_type === "textarea") {
            return data.value;
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
                            {!data?.attrib && (
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
                            {data?.attrib?.data_type === "boolean" && (
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
                            {data?.attrib?.data_type === "textarea" && (
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
