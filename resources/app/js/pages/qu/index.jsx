import FirstScreen from "./components/screens/first.screen";
import SecondScreen from "./components/screens/second.screen";
import ThirdScreen from "./components/screens/third.screen";
import FourthScreen from "./components/screens/fourth.screen";
import FinalScreen from "./components/screens/final.screen";
import { useState } from "react";
import { useForm } from "@/js/helpers/form";
import { useControls } from "./components/controls";

export default () => {
    const controls = useControls({});

    const [firstScreen, setFirstScreen] = useState(true);
    const [secondScreen, setSecondScreen] = useState(false);
    const [thirdScreen, setThirdScreen] = useState(false);
    const [fourthScreen, setFourthScreen] = useState(false);
    const [finalScreen, setFinalscreen] = useState(false);

    const firstScreenHandler = () => {
        setFirstScreen(true);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalscreen(false);
        controls.form.clearErrors();
        controls.form.reset();
    };

    const secondScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(true);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalscreen(false);
        controls.form.clearErrors();
    };

    const thirdScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(true);
        setFourthScreen(false);
        setFinalscreen(false);
        controls.form.clearErrors();
    };

    const fourthScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(true);
        setFinalscreen(false);
        controls.form.clearErrors();
    };

    const finalScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalscreen(true);
        controls.form.clearErrors();
    };

    const printHandler = () => {
        firstScreenHandler();
    };

    return (
        <>
            <div className="w-2/3 m-auto mt-[2%] p-5">
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
                {!finalScreen && (
                    <div className="mt-[15%]">
                        <controls.Controls />
                    </div>
                )}
            </div>
        </>
    );
};
