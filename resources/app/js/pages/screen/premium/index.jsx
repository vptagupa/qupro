import Layout from "@/js/layouts/public";
import Message from "../components/message";
import Media from "../components/media";
import Counters from "../components/counters/counters";
import Current from "../components/current";
import { debounce } from "@/js/helpers";
import { useTickets } from "../tickets";
import { useState, useEffect, useCallback } from "react";

export default ({ screen_id }) => {
    const [media, setMedia] = useState([]);
    const { tickets, current, config, updated, Beep } = useTickets(screen_id);

    const updatedMedia = debounce(
        useCallback(() => {
            axios
                .get(
                    route("screen.updated.media", {
                        screen: screen_id,
                    }),
                )
                .then(({ data: { data } }) => {
                    setMedia(data);
                });
        }, []),
        1000,
    );

    useEffect(() => {
        Echo.private(`media`).listen("MediaRefresh", (e) => {
            updatedMedia();
        });

        return () => {
            Echo.leave(`media`);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            updated();
            updatedMedia();
        }, 1000);
    }, []);

    return (
        <Layout>
            <div className="m-auto w-screen h-screen">
                <div className="flex items-center justify-center xs:max-lg:flex-col">
                    <div className="xs:max-lg:w-full lg:w-[60%] h-screen bg-gradient-to-tl from-purple-800 to-fuchsia-800 font-bold text-white ">
                        <div className="">
                            <Counters tickets={tickets} current={current} />
                        </div>
                    </div>
                    <div className="flex flex-col h-screen shrink xs:max-lg:hidden px-2">
                        <div className="flex items-center justify-center">
                            <div className="">
                                {media.length > 0 && (
                                    <Media
                                        media={media}
                                        interval={config?.interval ?? 0}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="h-[20%]">
                            <Message text={config?.message ?? ""} />
                        </div>
                    </div>
                    <div className="hidden">
                        <Beep />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
