import Layout from "@/js/layouts/layout.admin";
import Teller from "../../teller";

export default function Component(props) {
    return (
        <>
            <Layout>
                <div className="font-bold text-lg">
                    <a href={route("tellers.index")} target="_blank">
                        View Outside
                    </a>
                </div>
                <div>
                    <Teller url={route("admin.tellers.next")} />
                </div>
            </Layout>
        </>
    );
}
