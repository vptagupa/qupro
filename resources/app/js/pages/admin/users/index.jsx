import Layout from "@/js/layouts/admin-layout";
import Table from "./components/table";
import New from "./components/new";

const Component = (props) => {
    return (
        <>
            <Layout>
                <div className="mb-2">
                    <New roles={props.roles} />
                </div>
                <div className="rounded-2xl shadow-sm bg-white">
                    <div className="rounded-2xl">
                        <Table />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
