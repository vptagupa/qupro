import Image from "./image";
import Video from "./video";
import { memo, useCallback, useState, useEffect, useRef } from "react";

export default memo(({ media, interval }) => {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const [play, setPlay] = useState(media[index]);

    const onEnded = useCallback((index) => {
        setIndex(media.length - 1 > index ? index + 1 : 0);
    }, []);

    const onEndedVideo = () => {
        ref.current.play();
    };

    let timeoutId;
    const onEndedImage = () => {
        timeoutId = setTimeout(() => {
            setIndex(media.length - 1 > index ? index + 1 : 0);
        }, interval * 1000);
    };

    useEffect(() => {
        setPlay(media[index]);
    }, [index]);

    useEffect(() => {
        console.log(play);
        if (index > 0 && play.is_video) {
            onEndedVideo();
        }

        if (play.is_image) {
            onEndedImage();
        }

        return () => clearTimeout(timeoutId);
    }, [play]);

    return (
        <>
            <div>
                <div
                    key={media.id}
                    className="flex items-center justify-center p-2"
                >
                    {play.is_image && (
                        <Image
                            ref={ref}
                            url={play.file.url}
                            onEnded={onEnded}
                        />
                    )}
                    {play.is_video && (
                        <Video
                            ref={ref}
                            url={play.file.url}
                            onEnded={(e) => onEnded(index)}
                        />
                    )}
                </div>
            </div>
        </>
    );
});
