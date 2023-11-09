import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { usePagination } from "@table-library/react-table-library/pagination";
import Body from "./body";
import { router } from "@inertiajs/react";
import Event from "@/js/helpers/event";

const INITIAL_PARAMS = { search: "", filter: false, page: 0, perPage: 10 };

const Component = (props) => {
    const [search, setSearch] = useState(INITIAL_PARAMS.search);
    const [data, setData] = useState({
        nodes: [],
        pageInfo: {
            startSize: 0,
            endSize: 0,
            total: 0,
            totalPages: 0,
        },
    });

    const fetchData = useCallback(async (params) => {
        const result = await axios.post(route("admin.account-types.list"), {
            page: params.page + 1,
            title: params.search,
            per_page: INITIAL_PARAMS.perPage,
        });

        setData({
            nodes: result.data.data,
            pageInfo: {
                startSize: result.data.meta.from,
                endSize: result.data.meta.to,
                total: result.data.meta.total,
                totalPages: Math.ceil(
                    result.data.meta.total / INITIAL_PARAMS.perPage,
                ),
            },
        });
    }, []);

    const pagination = usePagination(
        data,
        {
            state: {
                page: INITIAL_PARAMS.page,
            },
            onChange: (action, state) => {
                fetchData({
                    search: search,
                    page: state.page,
                });
            },
        },
        {
            isServer: true,
        },
    );

    useEffect(() => {
        fetchData({
            page: INITIAL_PARAMS.page,
        });
    }, []);

    const timeout = useRef();
    const handleSearch = () => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            fetchData({
                search: search,
                page: INITIAL_PARAMS.page,
            });
        }, 500);
    };

    const handleDelete = async (id) => {
        router.delete(route("admin.account-types.destroy", { type: id }), {
            preserveScroll: true,
            preserveState: false,
        });
    };

    useEffect(() => {
        Event.on(
            "reload",
            (data) => {
                fetchData({
                    search: search,
                    page: INITIAL_PARAMS.page,
                });
            },
            this,
        );

        return () => Event.off("reload");
    }, []);

    return (
        <Body
            data={data}
            formats={props.formats}
            pagination={pagination}
            setSearch={setSearch}
            handleSearch={handleSearch}
            handleDelete={handleDelete}
        />
    );
};

export default Component;
