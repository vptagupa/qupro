import Set from "./template";
import Tabs from "./tabs";

const Component = () => {
    return (
        <>
            <div className="absolute top-2 right-2">
                <Set>
                    <Tabs />
                </Set>
            </div>
        </>
    );
};

export default Component;
