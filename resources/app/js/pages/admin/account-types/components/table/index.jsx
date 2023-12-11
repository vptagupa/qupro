import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = {
    search: "",
    filter: false,
    page: 0,
    perPage: 10,
    extra: {
        appends: {
            priorityFormat: true,
            format: true,
            file: true,
            categories: true,
        },
    },
};

const Component = (props) => {
    const { data, setSearch, pagination, deleteHandler, searchHandler } =
        useTable({
            initialParams: INITIAL_PARAMS,
            listRoute: route("admin.account-types.list"),
        });

    const handleDelete = async (id) => {
        deleteHandler(
            route("admin.account-types.destroy", {
                type: id,
            }),
        );
    };

    return (
        <Body
            data={data}
            formats={props.formats}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
            handleDelete={handleDelete}
        />
    );
};

export default Component;
