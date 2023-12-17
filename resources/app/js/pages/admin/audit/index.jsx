import Layout from "@/js/layouts/layout.admin";
import Table from "./components/table";

const Component = (props) => {
    return (
        <>
            <Layout>
                <div className="font-bold text-lg">Audit Trails</div>
                <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                    <div className="rounded-2xl">
                        <Table />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
