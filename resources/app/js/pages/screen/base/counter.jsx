import Counters from "../components/counters";
import beep from "@/assets/audio/2.mp3";
import Pop from "../components/serve/pop";

import { useRef, useEffect, memo } from "react";
import { useSelector } from "react-redux";

export default memo(({ screen_id, account_type_id }) => {
    const {
        data: { current, config },
    } = useSelector((state) => state.counter);

    const onCalled = useRef();
    const onDemand = useRef();

    const play = (ref) => {
        ref.current.pause();
        ref.current.currentTime = 0;
        ref.current.play();
    };

    useEffect(() => {
        if (onCalled.current) {
            play(onCalled);
        }
    }, [current]);

    useEffect(() => {
        Echo.channel(`ding`).listen("Ding", (event) => {
            if (
                config.screen_account_type_ids.includes(
                    event.qu.account_type_id,
                )
            ) {
                play(onDemand);
            }
        });

        return () => Echo.leave(`ding`);
    }, [config.screen_account_type_ids]);

    return (
        <>
            <Counters account_type_id={account_type_id} screen_id={screen_id} />
            <Pop current={current} account_type_id={account_type_id} />
            <audio
                src={config?.on_called_ring ? config?.on_called_ring : beep}
                ref={onCalled}
                className="hidden"
            ></audio>
            <audio
                src={config?.on_demand_ring ? config?.on_demand_ring : beep}
                ref={onDemand}
                className="hidden"
            ></audio>
        </>
    );
});
