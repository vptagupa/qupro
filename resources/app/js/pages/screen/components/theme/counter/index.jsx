import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import Current from "./current";

const Component = () => {
    return (
        <>
            <div className="flex flex-col gap-y-2">
                <div>
                    <Current />
                </div>
            </div>
        </>
    );
};

export default Component;
