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
            <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#01257D] to-[#00539C] text-slate-200">
                <div className="lg:w-[40%] w-full  flex flex-col items-center justify-center">
                    <div className="rounded-2xl h-[80vh]">
                        <Counter
                            screen_id={screen_id}
                            account_type_id={account_type_id}
                        />
                    </div>
                    <div className="xs:max-sm:hidden bg-slate-900 fixed pb-1 bottom-0 w-full">
                        <div className="flex items-center justify-start">
                            <Message text={config?.screen_text ?? ""} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
