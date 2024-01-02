import { useEffect } from "react";
import Categories from "../accounttypes/categories";

export default (props) => {
    useEffect(() => {
        // props.controls.setEnabledNext(false);
        if (props.controls.form.data.category?.id != null) {
            // props.controls.setEnabledNext(true);
        }
    }, [props.controls.form.data.category]);

    useEffect(() => {
        // props.controls.prev(prev);
        // props.controls.next(next);
        // props.controls.setEnabledPrev(prev ? true : false);
        props.controls.setNextLabel("Next");
    }, []);

    return (
        <>
            <Categories {...props} />
            {process.env.NODE_ENV == "development" && (
                <div className="mt-10">
                    <div>First Screen</div>
                </div>
            )}
        </>
    );
};
