import Layout from "@/js/layouts/public";
import Qu from "./components/index";
import { usePage } from "@inertiajs/react";

export default function Component() {
    return (
        <Layout>
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#01257D] to-[#00539C]">
                <Qu />
            </div>
        </Layout>
    );
}
