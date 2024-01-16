import Nav from "./nav";
import Sidebar from "./sidebar";
import Content from "./content";
import Footer from "./footer";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Logo from "@/assets/images/logo.png";

const Layout = (props) => {
    return (
        <>
            <div className="bg-slate-100 non-draggable">
                <div className="flex">
                    <div className="w-48 xs:hidden lg:block">
                        <div className="px-10 py-5">
                            <div className="flex mb-3">
                                <div className="lg:hidden mr-2">
                                    <button>
                                        <Bars3Icon className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="xs:grow lg:flex-none text-center">
                                    <img
                                        className="w-[3rem]  inline mr-2"
                                        src={Logo}
                                    />
                                    <span className="xs:max-sm:hidden inline text-slate-600 text-md font-semibold">
                                        QuPro
                                    </span>
                                </div>
                            </div>
                            <hr className="mb-3" />
                            <div>
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                    <div className="grow px-10 py-3 text-slate-500">
                        <div className="flex flex-col w-full">
                            <Nav />
                            <div className="mt-0 lg:min-h-[600px]">
                                <Content>{props.children}</Content>
                            </div>
                            <div className="text-xs mt-5 text-start">
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
