import PropTypes from "prop-types";
import { Confirm } from "@/js/components/modal";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Component = ({ handleDelete }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                title="Remove"
                className="cursor"
                onClick={(e) => setOpen(true)}
            >
                <FontAwesomeIcon
                    className="h-4 text-pink-500"
                    icon={faTrashCan}
                />
            </div>
            <Confirm
                open={open}
                title="Delete"
                description="Are you sure you want to delete?"
                yes={(e) => handleDelete()}
                no={(e) => setOpen(false)}
            />
        </>
    );
};

Component.propTypes = {
    handleDelete: PropTypes.func.isRequired,
};

export default Component;
