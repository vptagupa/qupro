import Layout from "@/js/layouts/public";
import Media from "../base/media";
import Counter from "../base/counter";
import Serve from "../base/serve";
import Theme from "../components/theme";
import Message from "../components/message";
import { useThemeUpdate } from "../components/theme/update";
import { useDispatch, useSelector } from "react-redux";
import {
    setParam,
    setConfig,
    setData,
    setTheme,
} from "../components/counters/reducer";
import { useEffect } from "react";

export default function Component({
    screen_id,
    account_type,
    category,
    theme,
    account_types,
}) {
    const param = {
        screen_id,
        category_id: category?.id,
        account_type_id: account_type?.id,
    };
    const dispatch = useDispatch();
    const { update } = useThemeUpdate(param);
    const { counter: themeCounter } = useSelector(
        (state) => state.themeCounter,
    );

    const themeMedia = useSelector((state) => state.themeMedia);
    const { config } = useSelector((state) => state.counter.data);

    useEffect(() => {
        dispatch(
            setParam({
                screen_id,
            }),
        );
    }, [screen_id]);

    useEffect(() => {
        if (account_type) {
            dispatch(
                setParam({
                    account_type_id: account_type.id,
                }),
            );
            dispatch(
                setData({
                    account_type,
                }),
            );
        }
    }, [account_type]);

    useEffect(() => {
        if (category) {
            dispatch(
                setParam({
                    category_id: category.id,
                }),
            );
            dispatch(
                setData({
                    category,
                }),
            );
        }
    }, [category]);

    useEffect(() => {
        dispatch(setTheme(theme));
    }, [theme]);

    useEffect(() => {
        dispatch(setData({ account_types }));
    }, [account_types]);

    useEffect(() => {
        if (screen_id) {
            update(theme?.id, {
                screen_id,
                category_id: category?.id,
                account_type_id: account_type?.id,
            });
        }
    }, [screen_id, category, account_type, theme]);

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
                            account_type_id={account_type?.id}
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
                                    account_type_id={account_type?.id}
                                    category_id={category?.id}
                                />
                            </div>
                            <div className="">
                                <Serve
                                    screen_id={screen_id}
                                    account_type_id={account_type?.id}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="bg-slate-900 fixed pb-1 bottom-0 w-full"
                        style={{
                            background: themeMedia.message.set.bg,
                            color: themeMedia.message.set.font,
                        }}
                    >
                        <div className="flex items-center justify-start">
                            <Message text={config?.screen_text ?? ""} />
                        </div>
                    </div>
                </div>
            </div>
            <Theme />
        </Layout>
    );
}
