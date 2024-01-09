import { useControls } from "./controls";
import { Transition } from "@headlessui/react";
import * as Screens from "./screens";
import { usePager } from "./pager";
import { usePage } from "@inertiajs/react";

export default function Index({ url }) {
    const { config } = usePage().props;
    const pager = usePager();
    const controls = useControls({ url });
    const isEnabledCategories = config.enabled_categories;
    const transitions = {
        enter: "transition-opacity duration-75",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "transition-opacity duration-150",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
    };

    return (
        <>
            <Transition
                show={pager.page == 0}
                className="h-screen w-screen absolute flex items-center justify-center"
                {...transitions}
            >
                <Screens.Page0
                    next={isEnabledCategories ? pager.page1 : pager.page2}
                    controls={controls}
                />
            </Transition>
            <Transition
                show={pager.page == 1}
                className="absolute h-screen w-screen flex flex-col items-center justify-center"
                {...transitions}
            >
                <Screens.Page1
                    prev={pager.page0}
                    next={pager.page2}
                    controls={controls}
                />
            </Transition>
            <Transition
                show={pager.page == 2}
                className="h-screen w-screen absolute flex flex-col items-center justify-center"
                {...transitions}
            >
                <Screens.Page2
                    prev={isEnabledCategories ? pager.page1 : pager.page0}
                    next={pager.page3}
                    final={pager.page4}
                    controls={controls}
                />
            </Transition>
            <Transition
                show={pager.page == 3}
                className="h-screen w-screen absolute flex flex-col items-center justify-center"
                {...transitions}
            >
                <Screens.Page3
                    prev={pager.page2}
                    next={pager.page4}
                    controls={controls}
                />
            </Transition>
            <Transition
                show={pager.page == 4}
                className="h-screen w-screen absolute flex-col flex items-center justify-center"
                {...transitions}
            >
                <Screens.Page4
                    prev={pager.page3}
                    next={pager.page0}
                    controls={controls}
                />
            </Transition>
        </>
    );
}
