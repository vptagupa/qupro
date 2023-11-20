import Type from "../account.type";
import { useEffect } from "react";

export default ({ prev, next, ...props }) => {
    useEffect(() => {
        props.controls.setEnabledNext(false);
        if (props.controls.form.data.account_type != "") {
            props.controls.setEnabledNext(true);
        }
    }, [props.controls.form.data.account_type]);

    useEffect(() => {
        props.controls.prev(prev);
        props.controls.next(next);
        props.controls.setEnabledPrev(prev ? true : false);
        props.controls.setNextLabel("Next");
    }, []);

    return (
        <>
            <Type {...props} />
            {process.env.NODE_ENV == "development" && (
                <div className="mt-10">
                    <div>First Screen</div>
                </div>
            )}
        </>
    );
};
