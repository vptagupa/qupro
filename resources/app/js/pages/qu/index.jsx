import ZeroScreen from "./components/screens/zero.screen";
import FirstScreen from "./components/screens/first.screen";
import SecondScreen from "./components/screens/second.screen";
import ThirdScreen from "./components/screens/third.screen";
import FourthScreen from "./components/screens/fourth.screen";
import FinalScreen from "./components/screens/final.screen";
import { useState, useEffect, memo, useCallback } from "react";
import { useControls } from "./components/controls";

export default ({ url, priority = null }) => {
    const controls = useControls({ url });

    const [zeroScreen, setZeroScreen] = useState(
        priority == null ? true : false,
    );
    const [firstScreen, setFirstScreen] = useState(
        priority == null ? false : true,
    );
    const [secondScreen, setSecondScreen] = useState(false);
    const [thirdScreen, setThirdScreen] = useState(false);
    const [fourthScreen, setFourthScreen] = useState(false);
    const [finalScreen, setFinalScreen] = useState(false);

    const zeroScreenHandler = useCallback(() => {
        setZeroScreen(true);
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalScreen(false);
        controls.form.clearErrors();
        controls.form.reset();
    }, [controls]);

    const firstScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(true);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalScreen(false);
    }, [controls]);

    const secondScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(false);
        setFirstScreen(false);
        setSecondScreen(true);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalScreen(false);
        controls.form.clearErrors();
    }, [controls]);

    const thirdScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(false);
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(true);
        setFourthScreen(false);
        setFinalScreen(false);
        controls.form.clearErrors();
    }, [controls]);

    const fourthScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(false);
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(true);
        setFinalScreen(false);
        controls.form.clearErrors();
    }, [controls]);

    const finalScreenHandler = useCallback(() => {
        setZeroScreen(false);
        setFirstScreen(false);
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalScreen(true);
        controls.form.clearErrors();
    }, [controls]);

    const printHandler = useCallback(() => {
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
    }, []);

    useEffect(() => {
        if (priority !== null) {
            controls.form.setData("priority", priority === true);
        }
    }, []);

    return (
        <>
            <div className="lg:w-2/3 xs:w-full m-auto mt-[2%] p-5">
                <div className="h-[300px] flex flex-col items-center justify-center">
                    {zeroScreen && (
                        <ZeroScreen
                            controls={controls}
                            next={firstScreenHandler}
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
                            prev={firstScreenHandler}
                            next={thirdScreenHandler}
                        />
                    )}
                    {thirdScreen && (
                        <ThirdScreen
                            controls={controls}
                            prev={secondScreenHandler}
                            next={fourthScreenHandler}
                            final={finalScreenHandler}
                        />
                    )}
                    {fourthScreen && (
                        <FourthScreen
                            controls={controls}
                            prev={thirdScreenHandler}
                            next={finalScreenHandler}
                        />
                    )}
                    {finalScreen && (
                        <FinalScreen
                            printHandler={printHandler}
                            controls={controls}
                        />
                    )}
                </div>

                {!finalScreen && (
                    <div className="mt-[15%]">
                        <controls.Controls />
                    </div>
                )}
            </div>
        </>
    );
};
