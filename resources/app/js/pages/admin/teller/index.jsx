import Layout from "@/js/layouts/layout.admin";
import Card from "./components/card";
import { usePage } from "@inertiajs/react";
import Switcher from "./components/switcher";
import { useDispatch, useSelector } from "react-redux";
import { setAccountTypes } from "./reducer";
import { useEffect } from "react";

const Component = (props) => {
    const dispatch = useDispatch();
    const { accountTypes } = useSelector((state) => state.teller);
    const { user } = usePage().props;

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

    return (
        <>
            <Layout>
                <div className="font-bold text-lg flex justify-between items-center gap-2">
                    <div>Teller</div>
                    <div>
                        <Switcher />
                    </div>
                </div>
                <div className="mt-2 m-auto w-full">
                    <div className="flex flex-wrap justify-center gap-4">
                        {accountTypes.map((type) => {
                            return (
                                <div
                                    key={type.id}
                                    className="lg:w-1/4 md:w-1/3 sm:w-1/2 xs:w-full"
                                >
                                    <Card accountType={type} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
