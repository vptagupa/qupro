import { Input } from "@/js/components/form";
import { useRef, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faFile,
    faTrash,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { createObjectUrl } from "@/js/helpers";

export default memo(function Component({ form, acceptable }) {
    const ref = useRef();
    const file = useRef();

    const isAudio = () => form.data.acceptable.includes("mp3");

    const browse = () => {
        ref.current.click();
    };

    const change = (e) => {
        form.setData("value", e.target.files[0]);
    };

    const remove = () => {
        form.setData("value", null);
    };

    const view = () => {
        if (isAudio()) {
            file.current.pause();
            file.current.currentTime = 0;
            file.current.play();
        } else {
            window.open(form.data.value, "_blank");
        }
    };

    return (
        <>
            <div className="flex items-center gap-2 justify-center">
                <Input
                    type="file"
                    accept={acceptable.map((a) => "." + a).join(",")}
                    ref={ref}
                    onChange={(e) => change(e)}
                    className="hidden"
                />
                <FontAwesomeIcon
                    title={form.data.value ? "Remove" : "Upload"}
                    className={`h-6 cursor-pointer hover:text-slate-500 ${
                        form.data.value ? "text-red-300" : "text-slate-300 "
                    }`}
                    icon={form.data.value ? faTrash : faPlus}
                    onClick={(e) => (form.data.value ? remove() : browse())}
                />
                {form.data.value && (
                    <FontAwesomeIcon
                        title="View"
                        className="p-0 m-0 h-6 text-green-300 cursor-pointer hover:text-green-500"
                        icon={isAudio() ? faPlay : faFile}
                        onClick={(e) => view()}
                    />
                )}
                {isAudio() && (
                    <audio
                        src={createObjectUrl(form.data.value)}
                        ref={file}
                        className="hidden"
                    ></audio>
                )}
            </div>
        </>
    );
});
