import { usePage } from "@inertiajs/react";
export const canAccess = (pagePermission) => {
    const { user } = usePage().props;
    const access = Object.keys(user?.data?.access ?? []);

    return access.includes(pagePermission);
};
