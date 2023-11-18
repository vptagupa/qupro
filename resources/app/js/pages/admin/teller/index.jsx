import Layout from "@/js/layouts/layout.admin";
import Card from "./components/card";
import { usePage } from "@inertiajs/react";
import Switcher from "./components/switcher";
import { useServe } from "./components/hook/serve.account_type";

const Component = (props) => {
    const { exists } = useServe();
    const { accountTypes } = usePage().props;
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
                        {accountTypes.data
                            .filter((type) => exists(type.id))
                            .map((type) => {
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
