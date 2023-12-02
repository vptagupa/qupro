import { useRef, useEffect } from "react";

export default function Component() {
    let date = useRef();
    let interval;

    useEffect(() => {
        interval = setInterval(() => {
            if (date.current)
                date.current.innerText = new Date().toLocaleTimeString("en-PH");
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-start">
            <div className="uppercase text-lg">Today</div>
            <div className="text-[5rem] leading-[4rem]" ref={date}></div>
        </div>
    );
}
