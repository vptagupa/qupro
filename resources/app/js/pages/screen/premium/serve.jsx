import Serve from "../components/serve";
import Date from "../components/serve/date";
import { memo } from "react";
import { useSelector } from "react-redux";

export default memo(() => {
    const data = useSelector((state) => state.counter.data);

    return (
        <>
            <div className="flex gap-x-5 pr-4">
                <div className="w-1/2">
                    <Date />
                </div>
                <div className="grow">
                    <Serve
                        accountType={data.account_type?.name ?? ""}
                        served={data?.served ?? 0}
                        total={data?.total ?? 0}
                    />
                </div>
            </div>
        </>
    );
});
