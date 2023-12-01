import { createSlice } from "@reduxjs/toolkit";

export const reducer = createSlice({
    name: "themeMediaReducer",
    initialState: {
        set: {
            bg: null,
            font: null,
        },
        message: {
            bg: null,
            font: null,
        },
    },
    reducers: {
        set: (state, action) => {
            state.set = {
                ...state.set,
                ...action.payload,
            };
        },
        setMessage: (state, action) => {
            state.message = {
                ...state.message,
                ...action.payload,
            };
        },
        replace: (state, action) => {
            if (action.payload) {
                state.set = {
                    ...state.set,
                    ...action.payload.set,
                };
                state.message = {
                    ...state.message,
                    ...action.payload.message,
                };
            }
        },
    },
});

export const { set, setMessage, replace } = reducer.actions;

export default reducer.reducer;
