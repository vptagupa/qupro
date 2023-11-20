import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { accountTypeSwitcher } from "../requests";

export const useServe = () => {
    const { user } = usePage().props;
    const exists = (id) =>
        (user.data?.serve_account_type_ids ?? []).includes(id);

    const toggle = (id) => {
        accountTypeSwitcher(id).then((res) => {
            router.reload({
                preserveScroll: true,
                preserveState: true,
                only: ["user"],
            });
        });
    };

    return { toggle, exists, ids: user.data.serve_account_type_ids };
};
