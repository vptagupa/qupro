import { debounce } from "@/js/helpers";
import { router } from "@inertiajs/react";
import { useState, useEffect, useCallback, useRef } from "react";
import beep from "@/assets/audio/2.mp3";

export const useTickets = (screen_id) => {
    const beepRef = useRef();
    const [config, setConfig] = useState({
        interval: 5,
        account_type_ids: [],
    });
    const [tickets, setTickets] = useState([]);
    const [current, setCurrent] = useState([]);

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
                    setTickets(data.tickets.data);
                    setCurrent(data.tickets.current);
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

    useEffect(() => {
        if (beepRef.current) {
            beepRef.current.play();
        }
    }, [current]);

    const Beep = () => {
        return <audio src={beep} ref={beepRef}></audio>;
    };

    return {
        tickets,
        current,
        updated,
        config,
        Beep,
    };
};