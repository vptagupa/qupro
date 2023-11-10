import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 10 };

const Component = (props) => {
    const { data, setSearch, pagination, searchHandler, deleteHandler } =
        useTable({
            initialParams: INITIAL_PARAMS,
            listRoute: route("admin.users.list"),
        });

    const handleDelete = (id) => {
        deleteHandler(
            route("admin.users.destroy", { id: id }),
            {
                preserveScroll: true,
                preserveState: false,
            },
            id,
        );
    };

    return (
        <Body
            data={data}
            roles={props.roles}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
            handleDelete={handleDelete}
        />
    );
};

export default Component;
