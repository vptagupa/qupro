import Layout from "@/js/layouts/public";
import Qu from "./index";
import { usePage } from "@inertiajs/react";
export default () => {
    const { config } = usePage().props;
    return (
        <Layout>
            <div className="mt-[5%]">
                <Qu
                    priority={
                        config.enabled_priorit_on_qu_registration == 1
                            ? null
                            : false
                    }
                />
            </div>
        </Layout>
    );
};
