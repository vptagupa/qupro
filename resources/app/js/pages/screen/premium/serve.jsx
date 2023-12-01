import Serve from "../components/serve";
import Date from "../components/serve/date";
import { memo } from "react";
import { useSelector } from "react-redux";

export default memo(() => {
    const data = useSelector((state) => state.counter.data);
    return (
        <>
            <Date />
            <Serve
                accountType={data.account_type?.name ?? ""}
                served={data?.served ?? 0}
                total={data?.total ?? 0}
            />
        </>
    );
});
