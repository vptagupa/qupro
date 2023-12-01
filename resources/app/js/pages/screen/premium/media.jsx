import Media from "../components/media";
import Banner from "../components/default.banner";

import { debounce } from "lodash";
import { useCallback, useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";

export default memo(({ screen_id }) => {
    const { data: config } = useSelector((state) => state.counter);
    const [media, setMedia] = useState([]);
    const update = debounce(
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
        setTimeout(() => {
            update();
        }, 1000);

        Echo.private(`media`).listen("MediaRefresh", (e) => {
            update();
        });

        return () => {
            Echo.leave(`media`);
        };
    }, []);

    return (
        <>
            {media.length > 0 && (
                <Media media={media} interval={config?.interval ?? 0} />
            )}
            {media.length <= 0 && <Banner />}
        </>
    );
});
