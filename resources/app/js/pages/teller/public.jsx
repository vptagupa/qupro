import Layout from "@/js/layouts/public";
import Component from "./components2";
import { useDispatch, useSelector } from "react-redux";
import { setAccountTypes } from "./reducer";
import { useEffect } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClose,
    faToolbox,
    faUserAltSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function Base() {
    const dispatch = useDispatch();
    const { user, page_id } = usePage().props;
    const { accountTypes } = useSelector((state) => state.teller);

    useEffect(() => {
        dispatch(setAccountTypes(user.data.account_types));
    }, [user]);

    useEffect(() => {
        Echo.private(`${user.data.id}.teller`).listen("TellerFlush", (e) => {
            if (e.pageId != page_id)
                router.reload({
                    preserveState: false,
                });
        });

        return () => {
            Echo.leave(`${user.data.id}.teller`);
        };
    }, []);

    return (
        <Layout>
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#01257D] to-[#00539C] text-white">
                <div className="py-2 m-auto w-full pt-6">
                    <div className="absolute top-0 mt-1 ml-1 non-draggable flex justify-end">
                        <ol className="flex items-center">
                            <li className="float-left px-1">
                                <Link
                                    href={route("admin.logout")}
                                    className="text-xs text-blue-500 hover:underline hover:text-blue-200"
                                    title="Logout"
                                >
                                    <FontAwesomeIcon
                                        icon={faUserAltSlash}
                                        className="h-4"
                                    />
                                </Link>
                            </li>
                            <li className="float-left px-1">
                                <Link
                                    href={route("admin.tellers.index")}
                                    className="text-xs text-blue-500 hover:underline hover:text-blue-200"
                                    title="Dashboard"
                                >
                                    <FontAwesomeIcon
                                        icon={faToolbox}
                                        className="h-4"
                                    />
                                </Link>
                            </li>
                            <li className="float-left px-1 text-xs text-blue-500 uppercase">
                                {user.data.name}
                            </li>
                        </ol>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {accountTypes.map((type) => {
                            return (
                                <div
                                    key={type.id}
                                    className="lg:w-1/4 md:w-1/3 sm:w-1/2 xs:w-full"
                                >
                                    <Component
                                        accountType={type}
                                        url={route("tellers.next")}
                                        page_id={page_id}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
