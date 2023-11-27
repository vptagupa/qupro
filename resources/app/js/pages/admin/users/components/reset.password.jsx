import PropTypes from "prop-types";
import { Confirm } from "@/js/components/modal";
import { CogIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default ({ id }) => {
    const [open, setOpen] = useState(false);

    const handleReset = async () => {
        await axios.patch(
            route("admin.users.reset-password", {
                user: id,
            }),
        );
        setOpen(false);
    };
    return (
        <>
            <div
                title="Reset"
                className="cursor"
                onClick={(e) => setOpen(true)}
            >
                <CogIcon className="h-5 text-purple-500" />
            </div>
            <Confirm
                open={open}
                title="Delete"
                description="Are you sure you want to reset password?"
                yes={(e) => handleReset()}
                no={(e) => setOpen(false)}
            />
        </>
    );
};
