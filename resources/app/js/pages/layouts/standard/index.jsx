import Layout from "@/js/layouts/public";

import Message from "../components/message";
import Media from "../components/media";
import Counter from "../components/counter";
import Event from "@/js/helpers/event";
import { useState, useEffect, useCallback } from "react";

export default ({ screen_id }) => {
    const [media, setMedia] = useState([]);
    const [config, setConfig] = useState({
        interval: 5,
        account_type_ids: [],
    });
    const [tickets, setTickets] = useState([]);

    const updated = useCallback(() => {
        axios
            .get(
                route("screen.updated", {
                    screen: screen_id,
                }),
            )
            .then(({ data }) => {
                setMedia(data.media.data);
                setConfig(data.config);
                setTickets(data.tickets);
            });
    }, []);

    useEffect(() => {
        config.account_type_ids.forEach((id) => {
            Echo.private(`${id}.account-type`).listen("QuCalled", (e) => {
                updated();
            });
        });

        return () => {
            config.account_type_ids.forEach((id) => {
                Echo.leave(`${id}.account-type`);
            });
        };
    }, [config.account_type_ids]);

    useEffect(() => {
        setTimeout(() => {
            updated();
        }, 1000);
    }, []);

    return (
        <Layout>
            <div className="m-auto w-screen h-screen">
                <div className="flex items-center justify-center xs:max-lg:flex-col">
                    <div className="xs:max-lg:w-full lg:w-[30%] h-screen p-10">
                        <div className="text-center text-[5rem] leading-[5rem] uppercase">
                            {tickets[0]?.num_fulltext ?? "0"}
                        </div>
                        <div className="mt-[20%]">
                            <Counter tickets={tickets} />
                        </div>
                    </div>
                    <div className="grow xs:max-lg:hidden">
                        <div className="relative h-screen">
                            <div className="absolute top-5 h-[80%] w-full flex items-center justify-center">
                                <div className="p-2">
                                    {media.length > 0 && (
                                        <Media
                                            media={media}
                                            interval={config?.interval ?? 0}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="absolute bottom-0 h-[20%]flex items-center justify-center">
                                <Message text={config?.message ?? ""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
