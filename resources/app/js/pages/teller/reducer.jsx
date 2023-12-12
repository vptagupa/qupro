import { createSlice } from "@reduxjs/toolkit";

const init = {
    qu: null,
    priority: false,
    counts: { regular: 0, priority: 0 },
    status: {
        has_next_priority: false,
        has_next_regular: false,
    },
};

const initialState = {
    accountTypes: [],
    data: {
        0: init,
    },
};

export const reducer = createSlice({
    name: "tellerReducer",
    initialState,
    reducers: {
        setAccountTypes: (state, action) => {
            state.accountTypes = action.payload;
        },
        initial: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload]: init,
            };
        },
        setNextStatus: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload.id]: {
                    ...state.data[action.payload.id],
                    status: {
                        has_next_priority: action.payload.has_next_priority,
                        has_next_regular: action.payload.has_next_regular,
                    },
                },
            };
        },
        setQu: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload.id]: {
                    ...state.data[action.payload.id],
                    qu: action.payload.qu,
                },
            };
        },
        setCounts: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload.id]: {
                    ...state.data[action.payload.id],
                    counts: action.payload.counts,
                },
            };
        },
        setPriority: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload.id]: {
                    ...state.data[action.payload.id],
                    priority: action.payload.priority,
                },
            };
        },
    },
});

export const {
    setAccountTypes,
    initial,
    setQu,
    setCounts,
    setPriority,
    setNextStatus,
} = reducer.actions;

export default reducer.reducer;
