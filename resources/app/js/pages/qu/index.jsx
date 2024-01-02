import ZeroScreen from "./components/screens/zero.screen";
import FirstScreen from "./components/screens/first.screen";
import SecondScreen from "./components/screens/second.screen";
import ThirdScreen from "./components/screens/third.screen";
import FinalScreen from "./components/screens/final.screen";
import { useState, useEffect, memo, useCallback } from "react";
import { useControls } from "./components/controls";
import { usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function Component({ url, priority = null }) {
    const { config } = usePage().props;
    const controls = useControls({ url });

    const [zeroScreen, setZeroScreen] = useState(
        priority == null ? true : false,
    );
    const [firstScreen, setFirstScreen] = useState(
        priority == null ? false : true,
    );
    const [secondScreen, setSecondScreen] = useState(false);
    const [thirdScreen, setThirdScreen] = useState(false);
    const [finalScreen, setFinalScreen] = useState(false);

    const zeroScreenHandler = useCallback(() => {
        setZeroScreen(true);
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFinalScreen(false);
        controls.form.clearErrors();
        controls.form.reset();
    }, [controls]);

    const firstScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(true);
        setSecondScreen(false);
        setThirdScreen(false);
        setFinalScreen(false);
    }, [controls]);

    const secondScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(false);
        setSecondScreen(true);
        setThirdScreen(false);
        setFinalScreen(false);
        controls.form.clearErrors();
    }, [controls]);

    const thirdScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(true);
        setFinalScreen(false);
        controls.form.clearErrors();
    }, [controls]);

    const finalScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFinalScreen(true);
        controls.form.clearErrors();
    }, [controls]);

    const finalHandler = useCallback(() => {
        if (priority === null) {
            zeroScreenHandler();
        } else {
            firstScreenHandler();
        }

        controls.form.clearErrors();
        controls.form.reset();

        if (priority !== null) {
            controls.form.setData("priority", priority);
        }
    }, [priority]);

    useEffect(() => {
        if (priority !== null) {
            controls.form.setData("priority", priority === true);
        }
    }, [priority]);

    return (
        <>
            <div className="m-auto p-5 lg:w-2/3 xs:w-full min-h-[300px] flex flex-col items-center justify-center">
                <Transition
                    show={zeroScreen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute lg:w-2/3 xs:w-full"
                >
                    <ZeroScreen
                        controls={controls}
                        next={
                            config.enabled_categories
                                ? firstScreenHandler
                                : secondScreenHandler
                        }
                    />
                </Transition>

                <Transition
                    show={firstScreen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute lg:w-2/3 xs:w-full"
                >
                    <FirstScreen
                        controls={controls}
                        prev={priority === null ? zeroScreenHandler : null}
                        next={secondScreenHandler}
                    />
                </Transition>

                <Transition
                    show={secondScreen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute lg:w-2/3 xs:w-full"
                >
                    <SecondScreen
                        controls={controls}
                        prev={
                            config.enabled_categories
                                ? firstScreenHandler
                                : zeroScreenHandler
                        }
                        next={thirdScreenHandler}
                        final={finalScreenHandler}
                    />
                </Transition>
                <Transition
                    show={thirdScreen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute lg:w-2/3 xs:w-full"
                >
                    <ThirdScreen
                        controls={controls}
                        prev={secondScreenHandler}
                        next={finalScreenHandler}
                        final={finalScreenHandler}
                    />
                </Transition>
                <Transition
                    show={finalScreen}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute lg:w-2/3 xs:w-full"
                >
                    <FinalScreen final={finalHandler} controls={controls} />
                </Transition>
            </div>

            {!finalScreen && (
                <div className="mt-[5%]">
                    <controls.Controls />
                </div>
            )}
        </>
    );
}
