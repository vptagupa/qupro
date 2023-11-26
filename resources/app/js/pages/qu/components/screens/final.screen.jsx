import PropTypes from "prop-types";
import QuInfo from "../qu.info";
import { Button } from "@/js/components/buttons";
import { PrinterIcon } from "@heroicons/react/24/solid";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { print } from "@/js/helpers";

const Component = ({ printHandler, ...props }) => {
    const [loading, setLoading] = useState(false);
    const printer = () => {
        setLoading(true);
        print(props.controls.form.data.qu.num_fulltext)
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                printHandler();
                setLoading(false);
            });
    };
    return (
        <>
            <div>
                <div>
                    <QuInfo {...props} />
                    <div className="mt-[20%]">
                        <div className="flex gap-5 items-center justify-center">
                            <Button
                                type="button"
                                onClick={(e) => printer()}
                                className="flex gap-x-2 justify-center h-[5rem] w-[10rem] text-[1.2rem] text-center text-white uppercase font-extrabold bg-gradient-to-r  from-purple-400 to-fuchsia-400"
                            >
                                <span>
                                    {loading ? (
                                        <FontAwesomeIcon
                                            className="animate-spin  h-6"
                                            icon={faSpinner}
                                        />
                                    ) : (
                                        <PrinterIcon className="h-10" />
                                    )}
                                </span>
                                <span>Print</span>
                            </Button>
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
