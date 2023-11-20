import Layout from "@/js/layouts/public";
import Qu from "../qu/index";
export default () => {
    return (
        <Layout>
            <div className="mt-[5%]">
                <Qu url={route("priority.store")} priority={true} />
            </div>
            <div className="text-center">
                <p className="leading-10">Priority Registration</p>
            </div>
        </Layout>
    );
};
