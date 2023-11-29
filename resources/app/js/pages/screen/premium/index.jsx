import Layout from "@/js/layouts/public";
import Message from "../components/message";
import Media from "../components/media";
import Counters from "../components/counters/counters";
import { debounce } from "@/js/helpers";
import { useTickets } from "../tickets";
import { useState, useEffect, useCallback, useRef } from "react";
import Serving from "../components/serving";
import Now from "../components/serving/now";
import beep from "@/assets/audio/2.mp3";
import Pop from "../components/serving/pop";

export default ({ screen_id, department_id }) => {
    const beepRef = useRef();
    const [media, setMedia] = useState([]);
    const { tickets, current, data, config, updated } = useTickets(
        screen_id,
        department_id,
    );

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
        if (beepRef.current) {
            beepRef.current.play();
        }
    }, [current]);

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

    useEffect(() => {
        if (!data.all) {
            setMedia(
                [{ file: data.account_type.file }].concat(
                    ...media.filter(
                        (m) =>
                            m.file.filename != data.account_type.file.filename,
                    ),
                ),
            );
        }
    }, [data.account_type, data.all]);

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
                        <div className="flex grow items-center justify-center">
                            <div className="">
                                {media.length > 0 && (
                                    <Media
                                        media={media}
                                        interval={config?.interval ?? 0}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="h-[25%] flex gap-x-5">
                            <Now />
                            <Serving
                                accountType={data.account_type?.name ?? ""}
                                served={data.served}
                                total={data.total}
                            />
                        </div>
                        <div>
                            <Message text={config?.message ?? ""} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden">
                <audio src={beep} ref={beepRef}></audio>
            </div>
            <Pop current={current} account_type={data.account_type} />
        </Layout>
    );
};
