import { Form, Input, Select } from "@/js/components/form";
import { AlertSuccess, AlertDanger } from "@/js/components/alerts";
import { Transition } from "@headlessui/react";
import Media from "./media";
import CategorySelect from "@/js/helpers/form/select.categories";
import { usePage } from "@inertiajs/react";

const Component = ({ form, formats }) => {
    const { config } = usePage().props;
    const selector = (selected) => {
        form.setData("categories", selected);
    };

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
            {config.enabled_department_categories && (
                <div>
                    <span className="text-xs">Categories:</span>
                    <CategorySelect
                        selector={selector}
                        data={form.data.categories}
                    />
                    {form.invalid("categories") && (
                        <span className="text-danger text-xs">
                            {form.errors.categories}
                        </span>
                    )}
                </div>
            )}

            <div>
                <span className="text-xs">Format:</span>
                <Select
                    name="num_format_id"
                    value={form.data.num_format_id}
                    className={
                        form.invalid("num_format_id") ? "has-danger" : ""
                    }
                    onChange={(e) =>
                        form.setData("num_format_id", e.target.value)
                    }
                >
                    <option value="">Select</option>
                    {formats.map((format) => {
                        return (
                            <option key={format.id} value={format.id}>
                                {format.title}
                            </option>
                        );
                    })}
                </Select>
                {form.invalid("num_format_id") && (
                    <span className="text-danger text-xs">
                        {form.errors.num_format_id}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Number Start:</span>
                <Input
                    type="text"
                    name="num_start"
                    value={form.data.num_start}
                    className={form.invalid("num_start") ? "has-danger" : ""}
                    onChange={(e) => form.setData("num_start", e.target.value)}
                />
                {form.invalid("num_start") && (
                    <span className="text-danger text-xs">
                        {form.errors.num_start}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Priority Format:</span>
                <Select
                    name="priority_format"
                    value={form.data.priority_format_id}
                    className={
                        form.invalid("priority_format_id") ? "has-danger" : ""
                    }
                    onChange={(e) =>
                        form.setData("priority_format_id", e.target.value)
                    }
                >
                    <option value="">Select</option>
                    {formats.map((format) => {
                        return (
                            <option key={format.id} value={format.id}>
                                {format.title}
                            </option>
                        );
                    })}
                </Select>
                {form.invalid("priority_format_id") && (
                    <span className="text-danger text-xs">
                        {form.errors.priority_format_id}
                    </span>
                )}
            </div>
        </Form>
    );
};

export default Component;
