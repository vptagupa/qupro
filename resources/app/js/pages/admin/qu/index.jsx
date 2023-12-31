import Layout from "@/js/layouts/layout.admin";
import Qu from "@/js/pages/qu";

export default ({ priorityEnabled = true }) => {
    return (
        <Layout>
            <div className="font-bold text-lg">
                <a href={route("qu.index")} target="_blank">
                    View outside
                </a>
            </div>
            <div>
                <Qu
                    url={route("admin.qu.store")}
                    priorityEnabled={priorityEnabled}
                />
            </div>
        </Layout>
    );
};
