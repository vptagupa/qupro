import Counters from "../components/counters";
import beep from "@/assets/audio/2.mp3";
import Pop from "../components/serve/pop";

import { useRef, useEffect, memo } from "react";
import { useSelector } from "react-redux";

export default memo(({ screen_id, account_type_id }) => {
    const {
        data: { current, config },
    } = useSelector((state) => state.counter);

    const beepRef = useRef();

    const play = () => {
        beepRef.current.pause();
        beepRef.current.currentTime = 0;
        beepRef.current.play();
    };

    useEffect(() => {
        if (beepRef.current) {
            play();
        }
    }, [current]);

    useEffect(() => {
        Echo.channel(`ding`).listen("Ding", (event) => {
            if (
                config.screen_account_type_ids.includes(
                    event.qu.account_type_id,
                )
            ) {
                play();
            }
        });

        return () => Echo.leave(`ding`);
    }, [config.screen_account_type_ids]);

    return (
        <>
            <Counters account_type_id={account_type_id} screen_id={screen_id} />
            <Pop current={current} account_type_id={account_type_id} />
            <audio src={beep} ref={beepRef} className="hidden"></audio>
        </>
    );
});
