import Type from "../type";
import { useState, useEffect } from "react";

export default ({ next, prev, ...props }) => {
    useEffect(() => {
        props.controls.setEnabledNext(false);
        if (props.controls.form.data.type != "") {
            props.controls.setEnabledNext(true);
        }
    }, [props.controls.form.data.type]);

    useEffect(() => {
        props.controls.prev(prev);
        props.controls.next(next);
        props.controls.setEnabledPrev(true);
        props.controls.setNextLabel("Next");
    }, []);

    return (
        <>
            <Type {...props} />
            {process.env.NODE_ENV == "development" && (
                <div className="mt-10">
                    <div>Second Screen</div>
                </div>
            )}
        </>
    );
};
