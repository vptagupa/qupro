import Layout from "@/js/layouts/public";
import Media from "./media";
import Counter from "./counter";
import Theme from "../components/theme";
import Serve from "./serve";
import Message from "../components/message";
import { useDispatch } from "react-redux";
import { setParam } from "../components/counters/reducer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default ({ screen_id, account_type_id }) => {
    const dispatch = useDispatch();
    const { config } = useSelector((state) => state.counter.data);

    useEffect(() => {
        dispatch(setParam(screen_id, account_type_id));
    }, [screen_id, account_type_id]);

    return (
        <Layout>
            <div className="m-auto w-screen h-screen">
                <div className="flex items-center justify-center xs:max-lg:flex-col">
                    <div
                        className="xs:max-lg:w-full w-[30%] h-screen bg-gradient-to-tl from-purple-800 to-fuchsia-800 font-bold text-white "
                        style={{
                            background: null,
                        }}
                    >
                        <Counter
                            screen_id={screen_id}
                            account_type_id={account_type_id}
                        />
                    </div>
                    <div className="w-[70%] h-screen xs:max-lg:hidden">
                        <div className="flex flex-col">
                            <div className="flex h-[75%] grow items-center justify-center mt-2">
                                <Media screen_id={screen_id} />
                            </div>
                            <div className="flex gap-x-5 pr-4">
                                <Serve />
                            </div>
                            <div>
                                <Message text={config?.message ?? ""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Theme />
        </Layout>
    );
};
