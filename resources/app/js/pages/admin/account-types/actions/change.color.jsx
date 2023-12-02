import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFillDrip } from "@fortawesome/free-solid-svg-icons";

export default ({ id }) => {
    return (
        <a href="#" target="_blank">
            <FontAwesomeIcon
                className={`h-4 text-fuchsia-500`}
                icon={faFillDrip}
                title={`Set screen color`}
            />
        </a>
    );
};
