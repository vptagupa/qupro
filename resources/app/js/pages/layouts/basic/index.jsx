import Layout from "@/js/layouts/public";
import Message from "../components/message";
import Counter from "../components/counter";
import { useTickets } from "../tickets";
import { useEffect } from "react";

export default ({ screen_id }) => {
    const { tickets, current, config, updated, Beep } = useTickets(screen_id);

    useEffect(() => {
        setTimeout(() => {
            updated();
        }, 1000);
    }, []);

    return (
        <Layout>
            <div className="m-auto w-screen h-screen">
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="!p-2 p-10 !h-[80%] lg:w-[30%] xs:w-full">
                        <div className="text-center text-[5rem] leading-[5rem] uppercase">
                            {current?.num_fulltext ?? "0"}
                        </div>
                        <div className="mt-[10%]">
                            <Counter tickets={tickets} />
                        </div>
                    </div>
                    <div className="xs:max-sm:hidden">
                        <Message text={config?.message ?? ""} />
                    </div>
                </div>
                <div className="hidden">
                    <Beep />
                </div>
            </div>
        </Layout>
    );
};
