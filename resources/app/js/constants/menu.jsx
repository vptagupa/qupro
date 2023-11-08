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
        permission: "DASHBOARD_ADMIN",
    },
    {
        id: "tellers",
        name: "Tellers",
        icon: <UsersIcon className="h-3" />,
        route: "admin.tellers.index",
        permission: "DASHBOARD_TELLER",
    },
    {
        id: "configurations",
        name: "Configurations",
        icon: <WrenchScrewdriverIcon className="h-3" />,
        route: "admin.configurations.index",
        permission: "CONFIGURATIONS",
    },
    {
        id: "users",
        name: "Users",
        icon: <UserGroupIcon className="h-3" />,
        route: "admin.users.index",
        permission: "USERS",
    },
];
