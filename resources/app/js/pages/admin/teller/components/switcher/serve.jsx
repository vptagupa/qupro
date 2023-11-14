import axios from "axios";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export const useServe = () => {
    const { user } = usePage().props;
    const exists = (id) => user.data.serve_account_type_ids.includes(id);

    const toggle = (id) => {
        axios
            .patch(route("admin.tellers.update_serve_account_type"), {
                accountTypeId: id,
            })
            .then((response) => {
                router.reload({
                    preserveScroll: true,
                    preserveState: true,
                    only: ["user"],
                });
            });
    };

    return { toggle, exists, ids: user.data.serve_account_type_ids };
};
