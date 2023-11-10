import { useState } from "react";
import { usePage } from "@inertiajs/react";

export const useAccountTypes = () => {
    const { accountTypes } = usePage().props;
    const [data, setData] = useState(accountTypes.data);

    const reset = () => {
        setData(
            data.map((d) => {
                d.checked = false;
                return d;
            }),
        );
    };

    const check = (id) => {
        setData(
            data.map((d) => {
                if (d.id === id) {
                    d.checked = !d.checked;
                }

                return d;
            }),
        );
    };

    return {
        data,
        check,
        reset,
        setData,
    };
};
