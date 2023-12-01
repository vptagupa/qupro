import Image from "./image";
import Video from "./video";
import { memo, useCallback, useState, useEffect, useRef } from "react";

export default memo(({ media, interval }) => {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [play, setPlay] = useState(media[index] ?? media[0]);

    const onEnded = useCallback(
        (index) => {
            setIndex(media.length - 1 > index ? index + 1 : 0);
            // Auto play video where there is only 1 video in the media
            if (media.length == 1 && play.file.is_video) {
                onPlayVideo();
            }
        },
        [media, play],
    );

    const onPlayVideo = () => {
        ref.current.play();
    };

    let timeoutId;
    const onImage = () => {
        timeoutId = setTimeout(() => {
            onEnded(index);
        }, interval * 1000);
    };

    const onPlay = () => {
        if (play.file.is_video) {
            onPlayVideo();
        }

        if (play.file.is_image) {
            onImage();
        }
    };

    useEffect(() => {
        setPlay(media[index] ?? media[0]);
        return () => clearTimeout(timeoutId);
    }, [index, media]);

    useEffect(() => {
        onPlay();
    }, [play]);

    return (
        <>
            <div>
                <div className="flex items-center justify-center">
                    <div className="w-[98%]">
                        {play.file.is_image && <Image url={play.file.url} />}
                        {play.file.is_video && (
                            <Video
                                ref={ref}
                                url={play.file.url}
                                onEnded={(e) => onEnded(index)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});
