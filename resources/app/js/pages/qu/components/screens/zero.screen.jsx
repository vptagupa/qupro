import QuType from "../priority";
import { useEffect } from "react";

export default ({ prev, next, ...props }) => {
    useEffect(() => {
        props.controls.setEnabledNext(false);
        if (props.controls.form.data.priority != null) {
            props.controls.setEnabledNext(true);
        }
    }, [props.controls.form.data.priority]);

    useEffect(() => {
        props.controls.prev(prev);
        props.controls.next(next);
        props.controls.setEnabledPrev(false);
        props.controls.setNextLabel("Next");
    }, []);

    return (
        <>
            <QuType {...props} />
            {process.env.NODE_ENV == "development" && (
                <div className="mt-10">
                    <div>Zero Screen</div>
                </div>
            )}
        </>
    );
};
