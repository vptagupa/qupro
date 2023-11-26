import { Form, Input, Select, Checkbox } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/react";

const Component = ({
    form,
    accountTypes,
    successful,
    setAccountTypesHandler,
}) => {
    const { screens } = usePage().props;

    return (
        <Form>
            <div>
                <Transition show={successful && !form.hasErrors}>
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
                    onBlur={(e) => form.validate("name")}
                />
                {form.invalid("name") && (
                    <span className="text-danger text-xs">
                        {form.errors.name}
                    </span>
                )}
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
                <span className="text-xs">Screen:</span>
                <Select
                    name="screen"
                    value={form.data.screen}
                    className={form.invalid("screen") ? "has-danger" : ""}
                    onChange={(e) => form.setData("screen", e.target.value)}
                    onBlur={(e) => form.validate("screen")}
                >
                    <option value="">Select</option>
                    {screens.map((screen) => (
                        <option key={screen.id} value={screen.id}>
                            {screen.name}
                        </option>
                    ))}
                </Select>
                {form.invalid("screen") && (
                    <span className="text-danger text-xs">
                        {form.errors.screen}
                    </span>
                )}
            </div>
        </Form>
    );
};

Component.propTypes = {
    form: PropTypes.object.isRequired,
    successful: PropTypes.bool.isRequired,
    accountTypes: PropTypes.array.isRequired,
    setAccountTypesHandler: PropTypes.func.isRequired,
};

export default Component;
