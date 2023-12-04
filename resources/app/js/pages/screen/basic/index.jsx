import Layout from "@/js/layouts/public";
import Message from "../components/message";
import Counter from "../base/counter";
import { useSelector } from "react-redux";

export default ({ screen_id, account_type_id }) => {
    const { config } = useSelector((state) => state.counter.data);
    return (
        <Layout>
            <div className="m-auto w-screen h-screen">
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="!h-[80%] lg:w-[30%] xs:w-full  rounded-2xl">
                        <Counter
                            screen_id={screen_id}
                            account_type_id={account_type_id}
                        />
                    </div>
                    <div className="xs:max-sm:hidden">
                        <Message text={config?.message ?? ""} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
