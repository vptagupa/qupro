import Layout from "@/js/layouts/admin-layout";
import { Button } from "../../../components/buttons";
import Table from "./components/table";
import { PlusIcon } from "@heroicons/react/24/solid";

const Component = () => {
    return (
        <>
            <Layout>
                <div className="mb-2">
                    <Button className="flex items-center space-x-1 bg-none shadow-none text-purple-500 font-bold btn-sm">
                        <PlusIcon className="h-4" />
                        <span>Add New</span>
                    </Button>
                </div>
                <div className="rounded-2xl shadow-sm bg-white">
                    <div className="rounded-2xl">
                        <Table />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
