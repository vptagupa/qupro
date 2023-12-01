import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Counter from "./counter";

export default function Component() {
    return (
        <div className="w-[400px]">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                <span>Counter</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                <Counter />
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                <span>Media</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                No.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                <span>Statistics</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                No.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
}
