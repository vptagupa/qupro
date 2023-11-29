import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

export default ({ item }) => {
    return (
        <a href={item?.file?.url ?? "#"} target="_blank">
            <FontAwesomeIcon
                className={`h-4 text-${
                    item?.file?.url ? "purple" : "slate"
                }-500`}
                icon={faPhotoFilm}
                title={`View ${item?.file?.orig_filename ?? ""}`}
            />
        </a>
    );
};
