import PublicLayout from "./public";
import Logo from "@/assets/images/logo.png";

export default (props) => {
    return (
        <PublicLayout>
            <div className="xs:w-4/6 xs:max-sm:mt-[25%] sm:max-md:mt-[20%] md:w-2/5 lg:w-1/4 m-auto pb-7 md:mt-[10%] bg-white p-4 rounded-2xl">
                <div>
                    <div className="flex flex-col space-y-6 text-center mb-10 mt-2">
                        <span>
                            <img className="w-[6rem] inline" src={Logo} />
                        </span>
                        <span className="text-4xl font-bold">QuPro</span>
                    </div>
                    <div>{props.children}</div>
                </div>
            </div>
        </PublicLayout>
    );
};
