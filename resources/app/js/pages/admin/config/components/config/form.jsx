import { Form, Input, Select, Checkbox } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/react";

const Component = ({
    form,
    accountTypes,
    submitted,
    setAccountTypesHandler,
}) => {
    const { formats } = usePage().props;
    return (
        <Form>
            <div>
                <Transition show={submitted && !form.hasErrors}>
                    <AlertSuccess>Successfully save.</AlertSuccess>
                </Transition>
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
            <div>
                <span className="text-xs">Account Types:</span>
                <div className="flex flex-wrap space-x-1 items-center justify-start mt-1 border border-solid border-slate-300 p-2 rounded-lg">
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
        </Form>
    );
};

Component.propTypes = {
    form: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    accountTypes: PropTypes.array.isRequired,
    setAccountTypesHandler: PropTypes.func.isRequired,
};

export default Component;
