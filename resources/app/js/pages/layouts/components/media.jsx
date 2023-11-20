import Image from "./image";
import Video from "./video";
import { Transition } from "@headlessui/react";
import {
    memo,
    useCallback,
    useState,
    useEffect,
    useRef,
    useDeferredValue,
} from "react";

export default memo(({ media, interval }) => {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const deferredIndex = useDeferredValue(index);

    const onEnded = useCallback((index) => {
        setIndex(media.length - 1 > index ? index + 1 : 0);

        if (media.length == 1) {
            onPlay();
        }
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

    const onPlay = () => {
        if (media[index].is_video) {
            onEndedVideo();
        }

        if (media[index].is_image) {
            onEndedImage();
        }
    };

    useEffect(() => {
        onPlay();
        return () => clearTimeout(timeoutId);
    }, [index]);

    return (
        <>
            <div>
                <div className="flex items-center justify-center p-2">
                    <Transition
                        show={deferredIndex == index}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="w-full"
                    >
                        {media[index].is_image && (
                            <Image
                                ref={ref}
                                url={media[index].file.url}
                                onEnded={onEnded}
                            />
                        )}
                        {media[index].is_video && (
                            <Video
                                ref={ref}
                                url={media[index].file.url}
                                onEnded={(e) => onEnded(index)}
                            />
                        )}
                    </Transition>
                </div>
            </div>
        </>
    );
});
