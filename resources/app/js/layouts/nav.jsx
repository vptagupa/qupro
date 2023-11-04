import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HomeIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default () => {
    return (
        <>
            <div className="flex justify-between items-center h-12">
                <div className="flex xs:grow sm:block lg:hidden">
                    <div className="lg:hidden mr-2">
                        <button>
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="xs:grow lg:flex-none text-center">
                        <img
                            className="h-8 w-auto inline mr-2"
                            src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500"
                        />
                        <span className="xs:max-sm:hidden inline text-slate-600 text-xs font-semibold">
                            QuPro
                        </span>
                    </div>
                </div>
                <div className="xs:hidden lg:block">
                    <div className="flex">
                        <HomeIcon className="h-4 w-4" />
                        <ul className="text-xs text-slate-600">
                            <li className="inline px-1 after:content-['/'] after:ml-1">
                                Dashboard
                            </li>
                            <li className="inline">Teller</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <Menu as="div" className="relative ml-3">
                        <Menu.Button className="outline-2 ">
                            <img
                                className="h-6 w-auto rounded-full shadow-md"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            />
                        </Menu.Button>
                        <Transition
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {(active) => (
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            href="#"
                                        >
                                            My Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {(active) => (
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            href="#"
                                        >
                                            Logout
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </>
    );
};
