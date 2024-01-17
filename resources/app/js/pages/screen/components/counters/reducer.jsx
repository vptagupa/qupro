import { createSlice, current } from "@reduxjs/toolkit";

export const reducer = createSlice({
    name: "reducer",
    initialState: {
        data: {
            config: {
                screen_text: "",
                screen_interval: 5,
                screen_tickets_limit: 6,
                counter_history_limit: 2,
                screen_account_type_ids: [],
                on_demand_ring: "",
                on_called_ring: "",
            },
            tickets: [],
            current: null,
            served: 0,
            total: 0,
            account_type: null,
            account_types: [],
        },
        param: {
            screen_id: null,
            account_type_id: null,
            category_id: null,
        },
        theme: null,
    },
    reducers: {
        setData: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        setConfig: (state, action) => {
            state.data.config = {
                ...state.data.config,
                ...action.payload,
            };
        },
        setParam: (state, action) => {
            state.param = {
                ...state.param,
                ...action.payload,
            };
        },
        setTheme: (state, action) => {
            state.theme = {
                ...state.theme,
                ...action.payload,
            };
        },
        ticket: (state, action) => {
            const filter = state.data.tickets.filter(
                (ticket) => ticket.counter == action.payload.counter,
            );
            // Sort in asc in order to retrieve the oldest element in array
            let tickets = state.data.tickets.sort((a, b) => a.id - b.id);

            const index = tickets.findIndex(
                (ticket) => ticket.counter == action.payload.counter,
            );

            if (
                index !== -1 &&
                filter.length >= state.data.config.counter_history_limit
            ) {
                tickets.splice(index, 1);
                tickets = tickets.concat(action.payload);
            } else {
                tickets = tickets.concat(action.payload);
            }

            state.data = {
                ...state.data,
                tickets: tickets
                    .sort((a, b) => b.id - a.id)
                    .sort((a, b) => a.counter.localeCompare(b.counter)),
                current: action.payload,
            };
        },
    },
});

export const { setData, setConfig, setParam, setTheme, ticket } =
    reducer.actions;

export default reducer.reducer;
