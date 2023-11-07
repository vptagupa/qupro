import {
    HomeIcon,
    UsersIcon,
    UserGroupIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

export default [
    {
        id: "dashboard",
        name: "Dashboard",
        icon: <HomeIcon className="h-3" />,
        route: "admin.dashboard.index",
    },
    {
        id: "tellers",
        name: "Tellers",
        icon: <UsersIcon className="h-3" />,
        route: "admin.tellers.index",
    },
    {
        id: "configurations",
        name: "Configurations",
        icon: <WrenchScrewdriverIcon className="h-3" />,
        route: "admin.configurations.index",
    },
    {
        id: "users",
        name: "Users",
        icon: <UserGroupIcon className="h-3" />,
        route: "admin.users.index",
    },
];
