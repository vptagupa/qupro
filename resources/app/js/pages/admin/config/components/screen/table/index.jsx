import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 10 };

const Component = (props) => {
    const { data, setSearch, pagination, deleteHandler, searchHandler } =
        useTable({
            name: "screen",
            initialParams: INITIAL_PARAMS,
            listRoute: route("admin.configurations.screen.list"),
        });

    const handleDelete = (id) => {
        deleteHandler(
            route("admin.configurations.screen.destroy", {
                screen: id,
            }),
        );
    };

    return (
        <Body
            data={data}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
            handleDelete={handleDelete}
        />
    );
};

export default Component;
