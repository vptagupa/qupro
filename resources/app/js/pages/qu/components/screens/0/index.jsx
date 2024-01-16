import { usePage } from "@inertiajs/react";
import Department from "./department";
import { useState, useEffect } from "react";

export default function Component({ next, controls }) {
    const { accountTypes } = usePage().props;
    const [types, setTypes] = useState(accountTypes.data);

    useEffect(() => {
        axios
            .post(route("account-types.list"), {
                per_page: 100,
                order_by: ["name", "asc"],
            })
            .then((response) => {
                setTypes(response.data.data);
            });
    }, []);

    return (
        <>
            <div className="flex items-center justify-center flex-wrap gap-3 w-full">
                {types.map((department) => (
                    <div key={department.id} className="w-[15rem]">
                        <Department
                            next={next}
                            controls={controls}
                            value={department}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
