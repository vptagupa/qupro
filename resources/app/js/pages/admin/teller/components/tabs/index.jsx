import { useState } from "react";
import { Tab } from "@headlessui/react";
import Serve from "../table/serve";
import Teller from "../teller";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default ({ accountType }) => {
    let [tabs] = useState({
        serve: {
            name: "Served List",
            content: <Serve accountType={accountType} />,
        },
        setup: {
            name: "Update Name",
            content: <Teller />,
        },
    });

    return (
        <div className="w-full">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 p-1">
                    {Object.values(tabs).map((tab, idx) => (
                        <Tab
                            key={idx}
                            className={({ selected }) =>
                                classNames(
                                    "w-full rounded-lg py-2.5 px-2 text-sm font-medium leading-5",
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
                    {Object.values(tabs).map((content, idx) => (
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
};
