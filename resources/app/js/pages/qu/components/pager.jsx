import { useState } from "react";

export const usePager = () => {
    const [page, setPage] = useState(0);
    const [actual, setActual] = useState(page);

    const page0 = (manual = false) => {
        setPage(0);
        if (!manual) setActual(0);
    };

    const page1 = (manual) => {
        setPage(1);
        if (!manual) setActual(1);
    };

    const page2 = (manual) => {
        setPage(2);
        if (!manual) setActual(2);
    };

    const page3 = (manual) => {
        setPage(3);
        if (!manual) setActual(3);
    };

    const page4 = (manual) => {
        setPage(4);
        if (!manual) setActual(4);
    };

    return {
        page,
        page0,
        page1,
        page2,
        page3,
        page4,
        actual,
    };
};
