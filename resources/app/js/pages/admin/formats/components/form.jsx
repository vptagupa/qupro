import { Form, Input } from "@/js/components/form";
import { AlertSuccess } from "@/js/components/alerts";
import { PrimarySwitch } from "@/js/components/switch";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";

const Component = ({ form, completed, active, setActive }) => {
    return (
        <Form>
            <div>
                <Transition show={completed && !form.hasErrors}>
                    <AlertSuccess>Successfully save.</AlertSuccess>
                </Transition>
            </div>
            <div className="flex items-center justify-end space-x-2 mt-2">
                {form.invalid("active") && (
                    <span className="text-danger text-xs">
                        {form.errors.active}
                    </span>
                )}
                <PrimarySwitch
                    enabled={active}
                    setEnabled={setActive}
                    title="Set Active"
                />
            </div>
            <div>
                <span className="text-xs">Title:</span>
                <Input
                    type="text"
                    name="title"
                    value={form.data.title}
                    className={form.invalid("title") ? "has-danger" : ""}
                    onChange={(e) => form.setData("title", e.target.value)}
                    onBlur={(e) => form.validate("title")}
                />
                {form.invalid("title") && (
                    <span className="text-danger text-xs">
                        {form.errors.title}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Affix:</span>
                <Input
                    type="text"
                    name="praffixefix"
                    value={form.data.affix}
                    className={form.invalid("affix") ? "has-danger" : ""}
                    onChange={(e) => form.setData("affix", e.target.value)}
                    onBlur={(e) => form.validate("affix")}
                />
                {form.invalid("affix") && (
                    <span className="text-danger text-xs">
                        {form.errors.affix}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Delimiter:</span>
                <Input
                    type="text"
                    name="delimiter"
                    value={form.data.delimiter}
                    className={form.invalid("delimiter") ? "has-danger" : ""}
                    onChange={(e) => form.setData("delimiter", e.target.value)}
                    onBlur={(e) => form.validate("delimiter")}
                />
                {form.invalid("delimiter") && (
                    <span className="text-danger text-xs">
                        {form.errors.delimiter}
                    </span>
                )}
            </div>
            <div>
                <span className="text-xs">Format:</span>
                <Input
                    type="text"
                    name="format"
                    value={form.data.format}
                    className={form.invalid("delimiter") ? "has-danger" : ""}
                    onChange={(e) => form.setData("format", e.target.value)}
                    onBlur={(e) => form.validate("format")}
                />
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
    completed: PropTypes.bool.isRequired,
};

export default Component;
