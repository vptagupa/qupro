import Layout from "@/js/layouts/public";
import Message from "../components/message";
import Media from "../components/media";
import Counter from "../components/counter";
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
                    <div className="xs:max-lg:w-full lg:w-[40%] h-screen p-10 bg-slate-300 text-slate-700 rounded-tr-2xl rounded-br-2xl">
                        <div className="text-center text-[5rem] leading-[5rem] uppercase">
                            {current?.num_fulltext ?? "0"}
                        </div>
                        <div className="mt-[15%]">
                            <Counter tickets={tickets} />
                        </div>
                    </div>
                    <div className="flex flex-col h-screen grow xs:max-lg:hidden">
                        <div className="flex items-center justify-center">
                            <div className="p-2">
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
