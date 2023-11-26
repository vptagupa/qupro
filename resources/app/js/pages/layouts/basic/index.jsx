import Layout from "@/js/layouts/public";
import Message from "../components/message";
import Counter from "../components/counter";
import { debounce } from "@/js/helpers";
import { useState, useEffect, useCallback } from "react";

export default ({ screen_id }) => {
    const [config, setConfig] = useState({
        interval: 5,
        account_type_ids: [],
    });
    const [tickets, setTickets] = useState([]);

    const updated = debounce(
        useCallback(() => {
            axios
                .get(
                    route("screen.updated", {
                        screen: screen_id,
                    }),
                )
                .then(({ data }) => {
                    setConfig(data.config);
                    setTickets(data.tickets);
                });
        }, []),
        1000,
    );

    useEffect(() => {
        Echo.private(`${screen_id}.screen`).listen("ScreenRefresh", (e) => {
            updated();
        });

        config.account_type_ids.forEach((id) => {
            Echo.private(`${id}.account-type`).listen("QuCalled", (e) => {
                updated();
            });
        });

        return () => {
            config.account_type_ids.forEach((id) => {
                Echo.leave(`${id}.account-type`);
            });
            Echo.leave(`${screen_id}.screen`);
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
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="p-10 !h-[80%] w-[40%]">
                        <div className="text-center text-[5rem] leading-[5rem] uppercase">
                            {tickets[0]?.num_fulltext ?? "0"}
                        </div>
                        <div className="mt-[10%]">
                            <Counter tickets={tickets} />
                        </div>
                    </div>
                    <div className="">
                        <Message text={config?.message ?? ""} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
