import Layout from "@/js/layouts/public";
import Component from "./components2";
import { useDispatch, useSelector } from "react-redux";
import { setAccountTypes } from "./reducer";
import { useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Base() {
    const dispatch = useDispatch();
    const { user } = usePage().props;
    const { accountTypes } = useSelector((state) => state.teller);

    useEffect(() => {
        axios
            .post(route("admin.users.list"), {
                extra: {
                    with: {
                        accountTypes: true,
                        accountTypesCategories: true,
                    },
                    where: { id: user.data.id },
                },
            })
            .then(({ data: { data } }) => {
                dispatch(setAccountTypes(data[0].account_types));
            });
    }, [user]);

    useEffect(() => {
        Echo.private(`${user.data.id}.teller`).listen("TellerFlush", (e) => {
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
            <div className="h-screen bg-gradient-to-tr from-purple-400 to-fuchsia-400 text-white">
                <div className="py-2 m-auto w-full pt-6">
                    <div className="hidden absolute left-2 bottom-1 text-end">
                        <FontAwesomeIcon
                            icon={faClose}
                            className="h-6 text-red-500"
                            onClick={(e) => {}}
                        />
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
