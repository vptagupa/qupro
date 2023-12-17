import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { accountTypeSwitcher } from "../requests";
import { useSelector } from "react-redux";

export const useServe = () => {
    const { accountTypes } = useSelector((state) => state.teller);

    const exists = (id) => (accountTypes.map((d) => d.id) ?? []).includes(id);

    const existsCategories = (id, categoryId) =>
        (
            (accountTypes.filter((d) => d.id == id)[0]?.categories ?? []).map(
                (d) => d.id,
            ) ?? []
        ).includes(categoryId);

    const toggle = (id) => {
        accountTypeSwitcher(id).then((res) => {
            router.reload({
                only: ["user", "categories"],
            });
        });
    };

    return { toggle, exists, existsCategories };
};
