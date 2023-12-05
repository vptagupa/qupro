import Layout from "@/js/layouts/public";
import Component from "./index";

export default () => {
    return (
        <Layout>
            <div className="mt-[5%]">
                <Component url={route("priority.store")} />
            </div>
        </Layout>
    );
};
