import PropTypes from "prop-types";
import { Confirm } from "@/js/components/modal";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Component = ({ handleDelete, item }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                title="Remove"
                className="cursor"
                onClick={(e) => setOpen(true)}
            >
                <TrashIcon className="h-5 text-pink-500" />
            </div>
            <Confirm
                open={open}
                title="Delete"
                description="Are you sure you want to delete?"
                yes={(e) => handleDelete(item.id)}
                no={(e) => setOpen(false)}
            />
        </>
    );
};

Component.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

export default Component;
