import { Form, Input, Textarea } from "@/js/components/form";
import { AlertSuccess, AlertDanger } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";
import Media from "./media";

const Component = ({ form }) => {
    return (
        <Form>
            <div>
                <Transition show={form.recentlySuccessful && !form.hasErrors}>
                    <AlertSuccess>Successfully save.</AlertSuccess>
                </Transition>
                <Transition show={form.hasErrors && form.invalid("file")}>
                    <AlertDanger>{form.errors.file}.</AlertDanger>
                </Transition>
            </div>
            <div className="flex gap-x-2">
                <div className="w-[80%]">
                    <span className="text-xs">Name:</span>
                    <Input
                        type="text"
                        name="name"
                        value={form.data.name}
                        className={form.invalid("name") ? "has-danger" : ""}
                        onChange={(e) => form.setData("name", e.target.value)}
                    />
                    {form.invalid("name") && (
                        <span className="text-danger text-xs">
                            {form.errors.name}
                        </span>
                    )}
                </div>
                <div className="grow flex items-center justify-center border border-slate-300 rounded-lg">
                    <Media form={form} />
                </div>
            </div>
            <div>
                <span className="text-xs">Description:</span>
                <Textarea
                    type="text"
                    name="description"
                    value={form.data.description}
                    className={form.invalid("description") ? "has-danger" : ""}
                    onChange={(e) =>
                        form.setData("description", e.target.value)
                    }
                >
                    {form.data.description}
                </Textarea>
                {form.invalid("description") && (
                    <span className="text-danger text-xs">
                        {form.errors.description}
                    </span>
                )}
            </div>
        </Form>
    );
};

export default Component;
