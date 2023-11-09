import { Form, Input, Select } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";

const Component = ({ form, submitted, formats }) => {
    return (
        <Form>
            <div>
                <Transition show={submitted && !form.hasErrors}>
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
                <span className="text-xs">Format:</span>
                <Select
                    name="format"
                    value={form.data.format}
                    className={form.invalid("format") ? "has-danger" : ""}
                    onChange={(e) => form.setData("format", e.target.value)}
                    onBlur={(e) => form.validate("format")}
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
                {form.invalid("format") && (
                    <span className="text-danger text-xs">
                        {form.errors.format}
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
    submitted: PropTypes.bool.isRequired,
};

export default Component;
