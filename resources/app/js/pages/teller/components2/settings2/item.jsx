import { PrimarySwitch } from "@/js/components/switch";
import { useState } from "react";
export default function Component({ type }) {
    const [active, setActive] = useState(false);
    const onChange = (active) => {
        setActive(active);
    };

    return (
        <>
            <div className="flex gap-2 items-center justify-start border-b border-slate-200 pb-2 last:border-b-0">
                <div>
                    <PrimarySwitch enabled={active} setEnabled={onChange} />
                </div>
                <div className="text-sm">{type.name}</div>
            </div>
        </>
    );
}
