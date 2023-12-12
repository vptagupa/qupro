import { PrimarySwitch } from "@/js/components/switch";
import { router } from "@inertiajs/react";
import { useState } from "react";
import Event from "@/js/helpers/event";

export default function Component({ accountType, item, categories }) {
    const exists = (id) => {
        return categories.map((d) => d.id).includes(id);
    };
    const [active, setActive] = useState(exists(item.id));

    const onChange = async (active) => {
        setActive(active);
        await axios.patch(
            route("admin.tellers.update_serve_category", {
                accountType: accountType.id,
                category: item.id,
            }),
        );
        router.reload();
        Event.emit(`${accountType.id}.waiting-reload`);
    };

    return (
        <>
            <PrimarySwitch enabled={active} setEnabled={onChange} />
        </>
    );
}
