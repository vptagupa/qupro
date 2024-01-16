import { useTable } from "@/js/helpers/table";
import Body from "./body";
import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 5 };

const Component = ({ accountType }) => {
    const [processing, setProcessing] = useState(false);
    const { categories: userCategories } = usePage().props;
    const { data, setSearch, pagination, searchHandler } = useTable({
        initialParams: {
            ...INITIAL_PARAMS,
            extra: {
                where: { account_type_id: accountType.id },
            },
        },
        listRoute: route("admin.setup.categories.list"),
    });

    const [categories, setCategories] = useState(data);

    const handleActive = (category, isActive) => {
        setCategories({
            ...categories,
            nodes: categories.nodes.map((d) => {
                if (category.id === d.id) {
                    d.active = !d.active;
                }

                return d;
            }),
        });
    };

    const handleSave = async () => {
        if (processing) return;

        router.patch(
            route("admin.tellers.update_serve_category", {
                accountType: accountType.id,
            }),
            {
                categories: categories.nodes.map((c) => ({
                    id: c.id,
                    active: c.active,
                })),
            },
            {
                preserveState: true,
                preserveScroll: true,
                onBefore: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            },
        );
    };

    useEffect(() => {
        setCategories({
            ...data,
            nodes: data.nodes.map((d) => {
                d.active = false;
                if (userCategories.filter((c) => c.id === d.id).length > 0) {
                    d.active = true;
                }
                return d;
            }),
        });
    }, [data]);

    return (
        <Body
            data={categories}
            processing={processing}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
            handleActive={handleActive}
            handleSave={handleSave}
        />
    );
};

export default Component;
