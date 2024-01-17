import Layout from "@/js/layouts/public";
import Media from "../base/media";
import Counter from "../base/counter";
import Serve from "../base/serve";
import Theme from "../components/theme";
import Message from "../components/message";
import { useThemeUpdate } from "../components/theme/update";
import { useDispatch, useSelector } from "react-redux";
import { setParam, setConfig, setData } from "../components/counters/reducer";
import { useEffect } from "react";

export default function Component({
    screen_id,
    account_type_id,
    account_type,
}) {
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
        update(
            account_type_id != null ? "account_type" : "screen",
            account_type_id != null ? account_type_id : screen_id,
        );
    }, [screen_id, account_type_id]);

    useEffect(() => {
        if (account_type) {
            dispatch(setData({ account_type }));
        }
    }, [account_type]);

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
            <div className="m-auto w-screen h-screen">
                <div className="flex items-center justify-center xs:max-lg:flex-col bg-gradient-to-br from-[#01257D] to-[#00539C] text-slate-200">
                    <div
                        className="xs:max-lg:w-full w-[35%] h-screen overflow-hidden  font-bold text-white "
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
                        className="w-[65%] h-screen xs:max-lg:hidden"
                        style={{
                            background: themeMedia.media.set.bg,
                            color: themeMedia.media.set.font,
                        }}
                    >
                        <div className="flex flex-col">
                            <div className="flex overflow-hidden grow items-center justify-center mt-2">
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
                        </div>
                    </div>
                    <div
                        className="bg-slate-900 py-1 fixed bottom-0 w-full"
                        style={{
                            background: themeMedia.message.set.bg,
                            color: themeMedia.message.set.font,
                        }}
                    >
                        <div className="flex justify-start">
                            <Message text={config?.screen_text ?? ""} />
                        </div>
                    </div>
                </div>
            </div>
            <Theme />
        </Layout>
    );
}
