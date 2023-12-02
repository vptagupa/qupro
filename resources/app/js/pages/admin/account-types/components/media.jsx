import { Form, Input } from "@/js/components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhotoFilm,
    faTrash,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Load from "./media/load";

const Component = ({ form }) => {
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
        <>
            <Input
                type="file"
                accept=" .jpg, .jpeg, .png, .mp4"
                ref={file}
                onChange={(e) => change(e)}
                className="hidden"
            />
            {!form.data.file && (
                <div>
                    <FontAwesomeIcon
                        className="h-10 text-slate-300 cursor-pointer hover:text-slate-500"
                        icon={faPlus}
                        onClick={(e) => browse()}
                    />
                </div>
            )}
            {form.data.file && (
                <div>
                    <div className="relative">
                        <div className="absolute w-[100%] h-12 flex items-center justify-center">
                            <FontAwesomeIcon
                                className="h-7 text-slate-500/70 cursor-pointer hover:text-pink-500"
                                icon={faTrash}
                                onClick={(e) => remove()}
                            />
                        </div>
                    </div>
                    <div>
                        <Load file={form.data.file} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Component;
