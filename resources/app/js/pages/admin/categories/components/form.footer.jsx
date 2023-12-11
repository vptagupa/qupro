import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, PrimaryButton } from "@/js/components/buttons";
import Circle from "@/assets/images/circle.svg";

const Component = ({ closeForm, submit, form }) => {
    return (
        <>
            <div className="flex justify-between items-center">
                <XMarkIcon
                    className="h-6 cursor text-pink-500"
                    title="Close Form"
                    onClick={(e) => closeForm()}
                />

                <div className="flex space-x-2 items-center">
                    <Button onClick={(e) => closeForm()}>Cancel</Button>
                    <PrimaryButton
                        onClick={(e) => submit()}
                        disabled={form.processing}
                    >
                        {form.processing && (
                            <img
                                src={Circle}
                                className="animate-spin mr-2 text-opacity-10 text-slate-100"
                            />
                        )}
                        Submit
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
};

Component.propTypes = {
    closeForm: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
};

export default Component;
