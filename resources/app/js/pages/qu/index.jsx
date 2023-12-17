import ZeroScreen from "./components/screens/zero.screen";
import FirstScreen from "./components/screens/first.screen";
import SecondScreen from "./components/screens/second.screen";
import ThirdScreen from "./components/screens/third.screen";
import FinalScreen from "./components/screens/final.screen";
import { useState, useEffect, memo, useCallback } from "react";
import { useControls } from "./components/controls";
import { usePage } from "@inertiajs/react";

export default ({ url, priority = null }) => {
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
            <div className="lg:w-2/3 xs:w-full m-auto mt-[2%] p-5">
                <div className="min-h-[300px] flex flex-col items-center justify-center">
                    {zeroScreen && (
                        <ZeroScreen
                            controls={controls}
                            next={
                                config.enabled_categories
                                    ? firstScreenHandler
                                    : secondScreenHandler
                            }
                        />
                    )}
                    {firstScreen && (
                        <FirstScreen
                            controls={controls}
                            prev={priority === null ? zeroScreenHandler : null}
                            next={secondScreenHandler}
                        />
                    )}
                    {secondScreen && (
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
                    )}
                    {thirdScreen && (
                        <ThirdScreen
                            controls={controls}
                            prev={secondScreenHandler}
                            next={finalScreenHandler}
                            final={finalScreenHandler}
                        />
                    )}

                    {finalScreen && (
                        <FinalScreen final={finalHandler} controls={controls} />
                    )}
                </div>

                {!finalScreen && (
                    <div className="mt-[5%]">
                        <controls.Controls />
                    </div>
                )}
            </div>
        </>
    );
};
