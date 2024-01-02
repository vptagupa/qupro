import { useEffect } from "react";

import Student from "./student";

export default function Component({ prev, next, controls }) {
    useEffect(() => {
        controls.setEnabledPrev(true);
        controls.setEnabledNext(true);
        controls.prev(prev);
        controls.next(() => controls.submit(() => next()));
        controls.setNextLabel("Confirm");
    }, []);

    return (
        <>
            <div className="min-h-[25rem]">
                <Student data={controls.form.data.student_info} />
            </div>
            <div>
                <controls.Buttons />
            </div>
        </>
    );
}
