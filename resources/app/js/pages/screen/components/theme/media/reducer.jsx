import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    set: {
        bg: null,
        font: null,
    },
    message: {
        bg: null,
        font: null,
    },
};
export const reducer = createSlice({
    name: "themeMediaReducer",
    initialState: initialState,
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
            state.set = {
                ...state.set,
                ...(action.payload?.set ?? initialState.set),
            };
            state.message = {
                ...state.message,
                ...(action.payload?.message ?? initialState.message),
            };
        },
    },
});

export const { set, setMessage, replace } = reducer.actions;

export default reducer.reducer;
