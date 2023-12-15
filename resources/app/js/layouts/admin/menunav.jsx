import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { canAccess } from "@/js/helpers/access";

function isActive(nav) {
    return route().current(nav.route) ? true : false;
}

function MenuLink({ nav, onClick, ...props }) {
    return nav.children ? (
        <div className="cursor-pointer" onClick={onClick}>
            {props.children}
        </div>
    ) : (
        <Link href={route(nav.route)}>{props.children}</Link>
    );
}

export default function Component({ nav }) {
    const { user } = usePage().props;
    const [open, setOpen] = useState(isActive(nav));
    return (
        <>
            <div
                className={`py-2 px-1 ${
                    isActive(nav)
                        ? " shadow-lg shadow-gray-300/50 rounded-lg"
                        : ""
                }`}
            >
                <MenuLink nav={nav} onClick={(e) => setOpen(!open)}>
                    <div className="flex items-center">
                        <div
                            className={
                                "w-[30px] mr-2 p-2 rounded-lg" +
                                (isActive(nav)
                                    ? " bg-purple-500 text-white"
                                    : " shadow-md shadow-gray-300/100")
                            }
                        >
                            {nav.icon}
                        </div>
                        <div className="w-full">{nav.name}</div>
                        {nav.children && (
                            <div className="w-[30px]">
                                {open ? (
                                    <ChevronUpIcon className="h-2" />
                                ) : (
                                    <ChevronDownIcon className="h-2" />
                                )}
                            </div>
                        )}
                    </div>
                </MenuLink>
            </div>
            {nav.children && open && (
                <div id={nav.id}>
                    <ul className="ms-4 ps-3 list-disc">
                        {nav.children
                            .filter((nav) => canAccess(user, nav.permission))
                            .map((nav, i) => {
                                const url = nav?.route ? route(nav.route) : "#";
                                return (
                                    <li
                                        key={nav.name + "" + i}
                                        className={`${
                                            isActive(nav)
                                                ? "font-bold marker:text-[1rem]"
                                                : ""
                                        }`}
                                    >
                                        <Link href={url}>
                                            <span>{nav.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            )}
        </>
    );
}
