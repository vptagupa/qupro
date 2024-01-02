import Student from "./student";
import Other from "./other";
import { useEffect } from "react";

export default function Component({ prev, next, controls }) {
    useEffect(() => {
        controls.setEnabledCustom(true);
        controls.setCustomLabel("I'm not student");
        controls.custom(() => {
            controls.form.setData("type", "other");
            controls.setEnabledCustom(false);
        });
    }, []);

    useEffect(() => {
        if (controls.form.data.type == "student") {
            controls.prev(() => {
                prev();
                controls.setEnabledCustom(false);
            });
        }
    }, [controls.form.data.type]);

    return (
        <>
            <div className="min-h-[25rem]">
                {controls.form.data.type === "student" && (
                    <Student
                        next={() => {
                            controls.setEnabledCustom(false);
                            next();
                        }}
                        controls={controls}
                    />
                )}
                {controls.form.data.type === "other" && (
                    <Other controls={controls} />
                )}
            </div>
            <div>
                <controls.Buttons />
            </div>
        </>
    );
}
