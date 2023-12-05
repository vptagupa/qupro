import { createSlice } from "@reduxjs/toolkit";

export const reducer = createSlice({
    name: "reducer",
    initialState: {
        data: {
            config: {
                screen_text: "",
                screen_interval: 5,
                screen_tickets_limit: 6,
                screen_account_type_ids: [],
            },
            tickets: [],
            current: null,
            served: 0,
            total: 0,
            account_type: null,
        },
        param: {
            screen_id: null,
            account_type_id: null,
        },
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
        ticket: (state, action) => {
            const index = state.data.tickets.findIndex(
                (ticket) => ticket.counter == action.payload.counter,
            );
            let tickets = state.data.tickets;

            if (index !== -1) {
                tickets[index] = action.payload;
            } else {
                tickets = tickets
                    .concat(action.payload)
                    .sort((a, b) => a.counter.localeCompare(b.counter));
            }

            state.data = {
                ...state.data,
                tickets,
                current: action.payload,
            };
        },
    },
});

export const { setData, setConfig, setParam, ticket } = reducer.actions;

export default reducer.reducer;
