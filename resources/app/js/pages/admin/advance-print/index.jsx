import Layout from "@/js/layouts/layout.admin";
import Form from "./components/form";

const Component = (props) => {
    return (
        <>
            <Layout>
                <div className="lg:w-2/3 xs:w-full m-auto mt-[10%] p-5">
                    <div className="h-[300px] flex flex-col items-center justify-center">
                        <Form />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Component;
