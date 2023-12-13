import { Form, Input } from "@/js/components/form";
import { Progress } from "@/js/components/buttons";
import { useForm } from "@/js/helpers/form";
import { usePage } from "@inertiajs/react";
import { useState, memo, useEffect } from "react";
import { useSelector } from "react-redux";

export default memo(function Component() {
    const { page_id } = useSelector((state) => state.teller);
    const [loading, setLoading] = useState(false);
    const { user } = usePage().props;
    const { form } = useForm({
        method: "patch",
        route: route("tellers.update_counter_name"),
        data: {
            name: user.data?.counter_name ?? "",
            page_id,
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
                            className="w-full !text-[1rem] text-center has-primary"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                        />
                        {form.invalid("name") && (
                            <span className="text-danger text-xs">
                                {form.errors.name}
                            </span>
                        )}
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
});
