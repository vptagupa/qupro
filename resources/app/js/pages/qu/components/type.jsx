import { PrimaryButton, Button } from "@/js/components/buttons";
export default ({ form, secondScreenHandler }) => {
    const nextScreen = (type) => {
        secondScreenHandler();
        form.setData("type", type);
        form.clearErrors();
    };
    return (
        <>
            <div className="flex gap-5 items-center justify-center">
                <PrimaryButton
                    type="button"
                    onClick={(e) => nextScreen("student")}
                    className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] text-center uppercase font-extrabold"
                >
                    <span>Student</span>
                </PrimaryButton>
                <Button
                    type="button"
                    onClick={(e) => nextScreen("other")}
                    className="flex justify-center h-[7rem] w-[10rem] text-[1.2rem] bg-slate-300 text-center uppercase font-extrabold"
                >
                    <span>Other</span>
                </Button>
            </div>
        </>
    );
};
