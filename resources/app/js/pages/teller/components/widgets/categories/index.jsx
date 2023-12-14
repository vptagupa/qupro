import Active from "./active";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
export default function Component({ accountType }) {
    const { categories: userCategories } = usePage().props;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .post(route("admin.setup.categories.list"), {
                extra: {
                    where: { account_type_id: accountType.id },
                },
            })
            .then(({ data: { data } }) => {
                setCategories(data);
            });
    }, []);

    return (
        <>
            <table className="w-full">
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="border-b">
                            <td className="p-2">{category.name}</td>
                            <td className="text-end">
                                <Active
                                    accountType={accountType}
                                    item={category}
                                    categories={userCategories.filter(
                                        (d) =>
                                            d.pivot.account_type_id ==
                                            accountType.id,
                                    )}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
