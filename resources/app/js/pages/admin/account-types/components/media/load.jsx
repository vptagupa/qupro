import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ file }) => {
    if (!file) {
        return "";
    }

    let url = file?.url ?? "";
    if (file instanceof File && file.type.startsWith("image/")) {
        url = URL.createObjectURL(file);
    }

    if (url && file?.is_image) {
        return <img src={url} className="h-12" />;
    }

    return <FontAwesomeIcon className="h-12 text-center" icon={faPhotoFilm} />;
};
