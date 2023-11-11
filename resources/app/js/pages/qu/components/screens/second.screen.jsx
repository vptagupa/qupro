import Type from "../type";
import { useState, useEffect } from "react";

export default ({ next, prev, controls, ...props }) => {
    useEffect(() => {
        controls.setEnabledNext(false);
        if (props.form.data.type != "") {
            controls.setEnabledNext(true);
        }
    }, [props.form.data.type]);

    useEffect(() => {
        controls.prev(prev);
        controls.next(next);
        controls.setEnabledPrev(true);
        controls.setNextLabel("Next");
    }, []);

    return (
        <>
            <Type {...props} />
        </>
    );
};
