import { useTable } from "@/js/helpers/table";
import { debounce } from "@/js/helpers";
import Body from "./body";
import axios from "axios";
import { useCallback } from "react";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 10 };

const Component = (props) => {
    const { data, setSearch, pagination, deleteHandler, searchHandler } =
        useTable({
            initialParams: INITIAL_PARAMS,
            listRoute: route("admin.configurations.media.list"),
            name: "media",
        });

    const handleDelete = (id) => {
        deleteHandler(
            route("admin.configurations.media.destroy", {
                id,
            }),
        );
    };

    const seqHandler = debounce(
        useCallback((id, seq) => {
            console.log({
                id,
                seq,
            });
            const request = async (id, seq) => {
                await axios.post(
                    route("admin.configurations.media.seq", { id }),
                    {
                        seq,
                    },
                );
            };
            request(id, seq);
        }, []),
        500,
    );

    return (
        <Body
            data={data}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={searchHandler}
            handleDelete={handleDelete}
            seqHandler={seqHandler}
        />
    );
};

export default Component;
