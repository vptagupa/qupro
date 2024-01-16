import PublicLayout from "./public";
import Logo from "@/assets/images/logo.png";

export default (props) => {
    return (
        <PublicLayout>
            <div className="h-screen w-screen  bg-gradient-to-l from-indigo-400 via-indigo-300 to-purple-400 from-50% via-20% to-30%">
                <div className="flex w-full items-center justify-center">
                    <div className="translate-y-[15%] bg-white p-4 rounded-2xl xs:w-4/6 lg:w-1/4">
                        <div className="flex flex-col space-y-6 text-center mb-10 mt-2">
                            <span>
                                <img className="w-[6rem] inline" src={Logo} />
                            </span>
                            <span className="text-4xl font-bold">QuPro</span>
                        </div>
                        <div className="non-draggable">{props.children}</div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};
