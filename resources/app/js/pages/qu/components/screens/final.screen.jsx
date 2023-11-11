import PropTypes from "prop-types";
import QuInfo from "../qu.info";
import { PrimaryButton } from "@/js/components/buttons";
import { PrinterIcon } from "@heroicons/react/24/solid";

const Component = ({ printHandler, ...props }) => {
    return (
        <>
            <div>
                <div>
                    <QuInfo {...props} />
                    <div className="mt-[20%]">
                        <div className="flex gap-5 items-center justify-center">
                            <PrimaryButton
                                type="button"
                                onClick={(e) => printHandler()}
                                className="flex gap-x-2 justify-center h-[7rem] w-[10rem] text-[1.2rem] text-center uppercase font-extrabold"
                            >
                                <span>
                                    <PrinterIcon className="h-10" />
                                </span>
                                <span>Print</span>
                            </PrimaryButton>
                        </div>
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
