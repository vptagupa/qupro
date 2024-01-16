import { PrimarySwitch } from "@/js/components/switch";
import { router } from "@inertiajs/react";
import { useState } from "react";
import Event from "@/js/helpers/event";

export default function Component({ item, handleActive }) {
    return (
        <PrimarySwitch
            enabled={item.active}
            setEnabled={(e) => handleActive(item, e)}
        />
    );
}
