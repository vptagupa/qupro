import Layout from "@/js/layouts/layout.admin";
import Card from "./components/card";
import Records from "./components/modal/records";
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
                <div className="mb-2">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-4">
                        {accountTypes.data
                            .filter((type) => exists(type.id))
                            .map((type) => {
                                return (
                                    <div key={type.id}>
                                        <Records accountType={type} />
                                        <Card type={type} />
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
