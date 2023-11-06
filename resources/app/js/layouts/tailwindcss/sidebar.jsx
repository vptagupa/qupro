import { Link } from "@inertiajs/react";
import menu from "@/js/constants/menu";

function isActive(nav) {
    return route().current(nav.route);
}

export default () => {
    return (
        <>
            <ul className="text-sm w-40">
                {menu.map((nav) => {
                    return (
                        <li
                            key={nav.id}
                            className={
                                "py-2 px-3" +
                                (isActive(nav) ? " shadow-md rounded-lg" : "")
                            }
                        >
                            <Link href={route(nav.route)}>
                                <div className="flex items-center">
                                    <div
                                        className={
                                            "mr-2 p-2 rounded-lg" +
                                            (isActive(nav)
                                                ? " bg-purple-500 text-white"
                                                : "")
                                        }
                                    >
                                        {nav.icon}
                                    </div>
                                    <div className="text-xs">{nav.name}</div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
