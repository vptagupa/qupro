import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    counter: {
        bg: null,
    },
    popover: {
        bg: null,
        font: null,
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
};
export const reducer = createSlice({
    name: "themeCounterReducer",
    initialState: initialState,
    reducers: {
        setCounter: (state, action) => {
            const selector = "counter";
            state[selector] = {
                ...state[selector],
                ...action.payload,
            };
        },
        replace: (state, action) => {
            state.counter = {
                ...state.counter,
                ...(action.payload?.counter ?? initialState.counter),
            };
            state.current = {
                ...state.current,
                ...(action.payload?.current ?? initialState.current),
            };
            state.grid = {
                ...state.grid,
                ...(action.payload?.grid ?? initialState.grid),
            };
            state.popover = {
                ...state.popover,
                ...(action.payload?.popover ?? initialState.popover),
            };
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
        setPopover: (state, action) => {
            const selector = "popover";
            state[selector] = {
                ...state[selector],
                ...action.payload,
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
    setPopover,
    replace,
} = reducer.actions;

export default reducer.reducer;
