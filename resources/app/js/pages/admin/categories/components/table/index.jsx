import { useTable } from "@/js/helpers/table";
import Body from "./body";

const INITIAL_PARAMS = {
    search: "",
    filter: false,
    page: 0,
    perPage: 10,
    extra: {
        appends: {
            file: true,
        },
    },
};

const Component = (props) => {
    const { data, setSearch, pagination, deleteHandler, searchHandler } =
        useTable({
            initialParams: INITIAL_PARAMS,
            listRoute: route("admin.setup.categories.list"),
        });

    const handleDelete = async (id) => {
        deleteHandler(
            route("admin.setup.categories.destroy", {
                category: id,
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
