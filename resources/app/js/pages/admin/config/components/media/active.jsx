import { PrimarySwitch } from "@/js/components/switch";
import { useState, useCallback } from "react";
import axios from "axios";

export default ({ id, value = false }) => {
    const [active, setActive] = useState(value);
    const update = useCallback((active) => {
        axios
            .patch(route("admin.configurations.media.active", { id }), {
                active,
            })
            .then((response) => {});
        setActive(active);
    }, []);

    return (
        <PrimarySwitch enabled={active} setEnabled={(e) => update(!active)} />
    );
};
