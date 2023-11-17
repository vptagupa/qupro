import { Link } from "@inertiajs/react";
import menu from "@/js/constants/menu";
import { canAccess } from "@/js/helpers/access";

function isActive(nav) {
    return route().current(nav.route);
}

export default () => {
    const filteredAccessMenu = menu.filter((nav) => canAccess(nav.permission));
    return (
        <>
            <ul className="text-sm w-40">
                {filteredAccessMenu.map((nav) => {
                    return (
                        <li
                            key={nav.id}
                            className={
                                "py-2 px-3" +
                                (isActive(nav)
                                    ? " shadow-lg shadow-gray-300/50 rounded-lg"
                                    : "")
                            }
                        >
                            <Link href={route(nav.route)}>
                                <div className="flex items-center">
                                    <div
                                        className={
                                            "mr-2 p-2 rounded-lg" +
                                            (isActive(nav)
                                                ? " bg-purple-500 text-white"
                                                : " shadow-md shadow-gray-300/100")
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
