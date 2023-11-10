import PropTypes from "prop-types";
import StudetInfo from "./student.info";
import { PrimaryButton, Button } from "@/js/components/buttons";

const Component = ({ secondScreenHandler, finalScreenHandler, ...props }) => {
    return (
        <>
            <div>
                <div>
                    <StudetInfo {...props} />
                    <div className="mt-[15%]">
                        <div className="flex gap-5 items-center justify-center">
                            <Button
                                onClick={(e) => secondScreenHandler()}
                                className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] bg-slate-300 text-center uppercase font-extrabold"
                            >
                                <span>Back</span>
                            </Button>
                            <PrimaryButton
                                onClick={(e) => finalScreenHandler()}
                                className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] text-center uppercase font-extrabold"
                            >
                                <span>CONFIRM</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Component.propTypes = {};

export default Component;
