import Layout from "@/js/layouts/layout.admin";
import Qu from "@/js/pages/qu";

export default () => {
    return (
        <Layout>
            <div className="font-bold text-lg">
                <a href={route("qu.index")} target="_blank">
                    View outside
                </a>
            </div>
            <div>
                <Qu url={route("admin.qu.store")} />
            </div>
        </Layout>
    );
};
