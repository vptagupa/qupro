import Layout from "@/js/layouts/public";
import Media from "../base/media";
import Counter from "../base/counter";
import Serve from "../base/serve";
import Message from "../components/message";
import { useThemeUpdate } from "../components/theme/update";
import { useDispatch } from "react-redux";
import { setParam } from "../components/counters/reducer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Component({ screen_id, account_type_id }) {
    const dispatch = useDispatch();
    const { update } = useThemeUpdate(account_type_id);
    const { counter: themeCounter } = useSelector(
        (state) => state.themeCounter,
    );
    const themeMedia = useSelector((state) => state.themeMedia);
    const { config } = useSelector((state) => state.counter.data);

    useEffect(() => {
        dispatch(setParam({ screen_id, account_type_id }));
    }, [screen_id, account_type_id]);

    useEffect(() => {
        update();
    }, [screen_id, account_type_id]);

    return (
        <Layout>
            <div className="m-auto w-screen h-screen">
                <div className="flex items-center justify-center xs:max-lg:flex-col">
                    <div
                        className="xs:max-lg:w-full w-[30%] h-screen bg-gradient-to-tl from-purple-800 to-fuchsia-800 font-bold text-white "
                        style={{
                            background: themeCounter.set.bg,
                        }}
                    >
                        <Counter
                            screen_id={screen_id}
                            account_type_id={account_type_id}
                        />
                    </div>
                    <div
                        className="w-[70%] h-screen xs:max-lg:hidden"
                        style={{
                            background: themeMedia.media.set.bg,
                            color: themeMedia.media.set.font,
                        }}
                    >
                        <div className="flex flex-col">
                            <div className="flex h-[75%] grow items-center justify-center mt-2">
                                <Media
                                    screen_id={screen_id}
                                    account_type_id={account_type_id}
                                />
                            </div>
                            <div className="">
                                <Serve
                                    screen_id={screen_id}
                                    account_type_id={account_type_id}
                                />
                            </div>
                            <div>
                                <Message
                                    text={config?.message ?? ""}
                                    style={{
                                        background: themeMedia.message.set.bg,
                                        color: themeMedia.message.set.font,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
