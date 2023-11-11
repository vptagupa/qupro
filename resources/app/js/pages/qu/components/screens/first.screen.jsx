import Type from "../account.type";
import { useEffect } from "react";

export default ({ controls, prev, next, ...props }) => {
    useEffect(() => {
        controls.setEnabledNext(false);
        if (props.form.data.account_type != "") {
            controls.setEnabledNext(true);
        }
    }, [props.form.data.account_type]);

    useEffect(() => {
        controls.prev(prev);
        controls.next(next);
        controls.setEnabledPrev(false);
        controls.setNextLabel("Next");
    }, []);
    return (
        <>
            <Type {...props} />
        </>
    );
};
