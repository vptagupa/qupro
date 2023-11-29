import { debounce } from "@/js/helpers";
import { router } from "@inertiajs/react";
import { useState, useEffect, useCallback, useRef } from "react";
import beep from "@/assets/audio/2.mp3";

export const useTickets = (screen_id, department_id) => {
    const beepRef = useRef();
    const [config, setConfig] = useState({
        interval: 5,
        account_type_ids: [],
    });
    const [tickets, setTickets] = useState([]);
    const [current, setCurrent] = useState([]);
    const [data, setData] = useState({
        account_type: null,
        served: 0,
        total: 0,
        all: true,
    });

    const updated = debounce(
        useCallback(() => {
            axios
                .get(
                    route("screen.updated", {
                        screen: screen_id,
                        department: department_id,
                    }),
                )
                .then(({ data }) => {
                    setConfig(data.config);
                    setTickets(data.tickets.data);
                    setCurrent(data.tickets.current);
                    setData({
                        account_type: data.tickets?.account_type,
                        served: data.tickets.served,
                        total: data.tickets.total,
                        all: data.tickets?.account_type?.id ? false : true,
                    });
                });
        }, []),
        1000,
    );

    useEffect(() => {
        config.account_type_ids.forEach((id) => {
            Echo.private(`${id}.account-type`).listen("QuCalled", (qu) => {
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
        Echo.private(`${screen_id}.screen`)
            .listen("CounterRefresh", (e) => {
                updated();
            })
            .listen("ScreenRefresh", (e) => {
                updated();
                router.reload();
            });

        return () => {
            Echo.leave(`${screen_id}.screen`);
        };
    }, []);

    const Beep = () => {
        return <audio src={beep} ref={beepRef}></audio>;
    };

    return {
        tickets,
        current,
        data,
        updated,
        config,
        Beep,
    };
};
