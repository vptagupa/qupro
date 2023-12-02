import { usePage, router } from "@inertiajs/react";
import { useSelector } from "react-redux";

import { Fragment, useState, memo, useEffect, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default memo(() => {
    const {
        accountTypes: { data: accountTypes },
    } = usePage().props;
    const { account_type_id, screen_id } = useSelector(
        (state) => state.counter.param,
    );
    const [list, setList] = useState(
        [{ id: 0, name: "Default" }].concat(...accountTypes),
    );
    const [selected, setSelected] = useState(
        list.filter((t) => t.id == (account_type_id ?? 0))[0] ?? "",
    );

    const redirect = useCallback((id) => {
        router.get(
            route("screen.index", {
                screen: screen_id,
                department: id == 0 ? null : id,
            }),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    }, []);

    useEffect(() => {
        redirect(selected?.id);
    }, [selected]);

    return (
        <div className="w-72 z-50">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                            {selected?.name ?? ""}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {list.map((type) => (
                                <Listbox.Option
                                    key={type.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-amber-100 text-amber-900"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={type}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {type.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
});
