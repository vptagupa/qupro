import Layout from "@/js/layouts/public";

import Message from "../components/message";
import Media from "../components/media";
import Counter from "../components/counter";
import Event from "@/js/helpers/event";
import { useEffect } from "react";

export default ({ media, config, qus, account_type_ids }) => {
    useEffect(() => {
        Event.on();
    }, []);

    return (
        <Layout>
            <div className="m-auto w-screen h-screen">
                <div className="flex items-center justify-center xs:max-lg:flex-col">
                    <div className="xs:max-lg:w-full lg:w-[30%] h-screen p-10">
                        <div className="text-center text-[5rem] leading-[5rem] uppercase">
                            {qus[0]?.num_fulltext ?? "0"}
                        </div>
                        <div className="mt-[20%]">
                            <Counter qus={qus} />
                        </div>
                    </div>
                    <div className="grow xs:max-lg:hidden">
                        <div className="relative h-screen">
                            <div className="absolute top-5 h-[80%] w-full flex items-center justify-center">
                                <div className="p-2">
                                    <Media
                                        media={media.data}
                                        interval={config.interval}
                                    />
                                </div>
                            </div>
                            <div className="absolute bottom-0 h-[20%]flex items-center justify-center">
                                <Message text={config.message} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
