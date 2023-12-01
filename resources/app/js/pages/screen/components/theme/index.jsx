import Popover from "./popover";
import Tabs from "./tabs";
import Actions from "./actions";

const Component = () => {
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
};

export default Component;
