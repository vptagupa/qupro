import { Form, Input, Textarea } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";

const Component = ({ form }) => {
    return (
        <Form>
            <div>
                <Transition show={form.recentlySuccessful && !form.hasErrors}>
                    <AlertSuccess>Successfully save.</AlertSuccess>
                </Transition>
            </div>
            <div>
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
