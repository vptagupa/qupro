import { Form, Input } from "@/js/components/form";
import { AlertSuccess, AlertDanger } from "@/js/components/alerts";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";
import {
    faPhotoFilm,
    faXmark,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Component = ({ form, completed }) => {
    const file = useRef(null);

    const browse = () => {
        file.current.click();
    };

    const change = (e) => {
        form.setData("file", e.target.files[0]);
    };

    const remove = (file) => {
        form.setData("file", null);
    };

    return (
        <Form>
            <div>
                <Transition show={completed && !form.hasErrors}>
                    <AlertSuccess>Successfully save.</AlertSuccess>
                </Transition>
                <Transition show={form.hasErrors}>
                    <AlertDanger>{form.errors.file}</AlertDanger>
                </Transition>
            </div>
            <div className="h-[200px] mt-2">
                <Transition show={!form.data.file}>
                    <div className="relative">
                        <div className="absolute h-[200px] w-full m-auto flex items-center justify-center">
                            <Input
                                type="file"
                                accept=" .jpg, .jpeg, .png, .mp4"
                                ref={file}
                                onChange={(e) => change(e)}
                                className="hidden"
                            />
                            <FontAwesomeIcon
                                className="h-20 text-slate-300 cursor-pointer hover:text-slate-500"
                                icon={faPlus}
                                onClick={(e) => browse()}
                            />
                        </div>
                    </div>
                </Transition>
                <Transition show={form.data.file ? true : false}>
                    <div className="relative">
                        <div className="absolute h-[200px] m-auto w-full flex items-center justify-center bg-slate-300/30 hover:bg-slate-300/70 hover:transition ease-in-out">
                            <FontAwesomeIcon
                                className="h-20 text-red-600/50 hover:text-red-600 hover:transition ease-in-out cursor-pointer"
                                icon={faXmark}
                                onClick={(e) => remove()}
                            />
                        </div>
                    </div>
                </Transition>
                <Transition show={form.data.file ? true : false}>
                    <div className="flex items-center justify-center gap-2 h-[200px]">
                        <div>
                            <div>
                                {form.data.file &&
                                    form.data.file.type.startsWith(
                                        "image/",
                                    ) && (
                                        <img
                                            src={URL.createObjectURL(
                                                form.data.file,
                                            )}
                                            className="h-40"
                                        />
                                    )}
                            </div>
                            {form.data.file &&
                                !form.data.file.type.startsWith("image/") && (
                                    <FontAwesomeIcon
                                        className="h-20 text-center"
                                        icon={faPhotoFilm}
                                    />
                                )}
                        </div>
                    </div>
                </Transition>
            </div>
        </Form>
    );
};

Component.propTypes = {
    form: PropTypes.object.isRequired,
    completed: PropTypes.bool.isRequired,
};

export default Component;
