import Layout from "@/js/layouts/layout.admin";
import Teller from "../../teller";

export default function Component(props) {
    return (
        <>
            <Layout>
                <Teller url={route("admin.tellers.next")} />
            </Layout>
        </>
    );
}
