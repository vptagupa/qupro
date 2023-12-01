import { createSlice } from "@reduxjs/toolkit";

export const reducer = createSlice({
    name: "themeCounterReducer",
    initialState: {
        counter: {
            bg: null,
        },
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
        grid: {
            ticket: {
                bg: null,
                font: null,
            },
            window: {
                bg: null,
                font: null,
            },
            devider: {
                font: null,
            },
        },
    },
    reducers: {
        setCounter: (state, action) => {
            const selector = "counter";
            state[selector] = {
                ...state[selector],
                ...action.payload,
            };
        },
        replace: (state, action) => {
            if (action.payload) {
                state.counter = {
                    ...state.counter,
                    ...action.payload.counter,
                };
                state.current = {
                    ...state.current,
                    ...action.payload.current,
                };
                state.grid = {
                    ...state.grid,
                    ...action.payload.grid,
                };
            }
        },

        setCurrentTicket: (state, action) => {
            const selector = "current";
            const type = "ticket";
            state[selector] = {
                ...state[selector],
                [type]: {
                    ...state[selector][type],
                    ...action.payload,
                },
            };
        },
        setCurrentWindow: (state, action) => {
            const selector = "current";
            const type = "window";
            state[selector] = {
                ...state[selector],
                [type]: {
                    ...state[selector][type],
                    ...action.payload,
                },
            };
        },
        setGridTicket: (state, action) => {
            const selector = "grid";
            const type = "ticket";
            state[selector] = {
                ...state[selector],
                [type]: {
                    ...state[selector][type],
                    ...action.payload,
                },
            };
        },
        setGridWindow: (state, action) => {
            const selector = "grid";
            const type = "window";
            state[selector] = {
                ...state[selector],
                [type]: {
                    ...state[selector][type],
                    ...action.payload,
                },
            };
        },
        setGridDevider: (state, action) => {
            const selector = "grid";
            const type = "devider";
            state[selector] = {
                ...state[selector],
                [type]: {
                    ...state[selector][type],
                    ...action.payload,
                },
            };
        },
    },
});

export const {
    setCounter,
    setCurrentTicket,
    setCurrentWindow,
    setGridTicket,
    setGridWindow,
    setGridDevider,
    replace,
} = reducer.actions;

export default reducer.reducer;
