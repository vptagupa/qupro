import FirstScreen from "./components/first.screen";
import SecondScreen from "./components/second.screen";
import ThirdScreen from "./components/third.screen";
import FinalScreen from "./components/final.screen";
import { useState } from "react";
import { useForm } from "@/js/helpers/form";

export default () => {
    const { form } = useForm({
        method: "post",
        route: route("admin.account-types.store"),
        data: {
            name: "",
            student_no: "",
            student_name: "Victor Tagupa Jr",
            type: "",
            account_type: "",
            is_presentative: false,
        },
    });

    const [firstScreen, setFirstScreen] = useState(true);
    const [secondScreen, setSecondScreen] = useState(false);
    const [thirdScreen, setThirdScreen] = useState(false);
    const [finalScreen, setFinalscreen] = useState(false);

    const firstScreenHandler = () => {
        setFirstScreen(true);
        setSecondScreen(false);
        setThirdScreen(false);
        setFinalscreen(false);
    };

    const secondScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(true);
        setThirdScreen(false);
        setFinalscreen(false);
    };

    const thirdScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(true);
        setFinalscreen(false);
    };

    const finalScreenHandler = () => {
        setFirstScreen(false);
        setSecondScreen(false);
        setThirdScreen(false);
        setFinalscreen(true);
    };

    const printHandler = () => {
        firstScreenHandler();
    };

    return (
        <>
            <div className="w-1/2 m-auto mt-[5%] p-5">
                {firstScreen && (
                    <FirstScreen
                        firstScreenHandler={firstScreenHandler}
                        secondScreenHandler={secondScreenHandler}
                        form={form}
                    />
                )}
                {secondScreen && (
                    <SecondScreen
                        firstScreenHandler={firstScreenHandler}
                        thirdScreenHandler={thirdScreenHandler}
                        finalScreenHandler={finalScreenHandler}
                        form={form}
                    />
                )}
                {thirdScreen && (
                    <ThirdScreen
                        secondScreenHandler={secondScreenHandler}
                        finalScreenHandler={finalScreenHandler}
                        form={form}
                    />
                )}
                {finalScreen && (
                    <FinalScreen printHandler={printHandler} form={form} />
                )}
            </div>
        </>
    );
};
