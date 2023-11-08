import Layout from "@/js/layouts/layout.admin";
import Table from "./components/table";
import New from "./components/new";

const Component = (props) => {
    return (
        <>
            <Layout>
                <div className="font-bold text-lg">User</div>
                <div className="mb-2">
                    <New roles={props.roles} />
                </div>
                <div className="rounded-2xl shadow-sm bg-white pt-2 pb-3">
                    <div className="rounded-2xl">
                        <Table roles={props.roles} />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
