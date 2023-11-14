import { PrimarySwitch } from "@/js/components/switch";
import { useState } from "react";
import { useServe } from "../hook/serve.account_type";

export default ({ type }) => {
    const serve = useServe();
    const [active, setActive] = useState(serve.exists(type.id));
    const enabledHandler = () => {
        setActive(!active);
        serve.toggle(type.id);
    };

    return (
        <>
            <div className="flex gap-2 items-center justify-start border-b border-slate-200 pb-2">
                <div>
                    <PrimarySwitch
                        enabled={active}
                        setEnabled={enabledHandler}
                    />
                </div>
                <div className="text-sm">{type.name}</div>
            </div>
        </>
    );
};
