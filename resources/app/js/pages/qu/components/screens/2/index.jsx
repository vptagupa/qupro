import Student from "./student";
import Other from "./other";
import { useEffect } from "react";

export default function Component({ prev, final, next, controls }) {
    useEffect(() => {
        controls.setCustomLabel("I'm not student");
        controls.custom(() => {
            controls.form.setData("type", "other");
            controls.setEnabledCustom(false);
        });
    }, [controls.form]);

    useEffect(() => {
        controls.setEnabledCustom(controls.form.data.type === "student");
        if (controls.form.data.type === "student") {
            controls.prev(() => {
                prev();
                controls.setEnabledCustom(false);
            });
        }
    }, [controls.form.data.type]);

    return (
        <div className="flex flex-col items-center justify-center w-2/3">
            <div className="min-h-[20rem]">
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
                    <Other
                        final={final}
                        next={() => {
                            controls.setEnabledCustom(false);
                            next();
                        }}
                        controls={controls}
                    />
                )}
            </div>
            <div className="mt-4">
                <controls.Buttons />
            </div>
        </div>
    );
}
