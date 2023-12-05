import Media from "../components/media";
import Banner from "../components/default.banner";

import { debounce } from "lodash";
import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";

export default memo(({ screen_id, account_type_id }) => {
    const {
        data: { config },
    } = useSelector((state) => state.counter);
    const [media, setMedia] = useState([]);

    useEffect(() => {
        const update = debounce(() => {
            axios
                .get(
                    route("screen.updated.media", {
                        screen: screen_id,
                        account_type: account_type_id,
                    }),
                )
                .then(({ data: { data } }) => {
                    setMedia(data);
                });
        }, 1000);

        const timeout = setTimeout(() => {
            update();
        }, 1000);

        Echo.channel(`media`).listen("MediaRefresh", (e) => {
            update();
        });

        return () => {
            Echo.leave(`media`);
            clearTimeout(timeout);
        };
    }, [account_type_id]);

    return (
        <>
            {media.length > 0 && (
                <Media media={media} interval={config?.screen_interval ?? 0} />
            )}
            {media.length <= 0 && <Banner />}
        </>
    );
});
