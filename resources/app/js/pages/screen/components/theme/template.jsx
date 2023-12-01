import { Popover, Transition } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

const Component = (props) => {
    return (
        <div className="">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? "text-white" : "text-slate-400/90"}
                group inline-flex items-center text-center rounded-md p-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                        >
                            <Cog8ToothIcon
                                className={`${
                                    open ? "text-white" : "text-slate-400/90"
                                }
                   h-5 w-5 transition duration-150 ease-in-out group-hover:text-white`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 mt-2 right-0 px-4 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                    <div className="bg-gray-50 p-2 flex flex-col gap-2 text-slate-500 h-[600px] overflow-auto">
                                        {props.children}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default Component;
