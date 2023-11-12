import FirstScreen from "./components/screens/first.screen";
import SecondScreen from "./components/screens/second.screen";
import ThirdScreen from "./components/screens/third.screen";
import FourthScreen from "./components/screens/fourth.screen";
import FinalScreen from "./components/screens/final.screen";
import { useState, useMemo, memo, useCallback } from "react";
import { useControls } from "./components/controls";

export default () => {
    const controls = useControls({});

    const [firstScreen, setFirstScreen] = useState(true);
    const [secondScreen, setSecondScreen] = useState(false);
    const [thirdScreen, setThirdScreen] = useState(false);
    const [fourthScreen, setFourthScreen] = useState(false);
    const [finalScreen, setFinalscreen] = useState(false);

    const firstScreenHandler = useCallback(() => {
        setFirstScreen(true);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalscreen(false);
        controls.form.clearErrors();
        controls.form.reset();
    }, [controls]);

    const secondScreenHandler = useCallback(() => {
        setFirstScreen(false);
        setSecondScreen(true);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalscreen(false);
        controls.form.clearErrors();
    }, [controls]);

    const thirdScreenHandler = useCallback(() => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(true);
        setFourthScreen(false);
        setFinalscreen(false);
        controls.form.clearErrors();
    }, [controls]);

    const fourthScreenHandler = useCallback(() => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(true);
        setFinalscreen(false);
        controls.form.clearErrors();
    }, [controls]);

    const finalScreenHandler = useCallback(() => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalscreen(true);
        controls.form.clearErrors();
    }, [controls]);

    const printHandler = useCallback(() => {
        firstScreenHandler();
    }, []);

    const Transition = memo((props) => {
        return props.show && props.children;
    });

    return (
        <>
            <div className="lg:w-2/3 xs:w-full m-auto mt-[2%] p-5">
                <div className="h-[300px] flex flex-col items-center justify-center">
                    {firstScreen && (
                        <FirstScreen
                            controls={controls}
                            prev={firstScreenHandler}
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

                <Transition show={!finalScreen}>
                    <div className="mt-[15%]">
                        <controls.Controls />
                    </div>
                </Transition>
            </div>
        </>
    );
};
