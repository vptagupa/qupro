import { useState } from "react";
import { Tab } from "@headlessui/react";
import Serve from "./serve";
import Teller from "./teller";
import Categories from "./categories";
import { usePage } from "@inertiajs/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Component({ accountType }) {
    const {
        config: { enabled_categories },
    } = usePage().props;
    let [tabs] = useState({
        serve: {
            name: "Served List",
            content: <Serve accountType={accountType} />,
        },
        setup: {
            name: "Counter Name",
            content: <Teller />,
        },
        categories: {
            name: "Departments",
            content: <Categories accountType={accountType} />,
        },
    });

    tabs = Object.values(tabs).filter((tab) =>
        enabled_categories ? true : tab.name != "Departments",
    );

    return (
        <div className="w-full">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 p-1">
                    {tabs.map((tab, idx) => (
                        <Tab
                            key={idx}
                            className={({ selected }) =>
                                classNames(
                                    "w-full rounded-lg py-1 px-1 text-xs font-medium leading-5",
                                    " focus:outline-none",
                                    selected
                                        ? "bg-white shadow"
                                        : "text-slate-400 hover:bg-white/[0.12] hover:text-white",
                                )
                            }
                        >
                            {tab.name}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {tabs.map((content, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                "rounded-xl bg-white p-3",
                                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                            )}
                        >
                            {content.content}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
