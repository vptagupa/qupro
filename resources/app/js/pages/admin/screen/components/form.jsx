import { Form, Input, Select, Checkbox } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import AccountTypesForm from "@/js/helpers/form/select.accounttypes";

const Component = ({ form, accountTypes, accountTypesCheck }) => {
    const { screens } = usePage().props;

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
                    onBlur={(e) => form.validate("name")}
                />
                {form.invalid("name") && (
                    <span className="text-danger text-xs">
                        {form.errors.name}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Departments:</span>
                <div className="flex flex-col gap-2 items-center justify-start mt-1">
                    <div className="w-full">
                        <AccountTypesForm
                            data={accountTypes}
                            handler={accountTypesCheck}
                        />
                    </div>
                </div>
                {form.invalid("account_type_ids") && (
                    <span className="text-danger text-xs">
                        {form.errors.account_type_ids}
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
    accountTypes: PropTypes.array.isRequired,
    accountTypesCheck: PropTypes.func.isRequired,
};

export default Component;
