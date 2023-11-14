import { Form, Input } from "@/js/components/form";
import { Progress } from "@/js/components/buttons";
import { useForm } from "@/js/helpers/form";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const Component = () => {
    const [loading, setLoading] = useState(false);
    const { user } = usePage().props;
    const { form } = useForm({
        method: "patch",
        route: route("admin.tellers.update_teller_name"),
        data: {
            name: user.data.teller_name,
        },
    });

    const submit = (e) => {
        e.preventDefault();
        form.submit({
            only: ["user", "errors"],
            preserveState: true,
            preserveScroll: true,
            onBefore: () => setLoading(true),
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
            onFinal: () => setLoading(false),
        });
    };

    return (
        <>
            <div>
                <Form onSubmit={submit}>
                    <div>
                        <Input
                            type="text"
                            className="w-full h-[300px] text-[10rem] text-center has-primary"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                        />
                    </div>
                    <div className="mt-2 flex items-center justify-end">
                        <Progress
                            className="uppercase bg-gradient-to-r  from-purple-500 to-fuchsia-500 text-white"
                            loading={loading}
                        >
                            Save
                        </Progress>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Component;
