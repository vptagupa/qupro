import { createSlice } from "@reduxjs/toolkit";

export const reducer = createSlice({
    name: "reducer",
    initialState: {
        current: {
            ticket: {
                bg: null,
                font: null,
            },
            window: {
                bg: null,
                font: null,
            },
        },
    },
    reducers: {
        setCurrentTicket: (state, action) => {
            state.current = {
                ...state.current,
                ticket: {
                    ...state.current.ticket,
                    ...action.payload,
                },
            };
        },
        setCurrentWindow: (state, action) => {
            state.current = {
                ...state.current,
                window: {
                    ...state.current.window,
                    ...action.payload,
                },
            };
        },
    },
});

export const { setCurrentTicket, setCurrentWindow } = reducer.actions;

export default reducer.reducer;
