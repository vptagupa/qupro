import Layout from "@/js/layouts/public";
import Component from "./components2";
import { useDispatch, useSelector } from "react-redux";
import { setAccountTypes } from "./reducer";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

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
        console.log(user.data.id);
        Echo.private(`${user.data.id}.teller`).listen("TellerFlush", (e) => {
            console.log(e);
            router.reload({
                preserveState: false,
            });
        });

        return () => {
            console.log("Leave");
            Echo.leave(`${user.data.id}.teller`);
        };
    }, []);

    return (
        <Layout>
            <div className="mt-2 m-auto w-full">
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
        </Layout>
    );
}
