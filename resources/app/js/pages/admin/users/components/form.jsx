import { Form, Input, Select, Checkbox } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";

const Component = ({ form, roles, submitted }) => {
    return (
        <Form>
            <div>
                <Transition show={submitted && !form.hasErrors}>
                    <AlertSuccess>Successfully save user.</AlertSuccess>
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
                <span className="text-xs">Nick name:</span>
                <Input
                    type="text"
                    name="nickname"
                    value={form.data.nickname}
                    className={form.invalid("nickname") ? "has-danger" : ""}
                    onChange={(e) => form.setData("nickname", e.target.value)}
                    onBlur={(e) => form.validate("nickname")}
                />
                {form.invalid("nickname") && (
                    <span className="text-danger text-xs">
                        {form.errors.nickname}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Email:</span>
                <Input
                    type="email"
                    name="email"
                    value={form.data.email}
                    className={form.invalid("email") ? "has-danger" : ""}
                    onChange={(e) => form.setData("email", e.target.value)}
                    onBlur={(e) => form.validate("email")}
                />
                {form.invalid("email") && (
                    <span className="text-danger text-xs">
                        {form.errors.email}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Role:</span>
                <Select
                    name="role"
                    value={form.data.role}
                    className={form.invalid("role") ? "has-danger" : ""}
                    onChange={(e) => form.setData("role", e.target.value)}
                    onBlur={(e) => form.validate("role")}
                >
                    <option value="">Select</option>
                    {roles.map((role) => {
                        return (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        );
                    })}
                </Select>
                {form.invalid("role") && (
                    <span className="text-danger text-xs">
                        {form.errors.role}
                    </span>
                )}
            </div>
            {form.data.password !== undefined && (
                <div>
                    <div className="text-xs py-2">
                        <div className="flex justify-between space-x-1">
                            <div> Password:</div>
                            <label className="flex space-x-1">
                                <Checkbox
                                    checked={form.data.default_checked_password}
                                    onChange={(e) => {
                                        form.setData(
                                            "default_checked_password",
                                            e.target.checked,
                                        );
                                    }}
                                    name="default_checked_password"
                                />
                                <span>Use default password.</span>
                            </label>
                        </div>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        value={form.data.password}
                        disabled={form.data.default_checked_password}
                        className={form.invalid("password") ? "has-danger" : ""}
                        onChange={(e) =>
                            form.setData("password", e.target.value)
                        }
                        onBlur={(e) => form.validate("password")}
                    />
                    {!form.data.default_checked_password &&
                        form.invalid("password") && (
                            <span className="text-danger text-xs">
                                {form.errors.password}
                            </span>
                        )}
                </div>
            )}
        </Form>
    );
};

Component.propTypes = {
    roles: PropTypes.array.isRequired,
    submitted: PropTypes.bool.isRequired,
};

export default Component;
