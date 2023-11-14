import Layout from "@/js/layouts/layout.admin";
import Card from "./components/card";
import Records from "./components/modal/records";
import { usePage } from "@inertiajs/react";

const Component = (props) => {
    const { accountTypes } = usePage().props;
    return (
        <>
            <Layout>
                <div className="font-bold text-lg">Teller</div>
                <div className="mb-2">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-4">
                        {accountTypes.data.map((type) => {
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
