import { usePage } from "@inertiajs/react";
export const canAccess = (pagePermission) => {
    const { user } = usePage().props;

    return user.data.access.includes(pagePermission);
};
