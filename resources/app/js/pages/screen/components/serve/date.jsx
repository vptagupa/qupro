import { useRef, useEffect } from "react";

export default function Component() {
    let time = useRef();
    let interval;

    useEffect(() => {
        interval = setInterval(() => {
            if (time.current)
                time.current.innerText = new Date().toLocaleTimeString("en-PH");
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-start">
            <div className="uppercase text-lg">
                {new Date().toLocaleString("en-PH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </div>
            <div
                className="md:text-[3rem] 2xl:text-[5rem] leading-[4rem]"
                ref={time}
            ></div>
        </div>
    );
}
