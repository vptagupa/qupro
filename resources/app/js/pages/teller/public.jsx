import Teller from "./index";
import Layout from "@/js/layouts/public";

export default function Component() {
    return (
        <Layout>
            <div className="p-2">
                <Teller url={route("tellers.next")} />
            </div>
        </Layout>
    );
}
