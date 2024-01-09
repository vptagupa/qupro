import { useState } from "react";

export const usePager = () => {
    const [page, setPage] = useState(0);

    const page0 = () => {
        setPage(0);
    };

    const page1 = () => {
        setPage(1);
    };

    const page2 = () => {
        setPage(2);
    };

    const page3 = () => {
        setPage(3);
    };

    const page4 = () => {
        setPage(4);
    };

    return {
        page,
        page0,
        page1,
        page2,
        page3,
        page4,
    };
};
