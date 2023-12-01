import Set from "./template";
import Tabs from "./tabs";
import Actions from "./actions";

const Component = () => {
    return (
        <>
            <div className="absolute top-2 right-2">
                <Set>
                    <Actions />
                    <Tabs />
                </Set>
            </div>
        </>
    );
};

export default Component;
