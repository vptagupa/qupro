import Layout from "@/js/layouts/public";
import Message from "../components/message";
import Counter from "../base/counter";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfig } from "../components/counters/reducer";

export default function Component({ screen_id, account_type_id }) {
    const dispatch = useDispatch();
    const { config } = useSelector((state) => state.counter.data);

    useEffect(() => {
        Echo.channel("config.screen").listen("FlushConfig", (event) => {
            dispatch(setConfig(event.data));
        });

        return () => {
            Echo.leave("config.screen");
        };
    }, []);

    return (
        <Layout>
            <div className="m-auto w-screen h-screen overflow-hidden bg-layout">
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="!h-[80%] lg:w-[30%] xs:w-full  rounded-2xl grow">
                        <Counter
                            screen_id={screen_id}
                            account_type_id={account_type_id}
                        />
                    </div>
                    <div className="xs:max-sm:hidden">
                        <Message text={config?.screen_text ?? ""} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
