import QuInfo from "../qu.info";
import { Button } from "@/js/components/buttons";
import { useEffect } from "react";

const Component = ({ final, ...props }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            final();
        }, 10000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <div>
                <QuInfo {...props} />
                <div className="mt-[20%]">
                    <div className="flex gap-5 items-center justify-center">
                        <Button
                            type="button"
                            className="flex gap-x-2 justify-center h-[5rem] w-[10rem] !text-[1.2rem] text-center text-white uppercase font-extrabold bg-gradient-to-r  from-purple-400 to-fuchsia-400"
                            onClick={(e) => final()}
                        >
                            <span>Done</span>
                        </Button>
                    </div>
                </div>
            </div>
            {process.env.NODE_ENV == "development" && (
                <div className="mt-10">
                    <div>Final Screen</div>
                </div>
            )}
        </>
    );
};

Component.propTypes = {};

export default Component;
