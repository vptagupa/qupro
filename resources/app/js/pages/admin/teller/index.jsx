import Layout from "@/js/layouts/layout.admin";
import Card from "./components/card";
import { usePage } from "@inertiajs/react";

const Component = (props) => {
    const { accountTypes } = usePage().props;

    return (
        <>
            <Layout>
                <div className="font-bold text-lg">Teller</div>
                <div className="mb-2">
                    <div className="grid grid-cols-4 gap-4">
                        {accountTypes.data.map((type) => {
                            return (
                                <div key={type.id}>
                                    <div className="uppercase font-extrabold text-center">
                                        {type.name}
                                    </div>
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
