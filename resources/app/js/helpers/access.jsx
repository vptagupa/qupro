import { usePage } from "@inertiajs/react";
export const canAccess = (user, pagePermission) => {
    const access = Object.keys(user?.data?.access ?? []);

    return access.includes(pagePermission);
};
