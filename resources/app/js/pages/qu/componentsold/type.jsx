import { InfoButton, WarningButton } from "@/js/components/buttons";
import { UserIcon, UsersIcon } from "@heroicons/react/24/solid";

export default ({ controls: { form } }) => {
    const setType = (type) => {
        if (form.data.type != type) {
            form.setData("type", type);
        } else {
            form.setData("type", "");
        }
    };
    const selectedStyle = "!bg-teal-400";

    const selected = (type) => {
        if (form.data.type != "") {
            if (form.data.type == type) {
                return selectedStyle;
            }
        }

        return "";
    };
    return (
        <>
            <div className="flex gap-5 items-center justify-center">
                <InfoButton
                    type="button"
                    onClick={(e) => setType("student")}
                    className={
                        "flex justify-center h-[7rem] w-[10rem] text-[1.2rem] text-center uppercase font-extrabold " +
                        selected("student")
                    }
                >
                    <span>
                        <UserIcon className="h5" />
                        Student
                    </span>
                </InfoButton>
                <WarningButton
                    type="button"
                    onClick={(e) => setType("other")}
                    className={
                        "flex justify-center h-[7rem] w-[10rem] text-[1.2rem] text-center uppercase font-extrabold " +
                        selected("other")
                    }
                >
                    <span>
                        {" "}
                        <UsersIcon className="h5" />
                        Other
                    </span>
                </WarningButton>
            </div>
        </>
    );
};
