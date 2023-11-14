import { useTable } from "@/js/helpers/table";
import Body from "./body";
import Event from "@/js/helpers/event";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 5 };

const Component = ({ accountType }) => {
    const { data, setSearch, pagination, deleteHandler, searchHandler } =
        useTable({
            initialParams: {
                ...INITIAL_PARAMS,
                extra: { account_type: accountType.id },
            },
            listRoute: route("admin.qu.served_list"),
        });

    const handleReselect = (qu) => {
        Event.emit(`${accountType.id}.set-qu`, qu);
        Event.emit(`${accountType.id}.modal.records.show`, false);
    };

    return (
        <Body
            data={data}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
            handleReselect={handleReselect}
        />
    );
};

export default Component;
