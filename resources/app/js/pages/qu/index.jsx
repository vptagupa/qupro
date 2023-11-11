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
    const { form } = useForm({
        method: "post",
        route: route("admin.account-types.store"),
        data: {
            name: "",
            student_no: "",
            student_name: "Victor Tagupa Jr",
            type: "",
            account_type: "",
            is_representative: false,
            student_info: {
                student_no: "",
                name: "",
                course_code: "",
                course: "",
            },
        },
    });

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
        form.clearErrors();
        form.reset();
    };

    const secondScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(true);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalscreen(false);
        form.clearErrors();
    };

    const thirdScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(true);
        setFourthScreen(false);
        setFinalscreen(false);
        form.clearErrors();
    };

    const fourthScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(true);
        setFinalscreen(false);
        form.clearErrors();
    };

    const finalScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFourthScreen(false);
        setFinalscreen(true);
        form.clearErrors();
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
                            form={form}
                        />
                    )}
                    {secondScreen && (
                        <SecondScreen
                            controls={controls}
                            prev={firstScreenHandler}
                            next={thirdScreenHandler}
                            form={form}
                        />
                    )}
                    {thirdScreen && (
                        <ThirdScreen
                            controls={controls}
                            prev={secondScreenHandler}
                            next={fourthScreenHandler}
                            final={finalScreenHandler}
                            form={form}
                        />
                    )}
                    {fourthScreen && (
                        <FourthScreen
                            controls={controls}
                            prev={thirdScreenHandler}
                            next={finalScreenHandler}
                            form={form}
                        />
                    )}
                    {finalScreen && (
                        <FinalScreen printHandler={printHandler} form={form} />
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
