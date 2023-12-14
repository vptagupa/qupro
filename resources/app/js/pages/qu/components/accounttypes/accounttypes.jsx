import AccountType from "./accounttype";
import { useEffect, useCallback, memo } from "react";

export default memo(function Component({
    form,

    accountTypes,
    setAccountTypes,
}) {
    const updateAccountTypeStat = useCallback(
        (type, statistics) => {
            setAccountTypes(
                accountTypes.map((t) => {
                    if (t.id === type.id) {
                        t.statistics = statistics;
                    }
                    return t;
                }),
            );
        },
        [accountTypes],
    );

    useEffect(() => {
        Echo.channel(`screen`).listen("QuCalled", (event) => {
            setAccountTypes(
                accountTypes.map((type) => {
                    if (type.id === event.qu.account_type.id) {
                        type.statistics = event.qu.statistics;
                    }
                    return type;
                }),
            );
        });

        return () => {
            Echo.leave(`screen`);
        };
    }, []);

    return (
        <>
            <div
                className={`flex flex-wrap justify-center  gap-y-4 gap-x-2 items-center`}
            >
                {accountTypes.map((type) => {
                    return (
                        <div key={type.id} className="flex flex-col">
                            <AccountType
                                form={form}
                                type={type}
                                updateAccountTypeStat={updateAccountTypeStat}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
});
