import PropTypes from "prop-types";
import StudetInfo from "../student.info";
import { useEffect } from "react";
import axios from "axios";

const Component = ({ prev, next, ...props }) => {
    const nextHandler = () => {
        props.controls.submit(() => next());
    };

    useEffect(() => {
        props.controls.prev(prev);
        props.controls.next(nextHandler);
        props.controls.setNextLabel("Confirm");
        props.controls.setEnabledPrev(true);
        props.controls.setEnabledCustom(false);
    }, []);
    return (
        <>
            <StudetInfo {...props} />

            {process.env.NODE_ENV == "development" && (
                <div className="mt-10">
                    <div>Third Screen</div>
                </div>
            )}
        </>
    );
};

Component.propTypes = {};

export default Component;
