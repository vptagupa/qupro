import { HomeIcon, UsersIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export default () => {
    return (
        <>
            <ul className="text-sm w-40">
                <li className="shadow-md py-2 px-3 rounded-lg">
                    <a href="#">
                        <div className="flex items-center">
                            <div className="mr-2 bg-purple-500 text-white p-2 rounded-lg">
                                <HomeIcon className="h-3" />
                            </div>
                            <div className="text-xs text-slate-500 font-bold antialiased">
                                Dashboard
                            </div>
                        </div>
                    </a>
                </li>
                <li className="py-2 px-3">
                    <a href="#">
                        <div className="flex items-center">
                            <div className="shadow-md mr-2 text-slate-500 p-2 rounded-lg">
                                <UsersIcon className="h-3" />
                            </div>
                            <div className="text-xs text-slate-500 antialiased font-medium">
                                Teller
                            </div>
                        </div>
                    </a>
                </li>
                <li className="py-2 px-3">
                    <a href="#">
                        <div className="flex items-center">
                            <div className="shadow-md mr-2 text-slate-500 p-2 rounded-lg">
                                <UserGroupIcon className="h-3" />
                            </div>
                            <div className="text-xs text-slate-500 antialiased font-medium">
                                Users
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </>
    );
};
