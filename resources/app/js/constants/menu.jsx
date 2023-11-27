import {
    HomeIcon,
    UserPlusIcon,
    UserGroupIcon,
    WrenchScrewdriverIcon,
    WindowIcon,
    PuzzlePieceIcon,
    CubeIcon,
    SquaresPlusIcon,
} from "@heroicons/react/24/solid";

export default [
    {
        id: "tellers",
        name: "Tellers",
        icon: <WindowIcon className="h-3" />,
        route: "admin.tellers.index",
        permission: "DASHBOARD_TELLER",
    },
    {
        id: "qu",
        name: "Qu",
        icon: <PuzzlePieceIcon className="h-3" />,
        route: "admin.qu.index",
        permission: "REGISTRATION",
    },
    {
        id: "priority",
        name: "Priority",
        icon: <PuzzlePieceIcon className="h-3" />,
        route: "priority.index",
        permission: "REGISTRATION",
    },
    {
        id: "advance.print",
        name: "Advance Print",
        icon: <UserPlusIcon className="h-3" />,
        route: "admin.advance-print.index",
        permission: "REGISTRATION",
    },
    {
        id: "account.types",
        name: "Account Types",
        icon: <CubeIcon className="h-3" />,
        route: "admin.account-types.index",
        permission: "ACCOUNT_TYPES",
    },
    {
        id: "numformat",
        name: "Formats",
        icon: <SquaresPlusIcon className="h-3" />,
        route: "admin.formats.index",
        permission: "CONFIGURATIONS",
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
