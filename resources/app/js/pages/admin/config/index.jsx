import Layout from "@/js/layouts/layout.admin";
import SharedFormat from "./components/config";

const Component = (props) => {
    return (
        <>
            <Layout>
                <div className="font-bold text-lg mb-4">Configurations</div>
                <div className="grid lg:grid-cols-2 xs:grid-cols-1">
                    <div>
                        <div className="text-md mb-2">Shared Series</div>
                        <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                            <div className="rounded-2xl">
                                <SharedFormat />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
