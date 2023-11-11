import PropTypes from "prop-types";
import StudetInfo from "../student.info";
import { useEffect } from "react";

const Component = ({ prev, next, controls, ...props }) => {
    useEffect(() => {
        controls.prev(prev);
        controls.next(next);
        controls.setNextLabel("Confirm");
        controls.setEnabledPrev(true);
    }, []);
    return (
        <>
            <div>
                <div>
                    <StudetInfo {...props} />
                </div>
            </div>
            {process.env.NODE_ENV == "development" && (
                <div className="mt-10">
                    <div>Fourth Screen</div>
                </div>
            )}
        </>
    );
};

Component.propTypes = {};

export default Component;
