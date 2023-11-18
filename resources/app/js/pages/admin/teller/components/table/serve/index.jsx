import { useTable } from "@/js/helpers/table";
import Body from "./body";
import { useContext } from "react";
import { AccountTypeContext } from "../../context/card";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 5 };

const Component = ({ accountType }) => {
    const { data, setSearch, pagination, searchHandler } = useTable({
        initialParams: {
            ...INITIAL_PARAMS,
            extra: { account_type: accountType.id },
        },
        listRoute: route("admin.qu.served_list"),
    });

    return (
        <AccountTypeContext.Provider value={accountType}>
            <Body
                data={data}
                pagination={pagination}
                setSearch={setSearch}
                handleSearch={searchHandler}
            />
        </AccountTypeContext.Provider>
    );
};

export default Component;
