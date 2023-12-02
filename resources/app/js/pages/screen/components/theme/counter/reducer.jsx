import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    counter: {
        set: {
            bg: null,
        },
    },
    popover: {
        set: {
            bg: null,
            font: null,
        },
        open: false,
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
                open: false,
            };
        },

        setCurrentTicket: (state, action) => {
            const selector = "current";
            const type = "ticket";
            console.log(action.payload);
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
                set: {
                    ...state[selector].set,
                    ...action.payload,
                },
            };
        },
        setPopoverOpen: (state, action) => {
            const selector = "popover";
            state[selector] = {
                ...state[selector],
                open: action.payload,
            };
            console.log(action.payload);
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
    setPopoverOpen,
    replace,
} = reducer.actions;

export default reducer.reducer;
