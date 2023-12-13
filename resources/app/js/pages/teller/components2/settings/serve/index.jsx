import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 2 };

const Component = ({ accountType }) => {
    const { data, setSearch, pagination, searchHandler } = useTable({
        initialParams: {
            ...INITIAL_PARAMS,
            extra: { account_type: accountType.id },
        },
        listRoute: route("admin.qu.served_list"),
    });

    return (
        <Body
            data={data}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
            accountType={accountType}
        />
    );
};

export default Component;
