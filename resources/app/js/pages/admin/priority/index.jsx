import Layout from "@/js/layouts/layout.admin";
import Component from "@/js/pages/priority";

export default ({ priorityEnabled = true }) => {
    return (
        <Layout>
            <div className="font-bold text-lg">
                <a href={route("priority.index")} target="_blank">
                    View outside
                </a>
            </div>
            <div>
                <Component url={route("admin.priority.store")} />
            </div>
        </Layout>
    );
};
