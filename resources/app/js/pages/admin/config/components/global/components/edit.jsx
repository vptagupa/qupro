import { useForm } from "@/js/helpers/form";
import { Input } from "@/js/components/form";
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

    const InputSelector = memo(() => {
        if (!data?.attrib) {
            return (
                <Input
                    type="text"
                    name="value"
                    value={form.data.value}
                    className={
                        "border-0 border-b rounded-none text-center" +
                        (form.invalid("value") ? "has-danger" : "")
                    }
                    onChange={(e) => form.setData("value", e.target.value)}
                />
            );
        } else if (data.attrib.data_type === "boolean") {
            return (
                <PrimarySwitch
                    enabled={active}
                    setEnabled={(e) => {
                        const value = !active;
                        form.setData("value", value);
                        setActive(value);
                    }}
                />
            );
        }
    });

    const outputSelector = useMemo(() => {
        if (!data?.attrib) {
            return data.value;
        } else if (data.attrib.data_type === "boolean") {
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
                <div className="flex items-center">
                    <div>
                        <div className="flex items-center">
                            <InputSelector />
                            <Button
                                onClick={(e) => submit()}
                                className="shadow-none hover:bg-none border-slate-300 px-[0.2rem]"
                            >
                                <CheckIcon
                                    className="h-5 text-green-800"
                                    title="Close"
                                />
                            </Button>
                            <Button
                                onClick={(e) => closeForm()}
                                className="shadow-none hover:bg-none border-slate-300 px-[0.2rem]"
                            >
                                <XMarkIcon
                                    className="h-5 text-pink-800"
                                    title="Close"
                                />
                            </Button>
                        </div>
                        {form.invalid("value") && (
                            <span className="text-danger text-xs">
                                {form.errors.value}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
