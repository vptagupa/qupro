import Popover from "./popover";
import Tabs from "./tabs";
import Actions from "./actions";
import { memo } from "react";

export default memo(function Component() {
    return (
        <>
            <div className="absolute top-2 right-2">
                <Popover>
                    <Actions />
                    <Tabs />
                </Popover>
            </div>
        </>
    );
});
