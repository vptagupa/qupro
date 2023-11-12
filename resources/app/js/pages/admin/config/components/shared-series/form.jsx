import { Form, Input, Select, Checkbox } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import { PrimarySwitch } from "@/js/components/switch";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const Component = ({
    form,
    accountTypes,
    completed,
    setAccountTypesHandler,
}) => {
    const [priority, setPriority] = useState(form.data.priority);
    const { formats } = usePage().props;
    return (
        <Form>
            <div>
                <Transition show={completed && !form.hasErrors}>
                    <AlertSuccess>Successfully save.</AlertSuccess>
                </Transition>
            </div>
            <div className="flex items-center justify-end space-x-2 mt-2">
                {form.invalid("priority") && (
                    <span className="text-danger text-xs">
                        {form.errors.priority}
                    </span>
                )}
                <span className="text-xs">Priority</span>
                <PrimarySwitch
                    enabled={priority}
                    setEnabled={() => {
                        const value = !priority;
                        form.setData("priority", value);
                        setPriority(value);
                    }}
                    title="Set Priority"
                />
            </div>
            <div>
                <span className="text-xs">Account Types:</span>
                <div className="flex flex-wrap gap-2 items-center justify-start mt-1 border border-solid border-slate-300 p-2 rounded-lg">
                    {accountTypes.map((type) => {
                        return (
                            <div key={type.id} className="text-xs mr-2">
                                <label className="flex items-center space-x-1">
                                    <Checkbox
                                        checked={type?.checked ?? false}
                                        onChange={(e) =>
                                            setAccountTypesHandler(type.id)
                                        }
                                    />{" "}
                                    <span>{type.name}</span>
                                </label>
                            </div>
                        );
                    })}
                </div>
                {form.invalid("account_types") && (
                    <span className="text-danger text-xs">
                        {form.errors.account_types}
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
                    onBlur={(e) => form.validate("num_start")}
                />
                {form.invalid("num_start") && (
                    <span className="text-danger text-xs">
                        {form.errors.num_start}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Format:</span>
                <Select
                    name="format"
                    value={form.data.format}
                    className={form.invalid("format") ? "has-danger" : ""}
                    onChange={(e) => form.setData("format", e.target.value)}
                    onBlur={(e) => form.validate("format")}
                >
                    <option value="">Select</option>
                    {formats.data.map((format) => (
                        <option key={format.id} value={format.id}>
                            {format.title}
                        </option>
                    ))}
                </Select>
                {form.invalid("format") && (
                    <span className="text-danger text-xs">
                        {form.errors.format}
                    </span>
                )}
            </div>
        </Form>
    );
};

Component.propTypes = {
    form: PropTypes.object.isRequired,
    completed: PropTypes.bool.isRequired,
    accountTypes: PropTypes.array.isRequired,
    setAccountTypesHandler: PropTypes.func.isRequired,
};

export default Component;
