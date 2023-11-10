import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 10 };

const Component = (props) => {
    const { data, setSearch, pagination, searchHandler } = useTable({
        name: "config",
        initialParams: INITIAL_PARAMS,
        listRoute: route("admin.configurations.global.list"),
    });

    return (
        <Body
            data={data}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
        />
    );
};

export default Component;
